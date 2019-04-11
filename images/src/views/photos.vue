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
    <h1>相册{{albumId}}</h1>
    <hr>
    <div class="marginTop">
      <div class="newPhoto" @click="showModal">
        <Icon type="md-add" size="25" />
        <span>添加照片</span>
      </div>
      <!-- 相片格子展示信息 先放在这 -->
      <div class="photo" v-for="(item,index) in imgList" :key="index">
        <img :id="item.id" class="img" :src="item.url">
        <div class="cover">
            <Icon type="ios-expand" @click.native="handleFullscreen(item.id)"></Icon>
            <Icon type="ios-create-outline" @click.native="showEditModal(item.id)"></Icon>
            <Icon type="ios-contacts-outline" @click.native="shareMoments(item.id)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item.id)"></Icon>
        </div>
      </div>
    </div>
  
    <Modal
        v-model="modal"
        title="填写照片信息"
        @on-ok="confirm">
        <div style="width: 100%;height: 230px;margin-bottom: 20px;border:1px dashed grey;box-sizing:border-box">
          <img :src="imgSrc" class="logoImg"> 
        </div>       
        <Form style="margin-top:10px">
          <FormItem>
            <Upload
                action=""
                :show-upload-list="false">           
              <Button icon="ios-cloud-upload-outline">上传照片</Button> 
            </Upload>
          </FormItem>
          <FormItem :label-width="80" label="照片url：">
            <Input></Input>
          </FormItem>   
          <FormItem :label-width="80" label="描述信息：">
            <Input type="textarea" placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="confirmUpload">确认上传</Button>
        </div>
    </Modal>

    <Modal
        v-model="editModal"
        title="编辑照片信息">
        <Form :label-width="80" >
          <FormItem label="描述信息：">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>   
        </Form>
    </Modal>

    <Modal
        v-model="shareModal"
        title="分享动态">
        <Form :label-width="90" >
          <FormItem label="只言片语：">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>   
          <FormItem label="仅个人可见：">
            <RadioGroup>
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
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
      imgSrc: null, 
      modal: false,
      editModal: false,
      shareModal: false,
      timeValue: "",
      albumId: "",
      imgList: [
        {
          id: 0,
          url: require('@/assets/logo1.jpg')
        },
        {
          id: 1,
          url: require('@/assets/logo2.jpg')
        },
        {
          id: 2,
          url: require('@/assets/logo3.jpg')
        },
        {
          id: 3,
          url: require('@/assets/logo4.jpg')
        },
         {
          id: 4,
          url: require('@/assets/logo1.jpg')
        },
        {
          id: 5,
          url: require('@/assets/logo2.jpg')
        },
        {
          id: 6,
          url: require('@/assets/logo3.jpg')
        },
        {
          id: 7,
          url: require('@/assets/logo4.jpg')
        }
      ]
    }
  },
  mounted() {
    this.albumId = this.$route.params.albumId
  },
  watch: {
    $route: function(val){
      this.albumId = val.params.albumId
    }
  },
  methods: {
    showModal () {
      this.imgSrc = null
      this.modal = true      
    },
    ok () {
      // 调用添加照片接口
      this.$Message.info('确认添加');
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
    // 编辑照片信息
    showEditModal (id) {
      this.editModal = true
    },
    // 删除照片
    handleRemove (id) {
      alert("删除")
    },
    // 发朋友圈
    shareMoments (id) {
      this.shareModal = true
      this.timeValue = nowDate(new Date())
    },
    confirm () {
      alert("确认添加")
    },
    // 确认上传
    confirmUpload () {
      alert("确认上传")
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  .marginTop {
    margin-top: 20px;
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
      margin-right: 30px;
    }

    .photo {
      width: 200px;
      height: 200px;
      border: 1px dashed #ccc;
      text-align: center;
      margin-right: 30px;
      position: relative;
      margin-bottom: 30px;
      
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

