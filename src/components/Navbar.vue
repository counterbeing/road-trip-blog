<template>
  <div class='parent'>
    <router-link
      tag='div'
      class='child'
      :to="{name: 'Story', params: {id: story.previousId}}">
      Previous
    </router-link>
    <router-link tag='div' class='child' to='/'>Index</router-link>
    <router-link
      tag='div'
      class='child'
      :to="{name: 'Story', params: {id: story.nextId}}">
      Next
    </router-link>
  </div>
</template>
<script>
export default {
  props: ['story'],
  // data: () => ({ }),
};
</script>
<style scoped>
  .parent {
    display: flex;
    flex-wrap: no-wrap;
    align-content: space-evenly;
    padding: 0;
  }
  .child {
    font-weight: bold;
    width: 30%;
    padding: 1em;
    background-color: #f4511e;
    color: white;
    transition: 0.2s;
  }

  .child:hover {
    color: #2c3e50;
    background-color: #FFF;
    cursor: pointer;
  }
</style>
