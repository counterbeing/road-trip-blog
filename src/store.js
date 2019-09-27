import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentStory: null,
    stories: []
  },
  mutations: {
    setStory(state, story) {
      state.currentStory = story
    },
    setStories(state, stories) {
      state.stories = stories
    }
  },
  actions: {
    setStory: (context, payload) => {
      context.commit("setStory", payload)
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
})
