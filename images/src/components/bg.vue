<template>  
  <div class="bg-wrap" :style="{backgroundImage:`url(${login_img})`}">    
  </div> 
</template>

<script>

export default {
  name: "bg",
  data () {
    return {
      login_img: require("@/assets/login-bg.jpg")
    }
  }
}
</script>

<style lang="less" scoped> 
  .bg-wrap{
    width: 100vw;
    height: 100vh;   
    background-size: 100%;
    background-position: center;
    position: relative;
  }
</style>

