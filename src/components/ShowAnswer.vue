<template>
  <div class="answer">
    <ul>
      <li>
        <div v-if="is_accepted ==  true">
          <div class="card">
            <div class="card-img">
              <img :src="answer.owner_instance.avatar" />
              <h4>{{ answer.owner_instance.username }}</h4>
            </div>
            <h2 class="card-title">{{ answer.time }}</h2>
            <div class="right" v-if="answer.status == true">
              <h4 class="badge badge-success ">Accepted</h4>
            </div>
            <div class="right" v-else>
              <h4 class="badge badge-danger status">Unaccepted</h4>
            </div>
            <div class="agreegroup">
              <img src="@/assets/img/agree-o.svg" @click="agree" v-if="history=='liked'" alt="like-icon" />
              <img src="@/assets/img/agree.svg" @click="agree" v-else alt="like-icon" />
              <p>{{ answer.agree_num }}</p>
              <p>{{ answer.disagree_num }}</p>
              <img
                src="@/assets/img/disagree-o.svg"
                @click="disagree"
                v-if="history=='disliked'"
                alt="dislike-icon"
              />
              <img src="@/assets/img/disagree.svg" @click="disagree" v-else alt="dislike-icon" />
            </div>
            <p class="card-content" v-if="is_editing==false" v-html="answer.html_content" v-highlight></p>
          </div>
          <el-button v-if="fold == true" @click="toggleChildren(answer)">Check out reply</el-button>
          <el-button v-if="fold == false" @click="toggleChildren(answer)">Stow reply</el-button>
          <show-comments @updatedTree="updatedTree" v-if="fold == false && wrapped_tree != ''"
            :node_id="answer.root_comment"
            :root_id="answer.root_comment"
            :wrapped_tree="wrapped_tree"
            :is_root="true"
            :_fold="false"
            :_blog="false"
            :_answer="true"
            :_user="_user">
          </show-comments>
        </div>
        <div v-else>
          <div class="card">
            <div class="card-header">
              <div class="left">
                <img :src="answer.owner_instance.avatar" />
                <h4 class="card-title">{{ answer.owner_instance.username }}</h4>
                <span class="card-title">{{ answer.time }}</span>
              </div>
              <div class="right" v-if="answer.status == true">
                <h4 class="badge badge-success ">Accepted</h4>
              </div>
              <div class="right" v-else>
                <h4 class="badge badge-danger status">Unaccepted</h4>
              </div>
            </div>
            <div v-if="is_editing == false">
              <div v-if="user.pk == answer.owner">
                <el-button @click="editing()">Edit</el-button>
              </div>
            </div>
            <div v-else>
              <mavon-editor
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
            <div class="agreegroup">
              <img src="@/assets/img/agree-o.svg" @click="agree" v-if="history=='liked'" alt="like-icon" />
              <img src="@/assets/img/agree.svg" @click="agree" v-else alt="like-icon" />
              <p>{{ answer.agree_num }}</p>
              <p>{{ answer.disagree_num }}</p>
              <img
                src="@/assets/img/disagree-o.svg"
                @click="disagree"
                v-if="history=='disliked'"
                alt="dislike-icon"
              />
              <img src="@/assets/img/disagree.svg" @click="disagree" v-else alt="dislike-icon" />
            </div>
            <p class="card-content" v-if="is_editing==false" v-html="answer.html_content" v-highlight></p>
            <button v-if="user.pk == question.owner" @click="acceptAnswer(answer)">Accept</button>
          </div>
          <el-button v-if="fold == true" @click="toggleChildren(answer)">Check out reply</el-button>
          <el-button v-if="fold == false" @click="toggleChildren(answer)">Stow reply</el-button>
          <show-comments @updatedTree="updatedTree" v-if="fold == false && wrapped_tree != ''"
            :node_id="answer.root_comment"
            :root_id="answer.root_comment"
            :wrapped_tree="wrapped_tree"
            :is_root="true"
            :_fold="false"
            :_blog="false"
            :_answer="true"
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

export default {
	name:"ShowAnswers",
  props: ['_answer','question','answersHistory','_is_accepted','_user'],
  components: {
    ShowComments
  },
	data(){
		return {
      user: this._user,
      wrapped_tree:'',
      comment_content:'',
      answer:this._answer,
      history:'',
      fold: true,
      is_accepted: this._is_accepted,
      is_editing:false,
		}
	},
	methods: {
    _getTransaction(){
      return new Transaction({
        user: this.question.owner,
        amount: this.question.bounty,
        transaction_type: 'B',
        description:this.question.title,
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

    acceptAnswer(answer){
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

    editing(){
      this.is_editing = true
    },

    refreshAnswer(answer) {
      Answer.get(answer.pk).then(answer => {
          this.answer = answer
      })
    },

    saveAnswer(answer){
      answer.update().then(() => {
        this.refreshAnswer(answer)
        this.is_editing = false
      })
    },

    cancel(answer){
      this.refreshAnswer(answer)
      this.is_editing = false
    },

    toggleChildren(answer){
      if (this.fold == true) {
        Comment.query_sub_comments(answer.root_comment)
        .then(comment_tree => {
          this.wrapped_tree = Comment.wrap_sub_comments(comment_tree)
        })
      }
      this.fold = !this.fold
    },

    updatedTree(wrapped_comment_tree){
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
          if(history == 'none')
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
          if(history == 'none')
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
*{
  list-style: none;
  margin: 0;
}
img{
  width: 5%;
  border-radius: 50%;
}
.card-header{
  display: grid;
  grid-template-areas: "left right";
}
.left{
  grid-area: left;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.left h4{
  margin: 0 2vw;
}
.right{
  grid-area: right;
}
.card-text{
  padding: 20px;
}
.status{
  text-align: right;
}
</style>
