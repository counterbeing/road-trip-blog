<template>
  <span>
    <span v-if="range">
      <time :datetime="start">{{ start | formatDate }}</time> to
      <time :datetime="end">{{ end | formatDate }}</time>
    </span>
    <span v-else>
      <time :datetime="start">{{ start | formatDate }}</time>
    </span>
  </span>
</template>

<script>
import { differenceInHours } from "date-fns"

export default {
  props: ["start", "end"],
  computed: {
    range() {
      if (!(this.start && this.end)) return false
      const diff = differenceInHours(new Date(this.end), new Date(this.start))
      return diff > 24
    }
  }
}
</script>
