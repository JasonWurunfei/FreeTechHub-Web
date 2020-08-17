<template>
  <div class="Activate">
    <form>
      <div class="inputbox">
        <label>password: </label>
        <input type="password" v-model="password" required=""/>

      </div>
      <div class="inputbox">
        <label>comfirm_password: </label>
        <input type="password" v-model="com_password" required=""/>
      </div>
      <button @click="submit">submit </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: "RestPassword",
    data() {
      return {
        password: '',
        com_password: '',
      }
    },
    methods: {
      submit() {
        axios.post("http://127.0.0.1:8000/user/resetpassword/", {
          "password": this.password,
          "id": this.$route.params.id
        })
      .then(res=> {
        console.log(res.data)
        // this.$router.push({name: "ShowBlogs"})
      })
      },
    },
  }
</script>
