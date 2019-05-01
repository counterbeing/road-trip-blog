<template>
  <span>
    <span v-if='range'>
      <time :datetime="start">{{start | formatDate}}</time> to
      <time :datetime="end">{{end | formatDate}}</time>
    </span>
    <span v-else>
      <time :datetime="start">{{start | formatDate}}</time>
    </span>
  </span>
</template>


<script>
import moment from 'moment';

export default {
  props: ['start', 'end'],
  computed: {
    range() {
      if (!(this.start && this.end)) return false;
      return moment.duration(moment(this.end).diff(this.start)).asHours() > 24;
    },
  },
};
</script>
