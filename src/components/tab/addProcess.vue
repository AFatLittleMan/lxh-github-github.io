<template>
    <div>
        <div style="font-size: 14px;">
            新建请假流程
        </div>
        <el-steps :active="active" finish-status="success" :align-center="true">
            <el-step title="基本信息"></el-step>
            <el-step title="流程设计"></el-step>
        </el-steps>
        <div style="" v-if="active==0">
            <div style="margin: 10px 20%;">
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <div style="font-size: 16px;">
                            适用项目:
                        </div>
                        <el-select v-model="applyValue" placeholder="请选择">
                            <el-option
                            v-for="item in apply"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <div style="font-size: 16px;">
                            流程类型:
                        </div>
                        <el-select v-model="processValue" placeholder="请选择">
                            <el-option
                            v-for="item in process"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div style="margin: 30px 20%; display: flex;align-items: center;justify-content: space-between;">
                <div style="display: flex;align-items: center;justify-content: space-between;">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <div style="font-size: 16px;width: 90px;">
                            流程名称:
                        </div>
                        <el-input placeholder="请输入流程名称" v-model="nameValue" />
                    </div>
                </div>
                <div style="display: flex;align-items: center;justify-content: center;">
                        <div style="font-size: 16px;">
                            流程状态:
                        </div>
                        <el-select v-model="stateValue" placeholder="请选择">
                            <el-option
                            v-for="item in state"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
            </div>
            <div style="display: flex;align-items: center;margin-left: 21%;">
                <div style="font-size: 16px;">备注：</div>
                <el-input
                style="width: 65%;"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea">
                </el-input>
            </div>
        </div>
        <div v-else>
            <design></design>
        </div>
        <div style="display: flex;justify-content: flex-end;width: 85%;position:fixed;bottom: 5%;z-index: 66;background: #fff;">
            <el-button style="margin-top: 12px;" @click="cancel">取消</el-button>
            <el-button style="margin-top: 12px;" @click="next" v-if="active!=1">下一步</el-button>
            <el-button style="margin-top: 12px;" @click="complete" v-else>提交</el-button>
        </div>
    </div>
</template>
<script>
import design from './ProcessDesign.vue'
export default {
    props:{
        // isDialogVisible: {  
        //     type: Boolean,  
        //     default: false  
        // } 
    },
    components:{
        design
    },
    data() {
        return {
            active: 0,
            apply: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '双皮奶' }
            ],
            applyValue: '',
            process:[
                { value: '选项1', label: '普通事假' },
                { value: '选项2', label: '年假' }
            ],
            processValue: '',
            nameValue:'',
            state:[
                { value: '选项1', label: '启用' },
                { value: '选项2', label: '禁用' }
            ],
            stateValue:'',
            textarea:''
        }
    },
    methods: {  
        next() {
            if (this.active++ > 2) this.active = 0;
        },
        complete() {
            let inputMessage=true
            this.$emit('send-message', inputMessage); // 触发自定义事件并传递消息
        },
        cancel() {
            let inputMessage=true
            this.$emit('send-message', inputMessage); // 触发自定义事件并传递消息
        }
    }  
}
</script>

<style scoped leng="scss">

</style>