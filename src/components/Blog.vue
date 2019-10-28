<template>
  <div id="blog">
    <Inspector />
    <Map />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Inspector from './Inspector'
import Map from './Map'

export default {
  data: () => ({}),
  components: { Map, Inspector },
  computed: {
    ...mapGetters(['story']),
  },
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
