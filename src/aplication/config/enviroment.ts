export const enviroment = {
  DATABASE_URL: process.env.DATABASE_URL,

  PORT: process.env.PORT ?? 3000,

  JWT_SECRET: process.env.JWT_SECRET,

  NODE_ENV: process.env.NODE_ENV,

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
};
