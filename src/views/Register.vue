<!-- /* <style scoped>
  h2{
    text-align: center;
    padding: 30px;
    font-size: 18px;
  }
  #chart_example{
    width: 50%;
    height: 500px;
    border: 1px solid red;
    margin: 0 auto;
  }
</style>
<template>
  <div>
    <h2>vue中插入Echarts示例</h2>
    <div id="chart_example">

    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {}
    },
    mounted() {
      // let this_ = this;
      let myChart = echarts.init(document.getElementById('chart_example'));
      let option = {
        color:['#4472C5','#ED7C30','#80FF80','#FF8096','#800080'],
        tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                        textStyle: {//------------此处更改表格中的字体颜色
                          fontSize: '12',
                          color:'#fff'
                        }
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]

      };
      myChart.setOption(option);

      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
    },

  }
</script> */ -->

<style scoped>
  h2{
    text-align: center;
    padding: 30px;
    font-size: 18px;
  }
  #chart_example{
    width: 200px;
    height: 200px;
    border: 1px solid red;
    margin: 0 auto;
  }
</style>
<template>
  <div >
    <div id="chart_example">

    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import User from '@/assets/utils/models/User'
  export default {
    data() {
      return {}
    },
    mounted() {
      var data = [
      ]
      console.log(data)
      var colorList = ['#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac']
      let myChart = echarts.init(document.getElementById('chart_example'));
      User.gettags() .then(res => {
         this.data = res
         console.log(this.data)
         let option = {
           series: [{
                  name: 'Blog type',
                  type: 'pie',
                  radius: ['40%', '55%'],
                  avoidLabelOverlap: true,
                  itemStyle: {
                      normal: {
                          color: function(params) {
                              return colorList[params.dataIndex]
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          length: 20,
                          length2: 20,
                          lineStyle: {
                              color: '#2478EC'
                          }
                      }
                  },

                  label: {
                      normal: {
                          formatter: function(params) {

                                  return(
                                      '{a|'+ params.name + "}\n{b|" + params.value + '}'
                                      )

                          },
                          show: true,
                          padding: [-30 , -30, 0, -30],
                          rich: {
                              a: {
                                  fontSize: 10,
                                  color: '#CFDCFF',
                                  textAlign: 'center'
                              },
                              b: {
                                  fontSize: 10,
                                  color: '#2AD0FF',
                                  height: 10,
                                  textAlign: 'center'
                              }

                          }

                      },

                  },

                  data: this.data

              }]

         };

               myChart.setOption(option);

               //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
               window.addEventListener('resize',function() {myChart.resize()});
      });

    },
    methods: {},
    watch: {},
    created() {

    }
  }
</script>




<!-- <template>
<div class="Register">
  <Navbar />
  <div class="box">
    <form>
      <div class="inputbox">
        <input type="text" v-model= 'username' @blur="validate_username" required=""/>
        <label>Username：</label>
        <p id="username"></p>
      </div>

      <div class="inputbox">
        <input type="email" v-model="email" @blur="validate_email" required=""/>
        <label>Email：</label>
        <p id="email"></p>
      </div>

      <div class="inputbox">
        <input type="password" v-model="password1"  @blur="validate_password" required=""/>
        <label>Password1：</label>
        <p id="password1"></p>
      </div>
      <div class="inputbox">
        <input type="password" v-model="password1"  @blur="validate_password2" required=""/>
        <label>Password1：</label>
        <p id="password2"></p>
      </div>
      <div class="buttongroup">
        <button @click="submit">submit</button>
        <router-link tag="button" to="/login">Login</router-link>
        <button @click="githubLogin">Github</button>
      </div>
    </form>
  </div>

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

<style scoped>
.Register{
	margin: 0;
	padding: 0;
  height: 100vh;
	font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
	width: 500px;
  height: 400px;
	padding: 40px;
	box-sizing: border-box;
  border-radius: 20px;
	box-shadow: 0 15px 25px rgba(19, 18, 18, 0.5);
  background: rgba(199, 148, 148, 0.8);
}

.box .inputbox{
	position: relative;
}

.box .inputbox input{
	width: 100%;
	padding: 10px 0;
	font-size: 20px;
	color: #fff;
	letter-spacing: 1px;
	margin-bottom: 30px;
	border: none;
	border-bottom: 1px solid #fff;
	outline: none;
	background: transparent;
}
.box .inputbox label{
	position: absolute;
	top: 0;
	left: 0;
	padding: 10px 0;
	letter-spacing: 1px;
	color: #FFFFFF;
	pointer-events: none;
	transition: 0.5s;
}
.box .inputbox input:focus ~ label,
.box .inputbox input:valid ~ label{
  top: -20px;
  left: 0;
  color: #3279db;
  font-size: 16px;
}
button{
  background: transparent;
	border: none;
	color: #FFFFFF;
	background-color: #03A9F4;
	padding: 10px 20px;
  margin: 0 10px 0 10px;
	cursor: pointer;
	border-radius: 5px;
}
.buttongroup{
  text-align: center;
}
a{
  text-align: center;
  text-decoration: none;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 550px) {
  .box{
    width: 100vw;
    height: auto;
    margin-left: 0;
  }
}
</style> -->
