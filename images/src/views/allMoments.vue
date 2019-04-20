<template>
  <div>
    <h1>好友动态</h1>
    <hr>
    <div class="content">
      <Row style="margin-bottom: 10px;" v-for="item in momentList" :key="item.momentId">
        <Col span="4">
          <div class="avatarContent">
            <Poptip word-wrap placement="bottom" trigger="hover" width="200" @on-popper-show="showInfo(item.userId)">
              <img :src="item.avatar" class="logo"> 
              <div slot="content">
                <p><span>用户名：</span>{{name}}</p>
                <p><span>手机号: </span>{{phone}}</p>
                <p><span>性别: </span>{{sex}}</p>
                <p><span>个性签名：</span>{{signature}}</p>
              </div>
            </Poptip>
            <p>{{item.shareTime}}</p>
          </div>
        </Col>
         <Col span="20">
          <div class="imgContent">            
            <p class="description">{{item.talking}}</p>
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
      friendIds: [],
      pageSize : 3,
      pageNum: 1,
      total: 0,
      name: '',
      phone: '',
      sex: '',
      signature: ''
    }
  },
  created() {   
    //获取朋友Ids
    this.$axios.post('/getFriendsIds', {
      userId: this.$store.state.userId
    })
    .then(res => {
      if (res.data.data) {
        this.friendIds = res.data.data
        this.$store.commit('changeFriendIds', this.friendIds)
        //根据Ids获取momentList
         this.getAllMomentList()
      } else {
        this.friendIds = []
        this.$Message.info(res.data.msg)
      }
    }).catch((err) => {
      console.log(err)
    })  
  },
  methods: {
    // 获取所有朋友圈列表
    getAllMomentList() {
      this.$axios.post('/getAllMomentList', {
        friendIds: this.friendIds,
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
    // 每次hover时调接口展示用户信息
    showInfo (userId) {
      this.$axios.post('/selectById', {
        userId: userId
      }).then(res => {
        if (res.data.data) {
          this.name = res.data.data.name
          this.phone = res.data.data.phone
          this.signature = res.data.data.signature
          if (res.data.data.name === 0) {
            this.sex = "小男孩"
          } else {
            this.sex = "小女孩"
          }
        } else {
          this.name = ''
          this.phone = ''
          this.sex = ''
          this.signature = ''
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
      this.getAllMomentList()
    },
    // 换尺寸
    changePageSize (e) {
      console.log(e)
      this.pageSize = e
      this.getAllMomentList()
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
