import { firebase, auth} from '../../firebase/firebase.js'

export default {
    state: () => ({
        open: false
    }),

    getters: {
        menuOpen (state) {
            return state.open
        }
    },

    mutations: {
        TOGGLE (state) {
            state.open = !state.open
        },

        CLOSE_MENU (state) {
            state.open = false
        }
    },

    actions: {
        
    }
}