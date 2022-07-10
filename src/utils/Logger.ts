import {
  createLogger,
  LoggerHook,
  StringifyObjectsHook,
} from 'vue-logger-plugin';
import { LogItem, LogLevelEnum } from '/@/api/types';
import { reactive, ref, Ref } from 'vue';
import { env } from '/@/stores/Env';

const { LOG_LEVEL_CONSOLE } = env;

export function logLevelInclude(
  target: LogLevelEnum,
  current: LogLevelEnum
): boolean {
  const logLevelMapping = {
    [LogLevelEnum.LOG]: 0,
    [LogLevelEnum.ERROR]: 1,
    [LogLevelEnum.WARN]: 2,
    [LogLevelEnum.INFO]: 3,
    [LogLevelEnum.DEBUG]: 4,
  };

  return logLevelMapping[current] <= logLevelMapping[target];
}

export const availableLogLevels = Object.values(LogLevelEnum).filter((e) =>
  logLevelInclude(LOG_LEVEL_CONSOLE, e)
);

export abstract class Logger {
  //假logLevel，仅用于过滤logList的前端显示，不影响控制台输出的level
  static logLevel: Ref<LogLevelEnum> = ref(LogLevelEnum.DEBUG);
  static logList: LogItem[] = reactive([]);
  static LogListHook: LoggerHook = {
    async run(event) {
      // 判断被当前logLevel包含的log才记入logList
      if (logLevelInclude(Logger.logLevel.value, event.level as LogLevelEnum)) {
        Logger.logList.unshift({ event, time: new Date() });
      }
    },
  };
  static logger = createLogger({
    consoleEnabled: true,
    callerInfo: true,
    level: LOG_LEVEL_CONSOLE,
    beforeHooks: [StringifyObjectsHook, Logger.LogListHook],
  });
  static getLogger(module: string) {
    return {
      log: (type: string, ...args: unknown[]) =>
        this.logger.log(module, type, ...args),
      error: (type: string, ...args: unknown[]) =>
        this.logger.error(module, type, ...args),
      warn: (type: string, ...args: unknown[]) =>
        this.logger.warn(module, type, ...args),
      info: (type: string, ...args: unknown[]) =>
        this.logger.info(module, type, ...args),
      debug: (type: string, ...args: unknown[]) =>
        this.logger.debug(module, type, ...args),
    };
  }
  static clear() {
    Logger.logList.splice(0, this.logList.length);
  }
}
