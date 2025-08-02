import { Environment, NodeEnv } from '@config/enums';

export const nodeEnvValues = [NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION] as const;

export const environmentValues = [
  Environment.LOCAL,
  Environment.QA,
  Environment.STG,
  Environment.PRD,
] as const;

export const APP_NAME_DEFAULT = 'ms-nest-screaming-architecture';
export const HTTP_PORT_DEFAULT = 3000;
