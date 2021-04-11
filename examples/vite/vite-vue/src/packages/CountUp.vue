<template>
  <div>
    <slot name="prefix"></slot>
    {{ value }}
  </div>
</template>

<script>
import { CountUp } from 'countup.js';
export default {
  name: 'CountUp',
  props: {
    value: Number,
  },
};
</script>
