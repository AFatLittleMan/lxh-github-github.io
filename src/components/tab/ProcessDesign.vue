<template>
    <div class="box-design">
        <div class="box-top">
            <div class="box-topTexe">
                <p>流程开始</p>
            </div>
        </div>
        <div style="display: flex;align-items: center;justify-content: center;">
            <div class="box-block">
                <i class="box-blocks"></i>
                <div class="add_button" @click="addNode">
                   <i class="el-icon-circle-plus" style="font-size: 26px; color: #3296fa;"></i>
                </div>
                <div class="show-design" v-if="showDesign">
                    <div style="display: flex;align-items: center;justify-content: space-around;width: 215px;">
                        <div style="width: 56px;">
                            <div class="el-icon-s-opportunity" style="font-size: 52px;color: #ef8938;"></div>
                            <p style="font-size: 14px; margin: 10px 0 0 0 ;">审批节点</p>
                        </div>
                        <div style="width: 56px;">
                            <div class="el-icon-s-promotion" style="font-size: 52px;color: #3296fa;"></div>
                            <p style="font-size: 14px; margin: 10px 0 0 0 ;">抄送节点</p>
                        </div>
                    </div>
                    <div class="el-icon-close" style="position: absolute;top:0;right: 0;font-size: 14px;" @click="cancels"></div>
                </div>
            </div>
        </div>

        <div v-for="item in processList" :key="item.id">

        </div>

        
        <div>
            <div style="display: flex;align-items: center;justify-content: center;">
                <div style="width: 200px;min-height: 75px;background: #fff;border-radius: 5px;position: relative;box-shadow: 0 2px 4px 0 rgba(37, 38, 94, .1);">
                    <div style="background: #ef8938;height: 30px;padding: 0 15px;display: flex;align-items: center;justify-content: space-between;border-radius: 5px 5px 0 0;">
                        <p style="margin: 0;color: #fff;">审批节点</p>
                        <i class="el-icon-close" style="color: #fff;"></i>
                    </div>
                    <div style="font-size: 14px;color: #999;padding: 0 15px;display: flex;align-items: center;justify-content: space-between;">
                        <p>请选择审批人</p>
                        <i class="el-icon-arrow-right" style="color: rgba(0, 0, 0, .5);font-size: 7px;"></i>
                    </div>
                </div>
            </div>
            <div style="display: flex;align-items: center;justify-content: center;">
                <div class="box-block">
                    <i class="box-blocks"></i>
                    <div class="add_button" @click="addNode">
                    <i class="el-icon-circle-plus" style="font-size: 26px; color: #3296fa;"></i>
                    </div>
                    <div class="show-design" v-if="showDesign">
                        <div style="display: flex;align-items: center;justify-content: space-around;width: 215px;">
                            <div style="width: 56px;">
                                <div class="el-icon-s-opportunity" style="font-size: 52px;color: #ef8938;"></div>
                                <p style="font-size: 14px; margin: 10px 0 0 0 ;">审批节点</p>
                            </div>
                            <div style="width: 56px;">
                                <div class="el-icon-s-promotion" style="font-size: 52px;color: #3296fa;"></div>
                                <p style="font-size: 14px; margin: 10px 0 0 0 ;">抄送节点</p>
                            </div>
                        </div>
                        <div class="el-icon-close" style="position: absolute;top:0;right: 0;font-size: 14px;" @click="cancels"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div>
            <div style="display: flex;align-items: center;justify-content: center;">
                <div style="width: 200px;min-height: 75px;background: #fff;border-radius: 5px;position: relative;box-shadow: 0 2px 4px 0 rgba(37, 38, 94, .1);">
                    <div style="background: #3296fa;height: 30px;padding: 0 15px;display: flex;align-items: center;justify-content: space-between;border-radius: 5px 5px 0 0;">
                        <p style="margin: 0;color: #fff;">抄送节点</p>
                        <i class="el-icon-close" style="color: #fff;"></i>
                    </div>
                    <div style="font-size: 14px;color: #999;padding: 0 15px;display: flex;align-items: center;justify-content: space-between;">
                        <p>请选择抄送人</p>
                        <i class="el-icon-arrow-right" style="color: rgba(0, 0, 0, .5);font-size: 7px;"></i>
                    </div>
                </div>
            </div>
            <div style="display: flex;align-items: center;justify-content: center;">
                <div class="box-block">
                    <i class="box-blocks"></i>
                    <div class="add_button" @click="addNode">
                    <i class="el-icon-circle-plus" style="font-size: 26px; color: #3296fa;"></i>
                    </div>
                    <div class="show-design" v-if="showDesign">
                        <div style="display: flex;align-items: center;justify-content: space-around;width: 215px;">
                            <div style="width: 56px;">
                                <div class="el-icon-s-opportunity" style="font-size: 52px;color: #ef8938;"></div>
                                <p style="font-size: 14px; margin: 10px 0 0 0 ;">审批节点</p>
                            </div>
                            <div style="width: 56px;">
                                <div class="el-icon-s-promotion" style="font-size: 52px;color: #3296fa;"></div>
                                <p style="font-size: 14px; margin: 10px 0 0 0 ;">抄送节点</p>
                            </div>
                        </div>
                        <div class="el-icon-close" style="position: absolute;top:0;right: 0;font-size: 14px;" @click="cancels"></div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="box-top" style="margin-bottom: 110px;">
            <div class="box-topTexe">
                <p>流程结束</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showDesign:false,
            processList: [
                {
                    type: "approval", // 审批
                    id: "approval_1",
                },
                {
                    type: "send", // 抄送
                    id: "send_1"
                }
            ],
        }
    },
    mounted() {
        
    },
    methods: {
        addNode() {
            this.showDesign=!this.showDesign
            console.log(this.showDesign);
        },
        cancels() {
            this.showDesign=false
        }
    },
}

</script>

<style lang="scss" scoped>
    .box-design{
        
        .box-top{
            display: flex;
            align-items: center;
            justify-content: center;
            .box-topTexe{
                width: 120px;
                height: 44px;
                background: #cacaca;
                border-radius: 37px;
                font-size: 14px;
                color: #666;
                text-align: center;
            }
        }
        .box-block{
            width: 120px;
            height: 80px;
            position: relative;
            padding: 20px 0 30px;
            .box-blocks{
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
            .add_button{
                position: absolute;
                left: 50%;
                margin-left: -13px;
                width: 26px;
                height: 26px;
            }
            .show-design{
                position: absolute;
                left: 50%;
                top: 35px;
                margin-left: 30px;
                background: #fff;
                box-shadow: 4px 2px 4px 2px rgba(37, 38, 94, .1);
                height: 90px;
                z-index: 10;
            }
        }
    }
</style>