<template>
  <div class="Container" id="series">

    <div class="search">
      <div class="left">
        <h1 class="title1 text">SEARCH</h1>

        <div class="search-box text">
          <input class="search-text" type="text" placeholder="Search what you want">
          <img class="search-logo" src="@/assets/img/search-solid.svg">
        </div>

        <h1 class="title2 text">WHAT'S IN YOUR MIND</h1>

        <div class="buttons">

          <router-link tag="div" :to="{name: 'ShowBlogs'}">
            <button type="warning" round class="series-button">START A BLOG</button>
          </router-link>

          <router-link :to="{name: 'ShowSeries'}">
            <button type="warning" round class="series-button">START A SERIES</button>
          </router-link>

        </div>
      </div>
    </div>

    <div class="series">
      <h1>TOP TRENDING SERIES</h1>
      <div class="picture">

        <div class="blog">
          <div class="shadow"></div>
          <p class="view">View</p>
          <img src="@/assets/img/undraw_ideation_2a64.svg">
        </div>

        <div class="blog">
          <div class="shadow"></div>
          <p class="view">View</p>
          <img src="@/assets/img/undraw_good_team_m7uu.svg">
        </div>

        <div class="blog">
          <div class="shadow"></div>
          <p class="view">View</p>
          <img src="@/assets/img/undraw_experience_design_eq3j.svg">
        </div>

        <div class="blog">
          <div class="shadow"></div>
          <p class="view">View</p>
          <img src="@/assets/img/undraw_master_plan_95wa.svg">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Series"
  }
</script>

<style scoped>
.Container {
  display: flex;
  background: #FFF4E8;
  height: 100vh;
}

.Container h1 {
  color: #585858;
  font-size: 2em;
}

.search {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 5vw;
}

.left h1 {
  font-size: 500%;
  width: 90%;
  margin: 5vh 0;
  font-weight: 700;
  font-family: fantasy;
}

.text {
    padding-left: 2vw;
}

.series {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 5vw;
}

.series h1 {
  font-family: fantasy;
  font-size: 300%;
  font-weight: 700;
  margin-bottom: 2vh;
}

.picture {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
  justify-items: center;
  align-items: center;
}

.picture > div {
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  transition: 0.4s ease;
  text-align: center;
}

.picture img {
  width: 100%;
  height: 100%;
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  width: 100%;
  height: 100%;
  filter: opacity(0);
  display: flex;
  justify-content: center;
  align-items: center;
}

.blog:hover .shadow {
  filter: opacity(40%);
}

.blog:hover .view {
  opacity: 1;
}
.view {
  position: absolute;
  opacity: 0;
  color: white;
  font-size: 300%;
  font-weight: 500;
}

.blog {
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog:hover {
  width: 20vw;
  height: 25vh;
}

.buttons {
  margin-top: 7vh;
  width: 40vw;
  display: flex;
  justify-content: space-around;
}

button {
  background: #D6C4BE;
  border-radius: 10px;
  padding: 1.5vh 2vw;
  font-size: 100%;
  color: #736359;
  border: none;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 800;
  width: 15vw;
}

button:hover {
  background: #ee9611;
  border-radius: 10px;
  padding: 1.5vh 2vw;
  font-size: 100%;
  color: #736359;
  border: none;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 800;
  width: 15vw;
}
.search-logo{
  height: 10vh;
}

.search-box {
  display: flex;
  align-items: center;
  transition: 0.4s ease;
  width: 34vw;
  height: 5vh;
  position: relative;
}

.search-text {
  width: 0vw;
  background:none;  
  outline:none;  
  border:none;
  transition: 0.4s ease;
}

.search-box:hover .search-text {
  width: 34vw;
  border-bottom: solid 1vh #C56B47;
  transition: 0.4s ease;
}


@media screen and (max-width: 1120px) {
  .Container{
    width: 100%;
    display: grid;
    grid-template-areas:  'series'
                          'search';
    grid-template-columns: 100%;
    padding: 0;
  }
  .series{
    width: 100%;
    grid-area: series;
  }
  .search{
    width: 100%;
    grid-area: search;
    display: grid;
    grid-template-areas:  'title1 title2'
                          'search-box search-box'
                          'buttons buttons';
    grid-auto-columns: 50% 50%;
    justify-items: center;
    align-items: center;
  }
  .title1{
    grid-area: title1;
  }
  .title2{
    grid-area: title2;
    word-wrap: break-word;
  }
  .search-box{
    grid-area: search-box;
  }
  .buttons{
    width: 100%;
    grid-area: buttons;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
@media screen and (max-width: 380px){
  .Container{
    width: 100%;
    display: grid;
    grid-template-areas:  'series'
                          'search';
    grid-template-columns: 100%;
    padding: 0;
  }
  .search{
    width: 100%;
    grid-area: search;
    display: grid;
    grid-template-areas:  'title1'
                          'title2'
                          'search-box'
                          'buttons';
    grid-auto-columns: 50% 50%;
    justify-content: center;
    align-items: center;
  }
  .picture{
    display: flex;
    flex-direction: column;
  }
  .buttons{
    width: 100%;
    grid-area: buttons;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
}
</style>
