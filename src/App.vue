<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  async created() {
    const response = await fetch(
      "https://road-trip-blog.s3.amazonaws.com/storiesIndex.json"
    );

    const json = await response.json();
    this.setStories(json);
  },
  methods: {
    ...mapActions(["setStories"])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body {
  margin: 0;
  padding: 0;
}
</style>
