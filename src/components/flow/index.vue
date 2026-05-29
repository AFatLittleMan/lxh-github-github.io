<template>
    <div class="box-design">
        <div class="stare-node">
            <div class="box-text">
                <p>流程开始</p>
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

        <div v-for="(item, index) in processList" :key="index">
            <card :data="item" :index="index" @opMenu="opMenu" @addNode="addNode" @removeNode="removeNode" />
        </div>

        <div class="end-node" style="margin-bottom: 110px;">
            <div class="box-text">
                <p>流程结束</p>
            </div>
        </div>
    </div>
</template>

<script>
import card from './card.vue';

export default {
    components: { card },
    data() {
        return {
            showDesign: false,
            processList: [
                // {
                //     type: "approval", // 审批
                // },
                // {
                //     type: "send", // 抄送
                // }
            ],
        }
    },
    mounted() {

    },
    methods: {
        addNode(type, index) {
            index = index == undefined ? 0 : index + 1;
            console.log(index);
            this.showDesign && (this.showDesign  = false);
            this.processList.splice(index, 0, {
                type
            });
        },
        removeNode(index) {
            console.log(index);
            this.processList.splice(index, 1)
        },
        opMenu() {
            this.showDesign = !this.showDesign;

        },
        cancels() {
            console.log(123);
            this.showDesign = false;
        }
    },
}

</script>

<style lang="scss" scoped>
.box-design {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .stare-node,
    .end-node {
        text-align: center;

        .box-text {
            width: 120px;
            height: 44px;
            background: #cacaca;
            border-radius: 37px;
            font-size: 14px;
            color: #666;
            text-align: center;
            line-height: 44px;
        }

        .box-block {
            width: 120px;
            height: 80px;
            position: relative;
            padding: 20px 0;
            display: flex;
            align-items: center;
            justify-content: center;

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
                cursor: pointer;
                position: absolute;
                left: 50%;
                margin-left: -13px;
                width: 26px;
                height: 26px;
            }

        }
    }

    .box-top {
        display: flex;
        align-items: center;
        justify-content: center;
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