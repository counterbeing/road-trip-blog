<template>
  <div id='story-index'>
    <h1>STORIES</h1>
    <ul>
      <router-link
        v-for='story in stories' tag='li'
        v-bind:key='story.id'
        :to="{ name: 'Story', params: { id: story.id }}
        ">
        {{story.title}} {{ story.date | moment}}
      </router-link>
    </ul>
  </div>
</template>

<script>
import moment from 'moment';
import Stories from './stories.json';

export default {
  data: () => ({
    stories: Stories,
  }),
  filters: {
    moment(date) {
      return moment(date).format('LL');
    },
  },
};
</script>

<style>
  ul {
    list-style: none;
  }
</style>
