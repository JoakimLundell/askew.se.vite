<template>
    <div class="wrapper">

        <div class="heading img">
            <h1>Skriv något</h1>

            <div class="inputs">

                <input v-model="chatt.name" type="text" placeholder="Skriv ditt namn" />
                <input v-model="chatt.message" type="text" placeholder="Skriv meddelande" />
                <button @click="sendChatt(chatt)">Skicka</button>

            </div>
            
        </div>

        <div class="content">
            
            <div v-for="msg in messages" :key="msg.key" class="chatt-item">
                
                <div class="chatt-message" >
                    <span class="name"> {{msg.namn}}</span> 
                    <span class="message"> {{msg.meddelande}} </span> 
                </div>

                <div class="chatt-info">  
                    <i>{{msg.date}}</i>
                    <askew-icon icon="delete" @click="confirmDelete(msg.key)"></askew-icon>
                </div>

            </div>
            
            <!--button @click="state.count++">count is: {{ state.count }}</button>
            <p>
                Edit
                <code>components/HelloWorld.vue</code> to test hot module replacement.
            </p-->
 
           
        </div>
        <div v-if="modal" class="modal">
            <h2> Plocka bort den? </h2>
            <div class="buttons">
                <button @click="confirmedDelete"> Ja </button>
                <button @click="regretDelete" class="warning">Nej</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    //import { defineProps, reactive } from 'vue'
    import AskewIcon from '../AskewIcon.vue'
    import { computed } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore();
    /*defineProps({
        messages: Array
    })*/

    //ref: username = computed(() => store.getters['username'])
    ref: messages = computed(() => store.getters['chatts'])
  
  
    //const state = reactive({ count: 0 })

</script>

<script>
import { mapActions, mapGetters } from 'vuex';

export default{

    data() {
        return {
            chatt: {
                name: null,
                message: null
            },
            modal: false,
            deleteId: null
        }
    },

    computed: {
		...mapGetters({
			username: 'username'
		}),
	},

    methods: {
        ...mapActions({
            remove: 'removeChatt',
            send: 'addChatt'
        }),

        sendChatt() {
            this.send(this.chatt);
            this.resetChatt();
        },

        resetChatt() {
            this.chatt.message = null
        },

        confirmDelete(id) {
            this.deleteId = id
            this.modal = true;
        },
        regretDelete() {
            this.deleteId = null;
            this.modal = false;
        },
        confirmedDelete() {
            this.remove(this.deleteId)
            this.regretDelete();
        }
    },

    mounted() {  
        this.chatt.name = this.username
    }
}
</script>


<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    @media only screen and (min-width: 600px) {
        .wrapper {
            flex-direction: row;
        }

        .heading {
            margin: 0 36px 36px 0;
        }

    }

    .heading,
    .chatt-item,    
    .chatt-message,    
    .chatt-info {
        display: flex;
    }

    .heading {
        flex-direction: row;
    }

    .heading.img {
        background: url('../../assets/img/dubbelfakk.jpg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        padding: var(--padding);
        margin-bottom: 12px;
    }

    .heading.img h1 {
        margin-top: 12px;
        font-size: 2.6rem;
        color:rgba(255,255,255,.9);
        text-shadow: 1px 1px 5px black;
    }
    .heading .inputs {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 12px;
    }

    .heading .inputs > * {
        flex: 0 1;
    }

    .chatt-item {
        flex-direction: column;
    }

    .heading {
        padding: 0 0 36px 0
    }

    .chatt-item {
        margin-bottom: 4px;
    }

    .chatt-message {
        align-items: flex-end;
    }

    .chatt-info {
        align-items: center;
        font-size: 9px;
        color: #8f8578;
        margin-top: 2px;
    }

    .name {
        color: var(--black);
        padding-right: 4px;
    }

    .message {
        background: var(--white);
        color: var(--black);
        padding: 4px 6px;
        border-radius: 6px;
        border-bottom-left-radius: 0;
    }
    
    svg {
        width: 14px;
        height: 14px;
        fill: #8f8578;
        padding: 0 4px;
    }


    /* row even */

    .chatt-item:nth-child(even) .chatt-message,
    .chatt-item:nth-child(even) .chatt-info {
       flex-direction: row-reverse;
    }

    .chatt-item:nth-child(even) .message{
        border-radius: 6px;
        border-bottom-right-radius: 0;
    }

    .chatt-item:nth-child(even) .name{
        padding: 0 0 0 4px;
    }
    

    /* hover */

    .chatt-item:hover svg { 
        fill:var(--dark-red);
        transition: fill .5s ease;
    }

    .chatt-item:hover .chatt-info { 
        color: rgba(0, 0, 0, 0.555);
        transition: color .5s ease
    }

    /* Modal */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        content: ' ';
        background: rgba(0,0,0,.8);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation: appear .5s;
    }
    .modal button:first-child {
        margin-right: 12px;
    }

    @keyframes appear {
        0% { opacity: 0; }
    }
</style>