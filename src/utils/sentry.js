import * as Sentry from "@sentry/browser";

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.VERSION,
    environment: process.env.NODE_ENV
  });
};
