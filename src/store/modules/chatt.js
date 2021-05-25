import { database } from '../../firebase/firebase.js'
import moment from 'moment'
import store from '../.'
import { mapMutations } from 'vuex'


export default {
    state: () => ({
        loading: false,
        chatts: []
    }),

    getters: {
        chatts (state) {
            return state.chatts
        },

        loading (state) {
            return state.loading
        }
    },

    mutations: {
        SET_CHATTS (state, payload) {
            state.chatts = payload
        }
    },

    actions: {
        initChatt({commit, dispatch}) {
            
            var ref = database.ref("posts");    
            ref.on("value", function(snapshot) {
               
                let json = snapshot.val();
                let items = [];
                for (let index in json) {
                    let o = json[index];
                    // Adding key for futher reference
                    o.key = index
                    items.push(o)
                }
                commit('SET_CHATTS', items.reverse() );
                //console.log(snapshot.val())
        
            });

        },

        addChatt({commit, dispatch}, message){

            var postData = {
                namn: message.name,
                uid: null,
                meddelande: message.message,
                starCount: 0,
                date: moment().format('YYYY-MM-DD HH:MM:SS'),
                timestamp: Date()
            };
            console.dir(postData)
            // Get key for new chatt message.
            let newKey = database.ref().child('posts').push().key;
            let updates = {};
            updates['/posts/' + newKey] = postData;
            
            database.ref().update(updates);
        },

        removeChatt({dispatch}, id){

            console.log(id)
             
            if(store.getters['authenticated']) {
                let message = database.ref('posts/' + id );
                message.remove();
                dispatch('sendFlash', 'Ok, bort med den');
            } else {
                dispatch('sendFlash', 'Du måste vara inloggad för att kunna ta bort inlägg', { root: true });
            }
        },

    }
}