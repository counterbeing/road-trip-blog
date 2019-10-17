<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  name: "App",
  async created() {
    const response = await fetch(
      "https://road-trip-blog.s3.amazonaws.com/storiesIndex.json"
    )

    const json = await response.json()
    this.setStories(json)
  },
  methods: {
    ...mapActions(["setStories"])
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media (prefers-color-scheme: dark) {
  body,
  #app {
    background-color: #111;
    color: #817575;
  }
  .leaflet-container {
    background: #111;
  }
  .leaflet-bar .leaflet-control-zoom-in,
  .leaflet-bar .leaflet-control-zoom-out {
    border-bottom: 1px solid black;
    background-color: #111;
    color: #f4511e;
  }
  .leaflet-control-attribution.leaflet-control {
    background-color: black;
  }
}
html,
body {
  margin: 0;
  padding: 0;
}
</style>
