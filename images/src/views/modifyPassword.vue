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
            <Input size="large"></Input>
          </FormItem>
          <FormItem label="新密码：">
            <Input size="large"></Input>
          </FormItem>
          <FormItem label="确认密码：">
            <Input size="large"></Input>
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
  data () {
    return {
      imgSrc: require("@/assets/logo1.jpg")
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

