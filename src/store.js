import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentStory: {},
  },
  mutations: {
    setStory(state, story) {
      state.currentStory = story;
    },
  },
  actions: {
    setStory: (context, payload) => context.commit('setStory', payload),
  },
  getters: {
    story: state => state.currentStory,
  },
});
