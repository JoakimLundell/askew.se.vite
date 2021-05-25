import { createStore } from 'vuex'

import auth from '../store/modules/auth.js'
import chatt from '../store/modules/chatt.js'
import menu from '../store/modules/menu.js'
import map from '../store/modules/map.js'
import flash from '../store/modules/flash.js'
import geolocation from '../store/modules/geolocation.js'
import venue from '../store/modules/venue.js'
import trail from '../store/modules/trail.js'


const store = createStore({
    modules: {
        auth,
        chatt,
        menu,
        map,
        flash,
        geolocation,
        venue,
        trail
    }
})

export default store