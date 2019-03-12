<template>
  <div class='inspector'>
    <div v-if='storySelected'>
      <router-link :to="{name: 'Story', params: {id: story.previousId}}">Previous</router-link>
      <router-link to='/'>Index</router-link>
      <router-link :to="{name: 'Story', params: {id: story.nextId}}">next</router-link>
    </div>
    <div v-if='!storySelected'>
      <story-index />
    </div>
    <div v-if='storySelected'>
      <h1>{{story.title}}</h1>
      <div class="body" v-html='story.body'> </div>
      <div v-for='photo in story.photos' v-bind:key='photo.file'>
        <img :src="'https://s3.amazonaws.com/road-trip-blog/' + photo.file.split('.')[0] + '.700w.jpg'" alt="">
        <figcaption>{{photo.description}}</figcaption>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import StoryIndex from './StoryIndex';

export default {
  components: { StoryIndex },
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
  width: 50%;
  height: 100%;
  overflow-y: scroll;
}

figcaption {
  padding-bottom: 1em;
}

</style>
