<!-- <template>
    <div>
        子组件
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        lists: {
            type:Array,
            default: []
        }
    },
    mounted() {
        console.log(this.lists);
    },
    methods: {
        zi() {
            console.log('子组件');
        }
    }
}
</script>
<style lang="scss" scoped>

</style> -->

<template>
    <div class="flowChartBox">
        <div v-if="dialogVisible==true">
            <div class="filterBox">
                <div style="display: flex;align-items: center;justify-content: center;width: 60%;">
                    <div style="width: 50%; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 14px;width: 25%;">流程名称</span>
                        <el-input placeholder="请输入流程名称" v-model="inputValue">
                        </el-input>
                    </div>
                    <div style="width: 50%; display: flex; align-items: center; justify-content: center;margin-left: 30px;">
                        <span style="font-size: 14px;width: 25%;">状态类型</span>
                        <el-select v-model="stateValue" placeholder="请选择状态类型">
                        <el-option
                        v-for="item in stateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                        </el-select>
                    </div>
                </div>
                <div>
                    <el-button type="primary">查询</el-button>
                </div>
                <div>清除条件</div>
            </div>
            <div style="margin-top: 10px; margin-bottom: 14px;" >
                <el-button type="primary" @click="drawer">新增流程</el-button>
            </div>
            <tables />
        </div>
        <addprocess v-else @send-message="receiveMessage"/>
    </div>
</template>

<script>
import tables from './table.vue'
import addprocess from './addProcess.vue'
// import { getLeave } from '../../../api/approval/LeaveApproval'
export default {
    data() {
        return {
            inputValue:'',
            options: [ {
                value: '选项1',
                label: '龙须面'
                }, {
                value: '选项2',
                label: '北京烤鸭'
            }],
            value: '',
            stateOptions: [
                { value: '选项1', label: '全部' },
                { value: '选项2', label: '禁用' },
                { value: '选项3', label: '启用' }
            ],
            stateValue:'',
            dialogVisible: true,
        }
    },
    components: {
        tables,
        addprocess
    },
    mounted() {
        // this.getsLeave()
        console.log(222);
    },
    methods: {
        drawer() {
            this.dialogVisible = false;  
        },
        receiveMessage(msg) {
            this.dialogVisible = msg; // 更新接收到的消息
        },
        // getsLeave() {   //获取请假审批表单数据
        //     getLeave().then(res=>{
        //         console.log(res);
        //     }).catch(err=>{
        //         console.log(err);
        //     })
        // }
    },
}
</script>
<style leng="scss" scoped>
.flowChartBox{
    padding: 15px 10px;
    .filterBox{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 30px;
    }
}
</style>