<template>
  <div id='story-index'>
    <h1>STORIES</h1>
    <ul>
      <router-link
        v-for='story in stories' tag='li'
        v-bind:key='story.id'
        :to="{ name: 'Story', params: { id: story.id }}
        ">
        <h2>{{story.title}}</h2>
        <small>{{ story.date | formatDate}}</small>
      </router-link>
    </ul>
  </div>
</template>

<script>
import Stories from './stories.json';

export default {
  data: () => ({
    stories: Stories,
  }),
};
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    padding: 1em;
    background-color: #FFF;
    transition: 0.2s;
  }

  li:hover {
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
