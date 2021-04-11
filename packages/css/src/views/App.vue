<template>
  <div id="app">
    <div id="bg"></div>
    <nav>
      <router-link to="/background">背景</router-link>
      <router-link to="/layout">布局</router-link>
      <router-link to="text">文本</router-link>
      <router-link to="function">函数</router-link>
      <router-link to="/transition">动画</router-link>
      <router-link to="transform">变换</router-link>
      <router-link to="media-query">媒体查询</router-link>
    </nav>
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
