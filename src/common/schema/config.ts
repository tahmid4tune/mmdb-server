import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  MYSQL_DATABASE: Joi.string().default('test'),
  MYSQL_USER: Joi.string().default('docker'),
  MYSQL_PASSWORD: Joi.string().default('docker'),
  TZ: Joi.string().default('Asia/Dhaka'),
  MYSQL_HOST: Joi.string().default('127.0.0.1'),
  MYSQL_PORT: Joi.number().default(3307),
  STAGE: Joi.string().default('development'),
  JWT_SECRET: Joi.string().required(),
  REFRESH_JWT_SECRET: Joi.string().required(),
  TOKEN_EXPIRATION_PERIOD: Joi.number().required(),
  REFRESH_TOKEN_EXPIRATION_PERIOD: Joi.number().required(),
});
