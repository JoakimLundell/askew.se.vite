<template>
    <div class="flash-messages">
        
        <div v-for="msg in flash" :key="msg.id" class="flash-message">
            <div class="flash-line">
                <div>Info</div>
                <div style="padding: 0 36px">{{msg.message}}</div>
                <askew-icon icon="close" style="fill: white" @click="close(msg.id, $event)"></askew-icon>
            </div>
            <div class="flash-timeout">
                <div class="loader__element"></div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
    import AskewIcon from './AskewIcon.vue'
</script>

<script>
export default
   {
    props: {
        flash: {
            requried: true,
            default: []
        }
    },
    methods: {
        close(id, e) {
            e.stopPropagation();
            this.$emit('close', id)
        }
    }  
}
</script>

<style scoped>

.flash-messages {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;
    background: transparent;
}
.flash-message {
    background: var(--accent-color);
    animation: appear 1s;
    overflow: hidden;
    
    box-shadow: 2px 2px 6px black;
    
}
.flash-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    color: white;
    padding: 6px 6px 6px 6px;
}

.flash-timeout {
    height: 3px;
    background: rgba(255,255,255,0.3);
}

.loader__element {
	height: 3px;
	width: 100%;
	background: var(--accent-color);

}

.loader__element:before {
	content: '';
	display: block;
	background-color: rgba(255, 255, 255, 0.3);
	height: 3px;
	width: 0;
    animation: loader 5s linear;
}

@keyframes appear {
    0% { opacity: 0; }
}

@keyframes loader {
	100% { width: 100%; }
}

@media only screen and (min-width: 600px) {
	.flash-messages {
        left: 120px;
        right: 100px;
        top: 0;
    }
    .flash-message {
        height: var(--header);
        width: 100%;
        box-shadow: none;
    
    }
}
</style>