import * as Sentry from "@sentry/node";

let initialized = false;

function ensureInit(): void {
  if (initialized) return;
  initialized = true;
  const dsn = process.env.SENTRY_DSN;
  if (dsn) Sentry.init({ dsn, tracesSampleRate: 0 });
}

/**
 * Logs to console (as before, for Vercel's own function logs) and reports to
 * Sentry. Serverless functions can be frozen/terminated right after the
 * response is sent, so this awaits Sentry.flush() to make sure the event
 * actually leaves before the handler returns — call it, don't fire-and-forget.
 */
export async function logError(message: string, err: unknown): Promise<void> {
  ensureInit();
  console.error(message, err);
  Sentry.captureException(err, { extra: { message } });
  await Sentry.flush(2000);
}
