<template>
    <nav id="nav">
        
        <!--askew-icon icon="map"></askew-icon>
        <askew-icon icon="home"></askew-icon>
        <askew-icon icon="heart"></askew-icon>
        <askew-icon icon="shout"></askew-icon>
        <askew-icon icon="close"></askew-icon>
        <askew-icon icon="home"></askew-icon>
        <askew-icon icon="user"></askew-icon>
        <askew-icon icon="login"></askew-icon>
        <askew-icon icon="logout"></askew-icon>
        <askew-icon icon="load"></askew-icon>
        <askew-icon icon="center"></askew-icon>
        <askew-icon icon="gps_fixed"></askew-icon>
        <askew-icon icon="gps_search"></askew-icon>
        <askew-icon icon="gps_off"></askew-icon>
        <askew-icon icon="delete"></askew-icon-->
        
        <router-link to="/">
            <askew-icon icon="home"></askew-icon>
            <span class="desktop">Hem</span>
        </router-link>

        <router-link to="/map">
            <askew-icon icon="map"></askew-icon>
            <span class="desktop">Kartan</span>
        </router-link>
        
        <router-link to="/venue">
            <askew-icon icon="center"></askew-icon>
            <span class="desktop">Samlingar</span>
        </router-link>

        <router-link to="/chatt">
            <askew-icon icon="shout"></askew-icon>
            <span class="desktop">Skriv något</span>
        </router-link>

        <router-link to="/about">
            <askew-icon icon="heart"></askew-icon>
            <span class="desktop">Om Askew</span>
        </router-link>
        
    </nav>
</template>

<script setup>
    import AskewIcon from './AskewIcon.vue'
</script>

<script>
export default
   {
    data() {
        return {
            animation: null
        }
    },
    props: {
        open: {
            required: false,
            default: false
        }
    },
    watch: {
        open() {
            (this.open) ? this.animation.play() : this.animation.reverse();
        }
    },
    mounted(){
        /*this.animation = gsap.timeline({paused: true,reversed: true})
            .from("#nav", {opacity:0, xPercent: 150})
            .to("#nav", {opacity: 1, xPercent: 0, ease: "Power0.easeNone"});
    */
    }
}
</script>

<style scoped>
nav {
    flex:1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header);

    background: transparent;
    border-bottom: 1px dashed rgb(22,22,22);
    height: var(--menu);
}

nav a {
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 1rem;
    color: var(--header-color);
    border-right: 1px dashed var(--header-background);
    background: transparent;
    height: 100%;
}

nav a:last-child {
    border-right: none;
}
nav a svg {
    padding-right: 3px;
    fill: var(--dark-red);
}

a::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -1px;
  left: 0;
  background-color: var(--dark-red);
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}

a:hover::before {
    visibility: visible;
    transform: scaleX(1);
}

a.router-link-active::before,
a.router-link-exact-active::before {
   background-color: var(--dark-red);
   width: 100%;
}

a.router-link-active svg,
a.router-link-exact-active svg {
    fill: var(--dark-red);
}


    .desktop {
        display: none;
    }

    @media only screen and (min-width: 600px) {
        .desktop {
            display: inline;
        }    
    }

</style>