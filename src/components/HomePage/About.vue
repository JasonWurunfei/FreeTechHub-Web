<template>
  <div class="about" id="about">
    <div class="center">
      <img id="title" src="@/assets/img/about.svg">
    </div>

    <div class="about-under">
      <div class="img1">
        <img src="@/assets/img/undraw_annotation_7das.svg">
      </div>

      <div class="text1">
        <div class="content">
          <strong>WE ARE</strong> 
          software engineering students and trying our best to make the best of our free time. We love to share knowledge with everyone and hopefully contribute our work to a better society
        </div>
      </div>

      <div class="text2">
        <div class="content">
          <strong>WE WANT</strong>
          to share our knowledge and experiences with anyone who is enthusiastic about technology, to learn from the experienced, to make friends with people that are willing to share.
        </div>
      </div>

      <div class="img2"><img src="@/assets/img/undraw_hang_out_h9ud.svg"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "About"
  }
</script>

<style scoped>
.about {
  width: 100%;
  height: 100vh;
  background: #D6C1B4;
  padding: 2vh 5vw 5vw 2vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.center {
  text-align: center;
  width: 45vw;
}

#title {
  background-color: #D6C1B4;
  height: 100%;
}

.text1 {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
}

.text2 {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
}

.content {
  color: #736359;
  background: #EFDAC3;
  height: 93%;
  width: 93%;
  padding: 10%;
  font-size: 1.3rem;
  font-weight: 600;
}

.content strong {
  font-size: 130%;
}

.about img {
  width: 100%;
  height: 100%;
  background-color: white;
}

.about-under {
  margin: 0;
  margin-top: 2vh;
  display: grid;
  grid-template-columns: 30vw 30vw;
  grid-template-rows: 40vh 40vh;
}


@media screen and (max-width: 1120px){
  .about {
    width: 100%;
    background: #D6C1B4;
    padding: 0;
    height: 100%;
  }
  .center{
    width: 100%;

    padding-top: 2vh;
    padding-bottom: 50px;
  }
  .about-under{
    display: grid;
    grid-template-areas: 'img1'
                         'text1'
                         'img2'
                         'text2';
    grid-template-columns: 100%;
    justify-items: center;
    align-items: center;
    grid-template-columns: auto;
    grid-template-rows: auto;
    font-size: auto;
    grid-row-gap: 20px;
  }
  .about img {
    width: 100%;
    height: 100%;
  }
  .about-under > div:nth-child(1) {
    grid-area: img1;
    width: 100%;
  }
  .about-under > div:nth-child(2) {
    grid-area: text1;
    padding: 0;
  }
  .about-under > div:nth-child(3) {
    grid-area: text2;
    padding: 0;
    width: 100%;

  }
  .about-under > div:nth-child(4) {
    grid-area: img2;
    display: block;
    width: 100%;
    padding-bottom: 20px;
  }
}
@media screen and (max-width: 484px){
  .about-under{
    padding: 0;
  }
}

@media screen and (max-width: 1600px){
  .content {
    color: #736359;
    background: #EFDAC3;
    height: 93%;
    width: 93%;
    padding: 10%;
    font-size: 1rem;
    font-weight: 600;
  }

  .content strong {
    font-size: 130%;
  }
}
</style>
