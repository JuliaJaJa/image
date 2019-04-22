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
    <h1>修改个人信息</h1>
    <hr>
    <Row>
      <Col span="8" style="text-align:center">
        <img  :src="imgSrc" class="logo"> 
        <Upload
            action=""
            :before-upload="handleUploadicon"
            :format="['jpg','jpeg','png', 'gif']"
            :show-upload-list="true"
            :on-format-error="handleFormatError">
          <Button icon="ios-cloud-upload-outline">更换头像</Button> 
        </Upload>
      </Col>
      <Col span="8">
          <Form :label-width="80" class="form">
            <FormItem label="用户名：">
              <Input v-model="name" disabled size="large"></Input>
            </FormItem>
            <FormItem label="手机号:">
              <Input v-model="phone" size="large"></Input>
            </FormItem>
          <FormItem label="性别：">
            <RadioGroup v-model="sex">
              <Radio :label="0">男</Radio>
              <Radio :label="1">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="个性签名：">
            <Input v-model="signature" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
  data() {
    return {
      //imgSrc: require("@/assets/logo1.jpg")
    }
  },
  created() {
    console.log(this.$store.state)
  },
  computed: {
    imgSrc: {
      get() { 
        return this.$store.state.avatar
      },
      set(newValue) {
        this.$store.state.avatar = newValue 
      }      
    },
    name() {
       return this.$store.state.name
    },
    phone: {
      get() { 
         return this.$store.state.phone
      },
      set(newValue) {
        this.$store.state.phone = newValue 
      }     
    },
    sex: {
      get() { 
        return this.$store.state.sex
      },
      set(newValue) {
        this.$store.state.sex = newValue 
      } 
    },
    signature: {
      get() { 
         return this.$store.state.signature
      },
      set(newValue) {
        this.$store.state.signature = newValue 
      }     
    }
  },
  watch: {
    imgSrc(newData, oldData) {
      console.log(`${newData}--- ${oldData}`)
    }
  },
  methods: {
    handleUploadicon (file) {
      this.$axios.post('/modifyAvatar', {
        userId: this.$store.state.userId,
        avatar: file.name
      }).then(res => {
        console.log(res)
        if (res.data) {
          this.imgSrc = res.data.data
          this.$store.commit('changeAvatar', res.data.data)
        } else {
          this.imgSrc = ""
          this.$Message.error(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err);
      })
    },
    handleFormatError () {
      this.$Message.info("图片格式不正确，请上传正确的图片格式！")
    },
    confirm() {
       this.$axios.post('/modifyPersonalInfo', {
        userId: this.$store.state.userId,
        phone: this.phone,
        sex: this.sex,
        signature: this.signature
      }).then(res => {
        console.log(res)
        if (res.data) {
          this.$store.commit('changePhone', res.data.data.phone)
          this.$store.commit('changeSex', res.data.data.sex)         
          this.$store.commit('changeSignature', res.data.data.signature)
          this.$Message.success(res.data.msg)
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
.container{
  background: url("../assets/login_bg2.jpg");
  background-repeat:no-repeat; 
  background-size:100% 100%;
  width: 100%;
  height: 100%;
  .logo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    margin: 20px 0;
  }
  .form {
    margin-top: 50px;
  }
}
</style>
