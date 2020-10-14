<template>
  <div class="Container" id="discussion">

    <div class="content">
      <div>
        <h1>PUT OUR HEADS TOGETHER</h1>
        <p>
          We are easily fulling into our own logic trap and often not worthwhile spending our entire wonderful sunday
          afternoon tp spot it.Having a fresh point of view can make a big difference.
        </p>
      </div>
      <button type="warning" round class="button" @click="goQuestions">Join the discussion</button>
    </div>

    <div class="side">
      <img id="side-pic" src="@/assets/img/DiscussionRight.svg">
    </div>

  </div>
</template>

<script>
  export default {
    methods: {
      goQuestions() {
        this.$router.push({name: "ShowQuestions"})
      }
    }
  }
</script>

<style scoped>
.Container {
  display: flex;
  flex-direction: row;
  background: #D6C1B4;
  padding: 5vh 0 5vw 5vw;
  height: 100vh;
}

.side {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 7vw;
  position: relative;
}

#side-pic {
  margin: 0;
  padding: 0;
  height: 100%;
}

h1 {
  font-size: 450%;
  font-weight: 700;
  color: white;
  font-family:Georgia, 'Times New Roman', Times, serif;
  width: 80%;
}

p {
  width: 80%;
  color: white;
  font-size: 250%;
  font-family:'Times New Roman', Times, serif
}

.button {
  background: #FFF4E8;
  border-radius: 35px;
  padding: 1vh 2vw;
  font-size: 2em;
  border: none;
  color: #585858;
  position: absolute;
  top: 110%;
  left: 25%;
}

.button:hover {
  background: #ee9611;
  border-radius: 35px;
  padding: 1vh 2vw;
  font-size: 2em;
  border: none;
  color: white;
  position: absolute;
  top: 110%;
  left: 25%;
}

@media screen and (max-width: 1120px){
  .Container{
    width: 100%;
    display: grid;
    grid-template-areas: 'img'
                          'content';
    padding: 0;
  }
  .Container > div:nth-child(2) {
    padding: 0;
    flex: 0;
  }
  .content{
    grid-area: content;
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 1600px){
    h1 {
    font-size: 350%;
    font-weight: 700;
    color: white;
    font-family:Georgia, 'Times New Roman', Times, serif;
    width: 80%;
    }

    p {
    width: 80%;
    color: white;
    font-size: 200%;
    font-family:'Times New Roman', Times, serif
    }
}
</style>
