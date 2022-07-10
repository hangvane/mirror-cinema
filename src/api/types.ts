import { LogEvent } from 'vue-logger-plugin';
import { readonly } from 'vue';
import { LocaleEnum } from '/@/languages';

export enum UrlTypeEnum {
  NETWORK = 1,
  LOCAL = 2,
}

export enum VideoStatusEnum {
  PLAYING = 'playing',
  PAUSED = 'paused',
}

export enum LogLevelEnum {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  LOG = 'log',
}

export interface VideoParam {
  status: VideoStatusEnum;
  currentTime: number;
  playbackRate: number;
}

export interface Msg {
  videoParam: VideoParam;
  userId: string;
}

export interface IMOptions {
  appId: string;
  appKey: string;
  server: string;
  userId: string;
  conversationId: string;
}

export interface VideoItem {
  url: URL;
  title: string;
  urlType: UrlTypeEnum;
}

export type LogItem = {
  event: LogEvent;
  time: Date;
};

export const LogLevelColorMapping = readonly({
  [LogLevelEnum.LOG]: 'success',
  [LogLevelEnum.ERROR]: 'error',
  [LogLevelEnum.WARN]: 'warning',
  [LogLevelEnum.INFO]: 'default',
  [LogLevelEnum.DEBUG]: 'purple',
});

export enum IMStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  RECONNECTING = 'reconnecting',
  SCHEDULED = 'scheduled',
}

export const IMStatusColorMapping = readonly({
  [IMStatus.CONNECTED]: 'success',
  [IMStatus.DISCONNECTED]: 'error',
  [IMStatus.CONNECTING]: 'processing',
  [IMStatus.RECONNECTING]: 'warning',
  [IMStatus.SCHEDULED]: 'default',
});

export interface IMInfo {
  type: string;
}

export enum IMRegisterEnum {
  SUCCESS = 'success',
  APP_ID_DUPLICATE = 'appIdDuplicate',
  APP_ID_NOT_EXIST = 'appIdNotExist',
  OPTIONS_WRONG = 'optionsWrong',
  NO_INSTANCE = 'noInstance',
  DEREGISTER_FAILED = 'deregisterFailed',
  UPDATE_CANCELED = 'updateCanceled',
}

export interface GlobEnvConfig {
  APP_INFO: typeof __APP_INFO__;
  APP_ID: string;
  APP_KEY: string;
  SERVER: string;
  CONVERSATION_ID: string;
  USER_ID: string;
  SYNC_THRESHOLD: number;
  LOG_LEVEL_CONSOLE: LogLevelEnum;
  LOCALE: LocaleEnum;
}
