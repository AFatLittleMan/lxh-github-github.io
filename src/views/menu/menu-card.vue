<template>
  <div class="menu-box">
    <div class="btn-box">
      <div class="btn" @click.stop="addNode('approval')">
        <i class="approval btn-icon el-icon-s-opportunity">
        </i>
        <p style="font-size: 14px; margin: 10px 0 0 0 ;">审批节点</p>
      </div>
      <div class="btn" @click.stop="addNode('send')">
        <div class="send btn-icon el-icon-s-promotion"></div>
        <p style="font-size: 14px; margin: 10px 0 0 0 ;">抄送节点</p>
      </div>
    </div>
    <i class="close-icon el-icon-close" @click.stop="$emit('closeMenu')"></i>
  </div>
</template>

<script>
export default {
  props: {
    index: Number
  },
  data() {
    return {}
  },
  methods: {
    addNode(type) {
      this.$emit('addNode', type, this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-box {
  padding: 5px;
  background: #fff;
  box-shadow: 5px 0px 5px 5px rgba(37, 38, 94, .1);
  border-radius: 6px;
  overflow: hidden;

  .btn-box {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .btn {
      cursor: pointer;
    }
    .btn-icon {
      font-size: 52px;
    }

    .approval {
      color: #ef8938;
    }

    .send {
      color: #3296fa;
    }
  }

  .close-icon {
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>