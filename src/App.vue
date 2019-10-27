<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  async created() {
    const response = await fetch(
      'https://road-trip-blog.s3.amazonaws.com/storiesIndex.json'
    )

    const json = await response.json()
    this.setStories(json)
  },
  methods: {
    ...mapActions(['setStories']),
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  color: #f4511e;
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

  .leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive {
    filter: brightness(70%);
  }
}

::-webkit-scrollbar {
  background-color: #111;
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background: #f4511e;
}
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
body {
  display: flex;
  flex: 1;
}
#app {
  width: 100%;
}
</style>
