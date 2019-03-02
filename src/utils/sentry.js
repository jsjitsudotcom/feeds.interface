import * as Sentry from "@sentry/browser";

export default () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.VERSION
  });
};
