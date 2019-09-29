<template>
  <div id="">
    <img
      v-if="isPhoto"
      v-lazy="
        'https://s3.amazonaws.com/road-trip-blog/' +
          media.file +
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
    isVideo() {
      return this.media.contentType == "video/x-m4v"
    },
    isPhoto() {
      return this.media.contentType == "image/webp"
    },
    isPano() {
      return this.isPhoto && this.media.width / this.media.height > 1.5
    },
    photoResource() {
      return this.media.file.split + "-w" + this.imageWidth + ".webp"
    }
  }
}
</script>
<style lang="scss" scoped></style>
