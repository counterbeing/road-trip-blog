<template>
  <div id='story-index'>
    <h1>STORIES</h1>
    <ul>
      <li v-for='story in stories'></li>
      <router-link v-for='story in stories' tag='li' :to="{ name: 'Story', params: { id: story.id }}">{{story.title}}</router-link>  
    </ul>
  </div>
</template>

<script>
import Stories from './stories.json'

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
