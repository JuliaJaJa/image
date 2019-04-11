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
            <p v-if="isLocked"><Icon size="26" type="ios-lock-outline" /></p>
          </div>
        </Col>
         <Col span="13">
          <div class="imgContent">            
            <p class="description">
              今天天气真好啊！开心！毕设加油鸭鸭！
              今天天气真好啊！开心！毕设加油鸭鸭！
              今天天气真好啊！开心！毕设加油鸭鸭！
            </p>
            <img :src="imgSrc" class="bigImg">
          </div>
        </Col>
      </Row>
    </div>
    <div class="page">
      <Page :total="100" 
            :page-size-opts="[3,5,10]" 
            show-sizer show-total 
            @on-change="changePage" 
            @on-page-size-change="changePageSize"/>
    </div>   
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLocked: true,
      imgSrc: require("@/assets/logo1.jpg")
    }
  },
  methods: {
    // 换页数
    changePage (e) {
      console.log(e)
    },
    // 换尺寸
    changePageSize (e) {
      console.log(e)
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
.page {
  margin-top: 20px;
  text-align: center;
}
</style>