<template>
  <div>
    <button @click="count++">
      <count-up :value="count">
        <template v-slot:prefix>前缀</template>
      </count-up>
    </button>
    <!-- <p>
      当使用 ref 定义变量时, 会带有一个 value 属性值,
      在导出给模板中使用时不需要手动导出 .value 属性, 内部会自动帮助我们导出
    </p> -->
  </div>
</template>

<script>
import { ref } from 'vue';
import CountUp from '../packages/CountUp.vue';

export default {
  components: {
    CountUp,
  },

  setup() {
    const count = ref(0);

    return {
      count,
    };
  },
};
</script>
