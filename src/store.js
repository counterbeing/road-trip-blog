import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentStory: null,
    stories: []
  },
  mutations: {
    setStory(state, story) {
      state.currentStory = story;
    },
    setStories(state, stories) {
      state.stories = stories;
    }
  },
  actions: {
    setStory: async (context, payload) => {
      if (!payload) return;
      const response = await fetch(
        `https://road-trip-blog.s3.amazonaws.com/${payload}.json`
      );
      const json = await response.json();
      context.commit("setStory", json);
    },

    setStories: (context, payload) => context.commit("setStories", payload)
  },
  getters: {
    story: state => state.currentStory,
    stories: state =>
      state.stories.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      )
  }
});
