"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Per-project code snippets — two files each ── */
interface FileSnippet {
  fileName: string;
  code: string;
}

const CODE_SNIPPETS: Record<string, { files: [FileSnippet, FileSnippet] }> = {
  compassio: {
    files: [
      {
        fileName: "app/Services/CaseReviewService.php",
        code: `class CaseReviewService
{
    private array $providerChain = [
        GeminiProvider::class,
        GroqProvider::class,
        OpenAIProvider::class,
        CerebrasProvider::class,
    ];

    public function processReview(Case $case, User $reviewer): CaseReview
    {
        DB::beginTransaction();

        try {
            $case->guardTransition(CaseStage::PENDING_REVIEW);

            $review = CaseReview::create([
                'case_id'     => $case->id,
                'reviewer_id' => $reviewer->id,
                'stage'       => CaseStage::FIRST_LEVEL_REVIEW,
                'started_at'  => now(),
            ]);

            $aiInsights = $this->runAIAnalysis(
                $case->symptoms,
                $case->patient->medicalHistory
            );

            $review->update([
                'ai_summary'    => $aiInsights->summary,
                'risk_score'    => $aiInsights->riskScore,
                'icd_codes'     => $aiInsights->suggestedCodes,
                'confidence'    => $aiInsights->confidence,
            ]);

            $case->transitionTo(CaseStage::FIRST_LEVEL_REVIEW);

            AuditTrail::log($case, 'review_started', [
                'reviewer'   => $reviewer->id,
                'ai_provider' => $aiInsights->provider,
                'risk_score'  => $aiInsights->riskScore,
            ]);

            $this->dispatchNotifications($case, $review);

            DB::commit();
            return $review->fresh(['case', 'reviewer']);

        } catch (\\Throwable $e) {
            DB::rollBack();
            CaseException::reviewFailed($case, $e);
        }
    }

    private function runAIAnalysis(array $symptoms, array $history): AiResult
    {
        foreach ($this->providerChain as $providerClass) {
            $provider = app($providerClass);

            if ($provider->circuitBreaker()->isOpen()) {
                continue;
            }

            try {
                $result = $provider->analyze($symptoms, $history);
                $provider->circuitBreaker()->recordSuccess();
                return $result;
            } catch (ProviderException $e) {
                $provider->circuitBreaker()->recordFailure();
                Log::warning("AI provider failed", [
                    'provider' => $providerClass,
                    'error'    => $e->getMessage(),
                ]);
            }
        }

        throw new AllProvidersFailedException(
            'All AI providers exhausted for case analysis'
        );
    }

    private function dispatchNotifications(Case $case, CaseReview $review): void
    {
        $channels = NotificationChannel::activeFor($case->organization);

        $notification = new CaseReviewStarted($case, $review);

        foreach ($channels as $channel) {
            dispatch(new SendNotification(
                $notification,
                $channel,
                $case->stakeholders()
            ))->onQueue('notifications');
        }
    }
}`,
      },
      {
        fileName: "app/Services/CircuitBreaker.php",
        code: `class CircuitBreaker
{
    private const STATE_CLOSED   = 'closed';
    private const STATE_OPEN     = 'open';
    private const STATE_HALF_OPEN = 'half_open';

    private const FAILURE_THRESHOLD = 5;
    private const COOLDOWN_SECONDS  = 30;
    private const HALF_OPEN_MAX     = 3;

    public function __construct(
        private string $service,
        private CacheRepository $cache
    ) {}

    public function isOpen(): bool
    {
        $state = $this->getState();

        if ($state['status'] === self::STATE_OPEN) {
            $elapsed = now()->diffInSeconds($state['opened_at']);

            if ($elapsed >= self::COOLDOWN_SECONDS) {
                $this->transitionTo(self::STATE_HALF_OPEN);
                return false;
            }

            return true;
        }

        return false;
    }

    public function recordSuccess(): void
    {
        $state = $this->getState();

        if ($state['status'] === self::STATE_HALF_OPEN) {
            $successes = ($state['half_open_successes'] ?? 0) + 1;

            if ($successes >= self::HALF_OPEN_MAX) {
                $this->transitionTo(self::STATE_CLOSED);
                Log::info("Circuit closed for {$this->service}");
                return;
            }

            $this->updateState([
                'half_open_successes' => $successes,
            ]);
        }

        if ($state['status'] === self::STATE_CLOSED) {
            $this->updateState(['failures' => 0]);
        }
    }

    public function recordFailure(): void
    {
        $state = $this->getState();

        if ($state['status'] === self::STATE_HALF_OPEN) {
            $this->transitionTo(self::STATE_OPEN);
            Log::warning("Circuit re-opened for {$this->service}");
            return;
        }

        $failures = ($state['failures'] ?? 0) + 1;

        if ($failures >= self::FAILURE_THRESHOLD) {
            $this->transitionTo(self::STATE_OPEN);
            Log::warning("Circuit opened for {$this->service}", [
                'failures' => $failures,
            ]);
            return;
        }

        $this->updateState(['failures' => $failures]);
    }

    private function transitionTo(string $newStatus): void
    {
        $payload = ['status' => $newStatus, 'failures' => 0];

        if ($newStatus === self::STATE_OPEN) {
            $payload['opened_at'] = now()->toISOString();
        }

        if ($newStatus === self::STATE_HALF_OPEN) {
            $payload['half_open_successes'] = 0;
        }

        $this->updateState($payload);

        CircuitBreakerTransitioned::dispatch(
            $this->service,
            $newStatus
        );
    }

    private function getState(): array
    {
        return $this->cache->get(
            $this->cacheKey(),
            ['status' => self::STATE_CLOSED, 'failures' => 0]
        );
    }

    private function updateState(array $merge): void
    {
        $state = array_merge($this->getState(), $merge);
        $this->cache->put($this->cacheKey(), $state, 3600);
    }

    private function cacheKey(): string
    {
        return "circuit_breaker:{$this->service}";
    }
}`,
      },
    ],
  },
  runacos: {
    files: [
      {
        fileName: "app/api/webhooks/paystack/route.ts",
        code: `import { createHmac } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendReceiptEmail } from "@/lib/email/resend";
import { batchNotify } from "@/lib/email/brevo";
import { generateMemberId } from "@/lib/membership";
import { z } from "zod";

const webhookSchema = z.object({
  event: z.enum([
    "charge.success",
    "charge.failed",
    "transfer.reversed",
  ]),
  data: z.object({
    reference: z.string(),
    amount: z.number(),
    currency: z.string(),
    customer: z.object({
      email: z.string().email(),
    }),
    metadata: z.object({
      memberId: z.string(),
      duesSession: z.string(),
      paymentType: z.enum(["dues", "registration", "event"]),
    }),
    paid_at: z.string(),
  }),
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  // HMAC-SHA512 verification
  const hash = createHmac("sha512", process.env.PAYSTACK_SECRET!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const parsed = webhookSchema.safeParse(JSON.parse(body));
  if (!parsed.success) {
    return Response.json({ error: "Malformed payload" }, { status: 400 });
  }

  const { event, data } = parsed.data;

  if (event === "charge.success") {
    const result = await prisma.$transaction(async (tx) => {
      // Idempotency — skip if already processed
      const existing = await tx.payment.findUnique({
        where: { reference: data.reference },
      });
      if (existing) return { duplicate: true };

      const payment = await tx.payment.create({
        data: {
          memberId: data.metadata.memberId,
          amount: data.amount / 100,
          reference: data.reference,
          session: data.metadata.duesSession,
          type: data.metadata.paymentType,
          status: "verified",
          paidAt: new Date(data.paid_at),
        },
      });

      // Auto-activate member if registration payment
      if (data.metadata.paymentType === "registration") {
        const member = await tx.member.update({
          where: { id: data.metadata.memberId },
          data: {
            status: "active",
            memberId: generateMemberId(
              new Date().getFullYear()
            ),
            activatedAt: new Date(),
          },
        });

        // Check alumni status by admission year
        const yearsElapsed =
          new Date().getFullYear() - member.admissionYear;
        if (yearsElapsed >= 4) {
          await tx.member.update({
            where: { id: member.id },
            data: { isAlumni: true },
          });
        }
      }

      // Update dues status for session
      await tx.duesRecord.upsert({
        where: {
          memberId_session: {
            memberId: data.metadata.memberId,
            session: data.metadata.duesSession,
          },
        },
        update: { status: "paid", paymentId: payment.id },
        create: {
          memberId: data.metadata.memberId,
          session: data.metadata.duesSession,
          status: "paid",
          paymentId: payment.id,
        },
      });

      return { payment, duplicate: false };
    });

    if (!result.duplicate) {
      await sendReceiptEmail(data.customer.email, {
        amount: data.amount / 100,
        reference: data.reference,
        session: data.metadata.duesSession,
      });

      // Notify executives in batch
      const executives = await prisma.member.findMany({
        where: { role: { in: ["president", "treasurer"] } },
        select: { email: true },
      });
      await batchNotify(
        executives.map((e) => e.email),
        "new_payment",
        { reference: data.reference, amount: data.amount / 100 }
      );
    }
  }

  return Response.json({ received: true });
}`,
      },
      {
        fileName: "lib/membership.ts",
        code: `import { prisma } from "@/lib/prisma";

const MEMBER_ID_PREFIX = "RUN-CS";

export async function generateMemberId(year: number): Promise<string> {
  const lastMember = await prisma.member.findFirst({
    where: {
      memberId: { startsWith: \`\${MEMBER_ID_PREFIX}-\${year}\` },
    },
    orderBy: { memberId: "desc" },
    select: { memberId: true },
  });

  let sequence = 1;
  if (lastMember?.memberId) {
    const parts = lastMember.memberId.split("-");
    sequence = parseInt(parts[parts.length - 1], 10) + 1;
  }

  const padded = String(sequence).padStart(4, "0");
  return \`\${MEMBER_ID_PREFIX}-\${year}-\${padded}\`;
}

export function detectAlumniStatus(
  admissionYear: number,
  programDuration = 4
): { isAlumni: boolean; graduationYear: number } {
  const currentYear = new Date().getFullYear();
  const graduationYear = admissionYear + programDuration;

  return {
    isAlumni: currentYear >= graduationYear,
    graduationYear,
  };
}

interface MemberCardData {
  fullName: string;
  memberId: string;
  department: string;
  level: string;
  session: string;
  isAlumni: boolean;
  avatarUrl: string | null;
}

export async function assembleMemberCard(
  userId: string
): Promise<MemberCardData> {
  const member = await prisma.member.findUniqueOrThrow({
    where: { id: userId },
    include: {
      user: { select: { name: true, image: true } },
      department: { select: { name: true } },
    },
  });

  const alumniStatus = detectAlumniStatus(member.admissionYear);

  return {
    fullName: member.user.name,
    memberId: member.memberId,
    department: member.department.name,
    level: calculateLevel(member.admissionYear),
    session: formatSession(member.admissionYear),
    isAlumni: alumniStatus.isAlumni,
    avatarUrl: member.user.image,
  };
}

function calculateLevel(admissionYear: number): string {
  const currentYear = new Date().getFullYear();
  const yearsIn = currentYear - admissionYear + 1;
  const level = Math.min(yearsIn, 6) * 100;
  return \`\${level}L\`;
}

function formatSession(admissionYear: number): string {
  return \`\${admissionYear}/\${admissionYear + 1}\`;
}

export async function downloadCardAsImage(
  memberId: string
): Promise<Buffer> {
  const card = await assembleMemberCard(memberId);

  const svg = buildCardSVG(card);
  const sharp = (await import("sharp")).default;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

function buildCardSVG(card: MemberCardData): string {
  return \`<svg xmlns="http://www.w3.org/2000/svg"
    width="400" height="250" viewBox="0 0 400 250">
    <rect width="400" height="250" rx="12" fill="#0a1628"/>
    <text x="20" y="40" fill="#fff"
      font-size="16" font-weight="bold">
      \${card.fullName}
    </text>
    <text x="20" y="65" fill="#94a3b8" font-size="12">
      \${card.memberId} — \${card.department}
    </text>
    <text x="20" y="90" fill="#94a3b8" font-size="12">
      Level: \${card.level} | Session: \${card.session}
    </text>
  </svg>\`;
}`,
      },
    ],
  },
  n9ja: {
    files: [
      {
        fileName: "app/Services/PricingEngine.php",
        code: `class PricingEngine
{
    private const WHOLESALE_TIERS = [
        ['min' => 50, 'discount' => 0.15],
        ['min' => 25, 'discount' => 0.12],
        ['min' => 10, 'discount' => 0.08],
        ['min' => 5,  'discount' => 0.05],
    ];

    public function calculate(
        Product $product,
        int $quantity,
        ?User $user = null,
        ?string $couponCode = null
    ): PriceBreakdown {
        $basePrice = $product->base_price;
        $isWholesale = $user?->hasRole('wholesale');

        // Wholesale tier discount — stacks with quantity
        $tierDiscount = 0;
        if ($isWholesale) {
            foreach (self::WHOLESALE_TIERS as $tier) {
                if ($quantity >= $tier['min']) {
                    $tierDiscount = $tier['discount'];
                    break;
                }
            }
        }

        $unitPrice = $isWholesale
            ? $product->wholesale_price ?? $basePrice * 0.75
            : $basePrice;

        $discountedUnit = $unitPrice * (1 - $tierDiscount);
        $subtotal = $discountedUnit * $quantity;

        // Apply coupon if valid
        $couponDiscount = 0;
        if ($couponCode) {
            $coupon = Coupon::where('code', $couponCode)
                ->where('expires_at', '>', now())
                ->where('uses_remaining', '>', 0)
                ->first();

            if ($coupon) {
                $couponDiscount = $coupon->type === 'percentage'
                    ? $subtotal * ($coupon->value / 100)
                    : min($coupon->value, $subtotal);

                if ($coupon->max_discount) {
                    $couponDiscount = min(
                        $couponDiscount,
                        $coupon->max_discount
                    );
                }
            }
        }

        $deliveryFee = $this->calculateDelivery(
            $subtotal - $couponDiscount,
            $user?->defaultAddress,
            $quantity
        );

        $total = $subtotal - $couponDiscount + $deliveryFee;

        return new PriceBreakdown(
            basePrice: $basePrice,
            unitPrice: $discountedUnit,
            quantity: $quantity,
            tierDiscount: $tierDiscount,
            subtotal: $subtotal,
            couponDiscount: $couponDiscount,
            deliveryFee: $deliveryFee,
            total: $total,
            currency: 'NGN',
            isWholesale: $isWholesale,
        );
    }

    private function calculateDelivery(
        float $orderTotal,
        ?Address $address,
        int $quantity
    ): float {
        // Free delivery above threshold
        if ($orderTotal >= config('shop.free_delivery_threshold')) {
            return 0;
        }

        $zone = DeliveryZone::resolve($address);
        $baseFee = $zone->base_fee;

        // White-glove surcharge for luxury items
        $whiteGlove = $quantity > 3
            ? $baseFee * 0.25
            : 0;

        // Weight-based adjustment
        $weightSurcharge = max(
            0,
            ($quantity - 2) * $zone->per_item_rate
        );

        return $baseFee + $whiteGlove + $weightSurcharge;
    }

    public function bulkQuote(
        Collection $items,
        User $user
    ): QuoteResult {
        $lines = $items->map(fn ($item) =>
            $this->calculate(
                $item->product,
                $item->quantity,
                $user
            )
        );

        $totalSavings = $lines->sum(fn ($line) =>
            ($line->basePrice * $line->quantity) - $line->subtotal
        );

        return new QuoteResult(
            lines: $lines,
            grandTotal: $lines->sum('total'),
            totalSavings: $totalSavings,
            validUntil: now()->addHours(48),
        );
    }
}`,
      },
      {
        fileName: "app/Services/CustomOrderPipeline.php",
        code: `class CustomOrderPipeline
{
    private const STAGES = [
        'quote_requested',
        'deposit_paid',
        'materials_sourced',
        'in_production',
        'quality_check',
        'out_for_delivery',
        'final_payment',
        'completed',
    ];

    private const TRANSITIONS = [
        'quote_requested'   => ['deposit_paid'],
        'deposit_paid'      => ['materials_sourced'],
        'materials_sourced'  => ['in_production'],
        'in_production'     => ['quality_check'],
        'quality_check'     => ['in_production', 'out_for_delivery'],
        'out_for_delivery'  => ['final_payment'],
        'final_payment'     => ['completed'],
    ];

    public function advance(
        CustomOrder $order,
        string $toStage,
        ?array $metadata = null
    ): CustomOrder {
        $this->guardTransition($order, $toStage);

        return DB::transaction(function () use ($order, $toStage, $metadata) {
            $fromStage = $order->stage;

            $order->update([
                'stage'      => $toStage,
                'stage_at'   => now(),
                'metadata'   => array_merge(
                    $order->metadata ?? [],
                    $metadata ?? []
                ),
            ]);

            StageLog::create([
                'order_id'   => $order->id,
                'from_stage' => $fromStage,
                'to_stage'   => $toStage,
                'actor_id'   => auth()->id(),
                'notes'      => $metadata['notes'] ?? null,
                'created_at' => now(),
            ]);

            $this->dispatchStageEvents($order, $fromStage, $toStage);

            return $order->fresh();
        });
    }

    private function guardTransition(
        CustomOrder $order,
        string $toStage
    ): void {
        $allowed = self::TRANSITIONS[$order->stage] ?? [];

        if (!in_array($toStage, $allowed, true)) {
            throw new InvalidTransitionException(
                "Cannot move from {$order->stage} to {$toStage}"
            );
        }

        if ($toStage === 'deposit_paid') {
            $minDeposit = $order->quoted_total * 0.60;
            if ($order->amount_paid < $minDeposit) {
                throw new InsufficientDepositException(
                    "Minimum 60% deposit required"
                );
            }
        }

        if ($toStage === 'out_for_delivery') {
            $passed = $order->qc_results?->every(
                fn ($check) => $check['status'] === 'passed'
            );
            if (!$passed) {
                throw new QualityCheckFailedException(
                    "All QC checks must pass before delivery"
                );
            }
        }
    }

    private function dispatchStageEvents(
        CustomOrder $order,
        string $from,
        string $to
    ): void {
        event(new OrderStageChanged($order, $from, $to));

        match ($to) {
            'deposit_paid' => dispatch(
                new SourceMaterials($order)
            )->onQueue('production'),

            'in_production' => dispatch(
                new NotifyProductionTeam($order)
            )->onQueue('internal'),

            'quality_check' => dispatch(
                new ScheduleQCInspection($order)
            )->onQueue('inspections'),

            'out_for_delivery' => dispatch(
                new AssignDeliveryDriver($order)
            )->onQueue('logistics'),

            'completed' => dispatch(
                new SendCompletionInvoice($order)
            )->onQueue('billing'),

            default => null,
        };

        $order->customer->notify(
            new OrderProgressUpdate($order, $to)
        );
    }

    public function stageHistory(CustomOrder $order): Collection
    {
        return StageLog::where('order_id', $order->id)
            ->orderBy('created_at')
            ->get()
            ->map(fn ($log) => [
                'from'  => $log->from_stage,
                'to'    => $log->to_stage,
                'actor' => $log->actor->name,
                'notes' => $log->notes,
                'at'    => $log->created_at->diffForHumans(),
            ]);
    }
}`,
      },
    ],
  },
  zyonel: {
    files: [
      {
        fileName: "app/Services/ProgressTracker.php",
        code: `class ProgressTracker
{
    public function recordCompletion(
        User $student,
        Lesson $lesson
    ): ProgressResult {
        return DB::transaction(function () use ($student, $lesson) {
            $progress = LessonProgress::updateOrCreate(
                [
                    'user_id'   => $student->id,
                    'lesson_id' => $lesson->id,
                ],
                [
                    'completed_at' => now(),
                    'time_spent'   => request('timeSpent', 0),
                ]
            );

            $module = $lesson->module;
            $course = $module->course;

            // Calculate module completion
            $moduleLessons = $module->lessons()->count();
            $completedInModule = LessonProgress::where('user_id', $student->id)
                ->whereIn('lesson_id', $module->lessons()->pluck('id'))
                ->whereNotNull('completed_at')
                ->count();

            $moduleComplete = $completedInModule >= $moduleLessons;

            if ($moduleComplete) {
                ModuleProgress::updateOrCreate(
                    [
                        'user_id'   => $student->id,
                        'module_id' => $module->id,
                    ],
                    ['completed_at' => now()]
                );
            }

            // Check full course completion
            $totalModules = $course->modules()->count();
            $completedModules = ModuleProgress::where('user_id', $student->id)
                ->whereIn('module_id', $course->modules()->pluck('id'))
                ->whereNotNull('completed_at')
                ->count();

            $courseComplete = $completedModules >= $totalModules;
            $coursePercent = round(($completedModules / $totalModules) * 100);

            $enrollment = Enrollment::where('user_id', $student->id)
                ->where('course_id', $course->id)
                ->first();

            $enrollment->update([
                'progress_percent' => $coursePercent,
                'last_activity_at' => now(),
            ]);

            // Generate certificate on completion
            $certificate = null;
            if ($courseComplete && !$enrollment->certificate_id) {
                $certificate = Certificate::create([
                    'user_id'       => $student->id,
                    'course_id'     => $course->id,
                    'credential_id' => $this->generateCredentialId($course),
                    'issued_at'     => now(),
                    'pdf_path'      => null,
                ]);

                $enrollment->update([
                    'completed_at'   => now(),
                    'certificate_id' => $certificate->id,
                ]);

                dispatch(new GenerateCertificatePDF($certificate))
                    ->onQueue('certificates');

                dispatch(new SendCompletionEmail(
                    $student,
                    $course,
                    $certificate
                ))->onQueue('notifications');

                event(new CourseCompleted($student, $course));
            }

            return new ProgressResult(
                lessonComplete: true,
                moduleComplete: $moduleComplete,
                courseComplete: $courseComplete,
                coursePercent: $coursePercent,
                certificate: $certificate,
                nextLesson: $this->resolveNextLesson(
                    $student, $lesson
                ),
            );
        });
    }

    private function generateCredentialId(Course $course): string
    {
        $prefix = strtoupper(substr($course->slug, 0, 3));
        $year = now()->format('Y');
        $sequence = Certificate::where('course_id', $course->id)
            ->whereYear('issued_at', $year)
            ->count() + 1;

        return sprintf('%s-%s-%04d', $prefix, $year, $sequence);
    }

    private function resolveNextLesson(
        User $student,
        Lesson $current
    ): ?Lesson {
        // Try next in same module
        $next = Lesson::where('module_id', $current->module_id)
            ->where('sort_order', '>', $current->sort_order)
            ->orderBy('sort_order')
            ->first();

        if ($next) return $next;

        // Jump to next module's first lesson
        $nextModule = Module::where('course_id', $current->module->course_id)
            ->where('sort_order', '>', $current->module->sort_order)
            ->orderBy('sort_order')
            ->first();

        return $nextModule?->lessons()
            ->orderBy('sort_order')
            ->first();
    }
}`,
      },
      {
        fileName: "app/Services/CertificateGenerator.php",
        code: `class CertificateGenerator
{
    private const TEMPLATE_PATH = 'certificates/template.blade.php';
    private const WATERMARK_OPACITY = 0.08;

    public function generate(Certificate $certificate): string
    {
        $data = $this->assembleData($certificate);
        $html = view(self::TEMPLATE_PATH, $data)->render();

        $pdf = app(Dompdf::class);
        $pdf->loadHtml($html);
        $pdf->setPaper('A4', 'landscape');
        $pdf->render();

        $path = $this->storePDF($pdf, $certificate);

        $certificate->update([
            'pdf_path'     => $path,
            'generated_at' => now(),
        ]);

        return $path;
    }

    private function assembleData(Certificate $certificate): array
    {
        $course = $certificate->course;
        $student = $certificate->user;
        $instructor = $course->instructor;

        $qrPayload = route('certificates.verify', [
            'credential' => $certificate->credential_id,
        ]);

        return [
            'studentName'    => $student->name,
            'courseName'     => $course->title,
            'credentialId'   => $certificate->credential_id,
            'issuedAt'       => $certificate->issued_at->format('F j, Y'),
            'totalHours'     => $course->estimated_hours,
            'instructorName' => $instructor->name,
            'instructorSig'  => $this->getSignaturePath($instructor),
            'qrCode'         => $this->generateQRCode($qrPayload),
            'watermark'      => $this->buildWatermark($certificate),
        ];
    }

    private function generateQRCode(string $payload): string
    {
        $qr = QrCode::format('svg')
            ->size(120)
            ->margin(0)
            ->errorCorrection('H')
            ->generate($payload);

        return 'data:image/svg+xml;base64,' . base64_encode($qr);
    }

    private function buildWatermark(Certificate $certificate): string
    {
        $text = $certificate->credential_id;
        $repeated = implode('  ', array_fill(0, 50, $text));

        return sprintf(
            '<div style="opacity: %.2f; transform: rotate(-30deg);'
            . ' font-size: 10px; color: #666;">%s</div>',
            self::WATERMARK_OPACITY,
            $repeated
        );
    }

    private function getSignaturePath(User $instructor): ?string
    {
        $path = "signatures/{$instructor->id}.png";

        if (Storage::disk('private')->exists($path)) {
            return Storage::disk('private')->temporaryUrl(
                $path,
                now()->addMinutes(5)
            );
        }

        return null;
    }

    private function storePDF(
        Dompdf $pdf,
        Certificate $certificate
    ): string {
        $filename = sprintf(
            'certificates/%s/%s.pdf',
            $certificate->course_id,
            $certificate->credential_id
        );

        Storage::disk('s3')->put(
            $filename,
            $pdf->output(),
            ['visibility' => 'private']
        );

        return $filename;
    }

    public function verify(string $credentialId): ?array
    {
        $cert = Certificate::where('credential_id', $credentialId)
            ->with(['user:id,name', 'course:id,title'])
            ->first();

        if (!$cert) return null;

        return [
            'valid'      => true,
            'student'    => $cert->user->name,
            'course'     => $cert->course->title,
            'credential' => $cert->credential_id,
            'issued'     => $cert->issued_at->toISOString(),
            'pdf'        => $cert->pdf_path
                ? Storage::disk('s3')->temporaryUrl($cert->pdf_path, now()->addHour())
                : null,
        ];
    }
}`,
      },
    ],
  },
};

/* ── Syntax token types ── */
type TokenType = "keyword" | "string" | "comment" | "function" | "type" | "number" | "punctuation" | "variable" | "operator" | "default";

interface Token {
  type: TokenType;
  value: string;
}

/* ── Regex-based tokenizer (PHP + TS aware) ── */
function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  const keywords = /^(export|async|function|const|let|var|return|if|else|await|new|throw|import|from|type|interface|default|class|public|private|protected|static|try|catch|foreach|use|fn|as|match)$/;
  const types = /^(Request|Response|Error|Date|Record|string|number|boolean|Props|int|float|bool|array|void|null|self|Collection|Promise|Buffer)$/;
  const regex = /(\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\$[a-zA-Z_]\w*|\b[a-zA-Z_]\w*\b|=>|->|\?\->|::|>=|<=|===|!==|\d+\.?\d*|[ \t]+|[^\s\w])/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(line)) !== null) {
    const value = match[0];

    if (value.startsWith("//")) {
      tokens.push({ type: "comment", value });
    } else if (value.startsWith('"') || value.startsWith("'") || value.startsWith("`")) {
      tokens.push({ type: "string", value });
    } else if (value.startsWith("$")) {
      tokens.push({ type: "variable", value });
    } else if (keywords.test(value)) {
      tokens.push({ type: "keyword", value });
    } else if (types.test(value)) {
      tokens.push({ type: "type", value });
    } else if (/^\d+\.?\d*$/.test(value)) {
      tokens.push({ type: "number", value });
    } else if (/^(=>|->|\?\->|::|>=|<=|===|!==)$/.test(value)) {
      tokens.push({ type: "operator", value });
    } else if (/^[a-zA-Z_]\w*$/.test(value)) {
      const rest = line.slice(match.index + value.length);
      if (/^\s*\(/.test(rest) || /^::/.test(rest)) {
        tokens.push({ type: "function", value });
      } else {
        tokens.push({ type: "default", value });
      }
    } else if (/^[ \t]+$/.test(value)) {
      tokens.push({ type: "default", value });
    } else {
      tokens.push({ type: "punctuation", value });
    }
  }

  return tokens;
}

function getTokenColor(type: TokenType, accent: string): string {
  switch (type) {
    case "keyword":
      return accent;
    case "string":
      return accent + "99";
    case "comment":
      return "rgba(255,255,255,0.25)";
    case "function":
      return "#fff";
    case "type":
      return accent + "cc";
    case "number":
      return accent + "cc";
    case "variable":
      return "rgba(255,255,255,0.8)";
    case "operator":
      return accent + "bb";
    case "punctuation":
      return "rgba(255,255,255,0.35)";
    default:
      return "rgba(255,255,255,0.55)";
  }
}

/* ── Render a single code pane (line numbers + highlighted code) ── */
function CodePane({
  code,
  charIndex,
  totalLines,
  accentColor,
  showCursor,
}: {
  code: string;
  charIndex: number;
  totalLines: number;
  accentColor: string;
  showCursor: boolean;
}) {
  const displayed = code.slice(0, charIndex);
  const lines = displayed.split("\n");

  return (
    <div
      style={{
        padding: "14px 12px 14px 0",
        overflowX: "auto",
        overflowY: "hidden",
        minHeight: `${Math.min(totalLines, 28) * 1.5 + 2}em`,
        maxHeight: "65vh",
        whiteSpace: "pre",
        flex: 1,
        minWidth: 0,
      }}
    >
      {lines.map((line, lineIdx) => {
        const tokens = tokenizeLine(line);
        return (
          <div key={lineIdx} style={{ display: "flex", minHeight: "1.5em" }}>
            <span
              style={{
                display: "inline-block",
                width: 44,
                minWidth: 44,
                textAlign: "right",
                paddingRight: 16,
                color: "rgba(255,255,255,0.1)",
                userSelect: "none",
                fontSize: "inherit",
              }}
            >
              {lineIdx + 1}
            </span>
            <span style={{ flex: 1 }}>
              {tokens.map((token, tIdx) => (
                <span key={tIdx} style={{ color: getTokenColor(token.type, accentColor) }}>
                  {token.value}
                </span>
              ))}
              {showCursor && lineIdx === lines.length - 1 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: "1.1em",
                    background: accentColor,
                    marginLeft: 1,
                    verticalAlign: "text-bottom",
                    animation: "codeplayer-blink 1s step-end infinite",
                  }}
                />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main component ── */
interface CodePlayerProps {
  projectId: string;
  accentColor: string;
}

export function CodePlayer({ projectId, accentColor }: CodePlayerProps) {
  const project = CODE_SNIPPETS[projectId] ?? CODE_SNIPPETS.compassio;
  const file1 = project.files[0];
  const file2 = project.files[1];

  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [charIndex1, setCharIndex1] = useState(0);
  const [charIndex2, setCharIndex2] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseRef = useRef<1 | 2 | 3>(1);
  const visibleRef = useRef(false);

  const fullCode1 = file1.code;
  const fullCode2 = file2.code;
  const totalLines1 = fullCode1.split("\n").length;
  const totalLines2 = fullCode2.split("\n").length;

  const stopTyping = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTypingFile2 = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCharIndex2((prev) => {
        if (prev >= fullCode2.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          phaseRef.current = 3;
          setPhase(3);
          return prev;
        }
        const next = fullCode2[prev];
        if (next === " " || next === "\n") return prev + 2;
        return prev + 1;
      });
    }, 22);
  }, [fullCode2]);

  const startTypingFile1 = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCharIndex1((prev) => {
        if (prev >= fullCode1.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          // Pause then start file 2
          setTimeout(() => {
            if (visibleRef.current) {
              phaseRef.current = 2;
              setPhase(2);
              startTypingFile2();
            }
          }, 600);
          return prev;
        }
        const next = fullCode1[prev];
        if (next === " " || next === "\n") return prev + 2;
        return prev + 1;
      });
    }, 22);
  }, [fullCode1, startTypingFile2]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && phaseRef.current !== 3) {
          if (phaseRef.current === 1) {
            startTypingFile1();
          } else if (phaseRef.current === 2) {
            startTypingFile2();
          }
        } else {
          stopTyping();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      stopTyping();
    };
  }, [startTypingFile1, startTypingFile2, stopTyping]);

  const isSplit = phase >= 2;

  return (
    <>
      <style>{`
        @keyframes codeplayer-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes codeplayer-split-in {
          from { grid-template-columns: 1fr 0fr; }
          to { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .codeplayer-panes {
            grid-template-columns: 1fr !important;
            animation: none !important;
          }
          .codeplayer-divider {
            display: none !important;
          }
          .codeplayer-pane2 {
            border-top: 1px solid rgba(255,255,255,0.06);
          }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
          background: "#0c0c0c",
          border: "1px solid rgba(255,255,255,0.08)",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
          fontSize: "clamp(9px, 1vw, 12.5px)",
          lineHeight: 1.5,
        }}
      >
        {/* Title bar with traffic lights */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            background: "#151515",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          </div>

          {/* Tab bar */}
          <div style={{ display: "flex", marginLeft: 12, gap: 0 }}>
            {/* File 1 tab — always visible */}
            <div
              style={{
                padding: "3px 12px",
                borderRadius: "6px 6px 0 0",
                background: isSplit
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(255,255,255,0.06)",
                fontSize: 11,
                color: isSplit
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(255,255,255,0.45)",
                borderBottom: isSplit
                  ? "2px solid transparent"
                  : `2px solid ${accentColor}`,
                transition: "all 0.3s ease",
              }}
            >
              {file1.fileName.split("/").pop()}
            </div>

            {/* File 2 tab — appears in phase 2+ */}
            {isSplit && (
              <div
                style={{
                  padding: "3px 12px",
                  borderRadius: "6px 6px 0 0",
                  background: "rgba(255,255,255,0.06)",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                  borderBottom: `2px solid ${accentColor}`,
                  marginLeft: 2,
                }}
              >
                {file2.fileName.split("/").pop()}
              </div>
            )}
          </div>
        </div>

        {/* Code area — grid layout for split */}
        <div
          className="codeplayer-panes"
          style={{
            display: "grid",
            gridTemplateColumns: isSplit ? "1fr 1fr" : "1fr",
            animation: isSplit ? "codeplayer-split-in 0.4s ease forwards" : undefined,
            overflow: "hidden",
            position: "relative" as const,
          }}
        >
          {/* Pane 1 */}
          <div style={{ overflow: "hidden", minWidth: 0 }}>
            <div
              style={{
                padding: "4px 10px",
                fontSize: 10,
                color: "rgba(255,255,255,0.2)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {file1.fileName}
            </div>
            <CodePane
              code={fullCode1}
              charIndex={charIndex1}
              totalLines={totalLines1}
              accentColor={accentColor}
              showCursor={phase === 1}
            />
          </div>

          {/* Divider + Pane 2 */}
          {isSplit && (
            <>
              <div
                className="codeplayer-divider"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  bottom: 0,
                  width: 1,
                  background: "rgba(255,255,255,0.06)",
                  pointerEvents: "none",
                }}
              />
              <div className="codeplayer-pane2" style={{ overflow: "hidden", minWidth: 0 }}>
                <div
                  style={{
                    padding: "4px 10px",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.2)",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {file2.fileName}
                </div>
                <CodePane
                  code={fullCode2}
                  charIndex={charIndex2}
                  totalLines={totalLines2}
                  accentColor={accentColor}
                  showCursor={phase >= 2}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
