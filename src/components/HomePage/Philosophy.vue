<template>
  <div class="philosophy">
    <div class="left">
      <img src="@/assets/img/warm.jpg">
    </div>

    <div class="right">
      <h1>Our philosophy</h1>
      <div class="item">
        <img src="@/assets/img/天平.svg" alt="qq">
        <strong>LESS IS MORE</strong>
      </div>
      <div class="item">
        <img src="@/assets/img/book.svg" alt="">
        <strong>HIGH BAND WIDTH BEATS LOW BAND WIDTH</strong>
      </div>
      <div class="item">
        <img src="@/assets/img/心.svg" alt="">
        <strong>SHARING IS CARING</strong>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Philosophy"
  }
</script>

<style scoped>
.philosophy {
  background: #FFFFFF;
  display: flex;
  padding: 2em;
}

.philosophy .left {
  flex: 2;
}

.philosophy .right {
  flex: 1;
  padding-left: 2em;
}

.right {
  display: flex;
  flex-direction: column;
  padding: 5vh 5vw;
}

.right img {
  width: 9vw;
  vertical-align: middle;
}

.philosophy img {
  max-width: 100%;
  height: auto;
  padding: 5vh;
}

.right h1 {
  font-size: 340%;
  color: #C56B47;
  align-self: center;
}

.item {
  color: #A8364C;
  font-size: 140%;
  font-weight: 900;
  display: flex;
  align-items: center;
}
@media screen and (max-width: 516px){
  .philosophy{
    display: flex;
    flex-direction: column;
  }
}

@media screen and (max-width: 1600px){
  .right {
  display: flex;
  flex-direction: column;
  padding: 5vh 5vw;
}

.right img {
  width: 9vw;
  vertical-align: middle;
}

.philosophy img {
  max-width: 100%;
  height: auto;
  padding: 5vh;
}

.right h1 {
  font-size: 300%;
  color: #C56B47;
  align-self: center;
}
}
</style>
