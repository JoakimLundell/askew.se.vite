import { createApp } from 'vue'
import App from './App.vue'

//import router
import router from './router/router.js'
// import the store
import store from './store/index.js'



router.beforeEach(() => {
    //store.commit('TOGGLE');
})


createApp(App).use(router).use(store).mount('#app')
