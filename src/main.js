// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import cotUtils from './lib/cotUtils'
import VueClipboards from 'vue-clipboards'


Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(VueClipboards);
Vue.use(cotUtils);
Vue.prototype.cotUtil = cotUtils;

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
