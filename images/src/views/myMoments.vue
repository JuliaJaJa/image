<template>
  <div>
    <h1>我的动态</h1>
    <hr>
    <div class="content">
      <Row style="margin-bottom: 10px;" v-for="item in momentList" :key="item.momentId">
        <Col span="4">
          <div class="avatarContent">
            <img :src="item.avatar" class="logo"> 
            <p>{{item.shareTime}}</p>
            <p v-if="item.isLocked === 0"><Icon size="26" type="ios-lock-outline" /></p>
          </div>
        </Col>
         <Col span="13">
          <div class="imgContent">            
            <p class="description">
              {{item.talking}}
            </p>
            <img :src="item.imgUrl" class="bigImg">
          </div>
        </Col>
      </Row>
    </div>
    <div class="page">
      <Page :total="total" 
            :page-size="3"
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
      momentList: [],
      pageSize : 3,
      pageNum: 1,
      total: 0,
      isLocked: true
    }
  },
  created() {
    this.getMomentList()
  },
  methods: {
    // 获取朋友圈列表
    getMomentList() {
      this.$axios.post('/getMomentList', {
        userId: this.$store.state.userId,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        console.log(res)
        if (res.data.data) {
          this.total = res.data.data.total
          this.momentList = res.data.data.list
        } else {
          this.total = 0 
          this.momentList = []
          this.$Message.error(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err)
      })
    },
    // 换页数
    changePage (e) {
      console.log(e)
      this.pageNum = e
      this.getMomentList()
    },
    // 换尺寸
    changePageSize (e) {
      console.log(e)
      this.pageSize = e
      this.getMomentList()
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