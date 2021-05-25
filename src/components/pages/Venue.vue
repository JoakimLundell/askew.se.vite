<template>
    <div class="wrapper">
        
        <div class="venues">
            <h1>Samlingar</h1>
            
            <p>Här kan du lägga till nya möteplatser eller ändra befintliga.</p>
        
            <h2>Aktuella</h2>
            
            <div v-for="venue in venues" :key="venue.key" @click="editVenue(venue.key)" class="venue-item">
                {{venue.datetime}} <b>{{venue.name}} </b>
            
            </div>
            <button v-if="edit" @click="resetVenue">Ny möteplats</button>
        </div>
        
        <div class="venue">
            <h2>Plats <span v-if="venue.name"> - {{venue.name}}</span></h2>
            <p>Klicka på kartan för att få koordinater till mötesplatsen. Sen skriver du ett namn och datum, tid.</p>
            <div>
                <l-map :center="map.center" :zoom="map.zoom" style="height: 300px;" @click="clickMap($event)">
		            <l-tile-layer :url="map.url"></l-tile-layer>
                   <l-marker v-if="venue.coords.lat && venue.coords.lng" :lat-lng="[venue.coords.lat,venue.coords.lng]">
			            <l-tooltip v-if="venue.name != ''" :options="{permanent: true}">{{venue.name}}</l-tooltip>
	  	            </l-marker>
                </l-map>
            </div>

            <div class="row">
                <div style="width: 100%;">Latitud/Longitud</div>
                <input type="text" name="lat" v-model="venue.coords.lat" style="width: 50%">
                <input type="text" name="lng" v-model="venue.coords.lng" style="width: 50%; margin-left: 12px">
                <input type="hidden" v-model="venue.key" />
            </div>
            
            <div class="row">
                <label for="name">Mötesplatsens namn</label>
                <input type="text" name="name" v-model="venue.name" />
            </div>

            <div class="row">
                <label for="date">Mötesplatsens datum</label>
                <input type="datetime-local" name="date" v-model="venue.datetime"/>
            </div>
            <div class="row" style="display: flex; justify-content: space-between; flex-direction: row-reverse;">
            <button @click="save">{{ saveButtonText }}</button>
            <button v-if="edit" class="warning" @click="clickDelete">Ta bort</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LTooltip, LIcon, LPopup, LCircle } from "@vue-leaflet/vue-leaflet";

import { mapGetters, mapActions } from 'vuex'

export default {

    components: {
		LMap, LTileLayer, LMarker, LTooltip, LIcon, LPopup, LCircle
	},


    data() {
        return {
            venue: {
                key:null,
                name: null,
                datetime: null,
                coords: {
                    lat: null,
                    lng: null
                },
            },
            edit: false,
            map: {
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			    center: [59.3294, 18.0686], //Sthlm
			    zoom: 12,
            }
        }
    },

    computed: {
        ...mapGetters({
            venues: 'venues'
        }),

        saveButtonText: function() {
            return (!this.edit) ? 'Spara ny plats' : 'Spara Ändring'
        }
    },

    methods: {
        ...mapActions({
            //initVenue: 'initVenue',
            saveVenue: 'saveVenue',
            removeVenue: 'removeVenue',
            sendFlash: 'sendFlash'
        }),

        save() {
            if(this.isValid()) {
                this.saveVenue(this.venue)
                this.resetVenue();
            } else {
                // Flash warning
                this.sendFlash('Alla fält måste vara ifyllda')
            }
            
        },

        editVenue(key) {
            this.edit = true;
            //console.log(key)
            this.venue = this.venues.find((v) => v.key === key)
            //console.log(this.venue.coords)
            
            // Center map on the current venue coords
            this.map.center = this.venue.coords
        },

        resetVenue() {
            this.venue = {
                key:null,
                name: null,
                datetime: null,
                coords: {
                    lat: null,
                    lng: null
                }
            }
            this.edit = false;
        },

        clickMap(event) {
            
            if(event.latlng != undefined) {
                this.venue.coords.lat = event.latlng.lat
                this.venue.coords.lng = event.latlng.lng
            }
                
        },

        clickDelete() {
            this.removeVenue(this.venue.key)
            this.resetVenue
        },

        isValid() {
            return (this.venue.name != null && this.venue.coords.lat != null && this.venue.coords.lng != null && this.venue.datetime != null)
        }
    },

    mounted() {
        //this.initVenue();
    }
    
}
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.venue, 
.venues {
    width: 100%;
}

.venues {
    margin-right: 0;
}

.venue-item {
    border: 1px solid var(--black);
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 6px;
}

.venue-item:hover {
    background: var(--accent-color);
    color: var(--white)
}

.row {
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--padding-small) 0;
}
.row > input {
    flex:1;
}

label {
    margin-right: 12px
}

@media only screen and (min-width: 600px) {
    .wrapper {
        flex-direction: row;
    }
    
    .venues {
        width: 50%;
        max-width: 400px;
    }

    .venue {
        width: 100%;
    }

    .venues {
        margin-right: calc(2 * var(--padding));
    }
            
}
</style>