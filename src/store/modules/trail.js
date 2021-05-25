import { database } from '../../firebase/firebase.js'
import moment from 'moment'
import store from '..'


export default {
    state: () => ({
        trails: []
    }),

    getters: {
        trails (state) {
            return state.trails
        },

        trail: (state) => (id) => {
            return state.trails.find(trail => trail.uid === id)
        },
    },

    mutations: {
        SET_TRAILS(state, payload) {
            state.trails = payload
        }
    },

    actions: {
        async initTrails({commit, dispatch}) {
            
            let ref = database.ref("trails/20210525");    
            
            ref.on("value", function(snapshot) {

                let trails = [];
                
                snapshot.forEach((child) => {
                    
                    let latLng = []
                    child.forEach((item) => {
                        latLng.push({lat: item.val().lat, lng: item.val().lng})
                    })
                    let trail = {uid:child.key, points:latLng, visible: true};
                    trails.push(trail);
                    
                    //commit('SET_TRAIL', trail)
                })
                
                
                commit('SET_TRAILS', trails );
                
        
            });

        },

        addTrail({commit, dispatch}, trail){

            console.log("Vuex Trail - AddTrail (Det här ska bara ske var femte minut)")
            const date = moment().format('YYYYMMDD')
            const uid = trail.uid;
            
            let data = {
                lat: trail.lat,
                lng: trail.lng,
                time: trail.time
            }
            let newKey = database.ref().child('trails/' + date).push().key;
            
            let updates = {};
            updates['trails/'+ date + '/' + uid + '/' + newKey] = data;

            database.ref().update(updates)
        },

        

    }
}