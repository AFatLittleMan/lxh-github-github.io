import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Router from './router'
import I18n from './i18n'
import Store from './store'
import * as echarts from 'echarts';

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
// 全局挂载 ECharts 到 Vue 原型上
Vue.use(echarts)

Vue.use(ElementUI)

new Vue({
  store:Store,
  i18n:I18n,
  router:Router,   //不能写成es6
  render: h => h(App),
}).$mount('#app')
