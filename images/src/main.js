// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import iView from 'iview'
import Vuex from 'vuex'
import store from './store/store'
import 'iview/dist/styles/iview.css'


// 引用axios，并设置基础url为后端服务api地址
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8080/api'
// 将API方法绑定到全局
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(iView);
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})