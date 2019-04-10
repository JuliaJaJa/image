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
            <Icon type="ios-trash-outline" @click.native="handleRemove"></Icon>
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
        <Upload
            ref="upload" 
            action="//jsonplaceholder.typicode.com/posts/"
            :on-success="handleSuccess"
            :show-upload-list="false">           
              <!--action="http://localhost:8080/api/upload"  -->
          <Button icon="ios-cloud-upload-outline">上传照片</Button> 
        </Upload>
        <Form :label-width="80" style="margin-top:10px">
          <FormItem label="描述信息：">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
          </FormItem>    
        </Form>
        <!-- <Button @click="confirmUpload">确认上传</Button> -->
    </Modal>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: null, 
      modal: false,
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
      //调用添加照片接口
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
    handleRemove () {
      alert("删除")
    },
    confirm () {
      alert("确认添加")
    },
    handleSuccess (res, file) {
      this.imgSrc = require("@/assets/" + file.name)
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
        font-size: 40px;
        cursor: pointer;
        margin: 70px 10px;
      }
    }

  }
  
}
</style>

