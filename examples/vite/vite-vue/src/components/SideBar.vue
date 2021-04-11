<template>
  <nav>
    <router-link to="ref">Ref</router-link>
    <router-link to="fragment">Fragment</router-link>
  </nav>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBar',
  setup() {
    const msg = ref('msg');

    return {
      msg,
    };
  },
});
</script>

<style lang="css">
nav {
  height: 100%;
}

a {
  text-decoration: none;
  color: #333;
  font-size: 13px;
}

a:active,
a:link,
a:hover,
a:visited {
  color: #0ae;
}

nav a {
  display: inline-block;
  width: 100%;
  padding: 8px;
}
</style>
