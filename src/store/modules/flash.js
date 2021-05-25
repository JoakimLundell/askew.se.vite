//import { firebase, auth} from '../../firebase/firebase.js'
import store from '..'

export default {
    state: () => ({
        flash: [],
        flashTimeout: 5000
    }),

    getters: {
        flash (state) {
            return state.flash
        },
        flashTimeout (state) {
            return state.flashTimeout
        }
    },

    mutations: {
        ADD_FLASH (state, payload) {
            state.flash.push(payload)
        },
        REMOVE_FLASH (state, id) {
            state.flash = state.flash.filter(item=>item.id != id );
        }
    },

    actions: {
        sendFlash({commit}, data) {
            let id = store.getters['flash'].length;
            let timeout = store.getters['flashTimeout']; 
            commit('ADD_FLASH', {'id': id, 'message': data, timeout: timeout})
            
            setTimeout( function () { 
                commit('REMOVE_FLASH', id);
            }, timeout);
        }
    }
}