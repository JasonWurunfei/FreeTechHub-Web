<template>
<div class="Register">
  <form>
    <table>
      <tr>
        <td>Username：</td>
        <td><input type="text" v-model= 'username' @blur="validate_username" required=""/></td>
        <td id="username"></td>
      </tr>

      <tr>
        <td>Email：</td>
        <td><input type="email" v-model="email" @blur="validate_email" required=""/></td>
        <td id="email"></td>
      </tr>

      <tr>
        <td>Password1：</td>
        <td><input type="password" v-model="password1"  @blur="validate_password" required=""/></td>
        <td id="password1"></td>
      </tr>
      <tr>
        <td>Password2：</td>
        <td><input type="password" v-model="password2"  @blur="validate_password2" required=""/></td>
        <td id="password2"></td>
      </tr>
      <button @click="submit">submit</button>
    </table>
  </form>
</div>
</template>

<script>
import {login} from '@/assets/utils/auth'
import axios from 'axios'

export default {
  Name: "Register",
  data() {
    return {
      username: '',
      email: '',
      password1: '',
      password2: '',
    }
  },
  methods: {
    submit() {
      if (this.validate_email() && this.validate_username() && this.validate_password() && this.validate_password2()) {
        axios.post("http://127.0.0.1:8000/user/sendcode/", {
            "username": this.username,
            "email": this.email,
            "password": this.password1,
          })
          .then(res => {
            console.log(res.data)
            login(this.username, this.password1)
            this.$router.push({name: "ShowBlogs"})
          })
      } else {
        console.log(1);
        event.preventDefault();
      }
    },
    validate_username() {

      if (this.username.length > 10 || this.username.length < 1) {
        document.getElementById("username").innerHTML = "<font color='red' size='3px'>Length must be between 1 and 10 characters</font>"
        return false
      }
      else {
        document.getElementById("username").innerHTML = "<font color='green' size='3px'>√</font>"
        return true
      }

    },
    validate_required(field, alerttxt) {
      if (field == null || field == "") {
        alert(alerttxt);
        return false
      } else {
        return true
      }
    },
    validate_email() {
      var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      //console.log(username);
      if (this.validate_required(this.email, "Email must be filled out!") && this.email.search(emailReg) != -1) {
        document.getElementById("email").innerHTML = "<font color='green' size='3px'>√</font>";
        return true
      } else {
        document.getElementById("email").innerHTML = "<font color='red' size='3px'>email format is error</font>";
        return false
      }
    },
    validate_password() {
      var word = this.password1.trim();
      var count = 0;
      // var a = 0,b = 0,c = 0;
      if (/[0-9]/.test(word)) {
        count++;
      }
      if (/[A-Za-z]/.test(word)) {
        count++;
      }
      if (/[^0-9A-Za-z]/.test(word)) {
        count++;
      }
      if (this.validate_required(this.password1, "password must be filled out!") && count >= 3 && this.password1.length >= 8 && this.password1.length <= 14) {
        document.getElementById("password1").innerHTML = "<font color='green' size='3px'>√</font>";
        return true
      }
      else {
        document.getElementById("password1").innerHTML = "<font color='red' size='3px'>password format is error</font>";
        return false
      }

    },
    validate_password2() {
      if (this.validate_required(this.password2, "password must be filled out!") && this.password1 === this.password2) {
        document.getElementById("password2").innerHTML = "<font color='green' size='3px'>√</font>";
        return true
      } else {
        document.getElementById("password2").innerHTML = "<font color='red' size='3px'>password format is error</font>";
        return false
      }
    }

  }
}
</script>
