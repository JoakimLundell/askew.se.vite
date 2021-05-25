<template>
	<div class="map-wrapper">
			
		<div class="map-modal" v-if="watchid < 0">
			<div>
				watchid = {{watchid}}|{{watchid >= 0}}
				<h1>Du har inte platsjänster påslagen!</h1>
				<p>Aktivera dem först din mobil/dator och slå 
				sedan på det uppe i sidhuvudet under länken 
				<askew-icon icon="gps_off" style="width: 15px; height: 15px"></askew-icon></p>
			</div>
		</div>	

		<div class="space-between">
			<div v-if="currentVenue.length > 0" style="margin-right: 24px">
				
				<h3>Idag finns {{currentVenue.length}} aktuell samlingsplats</h3>
				
				<div v-for="cv in currentVenue" 
					:key="cv.key" 
					
					class="button-extender" style="position: relative;">
					<template v-for="hero in currentHeroes" :key="hero.key">
						<div v-if="hero.key === cv.key" style="top: -8px;background: var(--white);color:var(--dark-red);font-size: 10px; padding: 2px;border-radius: 50%; border: 2px solid var(--dark-red);position: absolute; z-index: 500; left: -8px; width: 12px; height:12px; display: flex; justify-content: center; align-items: center;">{{hero.heroes.length}}</div>
					
					</template>
					
					<button
						:class="{'pulse': openVenue(cv.datetime)}" 
						@click="flyTo([cv.coords.lat, cv.coords.lng])">
						{{cv.name}} <span class="desktop">{{ toDate(cv.datetime) }}</span>
					</button>
					<span v-if="openVenue(cv.datetime)" style="padding: 0 6px;color: lightgreen" >Öppen</span>
					<span v-else style="padding: 0 6px">Stängd</span>
				</div>
				
			</div>
			
			<div>
				<div class="button-extender">
					<button @click="fitMarkers">
						<span>Centrera</span>
					</button>
					<input type="checkbox" v-model="autoFit" id="zoom">
					<label for="zoom">Auto<span class="desktop">matiskt</span></label>
				</div>
				
			</div>
		</div>

		<h3>Personer online</h3>
		
		<div class="online_users">
				
				<div v-for="marker in markers" :key="marker.uid" class="button-extender">
					<button @click="flyTo([marker.latitude, marker.longitude])">
						{{marker.name}}
					</button>
					 
					<span v-if="marker.trail != null">
						<input type="checkbox" 
							:id="'m_' + marker.uid" 
							:checked="marker.trail.visible" 
							:disabled="marker.trail.length < 1" 
							@click="marker.trail.visible = !marker.trail.visible"/>
						<label :for="'m_' + marker.uid">Spåra</label> 
					</span>
					
				</div>
				
			</div>
				
		
		<l-map 
			v-if="ready"
			ref="myMap"
			:center="center" 
			:zoom="zoom"
			:max-zoom="maxZoom"
			:bounds="bounds"
			:fit-bounds="(bounds)"
			:options="{ zoomControl: false }"
			:markerZoomAnimation="false"
			@update:zoom="zoomUpdated"
			@ready="mapReady"
			style="flex:1">

			<l-control-layers
			    position="topright"
			    :collapsed="false"
			></l-control-layers>
	 
		<l-tile-layer
        	v-for="tileProvider in tileProviders"
        	:key="tileProvider.name"
        	:name="tileProvider.name"
        	:visible="tileProvider.visible"
        	:url="tileProvider.url"
        	:attribution="tileProvider.attribution"
			layer-type="base"
      	></l-tile-layer>



			<!-- All markers and trails -->
			<template v-for="marker in markers" :key="marker.id">
				
				<l-marker 
					:lat-lng="[marker.latitude, marker.longitude]"
					@click="flyTo([marker.latitude, marker.longitude])">
					
					<l-icon 
						:icon-url="'/src/assets/trainers/'+ marker.icon"
						:icon-size="[30, 30]">
					</l-icon>
				
					<l-tooltip>{{marker.name}}</l-tooltip>
				</l-marker>

				<l-layer-group v-if="marker.trail != null" ref="features" :visible="marker.trail.visible">
					
					<l-polyline :lat-lngs="marker.trail.points" :color="trails.color" :visible="true"></l-polyline>
					
					<l-marker v-for="(point, index) in marker.trail.points" :key="index" :lat-lng="point">
						<l-icon
							:icon-url="'/src/assets/trainers/'+ marker.icon"
							:icon-size="[30, 30]"
							class-name="greyedOut">
						</l-icon>
					</l-marker> 

				</l-layer-group>


			
			</template>

			<!-- All venues -->
			<l-circle 
				v-for="venue in venues" :key="venue.key"
      			:lat-lng="[venue.coords.lat, venue.coords.lng]"
      			:radius="circle.radius"
      			:color="circle.color"
				@click="flyTo([venue.coords.lat, venue.coords.lng])" />


			<!-- Current active venues -->
			<l-circle
				v-for="cv in currentVenue"
				:name="cv.key"
				:key="cv.key"
      			:lat-lng="[cv.coords.lat, cv.coords.lng]"
      			:radius="circle.active.radius"
      			:color="circle.active.color"
				:fill="true"
        		:fillOpacity="0.5"
        		:fillColor="circle.active.fill"
				@ready="circleReady" />

			<!-- Your position -->
			<l-marker 
				v-if="position != null" 
				:lat-lng="[position.lat, position.lng]"
				@ready="positionUpdated"
				@update:latLng="positionUpdated">
				<l-tooltip>Det här är du!</l-tooltip>
	  		</l-marker>

			<!-- My test polyline -->
			<l-polyline :lat-lngs="polylines.lineOne" :color="polylines.color" :visible="true"></l-polyline>
			
			<!-- Polyline for users -->

			<!--template v-for="(trail, index) in trails" :key="index">
				<l-layer-group ref="features" :visible="trail.visible">

					<l-polyline :lat-lngs="trail.points" :color="polylines.color" :visible="true"></l-polyline>
				</l-layer-group>
			</template-->

			<!--l-polyline
          		v-for="item in polylines"
          		:key="item.id"
          		:lat-lngs="item.points"
          		:visible="item.visible"
          		@click="alert(item)"/-->

			<!--l-control-zoom position="bottomright"></l-control-zoom-->
			
			<!--l-control position="topleft">
				<button @click="fitMarkers">Centrera</button>
				<input type="checkbox" v-model="autoFit" id="zoom">
				<label for="zoom">Automatiskt</label>
			</l-control-->

  		</l-map>
	</div>
</template>

<script setup>
	import AskewIcon from '../AskewIcon.vue'
</script>

<script>

import "leaflet/dist/leaflet.css"
//import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LTooltip, LIcon, LPopup, LCircle, LCircleMarker, LControlZoom, LPolyline, LLayerGroup, LControl, LControlLayers } from "@vue-leaflet/vue-leaflet";
import { latLngBounds, latLng } from "leaflet/dist/leaflet-src.esm";
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
	components: {
		LMap, LTileLayer, LMarker, LTooltip, LIcon, LPopup, LCircle, LCircleMarker, LControlZoom, LPolyline, LLayerGroup, LControl, LControlLayers
	},

	data() {
		return {
			map: null,
			url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			center: [59.3294, 18.0686], //Sthlm
			zoom: 15,
			maxZoom: 18,
			bounds: [],
			ready: false,
			autoFit: false,
			
			tileProviders: [{
				name: 'Karta',
				visible: true,
				url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				attribution: null
			},{
				name: 'Satellit',
				visible: false,
				url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
				attribution: 'Tiles &copy; Esri &mdash'
			}],
			circle: {
				radius: 130,
				color: '#c60c0f6b',
				active: {
					radius: 130,
					color: '#c60c0f',
					fillcolor: '#346d92'
				}
			},
			trails: {
				color: 'grey'
			},
			activeCircles: [],
			polylines: {
				color: 'red',
				lineOne:  [
 					{ lng: -1.219482, lat: 47.41322 },
					{ lng: -1.571045, lat: 47.457809 },
					{ lng: -1.560059, lat: 47.739323 },
					{ lng: -0.922852, lat: 47.886881 },
					{ lng: -0.769043, lat: 48.231991 },
					{ lng: 0.395508, lat: 48.268569 },
					{ lng: 0.604248, lat: 48.026672 },
					{ lng: 1.2854, lat: 47.982568 },
					{ lng: 1.318359, lat: 47.894248 },
					{ lng: 1.373291, lat: 47.879513 },
					{ lng: 1.384277, lat: 47.798397 },
					{ lng: 1.329346, lat: 47.754098 },
					{ lng: 1.329346, lat: 47.680183 },
					{ lng: 0.999756, lat: 47.635784 },
					{ lng: 0.86792, lat: 47.820532 },
					{ lng: 0.571289, lat: 47.820532 },
					{ lng: 0.439453, lat: 47.717154 },
					{ lng: 0.439453, lat: 47.61357 },
					{ lng: -0.571289, lat: 47.487513 },
					{ lng: -0.615234, lat: 47.680183 },
					{ lng: -0.812988, lat: 47.724545 },
					{ lng: -1.054688, lat: 47.680183 },
					{ lng: -1.219482, lat: 47.41322 },
				]
			}
		}
	},

	methods: {

		alert(e) {
			console.dir(e)
			console.log("Wake up!")
			
		},

		...mapActions({
			initGeolocation: 'initGeolocation',
			stopGeolocation: 'stopGeolocation',
			addHeroToVenue: 'addHeroToVenue'
			
		}),

		mapReady() {
			this.map = this.$refs.myMap.leafletObject;
		},

		flyTo(coords) {
			this.map.flyTo(coords, 17)
		},

		zoomUpdated (zoom) {
			this.zoom = zoom;
    	},

		positionUpdated () {
			
			/* If todays venue day - Save position */
			// Bättre vi gör det i vuex


			/* Hero check */
			//console.log("Din position uppdaterades, vi kollar om du är en hjälte!")
			this.activeCircles.forEach((circle) => {
				//console.log("Din position " + this.position.lat + ", " + this.position.lng)
				const match = circle.bounds.contains([this.position.lat, this.position.lng])
				console.log(match)
				//console.log("Cirkel innehåller markör = " + match )
				if(this.isCircleOpen(circle.key) && match) {
					this.addHero(circle.key)
				}
				
			})
		},

		isCircleOpen(key) {
			return this.openVenue(this.currentVenue.find(c => c.key === key).datetime)
		},

		fitMarkers() {
			if(this.markers.length > 1) {

			const bounds = latLngBounds(this.markers.map(o => latLng(parseFloat(o.latitude), parseFloat(o.longitude))));
      		this.map.fitBounds(bounds)
			} else if (this.markers == 1) {
				this.map.setView([this.markers[0].latitude, this.markers[0].longitude], 15)
			} 
    	},

		circleReady(key) {
			//console.log(key.getBounds().contains(latLng({ lng: 18.073300211867345, lat: 59.32053434913633 })));
			//console.log(key.options.name)
			this.activeCircles.push({'key': key.options.name, 'bounds' : key.getBounds()});
		},

		toDate(date) {
			return moment(date).format('YYYY-MM-DD HH:MM')
		},

		openVenue(date) {
			return moment().isBetween(moment(date), moment(date).add(3, 'hours'));
		},

		addHero(key) {
			this.addHeroToVenue(key)
		}

	},

	watch: {
		markers() {
			
			/* for testing */
			//console.log("Got new markers");
			this.autoFit = true;
			/* testing ends */

			if(this.autoFit) {
				this.fitMarkers();
			}
		}
	},

	mounted() {
		//this.fitMarkers();
		//this.initTrails();
	},

	

	computed: {
		...mapGetters({
			markers: 'markers',
			venues: 'venues',
			currentVenue: 'currentVenue',
			position: 'position',
			watchid: 'watchid',
			//trails: 'trails',
			//spolylines: 'polylines',
			currentHeroes: 'currentHeroes'
		}),
	},

	async beforeMount() {
    	// HERE is where to load Leaflet components!
    	const { latLngBounds } = await import("leaflet/dist/leaflet-src.esm");
		this.ready = true;
	},

}
</script>

<style scoped>

	.map-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: calc(100vh - var(--padding) - var(--header) - var(--menu) - var(--padding) - 1px);
	}

	.leaflet-control {
		display: flex;
		align-items: center;
		background: white;
		border: 2px solid rgba(0,0,0,0.2);
		background-clip: padding-box;
		padding: 5px;
		border-radius: 5px;
	}

	/*.leaflet-right .leaflet-control-layers {
    	margin-right: 1px !important;
	}

	.leaflet-top .leaflet-control-layers {
		margin-top: 3px !important;
	}

	.leaflet-control-layers-expanded {
		color: red;
	}

	.leaflet-control-layers-toggle{ 
    width:auto;
    background-position:3px 50% ;
    padding:3px;
    padding-left:36px;
    text-decoration:none;
    line-height:36px;

	}*/

	.online_users {
		display: flex;
		flex-direction: row;
	}

	.online_users > * {
		margin-right: 6px;
		margin-bottom: 6px;
	}

	label {
		font-size: 12px;
		margin-right: 6px;
	}

	/*.buttons {
		display: flex; 
		flex-direction: row;
		justify-content: space-between; 
		align-items: flex-end;
		width: 100%;
	}*/
	button.pulse {
		/*background: rgba(255, 82, 82, 1);*/
  		box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
  		animation: pulse-red 2s infinite;
	}

	@keyframes pulse-red {
		0% {
			/*transform: scale(0.95);*/
			box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
		}
		
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
		}
		
		100% {
			/*transform: scale(0.95);*/
			box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
		}
	}


	

	@media only screen and (min-width: 600px) {
		/*button {
			margin-right: 6px;
			margin-bottom: 6px;
			padding: 8px 12px;
			font-size: 14px;
		}*/

		label {
			font-size: 14px;
		}
	}

	/* Flytta till global? */
	input[type=checkbox] {
		margin: 0 5px
	}

	/* Map modal */
	.map-modal {
		position: fixed;
		top: calc(var(--menu) + var(--header) + 1px);
		bottom: 0;
		left:0;
		right: 0;
		padding: 12px;
		background:rgba(218,197,170,0.8);
		z-index: 1200;
		text-align: center;
	}

	.map-modal div {
		padding-top: 50px;
		padding-bottom: 50px;
		background: var(--background);
	}

	/* Allmänt */
	.space-between {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
	}

	.button-extender {
		border-radius: 6px;
		background: #6ba7cc; 
		color:white;
	}

	@media only screen and (min-width: 600px) {
		.space-between {
			flex-direction: row;
		}
	}
		
		
	
</style>