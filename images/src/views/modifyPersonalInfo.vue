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
            ref="upload" 
            action="//jsonplaceholder.typicode.com/posts/"
            :on-success="handleSuccess"
            :show-upload-list="false">             
          <Button icon="ios-cloud-upload-outline">更换头像</Button> 
        </Upload>
      </Col>
      <Col span="8">
          <Form :label-width="80" class="form">
            <FormItem label="用户名：">
              <Input disabled size="large"></Input>
            </FormItem>
            <FormItem label="手机号:">
              <Input size="large"></Input>
            </FormItem>
          <FormItem label="性别：">
            <RadioGroup>
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="个性签名：">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>      
          <FormItem>
            <Button type="primary" style="width:300px">确认修改</Button>
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
      imgSrc: require("@/assets/logo1.jpg")
    }
  },
  methods: {
    handleSuccess (res, file) {
      console.log(file.name)
      this.imgSrc = require("@/assets/" + file.name)
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
    margin: 20px 0;
  }
  .form {
    margin-top: 50px;
  }
}
</style>
