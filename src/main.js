import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'  // 引入 Element UI 的 CSS

Vue.use(ElementUI)  // 使用 Element UI

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')