<template>
  <div class="registerForm">   
    <Card style="width:600px">
        <p slot="title">
          <Icon type="log-in"></Icon>
          个人信息
        </p>
        <Row>
          <Form ref="userForm" :model="userForm" :rules="ruleCustom" :label-width="80">
            <Col span="8" style="text-align:center">              
              <Upload
                  action=""
                  
                  :format="['jpg','jpeg','png', 'gif']"
                  :on-format-error="handleFormatError">
                  <img  :src="imgSrc" class="logo"> 
                  <!-- :show-upload-list="false">     :before-upload="handleUploadicon"         -->
                <Button icon="ios-cloud-upload-outline">上传头像</Button> 
              </Upload>
            </Col>
            <Col span="16">          
              <FormItem label="用户名：">
                <Input v-model.trim="userForm.name" placeholder="请输入用户名" size="large"></Input>
              </FormItem>
              <FormItem label="手机号:">
                <Input v-model.trim="userForm.phone" placeholder="请输入手机号" size="large"></Input>
              </FormItem>
              <FormItem label="密码：">
                <Input type="password" v-model.trim="userForm.password" placeholder="请输入密码" size="large"></Input>
              </FormItem>       
              <FormItem label="性别：">
                  <RadioGroup v-model="userForm.sex">
                      <Radio label="0">男</Radio>
                      <Radio label="1">女</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem label="个性签名：">
                <Input v-model="userForm.signature" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
              </FormItem>      
              <FormItem>
                <Button type="primary" @click="register" long>注册</Button>
              </FormItem>           
            </Col>
          </Form>
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
        password: '',
        signature: '',
        sex: '',    
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
  },
  methods: {
    register () {
      console.log(this.imgSrc, this.userForm.sex)
      this.$axios.post('/addUser',{
        name: this.userForm.name,
        password: this.userForm.password,
        phone: this.userForm.phone,
        sex: this.userForm.sex,
        avatar: ""
      })
      .then(res => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      })

    },
    handleUploadicon (file) {
      console.log(file)
      let splic = file.name.split('.')
      if (  splic[splic.length - 1] === 'png' ||  
            splic[splic.length - 1] === 'jpg' ||
            splic[splic.length - 1] === 'gif' || 
            splic[splic.length - 1] === 'jpeg' ) {
          let formData = new FormData()
          formData.append("file", file)
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
          this.$axios.post('/fileUpload',{
            formData,
            config
          }).then(res => {
            console.log(res)
            if (res) {
              this.imgSrc = res.data
            } else {
                this.imgSrc = require("@/assets/logo1.jpg")
            }
          }).catch((err) => {
            console.log(err);
          })
      }
    },
    handleFormatError () {
      this.$Message.info("图片格式不正确，请上传正确的图片格式！")
    }
  }
}
</script>

<style lang="less" scoped>
.registerForm{  
  position: absolute;
  top: 100px;
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

