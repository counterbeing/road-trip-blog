<template>
  <div class="inspector" ref="inspector">
    <story-index v-if="!storySelected" />

    <div v-if="story">
      <Navbar :story="story" />
      <main>
        <h1 class="title">{{ story.title }}</h1>
        <h2 class="title">
          <date-range :start="story.startDate" :end="story.endDate" />
        </h2>
        <div class="body" v-html="story.body"></div>
        <div
          class="photo"
          v-for="photo in story.photos"
          v-bind:key="photo.file"
        >
          <img
            v-lazy="
              'https://s3.amazonaws.com/road-trip-blog/' +
                photo.file.split('.')[0] +
                '-w' +
                imageWidth +
                '.webp'
            "
            alt=""
          />
          <figcaption>{{ photo.description }}</figcaption>
        </div>
      </main>
      <Navbar :story="story" class="mobile-hidden" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import StoryIndex from "./StoryIndex";
import Navbar from "./micro/Navbar";
import DateRange from "./micro/DateRange";

export default {
  components: { StoryIndex, Navbar, DateRange },
  data: () => ({}),
  methods: {
    ...mapActions(["setStory"])
  },
  metaInfo() {
    if (this.story) {
      return {
        title: this.story.title,
        titleTemplate: "%s ← Katie and Cory go places together",
        meta: [
          { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { name: "description", content: this.description }
        ]
      };
    }
    return {};
  },
  computed: {
    ...mapGetters(["story"]),

    description() {
      if (this.story.description) {
        return this.story.description;
      }
      return `Our time in ${this.story.location}`;
    },
    storySelected() {
      return this.$route.params.id;
    },
    inspectorWidth() {
      return this.$refs.inspector.offsetWidth;
    },
    imageWidth() {
      return [2100, 1600, 1200, 700, 250].find(el => this.inspectorWidth < el);
    }
  }
};
</script>
<style>
.inspector {
  text-align: left;
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
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1em;
}

@media only screen and (max-width: 700px) {
  .inspector {
    position: static;
    width: 100%;
  }
  .mobile-hidden {
    display: none !important;
  }
}
</style>
