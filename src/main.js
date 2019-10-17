import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from '@/App.vue'
import router from '@/route'
import * as filters from './filters'
import utils from '@/providers/utils'
import http from '@/providers/http_axios'
import helper from '@/providers/helper'
import globalData from '@/providers/globalData'

import AkmSelect from '@/views/components/akm-select'
import AkmEditor from '@/views/components/akm-editor'

Vue.prototype.$utils = utils
Vue.prototype.$http = http
Vue.prototype.$helper = helper
Vue.prototype.$globalData = globalData

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI)
Vue.use(AkmSelect)
Vue.use(AkmEditor)

const vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export default vue
