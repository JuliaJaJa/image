<style>
.ivu-input-wrapper{
  width: 300px;
}
.ivu-form-item-label{
  font-weight: bold;
}
</style>

<template>
  <div class="container">
    <h1>修改密码</h1>
    <hr>
    <Row>
      <Col span="8" style="text-align:center">
        <img  :src="imgSrc" class="logo"> 
      </Col>
      <Col span="8">
         <Form :label-width="80" class="form">
          <FormItem label="原始密码：">
            <Input type="password" v-model="oldPassword" size="large"></Input>
          </FormItem>
          <FormItem label="新密码：">
            <Input type="password" v-model="newPassword" size="large"></Input>
          </FormItem>
          <FormItem label="确认密码：">
            <Input type="password" v-model="reNewPassword" size="large"></Input>
          </FormItem>    
          <FormItem>
            <Button type="primary" style="width:300px" @click="confirm">确认修改</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      reNewPassword: ''
      //imgSrc: require("@/assets/logo1.jpg")
    }
  },
  computed: {
    imgSrc() {
        return this.$store.state.avatar
    }
  },
  watch: {
    imgSrc(newData, oldData) {
      console.log(`${newData}--- ${oldData}`)
    }
  },
  methods: {
    confirm () {
      this.$axios.post('/checkOldPassword',{
        password: this.oldPassword,
        userId: this.$store.state.userId
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          //如果就密码正确，则判断新密码两次是否一致
          if (this.newPassword === this.reNewPassword) {
            //更新密码
            this.$axios.post('/modifyPassword',{
              password: this.newPassword,
              userId: this.$store.state.userId
            }).then(res => {
              console.log(res)
              if (res.data.code === 200) {
                this.$Message.success(res.data.msg)
                 this.$router.push('/login')
              } else {
                this.$Message.error(res.data.msg)
              }
            }).catch((err) => {
              console.log(err);
            })
          } else {
            this.$Message.error("两次密码不一致，请重新输入")
            this.reNewPassword = ''
          }
        } else {
          this.$Message.error(res.data.msg)
          this.oldPassword = ''
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  .logo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 20px;
  }
  .form {
    margin-top: 50px;
  }
}
</style>

