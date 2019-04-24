<style>
.logoImg{
  width: 100%;
  height: 230px;
}
img[src=""],img:not([src]){
  opacity:0;
} 
</style>

<template>
  <div class="container">
    <h1>{{albumName}}</h1>
    <hr>
    <div class="marginTop">
      <div class="newPhoto" @click="showModal">
        <Icon type="md-add" size="25" />
        <span>添加照片</span>
      </div>
      <!-- 相片格子展示信息 先放在这 -->
      <div class="photo" v-for="(item,index) in imgList" :key="index">
        <img :id="item.photoId" class="img" :src="item.imgUrl">
        <div class="cover">
            <Icon type="ios-expand" @click.native="handleFullscreen(item.photoId)"></Icon>
            <Icon type="ios-create-outline" @click.native="showEditModal(item.photoId)"></Icon>
            <Icon type="ios-contacts-outline" @click.native="shareMoments(item.photoId, item.imgUrl)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item.photoId)"></Icon>
        </div>
      </div>
    </div>
  
    <Modal
        v-model="modal"
        title="填写照片信息">
        <div style="width: 100%;height: 230px;margin-bottom: 20px;border:1px dashed grey;box-sizing:border-box">
          <img :src="imgSrc" class="logoImg">
        </div>       
        <Form style="margin-top:10px">
          <FormItem>
            <Upload
                  action=""
                  :before-upload="handleUploadicon"
                  :format="['jpg','jpeg','png', 'gif']"
                  :show-upload-list="true"
                  :on-format-error="handleFormatError">  
              <Button icon="ios-cloud-upload-outline">上传照片</Button> 
            </Upload>
          </FormItem>
          <FormItem :label-width="80" label="照片url：">
            <Input v-model="imgUrl"></Input>
          </FormItem>   
          <FormItem :label-width="80" label="描述信息：">
            <Input v-model="description" type="textarea" placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="confirmUpload">确认上传</Button>
        </div>
    </Modal>

    <Modal
        v-model="editModal"
        title="编辑照片信息"
        @on-ok="confirmEdit">
        <Form :label-width="80" >
          <FormItem label="描述信息：">
            <Input v-model="description2" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>   
        </Form>
    </Modal>

    <Modal
        v-model="shareModal"
        title="分享动态"
        @on-ok="confirmShare">
        <Form :label-width="90" >
          <FormItem label="只言片语：">
            <Input v-model="talking" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>   
          <FormItem label="仅个人可见：">
            <RadioGroup v-model="isLocked">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
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
  data() {
    return {
      albumId: '',
      photoId: '',
      photoId2: '',
      imgSrc: '', 
      imgUrl: '',
      description: '',
      description2: '',
      shareUrl: '',
      modal: false,
      editModal: false,
      shareModal: false,
      timeValue: "",
      albumName: "",
      imgList: [],
      isLocked: '',
      talking: ''
    }
  },
  created() {
    this.albumName = this.$store.state.albumList[this.$route.params.albumId].albumName
    this.albumId = this.$store.state.albumList[this.$route.params.albumId].albumId
    //获取相片列表
    this.getPhotoList()
  },
  watch: {
    $route() {
      this.albumName = this.$store.state.albumList[this.$route.params.albumId].albumName
      this.albumId = this.$store.state.albumList[this.$route.params.albumId].albumId
      this.getPhotoList()
    }
  },
  methods: {
    showModal () {
      this.imgSrc = ''
      this.imgUrl = ''
      this.description = ''
      this.modal = true      
    },
    //获取相片列表
    getPhotoList () {
      this.$axios.post('/getPhotoList', {
        albumId: this.albumId,
      }).then(res => {
        console.log(res)
        if (res.data.data) {
          this.imgList = res.data.data         
        } else {
          this.imgList = []
        }        
      }).catch((err) => {
        console.log(err);
      })
    },
    // 全屏
    handleFullscreen (id) {
      let main = document.getElementById(id)
      if (main.requestFullscreen) {
        main.requestFullscreen();
      } else if (main.mozRequestFullScreen) {
        main.mozRequestFullScreen();
      } else if (main.webkitRequestFullScreen) {
        main.webkitRequestFullScreen();
      } else if (main.msRequestFullscreen) {
        main.msRequestFullscreen();
      }  
    },
    // 展示照片信息
    showEditModal (id) {
      this.editModal = true 
      this.photoId2 = id
      this.$axios.post('/getPhotoInfo', {
        photoId: id
      }).then(res => {
        console.log(res)
        if (res.data.data) {
          this.description2 = res.data.data.description    
        } else {
          this.description2 = ''
          this.$Message.error(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err);
      })
    },
    // 编辑照片信息
    confirmEdit() {
      this.$axios.post('/editPhoto', {
        photoId: this.photoId2,
        description: this.description2
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$Message.success(res.data.msg)       
        } else {
          this.$Message.error(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err);
      })
    },
    // 删除照片
    handleRemove (id) {
      this.$Modal.confirm({
        title: '提示信息',
        content: '您确定要删除该相片吗？',
        onOk: () => {
          this.$axios.post('/deletePhoto', {
            photoId: id
          }).then(res => {
            console.log(res)
            if(res.data.code === 200) {
               this.$Message.success(res.data.msg)
               this.getPhotoList()
            } else {
               this.$Message.error(res.data.msg)
            }
          }).catch((err) => {
            console.log(err)
          })
        }        
      })
    },
    // 朋友圈模态框
    shareMoments (id, imgUrl) {
      this.talking = ""
      this.isLocked = ""
      this.shareModal = true
      this.shareUrl = imgUrl
      this.timeValue = nowDate(new Date())
    },
    // 确认分享
    confirmShare () {
      this.$axios.post('/share', {
        userId: this.$store.state.userId,
        avatar: this.$store.state.avatar,
        imgUrl: this.shareUrl,
        talking: this.talking,
        isLocked: this.isLocked,
        shareTime: this.timeValue
      }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success(res.data.msg)
          this.shareModal = false
        } else {
          this.$Message.error(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err);
      })
    },
    // 确认上传
    confirmUpload () {
      this.$axios.post('/addPhotoInfo', {
        albumId: this.albumId,
        photoId: this.photoId,
        description: this.description,
      }).then(res => {
        if (res.data.code === 200) {
          this.$Message.success(res.data.msg)
          this.modal = false
          this.getPhotoList()
        } else {
          this.$Message.error(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err);
      })
    },
    handleUploadicon (file) {
      this.$axios.post('/addPhoto', {
        imgUrl: file.name
      }).then(res => {
        if (res.data.data) {
          this.imgSrc = res.data.data.imgUrl
          this.imgUrl = res.data.data.imgUrl
          this.photoId = res.data.data.photoId
        } else {
          this.imgSrc = ""
          this.imgUrl = ""
          this.photoId = ""
          this.$Message.error(res.data.msg)
        }        
      }).catch((err) => {
        console.log(err);
      })
    },
    handleFormatError () {
      this.$Message.info("图片格式不正确，请上传正确的图片格式！")
    }
  },
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

    .newPhoto {   
      width: 200px;
      height: 200px;
      border: 1px dashed #ccc;
      text-align: center;
      line-height: 200px;
      font-size: 18px;
      font-weight: 500;
      margin: 20px;
    }

    .photo {
      width: 200px;
      height: 200px;
      border: 1px dashed #ccc;
      text-align: center;
      position: relative;
      margin: 20px;
      
      .img {
        width: 200px;
        height: 200px;
      }

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
        margin: 70px 5px;
      }
    }

  }
  
}
</style>

