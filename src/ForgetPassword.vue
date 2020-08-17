<template>
  <div class="Activate">
    <form>
      <div class="inputbox">
        <label>email: </label>
        <input type="email" v-model="email" required=""/>
        <button @click="submit">submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: "ForgetPassword",
    data() {
      return {
        email: '',
      }
    },
    methods: {
      submit() {
        axios.post("http://127.0.0.1:8000/user/send_change/", {
          "email": this.email,
        })
      .then(res=> {
        console.log(res.data)
        this.$router.push({name: "Login"})
      })
      },
    },
    created() {
      alert("please enter your email")
    }
  }
</script>
