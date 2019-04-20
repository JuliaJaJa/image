<template>
  <div class="loginForm">   
    <Card style="width:350px">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <Form ref="userForm" :model="userForm" :rules="ruleCustom">
          <FormItem prop="name">
            <Input v-model.trim="userForm.name" placeholder="请输入用户名" size="large">
              <Icon type="ios-person-outline" slot="prepend" class="icon-cls"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model.trim="userForm.password" placeholder="请输入密码" size="large">
              <Icon type="ios-lock-outline" slot="prepend" class="icon-cls"></Icon>
            </Input>
          </FormItem>             
          <div class="register"> 
            <router-link to="/register">还没有账户，请&nbsp;&nbsp;<strong>注册</strong></router-link>
          </div>
          <FormItem>
            <Button type="primary" @click="login" long :loading="login_loading">登录</Button>
          </FormItem>
        </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'loginForm',
  data () {
    return {
      login_loading: false,
      userForm: {
        name: '',
        password: ''         
      },
      ruleCustom: {
        name: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login () {
      if (this.userForm.name === '') {
        this.$Message.error("用户名不能为空")
        return
      }
      if (this.userForm.password === '') {
        this.$Message.error("密码不能为空")
        return
      }
      this.$axios.post('/login', {
        name: this.userForm.name,
        password: this.userForm.password
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$Message.success(res.data.msg)
          // 存储用户id，用户名，手机号，性别，头像，个性签名
          this.$store.commit('changeUserId', res.data.data.userId)
          this.$store.commit('changeName', res.data.data.name)
          this.$store.commit('changePhone', res.data.data.phone)
          this.$store.commit('changeSex', res.data.data.sex)
          this.$store.commit('changeAvatar', res.data.data.avatar)          
          this.$store.commit('changeSignature', res.data.data.signature)
          this.$router.push('/')
        } else {
            this.$Message.error(res.data.msg)
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="less" scoped>
.loginForm{  
  position: absolute;
  top: 200px;
  right: 100px;
    
  .icon-cls{
    font-weight: bold;
    width: 20px;
    font-size: 18px;
  }

  .register{
    text-align: center;
    height:30px;

    a{
      color: #5b6270;
    }       
  }  
}
</style>

