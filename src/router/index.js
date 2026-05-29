import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   components:{    //命名视图
    //     default:home,
    //     mainheader:tabs
    //   }
    // },
    {
      path: '/',
      name: 'Home',
      component: ()=>import('../views/home/index.vue')   //路由懒加载
    },
    {
      path: '/tab',
      name: 'Tab',
      component: ()=>import('../components/tab/index.vue')
    },
    {
      path:'/tabs',
      name:'Tabs',
      component: ()=>import('../components/tabs/index.vue')
    },
    {
      path:'/flow',
      name:'Flow',
      component: ()=>import('../views/flow/index.vue')
    },
    {
      path:'/menu',
      name:'Menu',
      component: ()=>import('../views/menu/add-process.vue')
    },
    {
      path:'/echarts',
      name:'Echarts',
      component: ()=>import('../views/echarts/index.vue')
    }
  ]
});