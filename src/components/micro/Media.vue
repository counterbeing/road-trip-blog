<template>
  <div id="">
    <img
      v-if="isPhoto"
      v-lazy="
        'https://s3.amazonaws.com/road-trip-blog/' +
          media.file.split('.')[0] +
          '-w' +
          imageWidth +
          '.webp'
      "
      alt=""
    />
    <vue-plyr v-if="isVideo">
      <video :src="url"></video>
    </vue-plyr>

    <figcaption>{{ media.description }}</figcaption>
  </div>
</template>
<script>
export default {
  name: "Media",
  data() {
    return {
      url: "https://s3.amazonaws.com/road-trip-blog/" + this.media.file
    }
  },

  props: ["media", "imageWidth"],
  computed: {
    resource() {
      if (this.isPhoto) return this.photoResource
      return;
    },
    isVideo() {
      return !this.isPhoto
    },
    isPhoto() {
      return this.media.file.split(".")[1] == "jpg"
    },
    photoResource() {
      return this.media.file.split(".")[0] + "-w" + this.imageWidth + ".webp"
    }
    // options() {
    //   {
    //     ("http://static.smartisanos.cn/common/video/t1-ui.mp4")
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped></style>
