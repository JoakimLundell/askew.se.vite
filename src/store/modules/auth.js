import { firebase, auth, database} from '../../firebase/firebase.js'

export default {
    state: () => ({
        loading: false,
        user: null,
        showLoginScreen: false
    }),

    getters: {
        user (state) {
            return state.user
        },

        authenticated (state) {
            return (state.user) ? true : false
        },

        showLoginScreen (state) {
            return state.showLoginScreen
        },

        authLoading (state) {
            return state.loading
        },

        username (state) {
            return (state.user) ? state.user.name : 'Gäst' 
        }
    },

    mutations: {
        SET_USER (state, payload) {
            state.user = payload
        },

        SET_NAME (state, payload) {
            state.user.name = payload
        },

        SET_TRAINERS (state, payload) {
            state.user.trainers = payload
        },

        TOGGLE_LOGIN_SCREEN (state) {
            state.showLoginScreen = !state.showLoginScreen;
        },

        SET_LOADING (state, payload) {
            state.loading = payload
        }
    },

    actions: {
        initAuth({commit, dispatch}) {
            //console.log("INNE i vuex initAuth");
            auth.onAuthStateChanged((user) => {
                commit('SET_LOADING', true)
                if(user) {
                    
                    commit('SET_USER',  user)
                    dispatch('getUserinfo', user.uid);
                    dispatch('sendFlash', 'Du loggades in');
                    commit('SET_LOADING', false)
                } else {
                    commit('SET_USER', null)
                    dispatch('sendFlash', 'Du loggades ut');
                    commit('SET_LOADING', false)
                }
            })

            // For testing only
            /*setTimeout(()=> {
                dispatch('signIn')
            }, 2000)
            setTimeout(()=> {
                dispatch('signOut')
            }, 4000)*/
        },

        signIn({}) {
            let email = 'jocke.lundell@gmail.com';
            let password = 'hataaik';

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then( () => {
                    //console.log("signIn: Successfully signed in");
                })
                .catch( (error) => {
                    console.log("signIn: Error " + error)
                })
        },

        signOut({}) {
            firebase.auth().signOut()
                .then( () => {
                    //console.log("signOut: Successfully signed out")
                })
                .catch( (error) => {
                    console.log("signOut: Error " + error)
                })
        },

        getUserinfo({commit}, uid) {
            
            database.ref('users-info/' + uid ).once('value')
            .then(function(snapshot) {
                let userinfo = snapshot.val(); 
                commit('SET_NAME', userinfo.nic);
                commit('SET_TRAINERS', userinfo.trainers);
            })

        },

        changeTrainers({commit, state, dispatch}, trainers) {

            let uid = state.user.uid;
            let nic = state.user.name;

            firebase.database().ref("users-info/" + uid).set({
                nic: nic,
                trainers: trainers
            })
            .then(()=> {
                commit('SET_TRAINERS', trainers)
                dispatch('updateCurrentTrainersOnMap', trainers)
            })
            .catch((error) => {
                dispatch('sendFlash', error.message);

            })
            
        }
    }
}