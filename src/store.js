import Vue from 'vue';
import Vuex from 'vuex';
import Stories from './components/stories.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentStory: null,
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
    story: state => Stories.find(s => state.currentStory === s.id),
  },
});
