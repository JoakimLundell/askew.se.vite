import { database } from '../../firebase/firebase.js'
import store from '..'


export default {
    state: () => ({
        loading: false,
        markers: []
    }),

    getters: {
        mapLoading (state) {
            return state.loading
        },

        markers (state) {
            return state.markers
        }
    },

    mutations: {
        SET_MARKERS (state, payload) {
            state.markers = payload
        },

        /*SET_TRAIL (state, payload) {
            state.markers.forEach((marker) => {
                marker.trail = (marker.uid == payload.uid) ? payload : []
            })
        }*/

    },

    actions: {

        initMap({commit, rootGetters, dispatch}) {
            
            let ref = database.ref("positions");
            
            ref.on("value", function(snapshot) {
                //let positions = snapshot.val();
                let positions = []
                
                snapshot.forEach((snapshotChild) => {
                    // position
                    let item = snapshotChild.val()
                    // trail
                    let id = snapshotChild.val().uid;
                    let trail = rootGetters['trail'](id) ;

                    item['trail'] = trail;

                    positions.push(item)
                    
                
                })
                commit('SET_MARKERS', positions)
               
            });
        
        },

        updateCurrentTrainersOnMap({commit, rootGetters}, trainers) {
            let key = rootGetters['user'].uid;
            return database.ref('positions/' + key).update({icon: trainers})
        }

    }
}