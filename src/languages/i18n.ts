import { createI18n } from 'vue-i18n';
import messages from './';

const i18n = createI18n({
  locale: 'zh_CN', // set locale
  fallbackLocale: 'en_US', // set fallback locale
  legacy: false,
  messages: messages as never,
});

export default i18n;
