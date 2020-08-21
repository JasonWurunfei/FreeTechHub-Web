<template>
<div class="Activate">
</div>
</template>

<script>
import User from '@/assets/utils/models/User'
export default {
  name: "ChangeActivate",
  created() {
    var email = ''
    var type = "changeemail"
    User.validate(this.$route.params.activate, this.$route.params.id, type, this.$route.params.code2).then(res => {
      console.log(res)
      if (res === "true") {
        this.$router.push({
          name: "ShowBlogs"
        })
      } else {
        this.$confirm('Verification codes expire after 5 minutes, If you have create a account, only the code requested for your current address will work.', 'Warning', {
          confirmButtonText: 'Get again',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          type = "changeresend"
          User.validate(this.$route.params.activate, this.$route.params.id, type, email).then(() => {
            this.$message({
              type: 'success',
              message: 'Send successful!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'cancel'
          });
        });
      }
    })
  }
}
</script>
