<template>
    
    <router-link to="/">
        <div class="logo">
            <!--img alt="Askew logo" src="./../assets/logo.png" /-->
            <img alt="Askew logo" src="./../assets/svg/monkey_white.svg" />
        </div>

        <div class="logo-text">
            <slot></slot>
        </div>
    </router-link>

</template>

<script>
export default {
    /*data() {
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
        this.animation = gsap.timeline({paused: true,reversed: true})
            .from("#nav", {opacity:0, yPercent:-100})
            .to("#nav", {opacity: 1, x: 0, ease: "power4.in"});
    }*/
}
</script>

<style scoped>
a {
    display: flex;
    align-items: center;
}
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--header);
    height: var(--header);
    background: rgb(22, 22, 22);
 
}
img {
    width: 44px;
    height: 44px;;
}

.logo-text {
    font-family: 'Roboto Condensed';
    font-size: 1.2rem;
    width: 60px;
    height: 30px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background: var(--header-color);
}

</style>