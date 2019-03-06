<template>
  <div class='map-container'>
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution"/>
      <l-marker v-for='(place, index) in places'
        @click='updateInspector(index)'
        :lat-lng="place.latlng"
        :key='index'>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
// import Inspector from '@/components/Inspector';
import L from 'leaflet';
import Stories from './stories.json';
// import store from '../store';


export default {
  name: 'Map',
  // components: { Inspector },
  data() {
    return {
      placeIndex: null,
      zoom: 3,
      center: L.latLng(35.57369428380629, -97.82369995593741),
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
    };
  },
  computed: {
    places() {
      return Stories.map(story => ({
        latlng: L.latLng(story.lat, story.lng),
      }));
    },
  },
  methods: {
    updateInspector(placeIndex) {
      this.placeIndex = placeIndex;
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
  },
};
</script>

<style>
@import 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.css';
.map-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.leaflet-container {
  width: 100%;
  height: 100%;
}
</style>
