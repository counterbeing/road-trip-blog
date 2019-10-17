<template>
  <div id="blog">
    <Inspector />
    <Map />
    <Navbar v-if="story" :story="story" class="desktop-hidden" />
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import Inspector from "./Inspector"
import Map from "./Map"
import Navbar from "./micro/Navbar"

export default {
  data: () => ({}),
  components: { Map, Inspector, Navbar },
  computed: {
    ...mapGetters(["story"])
  }
}
</script>
<style>
#blog {
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
  width: 100%;
}
@media only screen and (min-width: 700px) {
  .desktop-hidden {
    display: none !important;
  }
}
@media only screen and (max-width: 700px) {
  #blog {
    display: block;

    flex-direction: row;
  }
}
</style>
