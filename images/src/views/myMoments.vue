<template>
  <div class="container">
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
          <div class="comment">
            <div class="icon">
              <Icon type="ios-trash-outline" size="26" @click="deleteMoment(item.momentId)"/>
            </div>
            <div class="userComment">
              <Row>
                <Col span="2">
                  <Icon type="ios-chatboxes-outline" size="22"/>
                </Col>
                <Col span="22">
                  <Row v-for="(item,index) in item.comment" :key="index">
                    <Col span="4">
                      <img  :src="item.avatar" class="logo">
                    </Col>
                    <Col span="20">
                      <p class="name"><span style="font-weight:bold; margin-right:10px;">{{item.name}}</span>  {{item.commentTime}}</p>
                      <p>{{item.comment}}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
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
    },
    //删除朋友圈
    deleteMoment(momentId) {
      this.$Modal.info({
        title: '提示信息',
        content: '您确定要删除该动态吗？',
        onOk: () => {
          this.$axios.post('/deleteMoment', {
            momentId: momentId
          }).then(res => {
            console.log(res)
            if(res.data.code === 200) {
               this.$Message.success(res.data.msg)
               this.getMomentList()
            } else {
               this.$Message.error(res.data.msg)
            }
          }).catch((err) => {
            console.log(err)
          })
        }        
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  // background: url("../assets/login_bg2.jpg");
  // background-repeat:no-repeat; 
  // background-size:100% 100%;
  // width: 100%;
  // height: 100%;
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
    .comment {
      margin-top: 10px;
      .icon {
        margin-left: 400px;
      }
      .userComment {
        .logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .name {
          margin-bottom: 5px;
        }
      }
    }
  }
  .page {
    margin-top: 20px;
    text-align: center;
  }
}

</style>