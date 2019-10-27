<template>
  <div class="parent">
    <router-link
      tag="div"
      class="child"
      :to="{ name: 'Story', params: { id: story.nextId } }"
    >
      Previous
    </router-link>
    <router-link tag="div" class="child" :to="{ name: 'Blog Index' }"
      >Index</router-link
    >
    <router-link
      tag="div"
      class="child"
      :to="{ name: 'Story', params: { id: story.previousId } }"
    >
      Next
    </router-link>
  </div>
</template>
<script>
export default {
  props: ['story'],
}
</script>
<style scoped>
.parent {
  display: flex;
  flex-wrap: no-wrap;
  align-content: space-evenly;
  padding: 0;
  text-align: center;
  user-select: none;
}
.child {
  background-color: #f4511e;
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 1em;
  transition: 0.2s;
  width: 30%;
}

@media (pointer: fine) {
  .child:hover {
    color: #2c3e50;
    background-color: #fff;
  }
}
@media (pointer: coarse) {
  .child:active {
    color: #2c3e50;
    background-color: #fff;
  }
}

@media screen and (prefers-color-scheme: dark) {
  @media (pointer: fine) {
    .child:hover {
      color: white;
      background-color: #111;
    }
  }
  @media (pointer: coarse) {
    .child:active {
      color: white;
      background-color: #111;
    }
  }
}
</style>
