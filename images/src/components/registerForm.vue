<template>
  <div class="registerForm">   
    <Card style="width:600px">
        <p slot="title">
          <Icon type="log-in"></Icon>
          个人信息
        </p>
        <Row>
          <Col span="8" style="text-align:center">
            <img  :src="imgSrc" class="logo"> 
            <Upload
                ref="upload" 
                action="//jsonplaceholder.typicode.com/posts/"
                :on-success="handleSuccess"
                :show-upload-list="false">             
              <Button icon="ios-cloud-upload-outline">上传头像</Button> 
            </Upload>
          </Col>
          <Col span="16">
             <Form ref="userForm" :model="userForm" :rules="ruleCustom" :label-width="80">
              <FormItem label="用户名：">
                <Input v-model.trim="userForm.name" placeholder="请输入用户名" size="large"></Input>
              </FormItem>
              <FormItem label="手机号:">
                <Input v-model.trim="userForm.phone" placeholder="请输入手机号" size="large"></Input>
              </FormItem>
              <FormItem label="密码：">
                <Input v-model.trim="userForm.password" placeholder="请输入密码" size="large"></Input>
              </FormItem>       
              <FormItem label="性别：">
                  <RadioGroup v-model="sex">
                      <Radio label="male">男</Radio>
                      <Radio label="female">女</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="个性签名：">
                <Input v-model="signature" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
              </FormItem>      
              <FormItem>
                <Button type="primary" @click="register" long>注册</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
       
    </Card>
  </div>
</template>

<script>
export default {
  name: 'registerForm',
  data () {
    return {
      //imgName: ,
      imgSrc: require("@/assets/logo1.jpg"),  
      userForm: {
        name: '',
        phone: '',
        password: ''       
      },
      signature: '',
      sex: '',
      ruleCustom: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    register () {
      this.$axios.post('/addUser')
      .then(res => {
        that.data=res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

    },
    handleSuccess (res, file) {
      console.log(file.name)
      this.imgSrc = require("@/assets/" + file.name)
    }
  }
}
</script>

<style lang="less" scoped>
.registerForm{  
  position: absolute;
  top: 200px;
  right: 100px;

  .logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .inputfile {
    opacity: 0;
  }

  .btn-label {
    display: block;
    height: 30px;
    width: 100px;
    line-height: 30px;
    color: white;
    margin: 0 auto;
    background-color: cadetblue;
    border-radius: 5px;
  }
    
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

