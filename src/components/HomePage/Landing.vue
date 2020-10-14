<template>
  <div class="landing">
    <div class="shadow"></div>
    <img src="@/assets/img/landing.jpg">
    <h1 class="slogan">The free land of technology</h1>
  </div>
</template>

<script>
  export default {
    name: "Landing",
  }
</script>

<style scoped>
.landing {
  position: relative;
  padding: 0;
  background: linear-gradient(to left, #ba7453, #d1a884);
  width: 100%;
  height: 91vh;
  text-align: center;
}

.landing img {
  height: 80%;
  width: 90%;
}

.shadow {
  position: absolute;
  top: 0;
  left: 5%;
  background-color: black;
  width: 90%;
  height: 80%;
  filter: opacity(40%);
}

.slogan {
  position: absolute;
  bottom: 10%;
  left: 12%;
  top: 57%;
  color: white;
  font-size: 90px;
  font-weight: 700;
}
</style>
