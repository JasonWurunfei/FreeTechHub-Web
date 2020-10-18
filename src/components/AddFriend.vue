
<template>
  <div class="AddFriend" id="AddFriend" @touchmove.prevent @mousewheel.prevent v-if="_user.pk != _visitor.pk">
    <el-dialog :visible.sync="centerDialogVisible" width="30%" style="font-size:30px;" center>
      <h1 style="text-align: center;">Message</h1>
      <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="Please leave a message " v-model="msg">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="friend()"><i class="el-icon-position"></i>Send</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddFriend',
  props: {
    status: Boolean,
    top: Number,
    _visitor: Object,
    _user: Object
  },
  data() {
    return {
      msg: '',
      centerDialogVisible: false
    }
  },
  methods: {
    cancel() {
      this.$emit('closealert', false);
    },
    friend() {
      this._visitor.friend(this._user.pk, this.msg)
        .then(() => {
          this.$emit('closealert', false)
        })
    }
  },
  created() {
    this.centerDialogVisible = this.status
  },
}
</script>

<style scoped>
button {
  width: 70px;
  height: 30px;
  margin: 0 20px;
  border-radius: 5px;
  border: none;
  background: #9eccab;
  color: white;
}
</style>
