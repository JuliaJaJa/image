<template>
  <div>
    <h1>我的动态</h1>
    <hr>
    <div class="content">
      <Row>
        <Col span="4">
          <div class="avatarContent">
            <img :src="imgSrc" class="logo"> 
            <p>2019-02-05 16:05</p>
          </div>
        </Col>
         <Col span="20">
          <div class="imgContent">            
            <p class="description">今天天气真好啊！开心！毕设加油鸭鸭！</p>
            <img :src="imgSrc" class="bigImg">
          </div>
        </Col>
      </Row>
    </div>
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
.content {
  margin-top: 30px;
  .avatarContent {
    text-align: center;
    .logo {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 20px;
    }
  }
  .imgContent {
    border-left: 1px dashed #ccc;
    padding-left: 20px;
    .description {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .bigImg {
      width: 400px;
      height: 250px;
    }
  }
}
</style>
