<template>
  <div class='inspector'>
    <story-index v-if='!storySelected' />

    <div v-if='storySelected'>
      <Navbar :story="story"/>
      <h1>{{story.title}}</h1>
      <div class="body" v-html='story.body'> </div>
      <div class='photo' v-for='photo in story.photos' v-bind:key='photo.file'>
        <img :src="'https://s3.amazonaws.com/road-trip-blog/' + photo.file.split('.')[0] + '.1200w.jpg'" alt="">
        <figcaption>{{photo.description}}</figcaption>
      </div>
      <Navbar :story="story"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import StoryIndex from './StoryIndex';
import Navbar from './Navbar';

export default {
  components: { StoryIndex, Navbar },
  data: () => ({

  }),
  methods: {
  },
  computed: {
    ...mapGetters(['story']),
    storySelected() {
      return this.$route.params.id;
    },
  },
};
</script>
<style>

.inspector {
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  overflow-y: scroll;
}

.photo {
  width: 100%;
}

.photo img {
  width: 100%;
}

figcaption {
  padding-bottom: 1em;
}

</style>
