<template>
  <div class='inspector' ref="inspector">
    <story-index v-if='!storySelected' />

    <div v-if='story'>
      <Navbar :story="story"/>
      <main>
        <h1 class='title'>{{story.title}}</h1>
        <div class="body" v-html='story.body'> </div>
        <div class='photo' v-for='photo in story.photos' v-bind:key='photo.file'>
          <img :src="'https://s3.amazonaws.com/road-trip-blog/' + photo.file.split('.')[0] + '.' + imageWidth + 'w.jpg'" alt="">
          <figcaption>{{photo.description}}</figcaption>
        </div>
      </main>
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
  metaInfo() {
    if (this.story) {
      return {
        title: this.story.title,
        titleTemplate: '%s ← Katie and Cory go places together',
        meta: [
          { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'description', content: this.description },
        ],
      };
    }
    return {};
  },
  computed: {
    description() {
      if (this.story.description) {
        return this.story.description;
      }
      return `Our time in ${this.story.location}`;
    },
    ...mapGetters(['story']),
    storySelected() {
      return this.$route.params.id;
    },
    inspectorWidth() {
      return this.$refs.inspector.offsetWidth;
    },
    imageWidth() {
      return [700, 1200].find(el => this.inspectorWidth < el);
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
.body {
  text-align: left;
  padding: 0 1.5rem;
  font-size: 1.2rem;
}

.title {
  text-align: left;
  padding: 0 1.5rem;
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
