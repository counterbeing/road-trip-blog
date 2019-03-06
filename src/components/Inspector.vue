<template>
  <div class='inspector'>
    <h1>{{story.title}}</h1>
    <div class="body" v-html='story.body'> </div>
    <div v-for='photo in story.photos' v-bind:key='photo.file'>
      <img :src="'https://s3.amazonaws.com/road-trip-blog/' + photo.file.split('.')[0] + '.700w.jpg'" alt="">
      <figcaption>{{photo.description}}</figcaption>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({

  }),
  methods: {
  },
  computed: {
    ...mapGetters(['story']),
  },
};
</script>
<style>

.inspector {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow-y: scroll;
}

figcaption {
  padding-bottom: 1em;
}

</style>
