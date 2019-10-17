<template>
  <div id="story-index">
    <h1>STORIES</h1>
    <ul class="story-menu">
      <router-link
        v-for="story in stories"
        tag="li"
        v-bind:key="story.id"
        :to="{ name: 'Story', params: { id: story.id } }"
      >
        <h2>{{ story.title }}</h2>
        <small>
          <date-range :start="story.startDate" :end="story.endDate" />
        </small>
      </router-link>
    </ul>
  </div>
</template>

<script>
import DateRange from "./micro/DateRange"
import { mapGetters } from "vuex"

export default {
  components: { DateRange },
  computed: {
    ...mapGetters(["stories"])
  },
  data: () => ({}),

  metaInfo: {
    title: "Index of Places",
    titleTemplate: "%s ← Katie and Cory go places together",
    meta: [
      { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "The index of places we've gone together. Links to click and explore the map."
      }
    ]
  }
}
</script>

<style>
#story-index {
  text-align: center;
}
ul.story-menu {
  list-style: none;
  padding: 0;
}
.story-menu li {
  padding: 1em;
  /* background-color: #fff; */
  transition: 0.2s;
  cursor: pointer;
}

@media (hover: hover) {
  .story-menu li:hover {
    background-color: #f4511e;
    color: white;
  }
}
@media (hover: none) {
  .story-menu li:active {
    background-color: #f4511e;
    color: white;
  }
}
.story-menu li:hover {
  background-color: #f4511e;
  color: white;
  cursor: pointer;
}
h2 {
  margin: 0;
}
small {
  margin-top: -20px;
}
</style>
