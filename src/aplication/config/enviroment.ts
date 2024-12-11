export const enviroment = {
  DATABASE_URL: process.env.DATABASE_URL,

  PORT: process.env.PORT ?? 3000,

  JWT_SECRET: process.env.JWT_SECRET,

  NODE_ENV: process.env.NODE_ENV,
};
