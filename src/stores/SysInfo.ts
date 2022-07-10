import { defineStore } from 'pinia';
import { Ref } from 'vue';
import {
  IMOptions,
  LogLevelEnum,
  Msg,
  UrlTypeEnum,
  VideoItem,
} from '/@/api/types';
import { env } from '/@/stores/Env';
import { Logger } from '/@/utils/Logger';
import { IM } from '/@/utils/IM';
import i18n from '/@/languages/i18n';
import { LocaleEnum } from '/@/languages';
import { syncRef, toReactive, useStorage } from '@vueuse/core';

export const sysInfoStore = defineStore('sysInfo', {
  state: () => {
    const imOptions = toReactive(
      useStorage<IMOptions>('imOptions', {
        appId: env.APP_ID,
        appKey: env.APP_KEY,
        conversationId: env.CONVERSATION_ID,
        server: env.SERVER,
        userId: env.USER_ID,
      })
    );

    const im = new IM<Msg>(imOptions);

    const videoList = useStorage<VideoItem[]>('videoList', [], undefined, {
      serializer: {
        read: (str: string) => JSON.parse(str),
        // 仅保存网络链接的视频
        // 本地视频在下次打开网页后会失效
        write: (list: VideoItem[]) =>
          JSON.stringify(list.filter((e) => e.urlType === UrlTypeEnum.NETWORK)),
      },
    });

    const logLevel = useStorage<LogLevelEnum>(
      'logLevel',
      env.LOG_LEVEL_CONSOLE
    );
    Logger.logLevel = logLevel;

    const locale = useStorage<LocaleEnum>('locale', env.LOCALE);
    syncRef(locale, i18n.global.locale as Ref<LocaleEnum>);

    return {
      videoList,
      logLevel,
      im,
      locale,
    };
  },
});
