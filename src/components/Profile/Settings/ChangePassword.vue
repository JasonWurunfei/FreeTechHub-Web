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
  bottom: 15%;
}
</style>
