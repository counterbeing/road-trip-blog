<template>
  <div id="">
    <h1>photos</h1>
    <div class='photo' v-for='photo in photos' v-bind:key='photo.file'>
      <img @click='copyDate(photo)' :src="'https://s3.amazonaws.com/road-trip-blog/' + photo.file.split('.')[0] + '.' + imageWidth + 'w.jpg'" alt=""/>
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
    imageWidth() {
      return '700';
    },
  },
  methods: {
    copyDate(photo) {
      const el = document.createElement('textarea');
      el.value = photo.date;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
  },

};
</script>

<style scoped>
  img {
    /* max-width: 100px; */
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .photo {
    width: 200px;
    height: 200px;
    float: left;
    display: inline;
  }
</style>
