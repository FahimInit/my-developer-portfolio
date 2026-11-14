import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_UPWORK_PROFILE_URL: z
    .string()
    .url()
    .default('https://www.upwork.com'),
  NEXT_PUBLIC_GITHUB_URL: z
    .string()
    .url()
    .default('https://github.com/FahimInit/my-developer-portfolio'),
  NEXT_PUBLIC_AVAILABILITY_STATUS: z
    .string()
    .min(1)
    .default('Available for Upwork Contracts'),
  RATE_LIMIT_RPM: z.coerce.number().int().min(5).max(120).default(15),
});

// Parse once at module load so invalid deployments fail fast instead of silently drifting.
const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  NEXT_PUBLIC_UPWORK_PROFILE_URL:
    process.env.NEXT_PUBLIC_UPWORK_PROFILE_URL || undefined,
  NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL || undefined,
  NEXT_PUBLIC_AVAILABILITY_STATUS:
    process.env.NEXT_PUBLIC_AVAILABILITY_STATUS || undefined,
  RATE_LIMIT_RPM: process.env.RATE_LIMIT_RPM || undefined,
});

if (!parsed.success) {
  console.error(
    'Invalid environment configuration:',
    parsed.error.flatten().fieldErrors
  );
  throw new Error('Environment validation failed. Check server environment variables.');
}

export const env = parsed.data;
