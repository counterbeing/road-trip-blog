<template>
  <div id="blog">
    <Inspector />
    <Map />
    <Navbar v-if="story" :story="story" class="desktop-hidden" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Inspector from "./Inspector";
import Map from "./Map";
import Navbar from "./micro/Navbar";

export default {
  data: () => ({}),
  components: { Map, Inspector, Navbar },
  computed: {
    ...mapGetters(["story"])
  }
};
</script>
<style>
#blog {
}

@media only screen and (min-width: 700px) {
  .desktop-hidden {
    display: none !important;
  }
}
</style>
