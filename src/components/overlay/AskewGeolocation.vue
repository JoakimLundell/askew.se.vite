<template>

    <div class="overlay" @click="close"></div>
    
    <div class="geo">
        
        <div class="geo-header">
    
            <h1>Geolocation</h1>
            
            
                <svg @click="close" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            

        </div>

        <div class="geo-content">
            <div class="info">
                <h2>Status</h2>
                <div v-if="error">Ok</div>
                <div v-else>
                    Id:{{error.id}}
                    {{error.message}}
                </div>
                <h2>Watchid</h2>
                {{watchid}}
                <h2>Din position</h2>
                {{position}}
            </div>
            <div class="buttons center padding">
                <button :disabled="watchid > 0" @click="startGeolocation" class="warning">Starta</button>
                <button :disabled="watchid == null" @click="stopGeolocation">Stoppa</button>
            </div>
            
            <div class="buttons right">
                <button @click="close">Stäng</button>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    
    data() {
        return {
            login: {
                username: null,
                password: 'hataaik',
            }
        }
    },

    props: {
        position: {
            requried: true,
            default: false
        },
        error: {
            required: false,
            default: null
        },
        watchid: {
            required: true,
            default: null
        }
      
    },
    methods: {
        startGeolocation() {
            this.$emit('start')
        },
        stopGeolocation() {
            this.$emit('stop')
        },
        close() {
            this.$emit('close')
        }
    },
      
}
</script>

<style scoped>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        content: ' ';
        background: rgba(0,0,0,.5);
        z-index: 1400;
    }

    .geo {
        position: fixed;
        top: 12px;
        left: 12px;
        right: 12px;
        background: var(--background);
        box-shadow: 2px 2px 12px rgba(0,0,0,0.8);
        padding: 12px;
        z-index: 1400;

    }

    h1 {margin: 0;}

    .geo-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .geo-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding: 12px;
    }

    svg {
        fill: var(--accent-color);
    }

    svg:hover {
        fill: var(--accent-color-hover);
    }

    .info {
        margin-bottom: 48px;
    }

    .buttons {
        display: flex;
        width: 100%;
    }
    .buttons.center {
        justify-content: center;
    }
    .buttons.right {
        justify-content: flex-end;
    }
    .buttons.padding {
        padding-bottom: 48px;
    }
    button {
        margin-right: 12px;
    }

    @media only screen and (min-width: 600px) {
        .geo-content {
            flex-direction: row;
            align-items: center;
        }
        .buttons {
            width: auto;
        }

        .buttons.padding {
            padding-bottom: 0;
        }

        .buttons.right {
            
            height: 100%;
            justify-content: flex-end;
        }
    }
</style>