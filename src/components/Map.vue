<template>
  <div class="map-container">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="mapSource.url" :attribution="mapSource.attribution" />
      <l-marker
        v-for="(place, index) in places"
        @click="updateInspector(place.story)"
        :lat-lng="place.latLng"
        :key="index"
      >
      </l-marker>
      <l-marker
        :icon="cmarker"
        v-for="photo in photos"
        :lat-lng="photo.latLng"
        v-bind:key="photo.file"
      >
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet'
import min from 'lodash/min'
import max from 'lodash/max'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Map',
  data() {
    return {
      cmarker: L.icon({
        // eslint-disable-next-line global-require
        iconUrl: require('../../public/dot.png'),
        iconSize: [20, 20],
        // eslint-disable-next-line global-require
        shadowUrl: require('../../public/dot-shadow.png'),
        shadowSize: [20, 20],
        shadowAnchor: [8, 8],
      }),
      placeIndex: null,
      zoom: 3,
      center: L.latLng(35.57369428380629, -97.82369995593741),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
    }
  },
  computed: {
    ...mapGetters(['story', 'stories']),
    places() {
      return this.stories.map(story => ({
        story,
        latLng: L.latLng(story.lat, story.lng),
      }))
    },
    mapSource() {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return {
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      } else {
        return {
          url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attribution:
            'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
        }
      }
    },
    photos() {
      if (!this.story || !this.story.photos) return []
      return this.story.photos
        .filter(p => p.lat)
        .map(photo => ({
          photo,
          latLng: L.latLng(photo.lat, photo.lng),
        }))
    },
    photoBounds() {
      const latitudes = this.photos.map(p => p.latLng.lat)
      const longitudes = this.photos.map(p => p.latLng.lng)
      const corner1 = L.latLng(max(latitudes), max(longitudes))
      const corner2 = L.latLng(min(latitudes), min(longitudes))
      return L.latLngBounds(corner1, corner2)
    },
    storyBounds() {
      const latitudes = this.places.map(p => p.latLng.lat)
      const longitudes = this.places.map(p => p.latLng.lng)
      const corner1 = L.latLng(max(latitudes), max(longitudes))
      const corner2 = L.latLng(min(latitudes), min(longitudes))
      return L.latLngBounds(corner1, corner2)
    },
  },
  watch: {
    story() {
      this.updateMapBounds()
    },
  },
  mounted() {
    // Vue.nextTick(function() {
    //   this.updateMapBounds()
    // });
  },
  methods: {
    updateMapBounds() {
      if (!this.story) {
        this.$refs.map.mapObject.fitBounds(this.storyBounds, {
          padding: [1, 1],
          maxZoom: 12,
          animate: true,
        })
      } else {
        this.$refs.map.mapObject.fitBounds(this.photoBounds, {
          padding: [1, 1],
          maxZoom: 12,
        })
      }
    },
    updateInspector(story) {
      this.$router
        .push({ name: 'Story', params: { id: story.id } })
        .catch(err => {})
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
  },
}
</script>

<style>
@import 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.css';

.map-container {
  flex: 2;
}
.leaflet-container {
  width: 100%;
  height: 100%;
}

@media only screen and (max-width: 600px) {
  .map-container {
    pointer-events: none;
    position: static;
    width: 100%;
    height: 400px;
  }
}
</style>
