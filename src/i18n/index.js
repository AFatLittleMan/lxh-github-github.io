import Vue from 'vue';
import VueI18n from 'vue-i18n';
import En from './messages/en';
import Zh from './messages/zh'

Vue.use(VueI18n);

// 定义语言包
const messages = {
  en:En,
  zh:Zh
};
const storedLanguage = localStorage.getItem('language') || 'zh'; // 默认为 'en'
// 创建 VueI18n 实例
const i18n = new VueI18n({
  locale: storedLanguage, // 设置默认语言
  fallbackLocale: 'zh', // 设置回退语言
  messages, // 设置语言包
});

export default i18n;