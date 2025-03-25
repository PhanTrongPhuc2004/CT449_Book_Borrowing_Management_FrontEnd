<script>
// import NavBar from '../components/NavBar.vue';
// import Footer from '../components/Footer.vue';
export default {
  // components: {
  //   NavBar,
  //   Footer,
  // },
};
</script>
<template>
  <div id="app">
    <!-- NavBar -->
    <NavBar />
    <!-- Body -->
    <div class="container-fluid">
      <router-view></router-view>
    </div>
    <!-- Footer -->
    <Footer />
  </div>
</template>
<style scoped>
.container-fluid {
  margin-top: 80px;
  margin-bottom: 80px;
  min-height: calc(100vh - 180px);
}
</style>