import Vue from "vue";
import Router from "vue-router";
import Blog from "@/components/Blog";
import Photos from "@/components/Photos";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/photos",
      name: "Photos",
      component: Photos
    },
    {
      path: "/",
      name: "Blog Index",
      component: Blog
    },
    {
      path: "/:id",
      name: "Story",
      component: Blog
    }
  ]
});
