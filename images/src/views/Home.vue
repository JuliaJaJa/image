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
    
      <div class="albumList">
        <span>相册1</span>
        <div class="cover">
            <Icon type="ios-eye-outline" @click.native="handleView"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove"></Icon>
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
            <Input placeholder="请输入相册名称"></Input>
          </FormItem>
          <FormItem label="新建日期">
            <DatePicker :value="timeValue" type="datetime" placeholder="Select date" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="描述信息">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
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
            <img class="img-carousel" :src="item.url">
          </div>
        </CarouselItem>
      </Carousel>
      <p style="margin-top: 15px">
        相册名称
        <span style="margin-left:15px;">2019-03-07 17:53</span>
      </p>
      <p style="margin-top: 10px">
        描述信息，今天天气很好,描述信息，今天天气很好
      </p>
    </Modal>
  </div>
</template>

<script>
import {nowDate} from '@/libs/util.js'

export default {
  data () {
    return {
      imgList: [
        {
          url: require("@/assets/logo1.jpg")
        },
        {
          url: require("@/assets/logo2.jpg")
        },
        {
          url: require("@/assets/logo3.jpg")
        },
        {
          url: require("@/assets/logo4.jpg")
        }
      ],
      modal: false,
      modal2: false,
      timeValue: "",
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: 'inside',
        radiusDot: false,
        trigger: 'click',
        arrow: 'hover'
      }
    }
  },
  computed: {
  },
  methods: {
    showModal () {
      this.modal = true
      this.timeValue = nowDate(new Date())
    },
    ok () {
      // 调用新建接口  新建完成应该刷新相册列表
      this.$Message.info('确认新建');
    },
    handleView () {
      this.modal2 = true
    },
    handleRemove () {
      alert("删除相册")
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
    margin-top: 20px;
    display: flex;

    .newAlbum {    
      width: 150px;
      height: 150px;
      border: 1px dashed #ccc;
      text-align: center;
      line-height: 150px;
      font-size: 18px;
      font-weight: 500;
      margin-right: 30px;
      margin-bottom: 30px;
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
      margin-right: 30px;

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
