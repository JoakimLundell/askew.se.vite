<template>
  <!--img alt="Vue logo" src="./assets/logo.png" /-->
  <!--HelloWorld msg="Hello Vue 3 + Vite" /-->
    <askew-header>
          <askew-logo>ASKEW</askew-logo>    
        
          <div class="icons" style="">
          
            <askew-geo-icon :position="gotGeoPosition" :error="geoError" @open="openGeolocationScreen"></askew-geo-icon>
            <askew-auth :auth="auth" @openLoginScreen="toggleLoginScreen" :loading="authLoading"></askew-auth>
        
          </div>
    </askew-header>

    <askew-menu :open="menuOpen"></askew-menu>
        
    
    <askew-flash v-if="flash.length > 0" :flash="flash" @close="closeFlashMessage"></askew-flash>

    <askew-content>
      <router-view></router-view>
    </askew-content>

    <askew-login 
      v-if="showLoginScreen" 
      @signIn="signIn" 
      @signOut="signOut" 
      :auth="auth" 
      :user="user" 
      @closeLoginScreen="toggleLoginScreen"
      @changeTrainers="changeTrainers"></askew-login>
    
    <askew-geolocation 
      v-if="showGeoScreen" 
      @close="closeGeolocationScreen" 
      @start="startGeolocation"
      @stop="stopGeolocation"
      :error="geoError" 
      :position="geoPosition"
      :watchid="watchid"></askew-geolocation>

</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import AskewHeader from './components/AskewHeader.vue'
import AskewMenu from './components/AskewMenu.vue'
import AskewAuth from './components/AskewAuth.vue'
import AskewFlash from './components/AskewFlash.vue'
import AskewHamburger from './components/AskewHamburger.vue'
import AskewMap from './components/pages/Map.vue'
import AskewChatt from './components/pages/Chatt.vue'
import About from './components/pages/About.vue'
import AskewLogin from './components/overlay/AskewLogin.vue'
import AskewGeolocation from './components/overlay/AskewGeolocation.vue'
import AskewLogo from './components/AskewLogo.vue'
import AskewContent from './components/AskewContent.vue'

import AskewGeoIcon from './components/AskewGeoIcon.vue'

//import  {mapGetters} from 'vuex'
import { computed } from 'vue'
import { useStore } from 'vuex'
//import AskewAuth from './components/AskewAuth.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md



  const store = useStore();
  //console.dir(store)

  //ref: doubled = computed(() => 1 * 2)
  ref: auth = computed(() => store.getters['authenticated'])
  ref: user = computed(() => store.getters['user'])
  ref: chatts = computed(() => store.getters['chatts'])
  ref: menuOpen = computed(() => store.getters['menuOpen'])
  //ref: markers = computed(() => store.getters['markers'])
  ref: flash = computed(() => store.getters['flash'])

  ref: showLoginScreen = computed(() => store.getters['showLoginScreen'])
  ref: authLoading = computed(() => store.getters['authLoading'])

  /* Geolocation */
  ref: showGeoScreen = computed(() => store.getters['showGeoScreen'])
  ref: geoPosition = computed(() => store.getters['position'])
  ref: geoError = computed(() => store.getters['geoError'])
  ref: gotGeoPosition = computed(() => store.getters['gotGeoPosition'])
  ref: watchid = computed(() => store.getters['watchid'])


  async function init () {
    store.dispatch('initAuth')
    store.dispatch('initChatt')
    await store.dispatch('initTrails')
    store.dispatch('initMap')
    store.dispatch('initVenue')
    
    
    // Let the user choose when to start
    // store.dispatch('initGeolocation')
    
    // Lets flashes
    /* store.dispatch('sendFlash', 'Welcome')
    setTimeout( function () { 
      store.dispatch('sendFlash', 'Next message');
    }, 1000); */

  }

  function signIn () {
    store.dispatch('signIn')
  }

  function signOut () {
    store.dispatch('signOut')
  }

  function toggleMenu() {
    store.commit('TOGGLE')
  }

  function closeFlashMessage(id) {
    store.commit('REMOVE_FLASH', id)
  }

  function toggleLoginScreen() {
    store.commit('TOGGLE_LOGIN_SCREEN')
  }

  function openGeolocationScreen() {
    store.commit('OPEN_GEOLOCATION_SCREEN')
  }

  function closeGeolocationScreen() {
    store.commit('CLOSE_GEOLOCATION_SCREEN')
  }

  function changeTrainers(trainers) {
    store.dispatch('changeTrainers', trainers)
  }

  /* Geolocation */
  function startGeolocation() {
    store.dispatch('initGeolocation')
  }

  function stopGeolocation() {
    store.dispatch('stopGeolocation')
  }

  init();

</script>

<style>

#app {
  box-sizing: border-box;
  color: var(--black);
  background: var(--background);
}

p {
  line-height: 1.4rem;
}

.icons {
    display: flex;
}
</style>