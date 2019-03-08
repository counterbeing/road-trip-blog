<template>
  <div id="">
    <h1>photos</h1>
    <div v-for='photo in photos' v-bind:key='photo.file'>
      <img :src="'https://s3.amazonaws.com/road-trip-blog/' + photo.file.split('.')[0] + '.700w.jpg'" alt="">{{photo.date}},  {{photo.file}}
    </div>
  </div>
</template>
<script>
import Photos from './photos.json';

export default {
  computed: {
    photos() {
      return Photos;
    },
  },

};
</script>

<style scoped>
  img {
    max-width: 100px;
  }
</style>
