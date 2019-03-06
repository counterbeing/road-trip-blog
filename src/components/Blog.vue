<template>
  <div id='blog'>
    <Map />
    <Inspector />
  </div>
</template>
<script>
import Map from './Map';
import Inspector from './Inspector';

export default {
  components: { Map, Inspector },
  data: () => ({ }),

};
</script>

<style>
  #blog {
  }
</style>
