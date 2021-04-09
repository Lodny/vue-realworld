<template>
  <div id="app">
    <RwvHeader />
    <router-view></router-view>
    <RwFooter />
  </div>
</template>

<script>
import RwvHeader from '@/components/RwvHeader';
import RwFooter from '@/components/RwFooter';

export default {
  name: 'App',
  components: {
    RwvHeader,
    RwFooter,
  },
};
</script>

<style></style>
