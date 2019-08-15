import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss' // global css
import App from '@/App.vue'
import router from '@/route';
import utils from '@/providers/utils'
import http from '@/providers/http'
import helper from '@/providers/helper'
import globalData from '@/providers/globalData'

Vue.prototype.$utils = utils
Vue.prototype.$http = http
Vue.prototype.$helper = helper
Vue.prototype.$globalData = globalData

Vue.config.productionTip = false
Vue.use(ElementUI);

const vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export default vue
