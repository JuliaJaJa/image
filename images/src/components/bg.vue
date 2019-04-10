<template>  

  <div id="particles-js"></div>
</template>

<script>
import particleConfig from '../config/particleConfig'

export default {
  name: "bg",
  mounted() {
    particlesJS("particles-js", particleConfig);
  }
}
</script>

<style lang="less" scoped> 
   #particles-js {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    background-color: rgba(70, 82, 157, 0.89);
  } 
</style>

