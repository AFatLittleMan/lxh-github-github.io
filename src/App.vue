<template>
   <div id="app">
    <!-- <router-view name='mainheader'></router-view> -->
    <router-view />
    <!-- <router-link to="/">Home</router-link> -->
   </div>
</template>

<script>
import autofit from 'autofit.js'


export default {
  name:'App',
  data(){
    return{
      
    }
  },
  mounted(){
    autofit.init({
        dh: 668,  //项目初始的分辨率，一般就是你开发电脑的屏幕分辨率
        dw: 1496,  //项目初始的分辨率，一般就是你开发电脑的屏幕分辨率
        el:"#app",   //App最外层的id名，一般都为app
        // autoRefresh: true,   // 屏幕尺寸改变时自动刷新
        resize: true        //是否监听resize事件，默认是 true
    }) 
  }
}
</script>


<style src="./components/style/reset.css"/>
<style scoped>

</style>
