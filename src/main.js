import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入字体图标css
import './assets/fonts/iconfont.css'
// 引入flexible
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false
// $store = store
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
