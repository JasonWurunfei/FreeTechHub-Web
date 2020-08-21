<template>
<div class="ProfileInformation">
  <div class="box1">
    <div id="image">
      <img :src="profile_owner.avatar" />
    </div>
    <div>
      <button v-if="profile_owner" @click="editProfile">Edit</button>
      <p>major:{{profile_owner.major}}</p>
      <p>Balance: {{profile_owner.blance}}</p>
      <p>grade:{{profile_owner.grade}}</p>
      <p>bio:{{profile_owner.bio}}</p>
      <button v-if="profile_owner" @click='goSendrequest'>addfriend</button>
    </div>
  </div>
  <div class="box2">
    <div>
      <img src="@/assets/img/浏览量.svg" alt="">
      <p>Total views:{{profile_owner.totalviews}}</p>
      <img src="@/assets/img/粉丝趴.svg" alt="">
      <p>Follows: {{totalfollower}}</p>
      <br>
      <img src="@/assets/img/点赞.svg" alt="">
      <p>Total likes:{{profile_owner.totallikes}}</p>
      <img src="@/assets/img/概率.svg" alt="">
      <p>Accept rate: 99%</p>
    </div>
    <div>
      <div id="chart_example">
      </div>
    </div>
  </div>
  <div class="box3">
    <img src="@/assets/img/github活动表.jpg" />
  </div>
</div>
</template>

<script>
import echarts from 'echarts'
import User from '@/assets/utils/models/User'
import Followership from '@/assets/utils/models/Followership'
import {
  login_required
} from '@/assets/utils/auth'
import FriendRequest from '@/assets/utils/models/FriendRequest'
export default {
  data() {
    return {
      profile_owner: '',
      visitor: '',
      totalfollower: '',
    }
  },
  methods: {
    _getFriendRequest() {
      return new FriendRequest({
        to_user: this.user.pk,
        from_user: this.from_user.pk
      })
    },
    addfriend() {
      let friendRequest = this._getFriendRequest()
      friendRequest.save()
    },
    goSendrequest() {
      this.$router.push({
        name: "SendRequest",
        params: {
          id: this.$route.params.id
        }
      })
    },
    editProfile() {
      this.$router.push({
        name: 'EditProfile',
        params: {
          id: this.profile_owner.pk
        }
      })
    },
  },
  created() {

    login_required(this, self => {
      this.visitor = self
      Followership.getFollowerlist().then(followers => {
        this.totalfollower = followers.length
      })
      User.get(this.profile_owner_id)
        .then(owner => {
          this.profile_owner = owner
        })
    })
  },
  mounted() {
    var colorList = ['#9370DB', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4',
      '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6',
      '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff',
      '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976',
      '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac'
    ]
    let myChart = echarts.init(document.getElementById('chart_example'));
    User.gettags(this.$route.params.id).then(res => {
      this.data1 = res.Bdata
      this.data2 = res.Qdata
      let option = {
        title: {
          text: "Blog type                                     Answer type",

          textStyle: {
            fontSize: 18,
            fontFamily: "Trebuchet MS",
            fontWeight: "bold",
            color: "#9999FF"
          },
          bottom: "0%"
        },

        series: [{
            name: 'Blog type',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['25%', '50%'],
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
                length: 22,
                length2: 22,
                lineStyle: {
                  color: '#2478EC'
                }
              }
            },
            label: {
              normal: {
                formatter: function(params) {
                  return ('{b|' + params.value + "}\n{a|" + params.name + '}')
                },
                show: true,
                padding: [-30, -30, 0, -30],
                rich: {
                  b: {
                    fontSize: 10,
                    color: '#2AD0FF',
                    textAlign: 'center'
                  },
                  a: {
                    fontSize: 10,
                    color: '#CFDCFF',
                    height: 10,
                    textAlign: 'center'
                  }
                }
              },
            },
            data: this.data1
          },
          {
            name: 'Answer type',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['75%', '50%'],
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
                  return ('{b|' + params.value + "}\n{a|" + params.name + '}')
                },
                show: true,
                padding: [-30, -30, 0, -30],
                rich: {
                  b: {
                    fontSize: 10,
                    color: '#CFDCFF',
                    textAlign: 'center'
                  },
                  a: {
                    fontSize: 10,
                    color: '#2AD0FF',
                    height: 10,
                    textAlign: 'center'
                  }
                }
              },
            },
            data: this.data2
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize()
      });
    });

  },
  computed: {
    profile_owner_id() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
.ProfileInformation {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex;
}

div {
  background: #fafbff;
  /* padding: 10px;
  margin: 10px; */
}

#chart_example {
  width: 400px;
  height: 190px;

}

img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}

.box1 {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: baseline;
  flex-grow: unset;
}

.box1 div p {
  display: inline;
  padding-left: 30px;
}

.box1 div:nth-child(2) {
  position: relative;
  bottom: 100px;
}

.box2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.box2 div p {
  display: inline;
  padding-right: 30px;
}

.box2 div img {
  display: inline-block;
  width: 60px;
  height: 60px;
  position: relative;
  top: 28px;
  right: 5px;
  bottom: 20px;
}

.box3 img {
  border: none;
  border-radius: 0;
  width: 100%;
  height: 100%;
}
</style>
