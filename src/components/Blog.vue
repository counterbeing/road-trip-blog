<template>
  <div id='blog'>
    <Map />
    <Inspector />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import Map from './Map';
import Inspector from './Inspector';
// import Stories from './stories.json';

export default {
  data: () => ({ }),
  components: { Map, Inspector },
  computed: { },
  methods: {
    ...mapActions(['setStory']),
  },
  watch: {
    $route(to) {
      this.setStory(to.params.id);
    },
  },
};
</script>

<style>
  #blog {
  }
</style>
