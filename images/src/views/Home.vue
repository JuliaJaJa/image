<style>
.modal2.ivu-modal-content {
  width: 500px;
  height: 380px;
}
.img-carousel {
  width: 480px;
  height: 230px;
}
</style>

<template>
  <div class="container">
    <h1>管理相册</h1>
    <hr>
    <div class="marginTop">

      <div class="newAlbum" @click="showModal">
        <Icon type="md-add" size="25" />
        <span>新建相册</span>
      </div>

      <div class="albumList" v-for="item in albumList">
        <span>{{item.albumName}}</span>
        <div class="cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item.albumId)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item.albumId)"></Icon>
        </div>
      </div>
      
    </div>    
    
    <!-- 新建相册模态框 -->
    <Modal
        v-model="modal"
        title="填写相册信息"
        @on-ok="ok">
        <Form :label-width="80">
          <FormItem label="相册名称">
            <Input v-model="albumName" placeholder="请输入相册名称"></Input>
          </FormItem>
          <FormItem label="新建日期">
            <DatePicker :value="timeValue" type="datetime" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="描述信息">
            <Input v-model="detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
    </Modal>

    <!-- 预览相册模态框 -->
    <Modal v-model="modal2" title="相片预览" class="modal2">
      <Carousel v-if="modal2"
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow">
        <CarouselItem v-for="(item,index) in imgList" :key="index">
          <div>
            <img class="img-carousel" :src="item.imgUrl">
          </div>
          <p style="margin-top: 15px">
            <!-- 相册名称 -->{{albumInfo.albumName}}
            <!-- <span style="margin-left:15px;">2019-03-07 17:53</span>
            <span style="margin-left:15px;">小猫</span> -->
            <span style="margin-left:15px;">{{albumInfo.createDate}}</span>
            <span style="margin-left:15px;">{{albumInfo.detail}}</span>
          </p>
          <p style="margin-top: 10px">
            {{item.description}}
            <!-- 描述信息，今天天气很好,描述信息，今天天气很好 -->
          </p>
        </CarouselItem>
      </Carousel>
     
    </Modal>
  </div>
</template>

<script>
import {nowDate} from '@/libs/util.js'

export default {
  data () {
    return {
      albumInfo:{
        albumName: '',
        createDate: '',
        detail: ''
      },
      albumList: [],
      imgList: [],
      modal: false,
      modal2: false,
      timeValue: "",
      detail: "",
      albumName: "",
      albumId: "123",
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: 'none',
        trigger: 'click',
        arrow: 'hover'
      }
    }
  },
  created() {
    if (this.$store.state.userId !== '') {
      this.getAlbumList()
    }    
  },
  methods: {
    // 获取相册列表
    getAlbumList() {
      this.$axios.post('/getAlbumList', {
        userId: this.$store.state.userId,
      }).then(res => {
        console.log(res)
        if (res.data.data && res.data.data.length) {
          this.albumList = res.data.data
          this.$store.commit('changeAlbumList', this.albumList)
         // console.log("111111111",this.$store.state.albumList)
        } else {
          this.albumList = []
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    showModal () {
      this.modal = true
      this.timeValue = nowDate(new Date())
    },
    ok () {
      // 调用新建接口  新建完成应该刷新相册列表
      this.$axios.post('/addAlbum', {
        userId: this.$store.state.userId,
        albumName: this.albumName,
        createDate: this.timeValue,
        detail: this.detail
      }).then(res => {
        console.log(res)
        if (res.data) {
          this.$Message.success(res.data.msg)
          this.albumName = ''
          this.detail = ''
          // 刷新列表
          this.getAlbumList()
        } else {
          this.albumName = ''
          this.detail = ''
          this.$Message.error(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err)
      })
    },
    handleView (albumId) {
      this.modal2 = true
      // 根据id 选取相册中的照片展示
      this.getPhotoList(albumId)
      // 根据albumId获取相册信息
      this.getAlbumInfo(albumId)
    },
    //获取相片列表
    getPhotoList (albumId) {
      this.$axios.post('/getPhotoList', {
        albumId: albumId,
      }).then(res => {
        if (res.data.data) {
          this.imgList = res.data.data         
        } else {
          this.imgList = []
          this.$Message.info(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err);
      })
    },
    //获取相册信息
    getAlbumInfo (albumId) {
       this.$axios.post('/getAlbumInfo', {
        albumId: albumId,
      }).then(res => {
        if (res.data.data) {
          this.albumInfo.albumName = res.data.data.albumName   
          this.albumInfo.createDate = res.data.data.createDate   
          this.albumInfo.detail = res.data.data.detail       
        } else {
          this.albumInfo.albumName = '' 
          this.albumInfo.createDate = ''   
          this.albumInfo.detail = ''   
          this.$Message.info(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err);
      })
    },
    handleRemove (albumId) {
      this.$Modal.info({
        title: '提示信息',
        content: '您确定要删除该相册吗？',
        onOk: () => {
          this.$axios.post('/deleteAlbum', {
            albumId: albumId
          }).then(res => {
            console.log(res)
            if(res.data.code === 200) {
               this.$Message.success(res.data.msg)
               this.getAlbumList()
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
  background: url("../assets/login_bg2.jpg");
  background-repeat:no-repeat; 
  background-size:100% 100%;
  width: 100%;
  height: 100%;
  .marginTop {
    display: flex;
    flex-wrap: wrap;

    .newAlbum {    
      width: 150px;
      height: 150px;
      border: 1px dashed #ccc;
      text-align: center;
      line-height: 150px;
      font-size: 18px;
      font-weight: 500;
      margin: 20px;
    }

    .albumList{
      width: 150px;
      height: 150px;
      text-align: center;
      line-height: 150px;
      font-size: 18px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: rgb(199, 177, 228);
      position: relative;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      margin: 20px;

        .cover{
          display: none;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0,0,0,.6);
        }
        &:hover .cover{
          display: block;
        }
        .cover i{
          color: #fff;
          font-size: 35px;
          cursor: pointer;
          margin: 0 10px;
        }
    }
  }  
}
</style>
