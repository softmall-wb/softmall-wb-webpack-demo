import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'

import { softmall_test_core_init } from 'softmall-wb/index';
window.Core = softmall_test_core_init();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
