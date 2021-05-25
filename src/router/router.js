import { createRouter, createWebHashHistory} from 'vue-router'

import Home from '../components/pages/Home.vue';
import Map from '../components/pages/Map.vue';
import About from '../components/pages/About.vue';
import Chatt from '../components/pages/Chatt.vue';
import Venue from '../components/pages/Venue.vue';

const routes = [
    {path: '/', component: Home},
    {path: '/map', component: Map},
    {path: '/about', component: About},
    {path: '/chatt', component: Chatt},
    {path: '/venue', component: Venue}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router;