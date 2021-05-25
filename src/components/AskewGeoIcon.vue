<template>
        
    <div @click="open" title="Din position">
        
        <askew-icon :icon="getIcon"></askew-icon>
    
    </div>
    
</template>

<script setup>
    //import { computed } from 'vue'
    //import { useStore } from 'vuex'
    import AskewIcon from './AskewIcon.vue'
    
    //const store = useStore();

    //ref: geoPosition = computed(() => store.getters['position'])
    //ref: geoError = computed(() => store.getters['geoError'])
  
</script>

<script>
export default {
  components: { AskewIcon },
    data() {
        return {
            login: {
                email: null,
                password: null
            }
        }
    },
    props: {
        position: {
            type: Boolean,
            required: true,
            default: false
        },
        error: {
            requried: true,
            default: []
        }
    },
    methods: {
        
        open() {
            this.$emit('open')
        }
        
    },
    computed: {
        getIcon: function() {
            let icon = 'gps_off'
            if(this.error.length > 0) {
                icon = 'gps_off'
            }
            if(this.position) {
                icon = 'gps_fixed'
            }
            return icon        }
    },

    /*watch: {
        position() {
            console.log("Got new position in geoIcon")
        }
    },*/
}
</script>

<style scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: var(--header);
    /*background: rgba(123,123,123,0.2);*/
    
}
svg {
    fill: var(--white);
    transition: fill .5s ease;
}

svg:hover {
    fill: var(--accent-color);
    transition: fill .5s ease;
}
</style>