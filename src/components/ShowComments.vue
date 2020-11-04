<template>
<div v-if="comment_tree != null" class="ShowComments">
  <ul>
    <div v-if="answer == true">
      <div v-if="is_root == true ">
        <div v-if="is_reply == true">
          <mavon-editor :ishljs="true" :preview="true" v-model="comment_content" placeholder="What do you want to post" />
          <el-row type="flex" justify="center">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-button class="button1" @click="saveComment(comment_tree.comment)">Post a comment</el-button>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-button class="button1" @click="is_reply = false">Cancel</el-button>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <el-link style=" font-size:20px; word-wrap:break-word;word-break:normal; " icon="el-icon-edit-outline" :underline="false" @click="is_reply = true">Add a comment</el-link>
        </div>
      </div>
    </div>
    <div>
      <div v-if="is_root == false">
        <el-divider></el-divider>
        <el-row type="flex" justify="center">
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <img class="avatar" :src="comment_tree.comment.owner_instance.avatar" />
          </el-col>
          <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
            <el-row type="flex" justify="center">
              <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                <router-link :to="{name: 'ProfileInformation', params: {id: comment_tree.comment.owner_instance.pk}}" class="comment-username">
                  <i class="usnae">{{ comment_tree.comment.owner_instance.username }}</i>
                </router-link>
              </el-col>
              <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9">
                <p style="color: gray">{{ comment_tree.comment.time }}</p>
              </el-col>
              <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                <div v-if="is_root == false">
                  <div v-if="comment_tree.sub_comment_ids.length != 0">
                    <el-link :underline="false" type="info" icon="el-icon-arrow-down" v-if="fold == true" style="font-size:15px" @click="toggleChildren">View reply</el-link>
                    <el-link :underline="false" type="info" icon="el-icon-arrow-up" v-if="fold == false" style="font-size:15px" @click="toggleChildren">Hide Reply</el-link>
                  </div>
                </div>
              </el-col>
              <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                <div v-if="comment_tree.comment.owner_instance.pk == _user.pk">
                  <el-link style="font-size:15px" type="info" :underline="false" @click="deleteComment(comment_tree.comment)">
                    <i style="font-size:15px" class="el-icon-delete"></i>Delete
                  </el-link>
                </div>
              </el-col>
            </el-row>
            <p class="content" v-html='comment_tree.comment.html_content' v-highlight></p>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div v-if="comment_tree.comment.status == false">
              <el-link style=" font-size:17px; word-wrap:break-word;word-break:normal; " icon="el-icon-edit" :underline="false" @click="replyTo(comment_tree.comment)">REPLY TO</el-link>
            </div>
            <div v-else>
              <mavon-editor :ishljs="true" :preview="true" v-model="comment_content" placeholder="What do you want to post" />
              <el-row type="flex" justify="center">
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-button class="button1" @click="saveComment(comment_tree.comment)">Save</el-button>
                </el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-button style="line-high" class="button1" @click="cancel(comment_tree.comment)">Cancel</el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="comment_tree.sub_comment_ids.length != 0">
        <li v-for="comment_id in comment_tree.sub_comment_ids" :key="comment_id">
          <show-comments @updatedTree="updatedTree" v-if="fold==false && comment_tree != ''" :node_id="comment_id" :root_id="root_id" :wrapped_tree="wrapped_tree" :is_root="false" :_fold="true" :key="comment_id" :_user="_user">
          </show-comments>
        </li>
      </div>
    </div>
  </ul>
  <div v-if="blog == true">
    <div v-if="is_root == true">
      <mavon-editor :ishljs="true" :preview="true" v-model="comment_content" placeholder="What do you want to post" />
      <div class="button11">
        <el-button class="button1" @click="saveComment(comment_tree.comment)">Post a comment</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Comment from '@/assets/utils/models/Comment';
import renderMath from "@/assets/utils/renderMath"

export default {
  name: "ShowComments",
  props: ['node_id', 'root_id', 'wrapped_tree', 'is_root', '_fold', '_blog', '_answer', '_user'],
  data() {
    return {
      comment_tree: '',
      comment_content: '',
      fold: this._fold,
      blog: this._blog,
      answer: this._answer,
      is_reply: false,
    }
  },
  methods: {
    _getComment(comment) {
      return new Comment({
        content: this.comment_content,
        sub_comments_of: comment.pk
      })
    },

    replyTo(comment) {
      comment.status = true
    },

    cancel(comment) {
      comment.status = false
    },

    //reset comment tree after adding or deleting comment
    resetCommentTree() {
      Comment.query_sub_comments(this.root_id)
        .then(comment_tree => {
          let wrapped_comment_tree = Comment.wrap_sub_comments(comment_tree)
          this.$emit('updatedTree', wrapped_comment_tree)
        })
    },

    //add new comment
    saveComment(comment) {
      this.fold = false
      this.is_reply = false
      comment.status = false
      let parent_comment = this._getComment(comment)
      parent_comment.save().then(() => {
        this.comment_content = ''
        this.resetCommentTree()
      })
    },

    //delete comment
    deleteComment(comment) {
      comment.delete().then(() => {
        this.resetCommentTree()
      })
    },

    //toggle status of fold
    toggleChildren() {
      this.fold = !this.fold
    },

    updatedTree(wrapped_comment_tree) {
      this.$emit('updatedTree', wrapped_comment_tree)
    },
  },
  created() {
    this.comment_tree = Comment.get_matched_comment_tree(this.wrapped_tree, this.node_id)
  },
  watch: {
    wrapped_tree(val) {
      this.comment_tree = Comment.get_matched_comment_tree(val, this.node_id)
    },
    comment_tree() {
      this.$nextTick().then(() => {
        renderMath()
      })
    }
  }
}
</script>
<style scoped>
.ShowComments {
  margin: 10px;
  font-family: STFQLBYTJW;
}

.content {
  font-size: 30px;
  margin-top: 5px;
  font-family: STFQLBYTJW
}

li {
  list-style: none;
}

.avatar {
  border-radius: 50%;
  width: 70%;
  border-radius: 50%;
}

.comment-username {
  line-height: 1.5rem;
  font-size: 200%;
  color: black;
  font-weight: bold
}

.button11 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
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
</style>
