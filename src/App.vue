<script>
import Header from '/src/components/Header.vue';
import Footer from '/src/components/Footer.vue';
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<template>
  <div id="app">
    <!-- NavBar -->
    <Header />
    <!-- Body -->
    <div class="container-fluid">
      <router-view></router-view>
      <Footer />
    </div>
    <!-- Footer -->
  </div>
</template>
<style scoped>
.container-fluid {
  margin-top: 80px;
  margin-bottom: 0px;
  height: 80vh;
}
</style>