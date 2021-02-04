import Vue from 'vue/dist/vue'
import HcBoilWaterNotices from './App.vue'

Vue.config.productionTip = false

Vue.use(HcBoilWaterNotices)

new Vue({
  // render: (h) => h(App),
}).$mount('#app')
