<template>
  <div id="blog">
    <Inspector />
    <Map />
    <Navbar v-if="story" :story="story" class="desktop-hidden" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Inspector from "./Inspector";
import Map from "./Map";
import Navbar from "./micro/Navbar";

export default {
  data: () => ({}),
  components: { Map, Inspector, Navbar },
  computed: {
    ...mapGetters(["story"])
  },

  methods: {
    ...mapActions(["setStory"])
  },

  // beforeRouteEnter(to, from, next) {
  //   console.log("ENTER");
  //   if (to.params.id) {
  //     this.setStory(to.params.id);
  //   } else {
  //     this.setStory(null);
  //   }
  //   next();
  // },
  //
  // beforeRouteUpdate(to, from, next) {
  //   console.log("UPDATE");
  //   if (to.params.id) {
  //     this.setStory(to.params.id);
  //   } else {
  //     this.setStory(null);
  //   }
  //   next();
  // }

  watch: {
    $route(to) {
      // console.log(to);
      this.setStory(to.params.id);
    }
  },
  mounted() {
    this.setStory(this.$route.params.id);
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
