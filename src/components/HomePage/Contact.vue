<template>
  <div class="Container">
    <div class="content">
      <h1>We <span class="love"></span> new friends!</h1>
      <p>
        We are really looking forward to seeing more creative people in our project and make this project useful for as many people as possible. If you already have some programming experience inPython and know how to use Git and Github to participate in open source projects you can simply visit our Github repository and make your creative changes! If you don't have any programming experience, don't worry, we have complete programming and git tutorials to help you easily get there.
      </p>
      <div class="buttons">
        <button>Tutorial</button>
        <button>FTH Project</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
.Container {
  display: flex;
  flex-direction: column;
  background: #FFF4E8;
  height: 70vh;
  padding: 10vh 15vw;
  align-items: center;
}


.love {
  width: 50px;
  height: 50px;
  display: inline-block;
  vertical-align: middle;
  background: url("~@/assets/img/love.svg");
  background-size: 50px 50px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align:center;
}

h1 {
  font-size: 600%;
  font-family: 'Times New Roman', Times, serif;
  color: #736359;
  margin-bottom: 3vh;
}

p {
  color: #736359;
  font-size: 1.5em;
  font-family: 'Times New Roman', Times, serif;
}

.buttons {
  margin-top: 3vh;
  width: 40vw;
  display: flex;
  justify-content: space-around;
}

button {
  background: #D6C4BE;
  border-radius: 10px;
  padding: 1vh 2vw;
  font-size: 200%;
  color: white;
  border: none;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 800;
  width: 16vw;
}

button:hover {
  background: #ee9611;
}

@media screen and (max-width: 750px){
  .Container {
    width: 100%;
    padding: 0;
  }
  .buttons{
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 1600px){
  h1 {
  font-size: 400%;
  font-family: 'Times New Roman', Times, serif;
  color: #736359;
  margin-bottom: 3vh;
  }

  p {
  color: #736359;
  font-size: 120%;
  font-family: 'Times New Roman', Times, serif;
  }

  button {
  background: #D6C4BE;
  border-radius: 10px;
  padding: 1vh 2vw;
  font-size: 130%;
  color: white;
  border: none;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 800;
  width: 16vw;
}
}
</style>
