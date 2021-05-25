import { database } from '../../firebase/firebase.js'
import moment from 'moment'
/*import state from '..'*/

export default {
    state: () => ({
        watchid: null,
        coords: {
            lat: null,
            lng: null
        },
        error: {
            id: null,
            message: null
        },
        showGeolocationScreen: false,
        track: {
            lastupdated: null
        }
    }),

    getters: {
        position (state) {
            return (state.coords.lat != null && state.coords.lng != null) ? state.coords : null
        },
        geoError (state) {
            return state.error
        },
        showGeoScreen (state) {
            return state.showGeolocationScreen
        },
        gotGeoPosition(state) {
            return (state.coords.lat != null && state.coords.lng != null)
        },
        watchid(state) {
            return state.watchid
        },
        track(state) {
            return state.track
        }
    },

    mutations: {
        SET_WATCHID (state, payload) {
            state.watchid = payload
        },

        SET_COORDS (state, payload) {
            state.coords.lat = payload.latitude
            state.coords.lng = payload.longitude
        },

        RESET_COORDS (state) {
            state.coords.lat = null
            state.coords.lng = null
        },

        SET_ERROR (state, payload) {
            state.error = payload
        },

        OPEN_GEOLOCATION_SCREEN (state) {
            state.showGeolocationScreen = true;
        },

        CLOSE_GEOLOCATION_SCREEN (state) {
            state.showGeolocationScreen = false;
        },

        SET_TRACK_LASTUPDATED(state, payload) {
            state.track.lastupdated = payload
        }
    },

    actions: {
        initGeolocation({commit,dispatch,state}) {
            let options= {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
            /* Todo if watchid is set dont start a new geolocation */
            if(state.watchid > 0) {
                dispatch('sendFlash', "WatchId är redan satt, väntar till vi får svarar!")
            } else {

                let id = navigator.geolocation.watchPosition( position => {
                    commit('SET_COORDS', position.coords)
                    commit('SET_WATCHID', id)

                    dispatch('sendFlash', "Got new geolocation")
                    
                    // Save your position to db
                    dispatch('savePosition', position.coords)
                    
                    commit('CLOSE_GEOLOCATION_SCREEN')

                }, (error) => {

                    // console.log(error)
                    commit('SET_ERROR', error)
                    dispatch('sendFlash', "Geolocation Error: " + error.message)

                }, options )
            }
        },

        stopGeolocation({commit,dispatch, state}) {
            navigator.geolocation.clearWatch(state.watchid);
            commit("SET_WATCHID", null);
            commit("RESET_COORDS");
            //dispatch('removePosition')
            dispatch('sendFlash', "Geolocation stoppad");
        },  

        /* Save position to database */
        savePosition({state, dispatch, commit, rootGetters}, coords){
            //console.log(rootGetters)
            if(rootGetters['authenticated']) {
                
                var post = {
                    uid: rootGetters['user'].uid,
                    name: rootGetters['user'].name,
                    longitude: coords.longitude,
                    latitude: coords.latitude,
                    speed: coords.speed,
                    accuracy: coords.accuracy,
                    updated: new Date().toLocaleString('sv-SE'),
                    icon: rootGetters['user'].trainers
                }

                //console.dir(post)
                let key = post.uid;
                database.ref('positions/' + key).update(post);

                if(rootGetters['currentVenue'].length > 0) {
                    
                    //console.log("state.track.lastupdated = " + state.track.lastupdated)
                    

                    if( state.track.updated == null || state.track.lastupdated.add(5, 'minutes').isSameOrAfter(moment()) ) {

                        //console.log("Sparar din position i trace")
                        let time = moment().format();
                        commit("SET_TRACK_LASTUPDATED", time)

                        let trail = {
                            uid: rootGetters['user'].uid,
                            lat: coords.latitude,
                            lng: coords.longitude,
                            time: time
                        }
                        
                        dispatch("addTrail", trail)    
                        
                        
                    }
                    
                }

            } else {
                //console.log("Your are not signed in")
            }
        },

        /* Remove position from database */
        removePosition ({dispatch, rootGetters}) {
             
            if(rootGetters['authenticated']) {
                
                let position = database.ref('positions/' + rootGetters['user'].uid );
                position.remove();
            
                dispatch('sendFlash', 'Ok, plockade bort din position');
            
            } else {
            
                dispatch('sendFlash', 'Det gick inte att plocka bort din position');
            
            }
        }
    }
}