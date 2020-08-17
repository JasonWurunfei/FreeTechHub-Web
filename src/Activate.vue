<template>
  <div class="Activate">
    <p>Successful verification</p>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: "Activate",
    created(){
        axios.post("http://127.0.0.1:8000/user/register/", {
          "code": this.$route.params.activate,
          "user_id":this.$route.params.id,
        })
      .then(res=>{
        console.log(res.data)
        this.$router.push({name: "ShowBlogs"})
      })

    }
  }
</script>
