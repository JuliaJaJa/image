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
                  :before-upload="handleUploadicon"
                  :format="['jpg','jpeg','png', 'gif']"
                  :show-upload-list="true"
                  :on-format-error="handleFormatError">
                  <img  :src="imgSrc" class="logo"> 
                <Button icon="ios-cloud-upload-outline">上传头像</Button> 
              </Upload>
            </Col>
            <Col span="16">          
              <FormItem label="用户名：" prop="name">
                <Input v-model.trim="userForm.name" placeholder="请输入用户名" size="large"></Input>
              </FormItem>
              <FormItem label="手机号:" prop="phone">
                <Input v-model.trim="userForm.phone" placeholder="请输入手机号" size="large"></Input>
              </FormItem>
              <FormItem label="密码：" prop="password">
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
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback('手机号格式不正确')
      } else {
        callback()
      }
    }
    return {
      userId: '',
      imgSrc: require("@/assets/logo1.jpg"),
      userForm: {
        name: '',
        phone: '',
        password: '',
        signature: '',
        sex: '',    
      },     
      ruleCustom: {
        name: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ],
        phone: [
          {validator: validatePhone, triggger: 'blur'}
        ]
      }
    }
  },
  methods: {
    register () {
      this.$axios.post('/checkName',{
        name: this.userForm.name
      }).then(res => {
        console.log(res)
        if(res.data.code === 400){
          this.$Message.info(res.data.msg)
          this.userForm.name = ''
        } else {
          this.$axios.post('/addUser',{
            userId: this.$store.state.userId,
            name: this.userForm.name,
            password: this.userForm.password,
            phone: this.userForm.phone,
            sex: this.userForm.sex,
            signature: this.userForm.signature
          }).then(res => {
            this.$store.commit('changeName', this.userForm.name)
            this.$Message.success("恭喜您注册成功！")
            this.$router.push('/login')
          }).catch((err) => {
            console.log(err);
          })
        }
      }).catch((err) => {
        console.log(err);
      })      
    },  
    handleUploadicon (file) {
      this.$axios.post('/upload', {
        avatar: file.name
      }).then(res => {
        console.log(res)
        if (res.data) {
          this.imgSrc = res.data.data.avatar
          this.userId = res.data.data.userId
          // 存储头像之后 保存用户id
          this.$store.commit('changeUserId', this.userId)
          console.log(this.$store.state)
        } else {
          this.imgSrc = ""
        }        
      }).catch((err) => {
        console.log(err);
      })
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

