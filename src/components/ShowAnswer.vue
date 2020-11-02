<template>
<div class="answer">
  <ul>
    <li>
      <div v-if="is_accepted ==  true">
        <el-divider></el-divider>
        <el-row type="flex" justify="center">
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <img class="avatar" :src="answer.owner_instance.avatar" />
          </el-col>
          <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
            <el-row type="flex" justify="center">
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <h4>{{ answer.owner_instance.username }}</h4>
                <div class="right" v-if="answer.status == true">
                  <h4 class="badge badge-success " style="font-size:18px">Accepted</h4>
                </div>
                <div class="right" v-else>
                  <h4 class="badge badge-danger status" style="font-size:18px">Unaccepted</h4>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <span>{{ answer.time }}</span>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <el-link :underline="false" type="info" icon="el-icon-arrow-down" style="font-size:15px" v-if="fold == true" @click="toggleChildren(answer)">View reply</el-link>
                <el-link :underline="false" type="info" icon="el-icon-arrow-up" style="font-size:15px" v-if="fold == false" @click="toggleChildren(answer)">Hide Reply</el-link>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <div class="agreegroup">
          <img src="@/assets/img/agree-o.svg" @click="agree" v-if="history=='liked'" alt="like-icon" />
          <img src="@/assets/img/agree.svg" @click="agree" v-else alt="like-icon" />
          <p>{{ answer.agree_num }}</p>
          <p>{{ answer.disagree_num }}</p>
          <img src="@/assets/img/disagree-o.svg" @click="disagree" v-if="history=='disliked'" alt="dislike-icon" />
          <img src="@/assets/img/disagree.svg" @click="disagree" v-else alt="dislike-icon" />
        </div>
        <p class="card-content" v-if="is_editing==false" v-html="answer.html_content" v-highlight></p>
        <show-comments @updatedTree="updatedTree" v-if="fold == false && wrapped_tree != ''" :node_id="answer.root_comment" :root_id="answer.root_comment" :wrapped_tree="wrapped_tree" :is_root="true" :_fold="false" :_blog="false" :_answer="true"
          :_user="_user">
        </show-comments>
      </div>
      <div v-else>
        <el-divider></el-divider>
        <el-row type="flex" justify="center">
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <img class="avatar" :src="answer.owner_instance.avatar" />
          </el-col>
          <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
            <el-row type="flex" justify="center">
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <h4>{{ answer.owner_instance.username }}</h4>
                <div class="right" v-if="answer.status == true">
                  <h4 class="badge badge-success ">Accepted</h4>
                </div>
                <div class="right" v-else>
                  <h4 class="badge badge-danger status">Unaccepted</h4>
                </div>
              </el-col>
              <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                <span>{{ answer.time }}</span>
              </el-col>
              <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                <el-link :underline="false" type="info" icon="el-icon-arrow-down" style="font-size:15px" v-if="fold == true" @click="toggleChildren(answer)">View reply</el-link>
                <el-link :underline="false" type="info" icon="el-icon-arrow-up" style="font-size:15px" v-if="fold == false" @click="toggleChildren(answer)">Hide Reply</el-link>
              </el-col>
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <button v-if="user.pk == question.owner" @click="acceptAnswer(answer)"><i class="el-icon-check"></i>Accept</button>
              </el-col>
            </el-row>
            <div v-if="is_editing == false">
              <div v-if="user.pk == answer.owner">
                <el-link :underline="false" icon="el-icon-edit" style="font-size:18px;font-weight:bold " @click="editing()">Edit</el-link>
              </div>
            </div>
            <div v-else>
              <mavon-editor
                ref=md
                :ishljs="true"
                :preview="true"
                v-model="answer.content"
              />
              <el-button @click="saveAnswer(answer)">Save</el-button>
              <el-button @click="cancel(answer)">Cancel</el-button>
            </div>
            <div v-if="user.pk == question.owner">
              <el-button @click="acceptAnswer(answer)">Accept</el-button>
            </div>

          </el-col>
        </el-row>
        <!-- <div v-if="user.pk == question.owner">
          <el-button @click="acceptAnswer(answer)">Accept</el-button>
        </div> -->
        <el-row type="flex" justify="center">
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <div class="agreegroup">
              <img src="@/assets/img/agree-o.svg" @click="agree" v-if="history=='liked'" alt="like-icon" />
              <img src="@/assets/img/agree.svg" @click="agree" v-else alt="like-icon" />
              <p style="margin-left: 10%;">{{ answer.agree_num }}</p>
              <p style="margin-left: 10%; line-height:5px ;">{{ answer.disagree_num }}</p>
              <img src="@/assets/img/disagree-o.svg" @click="disagree" v-if="history=='disliked'" alt="dislike-icon" />
              <img src="@/assets/img/disagree.svg" @click="disagree" v-else alt="dislike-icon" />
            </div>
          </el-col>
          <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21">
            <div>
              <p class="content" v-if="is_editing==false" v-html="answer.html_content" v-highlight></p>
            </div>
          </el-col>
        </el-row>
        <show-comments @updatedTree="updatedTree" v-if="fold == false && wrapped_tree != ''" :node_id="answer.root_comment" :root_id="answer.root_comment" :wrapped_tree="wrapped_tree" :is_root="true" :_fold="false" :_blog="false" :_answer="true"
          :_user="_user">
        </show-comments>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import Comment from '@/assets/utils/models/Comment';
import Answer from "@/assets/utils/models/Answer";
import Transaction from '@/assets/utils/models/Transaction';
import ShowComments from '@/components/ShowComments.vue';
import renderMath from "@/assets/utils/renderMath"
import User from '@/assets/utils/models/User.js'

export default {
  name: "ShowAnswers",
  props: ['_answer', 'question', 'answersHistory', '_is_accepted', '_user'],
  components: {
    ShowComments
  },
  data() {
    return {
      user: this._user,
      wrapped_tree: '',
      comment_content: '',
      answer: this._answer,
      history: '',
      fold: true,
      is_accepted: this._is_accepted,
      is_editing:false,
		}
	},
	methods: {
    $imgAdd(pos, $file) {
      User.uploadImg(pos, $file, this.$refs.md)
    },
    _getTransaction(){
      return new Transaction({
        user: this.question.owner,
        amount: this.question.bounty,
        transaction_type: 'B',
        description: this.question.title,
      })
    },

    _getAnswer(answer) {
      return new Answer({
        id: this.id,
        content: answer.content,
        owner: this.user.pk,
        question: answer.question.pk,
      })
    },

    acceptAnswer(answer) {
      answer.status = true
      answer.update().then(() => {
        this.question.status = true
        this.question.update().then(() => {
          let transaction = this._getTransaction()
          transaction.save().then(() => {
            Answer.get(answer.pk)
              .then(new_answer => {
                // this.answer = new_answer
                this.$emit("acceptAnswer", new_answer)
                // this.is_accepted = true
              })
          })
        })
      })
    },

    editing() {
      this.is_editing = true
    },

    refreshAnswer(answer) {
      Answer.get(answer.pk).then(answer => {
        this.answer = answer
      })
    },

    saveAnswer(answer) {
      answer.update().then(() => {
        this.refreshAnswer(answer)
        this.is_editing = false
      })
    },

    cancel(answer) {
      this.refreshAnswer(answer)
      this.is_editing = false
    },

    toggleChildren(answer) {
      if (this.fold == true) {
        Comment.query_sub_comments(answer.root_comment)
          .then(comment_tree => {
            this.wrapped_tree = Comment.wrap_sub_comments(comment_tree)
          })
      }
      this.fold = !this.fold
    },

    updatedTree(wrapped_comment_tree) {
      this.wrapped_tree = wrapped_comment_tree
    },

    agree() {
      this.answer.agree().then(() => {
        this.answer.getAgreeHistory()
          .then(history => {
            // if disliked before, cancel it
            if (this.history == 'disliked')
              this.answer.disagree_num -= 1

            this.history = history
            if (history == 'none')
              this.answer.agree_num -= 1
            else
              this.answer.agree_num += 1
          })
      })
    },

    disagree() {
      this.answer.disagree().then(() => {
        this.answer.getAgreeHistory()
          .then(history => {
            // if liked before, cancel it
            if (this.history == 'liked')
              this.answer.agree_num -= 1
            this.history = history
            if (history == 'none')
              this.answer.disagree_num -= 1
            else
              this.answer.disagree_num += 1
          })
      })
    }
  },

  created() {
    this._answer.getHistory(this.answersHistory).then(history => {
      this.history = history
    })
    renderMath()
  },
}
</script>
<style scoped>
* {
  list-style: none;
  /* margin: 10px; */
  font-family: STFQLBYTJW;
  /* margin: 0; */
}

img {
  width: 30%;
  border-radius: 50%;
}

.avatar {
  border-radius: 50%;
  width: 80%;
  border-radius: 50%;
}

.card-header {
  display: grid;
  grid-template-areas: "left right";

}

.left {
  grid-area: left;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.button1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
  min-width: 8vw;
  min-height: 7vh;
  font-size: 1.5rem;
  color: #311f1f;
  margin-bottom: 10%;
}

.right {
  grid-area: right;
}

.content {
  text-align: left;
}

.status {
  text-align: left;
}
</style>
