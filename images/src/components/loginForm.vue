<template>
  <div class="loginForm">   
    <Card style="width:350px">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <Form ref="userForm" :model="userForm" :rules="ruleCustom">
          <FormItem prop="username">
            <Input v-model.trim="userForm.username" placeholder="请输入用户名" size="large">
              <Icon type="ios-person-outline" slot="prepend" class="icon-cls"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input v-model.trim="userForm.password" placeholder="请输入密码" size="large">
              <Icon type="ios-lock-outline" slot="prepend" class="icon-cls"></Icon>
            </Input>
          </FormItem>             
          <div class="register"> 
            <router-link to="/register">还没有账户，请&nbsp;&nbsp;<strong>注册</strong></router-link>
          </div>
          <FormItem prop="username">
            <Button type="primary" @click="btn_login()" long :loading="login_loading">登录</Button>
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
        username: '',
        password: ''         
      },
      ruleCustom: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
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

