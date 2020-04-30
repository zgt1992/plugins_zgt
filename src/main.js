import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import plugins from './plugins/index.js'
import {LayoutCom_zgt} from './plugins/index.js'

// console.log("main:", plugins)
console.log("main:", LayoutCom_zgt)

Vue.use(LayoutCom_zgt)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
