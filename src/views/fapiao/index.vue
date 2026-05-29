<template>
    <div>
        <div style="margin-top: 50px;">
            
        </div>
        <div style="">
            <div style="margin: 10px 16%;">
                <div style="display: flex;align-items: center;">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <div style="font-size: 16px;">
                            报销类型:
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
                    <div style="display: flex;align-items: center;justify-content: center;margin-left: 10px;">
                        <div style="font-size: 16px;width: 90px;">
                            报销金额:
                        </div>
                        <el-input v-model="amount" placeholder="请输入内容"></el-input>
                    </div>
                </div>
            </div>
            <div v-for="(item,index) in tos" :key="index">
                <div style="margin: 30px 16%; display: flex;align-items: center;">
                    <div style="display: flex;align-items: center;justify-content: space-between;">
                        <div style="display: flex;align-items: center;justify-content: center;">
                            <div style="font-size: 16px;width: 90px;">
                                发票编号:
                            </div>
                            <el-input placeholder="请输入发票编号" v-model="tos.nameValue" />
                        </div>
                    </div>
                    <div style="display: flex;align-items: center;justify-content: center;margin-left: 10px;">
                        <div style="font-size: 16px;">
                            报销日期:
                        </div>
                        <el-date-picker
                        style="width: 375px;"
                        v-model="tos.value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div @click="addInvoice(index)" style="margin: 0 10px;">
                        <el-button icon="el-icon-plus"></el-button>
                    </div>
                    <div @click="reduceInvoice(item)">
                        <el-button icon="el-icon-minus" ></el-button>
                    </div>
                </div>
            </div>
            <!-- <div style="display: flex;margin-left: 16%;">
                <div style="font-size: 14px;">
                    上传发票图片:
                </div>
                <el-upload
                class="upload-demo"
                action="http://localhost:8080/api/upload"  
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :multiple="true"
                >
                <i class="el-icon-plus"></i>
                </el-upload>

                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div> -->
            <div style="display: flex;align-items: center;margin-left: 16%;margin-top: 20px;">
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
        <div style="display: flex;justify-content: flex-end;width: 85%;position:fixed;bottom: 5%;z-index: 66;background: #fff;">
            <!-- <el-button style="margin-top: 12px;" @click="cancel">取消</el-button> -->
            <el-button style="margin-top: 12px;" @click="complete">提交</el-button>
        </div>
    </div>
</template>
<script>
import {financial} from '../../../api/approval/LeaveApproval'
export default {
    props:{
        
    },
    components:{
        
    },
    data() {
        return {
            active: 0,
            apply: [
                { value: '1', label: '财务报销' },
            ],
            applyValue: '',
            tos:[
                {
                    value1: '',
                    nameValue:'',
                }
            ],
            amount:'',
            state:[
                { value: '选项1', label: '启用' },
                { value: '选项2', label: '禁用' }
            ],
            stateValue:'',
            textarea:'',
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods: { 
        handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url || URL.createObjectURL(file.raw);
        this.dialogVisible = true;
        },
        handleRemove(file, fileList) {
        console.log(file.name + ' removed.');
        // 这里可以处理文件移除逻辑
        },
        complete() {
            console.log('提交');
            console.log(this.tos);
        },
        formatDate(date) {   //日期转化
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        addInvoice(index) {    //发票增加
            this.tos.push({
                value1:'',
                nameValue:'',
            })
            console.log(this.tos);
        },
        reduceInvoice(value) {
            var index = this.tos.indexOf(value)
            if (index !== -1 && this.tos.length !== 1) {
                this.tos.splice(index, 1)
            } else {
                this.$message({
                message: '请至少保留一张发票记录',
                type: 'warning'
                })
            }
        },
        postFinancial() {
            let data = {
                financialAmount:this.amount,
                typeId:4,
                financial:this.textarea,
            }
            financial(data).then(res=> {
                console.log(res);
            }).catch(err=> {
                console.log(err);
            })
        }
    }  
}
</script>

<style scoped leng="scss">

</style>