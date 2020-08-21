<template>
  <div>
    <div id class="box">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <div id class="inputbox">
          <el-form-item label="OldPassword" prop="oldpass">
            <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div id class="inputbox">
          <el-form-item label="NewPassword" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div id class="inputbox">
          <el-form-item label="Confirm" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">submit</el-button>
        </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import User from '@/assets/utils/models/User'
export default {
  name: 'ChangePassword',
  data() {
    var validateOldpass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your oldpassword'));
      } else {
        User.checkpassword(value).then(res => {
          if (res == "false") {
            callback(new Error('The old password is incorrect'));
          } else {
            callback();
          }
        })
      }
    };
    var validatePass = (rule, value, callback) => {
      var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,14}');
      if (value === '') {
        callback(new Error('Please enter your password'));
      } else if(reg.test(value)===false){
        callback(new Error('a minimum of 3 character sets from these classes: [letters], [numbers], [special characters]'));
      }else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please type your new password again.'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('The two passwords you typed do not match.'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass:'',
        pass : '',
        checkPass : '',
      },
      rules: {
        oldpass: [{
          validator: validateOldpass,
          trigger: 'blur'
        }],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
    }
  };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          User.changepassword(this.ruleForm.oldpass, this.ruleForm.pass).then(() => {
            this.$notify({
              title: 'Successfully changed',
              type: 'success'
            });
            this.$router.push({
              name: "Login"
            })
          })
        } else {
          this.$message({
            showClose: true,
            message: 'Please fill out the form correctly',
            type: 'error'
          });
          return false;
        }
      });
    },
  },
}

</script>

<style scoped>
.box {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  /* background: #d2e9f3; */
  bottom: 15%;
}
/* .box div{
  display: flex;
  justify-content: center;
}
.box div a {
  margin: 0 0 30px 0;
  padding-right: 10px;
  padding-left: 10px;
  color: black;
  text-align: center;
  font-size: 30px;
  border: border;
  border-right: 1px solid black;
}
.box div a:nth-child(3){
  border: none;
}
.box .inputbox {
  position: relative;
  width: 50%;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box .inputbox input {
  width: 70%;
  padding: 10px 0;
  font-size: 16px;
  color: #979eff;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: 2px solid #979eff;
  border-radius: 10px;
  outline: none;
  background: transparent;
}
.box .inputbox label{
  position: relative;
	top: 0;
	left: -2%;
	padding: 10px 0;
	letter-spacing: 1px;
	color: black;
  font-size: 25px;
}
.box button[type="submit"] {
  border: none;
  color: #ffffff;
  background-color: #979eff;
  font-size: 30px;
  padding: 10px 20px;
  border-radius: 30px;
  left: 50%;

} */
</style>
