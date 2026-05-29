<template>
    <div>
        <div style="display: flex;align-items: center;justify-content: center;">
            <div
                style="width: 200px;min-height: 75px;background: #fff;border-radius: 5px;position: relative;box-shadow: 0 2px 4px 0 rgba(37, 38, 94, .1);">
                <div
                    :style="{backgroundColor: data.type== 'approval' ? '#ef8938' : '#3296fa'}"
                    style="height: 30px;padding: 0 15px;display: flex;align-items: center;justify-content: space-between;border-radius: 5px 5px 0 0;">
                    <p style="margin: 0;color: #fff;">{{ data.type== 'approval' ? '审批节点' : '抄送节点' }}</p>
                    <i class="el-icon-close" style="color: #fff;" @click="removeNode"></i>
                </div>
                <div
                    style="font-size: 14px;color: #999;padding: 0 15px;display: flex;align-items: center;justify-content: space-between;">
                    <p v-if="data.type == 'approval'">请选审批人</p>
                    <p v-else>请选择抄送人</p>
                    <i class="el-icon-arrow-right" style="color: rgba(0, 0, 0, .5);font-size: 7px;"></i>
                </div>
            </div>
        </div>
        <div style="display: flex;align-items: center;justify-content: center;">
            <div class="box-block">
                <i class="box-blocks"></i>
                <div class="add_button" @click="opMenu">
                    <i class="el-icon-circle-plus" style="font-size: 26px; color: #3296fa;"></i>
                    <div class="menu-box" v-show="showDesign">
                        <div style="display: flex;align-items: center;justify-content: space-around;width: 215px;">
                            <div style="width: 56px;" @click.stop="addNode('approval')">
                                <div class="el-icon-s-opportunity" style="font-size: 52px;color: #ef8938;"></div>
                                <p style="font-size: 14px; margin: 10px 0 0 0 ;">审批节点</p>
                            </div>
                            <div style="width: 56px;" @click.stop="addNode('send')">
                                <div class="el-icon-s-promotion" style="font-size: 52px;color: #3296fa;"></div>
                                <p style="font-size: 14px; margin: 10px 0 0 0 ;">抄送节点</p>
                            </div>
                        </div>
                        <div class="el-icon-close" style="position: absolute;top:0;right: 0;font-size: 14px;"
                            @click.stop="cancels"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        index: Number
    },
    data() {
        return {
            showDesign: false,
            
        }
    },
    methods: {
        addNode(type) {
            console.log(this.index);
            this.$emit('addNode', type, this.index)
            this.showDesign = false;
        },
        removeNode() {
            this.$emit('removeNode', this.index)
        },
        opMenu() {
            this.showDesign = !this.showDesign;
        },
        cancels() {
            this.showDesign = false
        }
    }
}
</script>

<style lang="scss" scoped>
.box-block {
    width: 120px;
    height: 80px;
    position: relative;
    padding: 20px 0 30px;

    .box-blocks {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 2px;
        height: 100%;
        background-color: #cacaca;
        z-index: 0;
    }

    .add_button {
        position: absolute;
        left: 50%;
        margin-left: -13px;
        width: 26px;
        height: 26px;
    }

    .show-design {
        position: absolute;
        left: 50%;
        top: 35px;
        margin-left: 30px;
        background: #fff;
        box-shadow: 4px 2px 4px 2px rgba(37, 38, 94, .1);
        height: 90px;
        z-index: 10;
    }
    .menu-box {
        position: absolute;
        top: 0;
        left: 30px;
        background: #fff;
        box-shadow: 5px 0px 5px 5px rgba(37, 38, 94, .1);
        height: 90px;
        z-index: 10;
    }
}
</style>