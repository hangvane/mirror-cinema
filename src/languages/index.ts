import en_US from './en_US';
import zh_CN from './zh_CN';
import { readonly } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';

export enum LocaleEnum {
  ZH_CN = 'zh_CN',
  EN_US = 'en_US',
}

export const LocaleMapping = readonly({
  [LocaleEnum.ZH_CN]: zhCN,
  [LocaleEnum.EN_US]: enUS,
});

export const LocaleTextMapping = readonly({
  [LocaleEnum.ZH_CN]: '中文',
  [LocaleEnum.EN_US]: 'English',
});

export default {
  en_US,
  zh_CN,
};
