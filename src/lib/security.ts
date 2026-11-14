import { env } from '@/lib/env';

interface RateLimitBucket {
  timestamps: number[];
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
  limit: number;
}

// In-memory sliding window store. Works cleanly on a single Node instance or edge worker;
// swap for Upstash/Redis if scaling horizontally across multiple stateless regions.
const bucketStore = new Map<string, RateLimitBucket>();

let lastPruneAt = Date.now();
const PRUNE_INTERVAL_MS = 60_000;

function pruneExpiredBuckets(now: number, windowMs: number): void {
  if (now - lastPruneAt < PRUNE_INTERVAL_MS) return;
  lastPruneAt = now;

  for (const [key, bucket] of bucketStore.entries()) {
    const active = bucket.timestamps.filter((ts) => now - ts < windowMs);
    if (active.length === 0) {
      bucketStore.delete(key);
    } else {
      bucket.timestamps = active;
    }
  }
}

export function checkRateLimit(
  identifier: string,
  limit = env.RATE_LIMIT_RPM,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  pruneExpiredBuckets(now, windowMs);

  const existing = bucketStore.get(identifier);
  const recentTimestamps = existing
    ? existing.timestamps.filter((ts) => now - ts < windowMs)
    : [];

  if (recentTimestamps.length >= limit) {
    const oldest = recentTimestamps[0] ?? now;
    const resetInMs = Math.max(1000, windowMs - (now - oldest));
    bucketStore.set(identifier, { timestamps: recentTimestamps });

    return {
      allowed: false,
      remaining: 0,
      resetInMs,
      limit,
    };
  }

  recentTimestamps.push(now);
  bucketStore.set(identifier, { timestamps: recentTimestamps });

  const oldest = recentTimestamps[0] ?? now;
  const resetInMs = Math.max(1000, windowMs - (now - oldest));

  return {
    allowed: true,
    remaining: Math.max(0, limit - recentTimestamps.length),
    resetInMs,
    limit,
  };
}

/**
 * Strips HTML brackets, ASCII control characters, and excessive whitespace
 * before echoing user-supplied project briefs back in JSON or Markdown.
 */
export function sanitizeText(input: string, maxLength = 600): string {
  const cleaned = input
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return cleaned.slice(0, maxLength).trim();
}

/**
 * Basic same-origin verification for state-changing POST endpoints.
 * Allows requests with no Origin header only in non-browser/CLI testing if host matches,
 * while rejecting mismatched browser Origins to mitigate CSRF.
 */
export function verifySameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host =
    request.headers.get('x-forwarded-host') ?? request.headers.get('host');

  if (!host) {
    return false;
  }

  const normalizedHost = host.toLowerCase();

  if (origin) {
    try {
      const originUrl = new URL(origin);
      return originUrl.host.toLowerCase() === normalizedHost;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return refererUrl.host.toLowerCase() === normalizedHost;
    } catch {
      return false;
    }
  }

  // Same-origin server/curl invocations without browser Origin/Referer headers are permitted
  // when host header is explicitly present.
  return true;
}

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  return 'local-client';
}
