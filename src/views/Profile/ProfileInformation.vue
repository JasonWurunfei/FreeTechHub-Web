<template>
<div class="profile">
  <AddFriend
    v-if="status && !_is_owner"
    :status="this.status"
    @closealert="closealert"
    :_user=_user
    :_visitor=_visitor />
  <el-row type="flex" justify="center">
    <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
      <div class="both">
        <div class="avatar">
          <img id="image" :src="profile_owner.avatar" />
        </div>
        <div class="username">
          <span id='username'>{{profile_owner.username}}</span>
        </div>
        <div>
          <button class="edit" v-if="profile_owner && _is_owner" @click="editProfile">Edit</button>
        </div>
        <div>
          <FollowButton
            :_content_owner=_user
            :_visitor=_visitor />
        </div>
        <div>
          <el-button @click="showalert" v-if="!_is_owner" round>Add Friend</el-button>
        </div>
      </div>
      <div class="BIO">
        <h1>
          <el-tag class="bio" effect="dark" type="success"><i class="el-icon-position"></i>Bio:</el-tag> {{profile_owner.bio}}
        </h1>
      </div>
    </el-col>
    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
      <div class="info">
        <el-card class="box-card">
          <div>
            <h1>
              <el-tag class="bio" effect="dark" type="success"><i class="el-icon-school"></i>Major: </el-tag> {{profile_owner.major}}
            </h1>
          </div>
          <div>
            <h1>
              <el-tag class="bio" effect="dark" type="success"><i class="el-icon-coin"></i>Balance: </el-tag> {{profile_owner.blance}}
            </h1>
          </div>
          <div>
            <h1>
              <el-tag class="bio" effect="dark" type="success"><i class="el-icon-wind-power"></i>Grade: </el-tag> {{profile_owner.grade}}
            </h1>
          </div>
        </el-card>
        <div>
          <div id="chart_example">
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
      <div class="total">
        <el-card class="box-card">
          <div>
            <h1>
              <el-tag class="bio" effect="dark" type="success"><i class="el-icon-view"></i>Total views: </el-tag> {{profile_owner.totalviews}}
            </h1>
          </div>
          <div>
            <h1>
              <el-tag class="bio" effect="dark" type="success"><i class="el-icon-star-on"></i>Follows: </el-tag> {{totalfollowing}}
            </h1>
          </div>
          <div>
            <h1>
              <el-tag class="bio" effect="dark" type="success"><i class="el-icon-thumb"></i>Total likes:</el-tag> {{profile_owner.totallikes}}
            </h1>
          </div>
          <div>
            <h1>
              <el-tag class="bio" effect="dark" type="success"><i class="el-icon-finished"></i>Accept rate:</el-tag> {{acceptance_rate}}
            </h1>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
  <div class="activity">
    <p>Your activity in this year:</p>
    <canvas id="canvas"></canvas>
  </div>

</div>
</template>

<script>
import User from '@/assets/utils/models/User'
import Activity from '@/assets/utils/models/Activity'
import echarts from 'echarts'
import FollowButton from '@/components/FollowButton'
import AddFriend from '@/components/AddFriend.vue'

export default {
  props: ['_user', '_visitor', '_is_owner'],
  data() {
    return {
      profile_owner: this._user,
      visitor: this._visitor,
      status: false,
      totalfollowing: '',
      acceptance_rate: '',
      activity: '',
      table: ''
    }
  },
  components: {
    FollowButton,
    AddFriend
  },
  methods: {
    editProfile() {
      this.$router.push({
        name: 'EditProfile',
        params: {
          id: this.profile_owner.pk
        }
      })
    },
    showalert() {
      this.status = !this.status
    },
    closealert(val) {
      this.status = val
    },
  },
  created() {
    User.get(this.$route.params.id).then(user => {
      this.profile_owner = user
      Promise.all([
        this.profile_owner.getFollowershipList(),
        User.gettags(this.$route.params.id),
        Activity.getActivity(this.profile_owner.pk)
      ]).then(values => {
        this.totalfollowing = values[0].followings.length
        this.acceptance_rate = values[1].acceptance_rate
        this.table = values[2]
        this.activity = new Activity("canvas", this.table)
        this.activity.draw()
      })
    })
  },
  mounted() {
    var colorList = ['#9370DB', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976',
      '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff'
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
            radius: ['40%', '75%'],
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
            radius: ['40%', '75%'],
            center: ['70%', '50%'],
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
      })
    })
    window.addEventListener('resize', () => {
      for (let square of this.table) {
        square.resize()
      }
      this.activity.resize()
    })
  },
  computed: {
    profile_owner_id() {
      return this.$route.params.idt
    }
  },
  watch: {
    _user(val) {
      this.profile_owner = val
    },
    _visitor(val) {
      this.visitor = val
    }
  }
}
</script>

<style scoped>
.activity {
  margin-bottom: 5%;
}

.activity p {
  font-weight: 900;
  font-size: 200%;
  color: #8188d5;
  margin: 0%;
  margin-left: 7%;
  margin-bottom: 1%;
}

#canvas {
  border: none;
  border-radius: 0;
  width: 87%;
  height: 90%;
  margin-left: 7%;
}

#chart_example {
  width: 30vw;
  height: 190px;
}

.info {
  margin-top: 50px;
}

.total {
  margin-top: 50px;
}

h1 {
  font-size: 30px;
}

.profile {
  background: #fafbff;
  font-family: STFQLBYTJW;
}

.both {
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 50px;
}

.avatar {
  margin-top: 6%;
}

.BIO {
  text-align: center;
}

.bio {
  font-size: 30px;
  height: 32px;
}

.edit {
  align-items: center;
  text-align: center;
  justify-content: center;
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  min-width: 8vw;
  min-height: 5vh;
  font-size: 1.5rem;
  color: #311f1f;
  margin-bottom: 10%;
}

img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}

#username {
  text-align: center;
  font-weight: 900;
  font-size: 300%;
  color: #8188d5;
  font-family: STFQLBYTJW;
}
</style>
