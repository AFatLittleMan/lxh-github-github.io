<template>
    <div class="box">
        <!-- <el-button>默认按钮</el-button>
        <div class="zit">字体颜色</div> -->
        <h1>{{ $t('message.hello') }}</h1>
        <h1>{{ $t('message.welcome') }}</h1>

        <div>
            <button @click="changeLanguage('en')">English</button>
            <button @click="changeLanguage('zh')">中文</button>
        </div>
        <el-skeleton />
        <div>
          <p>Count: {{ count }}</p>
          <button @click="increment">加</button>
          <button @click="decrement">减</button>
        </div>
        <div>
          <!-- <Upload></Upload> -->
        </div>
        <div>
          <Tab :lists="list" ref="Tabs"></Tab>
          <!-- <button @click="tabs">调用子组件方法</button> -->
        </div>
        <div>
          <el-input v-model="input" placeholder="请输入内容" @input="handleInput"></el-input>
        </div>
        <div>
        </div>
    </div>
</template>
<script>
import { debounce, throttle } from '@/utils/optimize'     //防抖，节流
import { mapState, mapActions } from 'vuex';
import  Upload  from '../../components/upload';   //上传图片组件
import Tab from '../../components/tab'
export default {
  computed: {
    ...mapState([
      'count'
    ])
  },
  components:{
    Upload,
    Tab,
  },
  data() {
    return {
      list:[1,2,3],
      input:'',
      debouncedSearch: null
    }
  },
  created() {
    this.debouncedSearch = debounce(this.search, 500);
    console.log(window,'浏览器');
    
  },
  mounted() {
    let a = [1,2,3,4,5,6,7,8];
    // a.reverse();
    // a.splice(5,1,100,200);
    // a.push(22)
    // console.log(a.join());
    // console.log(a.join(''));
    // console.log(a.join('@'));
    // console.log(debounce)
  },
  methods: {
    changeLanguage(language) {
      this.$i18n.locale = language;
      localStorage.setItem('language', language);
    },
    ...mapActions([
      'increment',
      'decrement'
    ]),
    // tabs() {
    //   this.$refs.Tabs.zi()
    // },
    handleInput() {
      this.debouncedSearch();
    },
    search() {
      console.log('Searching for:', this.searchTerm);
      // Perform actual search operation here
    }
  }
}
</script>
<style scoped lang="scss">
// .box{
//     // .zit{
//     //     color: red;
//     //     font-size:80px;
        
//     // }
// }
</style>