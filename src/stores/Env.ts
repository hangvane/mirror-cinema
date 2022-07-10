import { GlobEnvConfig } from '/@/api/types';
import { readonly } from 'vue';

const metaEnv = import.meta.env;
export const env: Readonly<GlobEnvConfig> = readonly({
  APP_INFO: __APP_INFO__,
  APP_ID: metaEnv.VITE_APP_ID,
  APP_KEY: metaEnv.VITE_APP_KEY,
  SERVER: metaEnv.VITE_SERVER,
  CONVERSATION_ID: metaEnv.VITE_CONVERSATION_ID,
  USER_ID: metaEnv.VITE_USER_ID,
  SYNC_THRESHOLD: metaEnv.VITE_SYNC_THRESHOLD,
  LOG_LEVEL_CONSOLE: metaEnv.VITE_LOG_LEVEL_CONSOLE,
  LOCALE: metaEnv.VITE_LOCALE,
});
