<template>
  <div id="">
    <img
      v-if="isPhotoNormalPhoto"
      v-lazy="
        'https://s3.amazonaws.com/road-trip-blog/' +
          media.file +
          '-w' +
          imageWidth +
          '.jpeg'
      "
      alt=""
    />
    <vue-plyr v-if="isVideo">
      <video :src="url"></video>
    </vue-plyr>

    <Panorama v-if="isPano" :source="panoSource" :animationTime="200" />

    <figcaption>
      <span v-if="isPano"><b>Panorama! </b></span>{{ media.description }}
    </figcaption>
  </div>
</template>
<script>
import Panorama from 'vuejs-panorama'

export default {
  components: { Panorama },
  name: 'Media',
  data() {
    return {
      url: 'https://s3.amazonaws.com/road-trip-blog/' + this.media.file,
    }
  },

  props: ['media', 'imageWidth'],
  computed: {
    isVideo() {
      return this.media.contentType == 'video/x-m4v'
    },
    isPhotoNormalPhoto() {
      return this.isPhoto && !this.isPano
    },
    isPhoto() {
      return this.media.contentType == 'image/jpeg'
    },
    isPano() {
      return this.isPhoto && this.media.width / this.media.height > 1.7
    },
    panoSource() {
      return (
        'https://s3.amazonaws.com/road-trip-blog/' +
        this.media.file +
        '-w' +
        '2100' +
        '.jpeg'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.panorama {
  height: 600px !important;
  margin-bottom: 20px;
}
</style>
