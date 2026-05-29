/**
通知栏多条数据移动

*/

<template>
    <div class="box">
      <div id="content" @mouseover="pauseMarquee" @mouseleave="resumeMarquee">
        <div class="notice" v-for="(item, index) in notices" :key="index">
          {{ item }}
        </div>
        <div class="space" v-for="(item, index) in spaces" :key="'space-' + index"></div>
      </div>
      <div class="left">🔔</div>
      <div class="right"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notices: [
          '春节期间，部分商品受物流影响延迟发货，请耐心等待，祝你新春快乐！',
          '春节期间，部分商品受物流影响延迟发货，请耐心等待，祝你新春快乐！',
          '春节期间，部分商品受物流影响延迟发货，请耐心等待，祝你新春快乐！'
        ],
        spaces: new Array(2).fill(''),
        animationFrameId: null,
        isPaused: false,
        translateX: 0,
        noticeWidth: 0,
        spaceWidth: 0
      };
    },
    mounted() {
      this.initializeMarquee();
      this.startMarquee();
    },
    methods: {
      
      
      initializeMarquee() {
        const notices = this.$el.querySelectorAll(".notice");
        const spaces = this.$el.querySelectorAll(".space");
        this.noticeWidth = notices[0].offsetWidth;
        this.spaceWidth = spaces[0].offsetWidth;
      },
      startMarquee() {
        const move = () => {
          if (!this.isPaused) {
            this.translateX += 1.5;
            if (this.translateX >= this.noticeWidth * 2 + this.spaceWidth) {
              this.translateX = this.noticeWidth;
            }
            this.$el.querySelector("#content").style.transform = `translateX(${-this.translateX}px)`;
          }
          this.animationFrameId = requestAnimationFrame(move);
        };
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
        }
        move();
      },
      pauseMarquee() {
        this.isPaused = true;
      },
      resumeMarquee() {
        this.isPaused = false;
        this.startMarquee();
      }
    },
    beforeDestroy() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    }
  };
  </script>
  
  <style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .box {
    position: relative;
    width: 350px;
    height: 50px;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    background-color: #fdf9ef;
  }
  .left {
    position: absolute;
    left: 0;
    width: 50px;
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background-color: #fdf9ef;
  }
  .right {
    position: absolute;
    right: 0;
    width: 20px;
    height: 50px;
    background-color: #fdf9ef;
  }
  #content {
    display: flex;
    padding-left: 50px;
    padding-right: 20px;
    white-space: nowrap;
  }
  .notice {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    flex-shrink: 0;
  }
  .space {
    width: 100px;
    flex-shrink: 0;
  }
  </style>
  
   <!-- <template>
    <div id="app">
      <div class="header">
        <h1>大屏展示</h1>
      </div>
      <div class="main-content">
        <div class="card" v-for="i in 6" :key="i">
          <h3>卡片 {{ i }}</h3>
          <p>内容区域</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      updateRootFontSize() {
        // 获取当前屏幕宽度
        const width = window.innerWidth;
  
        // 根据屏幕宽度设置根字体大小
        document.documentElement.style.fontSize = `${width / 100}px`;  // 设置根字体大小为屏幕宽度的1/100
      },
    },
    created() {
      this.updateRootFontSize();  // 初始化时设置根字体大小
      window.addEventListener('resize', this.updateRootFontSize); // 监听窗口大小变化
    },
    destroyed() {
      window.removeEventListener('resize', this.updateRootFontSize); // 清除监听
    },
  };
  </script>
  
  <style scoped>
  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .header {
    background-color: #4CAF50;
    color: white;
    padding: 2rem;
    text-align: center;
  }
  
  .main-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2rem;
    flex: 1;
  }
  
  .card {
    background-color: #f0f0f0;
    margin: 1rem;
    padding: 2rem;
    width: 15rem; /* 1rem = 16px => width 240px */
    height: 12rem; /* 1rem = 16px => height 192px */
    box-sizing: border-box;
    border-radius: 0.8rem; /* 1rem = 16px => 12px */
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  }
  </style>
   -->