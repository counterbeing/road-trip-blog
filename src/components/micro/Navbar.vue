<template>
  <div class="parent" :class="{ hidden: !show }">
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
  props: ['story', 'show'],
}
</script>
<style scoped>
.nav-container {
  transform: translate3d(0, 0, 0);
}
.parent.hidden {
  transform: translate3d(0, -100%, 0);
}
.parent {
  z-index: 10;
  display: flex;
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
  position: fixed;
  top: 0;
  flex-wrap: no-wrap;
  align-content: space-evenly;
  padding: 0;
  text-align: center;
  user-select: none;
  width: 33.333%;
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

@media only screen and (max-width: 700px) {
  .parent {
    width: 100%;
  }
}
</style>
