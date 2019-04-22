<template>
  <div class="container">
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
         <Col span="13">
          <div class="imgContent">            
            <p class="description">{{item.talking}}</p>
            <img :src="item.imgUrl" class="bigImg">
          </div>
          <div class="comment">
            <div class="icon">
              <Icon type="ios-chatboxes-outline" size="26" @click="showCommentModal(item.momentId)"/>
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
                      <p class="name"><span style="font-weight:bold; margin-right:10px;">{{item.name}}</span>  
                        {{item.commentTime}}
                      </p>
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
    <!-- 评论模态框 -->     
     <Modal
        v-model="commentModal"
        title="请输入评论"
        @on-ok="confirmComment">
        <Form :label-width="60" >
          <FormItem label="评论：">
            <Input v-model="comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="时刻：">
            <DatePicker :value="timeValue" type="datetime" style="width: 200px"></DatePicker>
          </FormItem>        
        </Form>
    </Modal>
       
  </div>
</template>

<script>
import {nowDate} from '@/libs/util.js'

export default {
  data () {
    return {
      heartStyle: 'md-heart-outline',
      commentModal: false,
      timeValue: '',
      comment: '',
      momentList: [],
      momentId: '',
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
    },
    // 评论模态框
    showCommentModal (momentId) {
      this.comment = ''
      this.timeValue = nowDate(new Date())
      this.momentId = momentId
      this.commentModal = true      
    },
    // 评论
    confirmComment () {
      this.$axios.post('/addComment', {
        momentId: this.momentId,
        userId: this.$store.state.userId,
        name: this.$store.state.name,
        avatar: this.$store.state.avatar,
        comment: this.comment,
        commentTime: this.timeValue
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          //插入成功 => 刷新评论列表
          this.$Message.success(res.data.msg)
          this.getAllMomentList()
        } else {
          this.$Message.error(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
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
