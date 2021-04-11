<template>
  <div class="warpper">
    <side-bar />
    <main class="content">
      <Suspense>
        <template #default>
          <router-view :name="viewName" v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </template>
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </main>
  </div>
</template>

<script>
import { defineComponent, Suspense, onMounted, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
import SideBar from './components/SideBar.vue';
import RefDemo from './components/RefDemo.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    Suspense,
    RefDemo,
  },

  setup(props) {
    const route = useRoute();
    onMounted(() => {
      console.log('路由!', route);
    });

    onUpdated(() => {
      console.log('onUpdated>>>>>>>>>>>.');
    });
  },
});
</script>
