<template>
  <div id='story-index'>
    <h1>STORIES</h1>
    <ul>
      <router-link
        v-for='story in stories' tag='li'
        v-bind:key='story.id'
        :to="{ name: 'Story', params: { id: story.id }}
        ">
        {{story.title}}
      </router-link>
    </ul>
  </div>
</template>

<script>
import Stories from './stories.json';
import moment from 'moment'

export default {
  data: () => ({
    stories: Stories,
  }),
};
</script>

<style>
  ul {
    list-style: none;
  }
</style>
