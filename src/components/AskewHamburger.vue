<template>
    <div class="hamburger" @click="toggle">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </div>
    
</template>

<script>
export default {

    data() {
        return {
            animation: null
        }
    },
    props: {
        open: {
            requried: true,
            default: false
        }
    },
    methods: {
        toggle() {
            
            if(!this.animation.isActive()) {
                this.$emit('toggle')
                // Toggle hamburger icon
                this.animation.reversed() ? this.animation.play() : this.animation.reverse();
            }
        },
    },

    mounted() {
        /* Hamburger */
        this.animation = gsap.timeline({paused: true, reversed: true})
            .to(".line:nth-child(1)", {y: 6, ease: "power1.out"}, 0)
            .to(".line:nth-child(3)", {y: -6, ease: "power1.out"}, 0)
            .to(".line:nth-child(2)", {opacity: 0, ease: "power1.out"}, 0.1)
            .to(".line:nth-child(1)", {rotation: -45, ease: "power1.out"}, 0.3)
            .to(".line:nth-child(3)", {rotation: 45, ease: "power1.out"}, 0.3);
    }
}


</script>

<style scoped>
    /* Hamburger */
    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: var(--header);
        height: var(--header);
        /*background: rgba(123,123,123,0.2);*/
    }

    .hamburger > .line {
        height: 2px;
        margin: 2px;
        width: 20px;
        background-color: var(--dark-red);
        transition: background-color .5s ease;
    }

    .hamburger:hover > .line {
        background-color: var(--red);
        transition: background-color .5s ease;
    }
</style>