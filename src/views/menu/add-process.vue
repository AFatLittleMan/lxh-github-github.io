<template>
    <div class="box-design">
        <div v-if="showStep">
            <el-form :model="form">
                <el-form-item label="名称">
                    <el-input v-model="form.flowTitle" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="form.typeId" placeholder="请选择">
                        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark" :rows="2" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <div style="position:fixed;bottom: 10%;display: flex;justify-content: flex-end;width: 45%;">
                <el-button style="margin-top: 12px;" @click="previous">返回</el-button>
                <el-button style="margin-top: 12px;" @click="next">保存下一步</el-button>
            </div>
        </div>
        <div class="step-box" v-else>
            <div class="stare-node">
                <div class="box-text">流程开始</div>
                <div class="box-block">
                    <div class="add-button">
                        <i class="icon el-icon-circle-plus" @click="openMenu = !openMenu"></i>
                        <menu-card v-show="openMenu" class="menu-block" @addNode="addNode"
                            @closeMenu="openMenu = false" />
                    </div>
                </div>
            </div>

            <div v-for="(item, index) in processList" :key="index">
                <node-card :data="item" :index="index" @addNode="addNode" @removeNode="removeNode"
                    @selectData="selectData" />
            </div>

            <div class="end-node">
                <div class="box-text">流程结束</div>
            </div>
            <div class="box-design-footer">
                <el-button @click="cancel">返回</el-button>
                <el-button @click="complete">提交</el-button>
            </div>
        </div>

        <!-- 编辑信息 -->
        <el-dialog :title="'编辑审批信息'" :visible.sync="dataDialog">
            <el-form :model="dataForm" :rules="dataFormRules">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="dataForm.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="节点描述">
                    <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="dataForm.remark">
                    </el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-button type="primary" @click="openPostDialog">选择岗位</el-button>
                    <div class="post-item-list">
                        <div v-for="(item, index) in dataForm.approver" :key="index">{{ item }}</div>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dataDialogClose">取 消</el-button>
                <el-button type="primary" @click="dataDialogConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 选择岗位 -->
        <el-dialog title="选择岗位" :visible.sync="postDialog">
            <div class="post-container">
                <div class="post-tree">
                    <el-input placeholder="输入关键字进行过滤" v-model="keyWord"></el-input>
                    <div class="post-tree-container">
                        <el-tree class="filter-tree" :data="data" default-expand-all :filter-node-method="filterNode"
                            @node-click="handleNodeClick" ref="tree" :props="treeProps">
                        </el-tree>
                    </div>
                </div>
                <div class="post-list">
                    <div class="post-title">已选择岗位</div>
                    <div class="post-item" v-for="(item, index) in dataForm.approver" :key="index"
                        @click="deleteList(item)">
                        {{ item }} <i class="el-icon-circle-close"></i>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import nodeCard from './node-card.vue';
import menuCard from './menu-card.vue';

export default {
    components: { nodeCard, menuCard },
    data() {
        return {
            showStep: true,
            openMenu: false,
            form: {
                flowTitle: '',
                typeId: '',
                remark: '',
            },
            /** 下拉框数据 **/
            selectOptions: [
                { value: 1, label: '事假' },
                { value: 2, label: '病假' },
                { value: 3, label: '外出' },
                { value: 4, label: '财务报销' },
            ],
            dataDialog: false,
            postDialog: false,
            processList: [],
            dataForm: {}, // 编辑信息的表单
            dataFormRules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ]
            },
            keyWord: '',
            data: [],
            treeProps: {
                children: "children", // 子节点字段
                label: "label"        // 显示字段
            }
        }
    },
    watch: {
        keyWord(val) {
            this.$refs.tree.filter(val);
        },
    },
    created() {
        this.data = [{
          label: "一级节点 1",
          children: [
            {
              label: "二级节点 1-1",
              children: [
                {
                  label: "三级节点 1-1-1",
                  children: [
                    {
                      label: "四级节点 1-1-1-1"
                    },
                    {
                      label: "四级节点 1-1-1-2"
                    }
                  ]
                },
                {
                  label: "三级节点 1-1-2"
                }
              ]
            },
            {
              label: "二级节点 1-2"
            }
          ]
        },
        {
          label: "一级节点 2",
          children: [
            {
              label: "二级节点 2-1"
            }
          ]
        }]
    },
    methods: {
        /** 返回 */
        previous() {
            let inputMessage = true
            this.$emit('send-message', inputMessage); // 触发自定义事件并传递消息
        },
        /** 保存下一步 */
        next() {
            this.showStep = false
        },

        /** 添加节点 */
        addNode(type, index = null) {
            this.openMenu && (this.openMenu = false);
            index = index == null ? 0 : index + 1;
            const nodeData = { type, index, approver: [], remark: '', name: '' }
            this.processList.splice(index, 0, nodeData);
            // 更新子项的 index
            this.processList.forEach((e, i) => { e.index = i })
            console.table(this.processList);
        },
        /** 删除节点 */
        removeNode(index) {
            console.log('删除节点', index);
            this.processList.splice(index, 1)
            // 更新子项的 index
            this.processList.forEach((e, i) => { e.index = i })
        },

        /** 提交 */
        complete() {
            // this.$message.warning('还没填写内容');
            console.log('提交数据', this.processList);
            const arr = this.processList.map(item=> {
                item.node = item.name;
                item.currentNo = item.index +1
                item.flag = 1
              return item  
            })
            console.log(arr);
            this.$emit('send-message', true);
            // todo 请求接口
        },
        /** 流程的返回 */
        cancel() {
            this.showStep = true
            // todo 应该将数据清空，否则下次进入，数据还在
        },

        /** 选择数据 */
        selectData(index) {
            // 将点击的数据给 dataForm 去展示/编辑
            this.dataForm = Object.assign({}, this.processList[index])
            this.dataDialog = true;
        },
        dataDialogClose() {
            this.dataDialog = false
        },
        dataDialogConfirm() {
            // 将修改地数据重新赋值给 processList 指定子项
            this.processList[this.dataForm.index] = this.dataForm
            this.dataDialog = false
        },
        /** 选择岗位地弹窗 */
        openPostDialog() {
            this.postDialog = true
        },

        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleNodeClick(node) {
            if (!node.children || node.children.length == 0) {
                if (!this.dataForm.approver.includes(node.label)) {
                    this.dataForm.approver.push(node.label);
                }
            }
        },
        deleteList(item) {
            this.dataForm.approver = this.dataForm.approver.filter(i => i !== item);
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

    .step-box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

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
            width: 100%;
            height: 120px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                width: 2px;
                height: 100%;
                transform: translateX(-50%);
                background-color: #cacaca;
            }

            .add-button {

                position: absolute;
                z-index: 1;
                left: 50%;
                transform: translateX(-50%);

                .icon {
                    cursor: pointer;
                    font-size: 26px;
                    color: #3296fa;
                }

                .menu-block {
                    width: 200px;
                    position: absolute;
                    top: 0px;
                    left: 30px;
                }
            }
        }
    }

    .box-design-footer {
        display: flex;
        justify-content: flex-end;
        width: 45%;
        position: fixed;
        bottom: 5%;
        z-index: 66;
        background: #fff;
        margin-top: 12px;
    }

    .post-item-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 5px;
    }

    .post-container {
        height: 350px;
        display: flex;
        justify-content: space-between;

        .post-tree {
            display: flex;
            flex-direction: column;
            width: 49%;
            padding-right: 5px;
            margin-right: 5px;
            height: 100%;
            border-right: 2px solid #e4e4e4;

            .post-tree-container {
                flex: 1;
                overflow: auto;
            }
        }

        .post-list {
            width: 49%;
            height: 100%;

            .post-title {
                color: #999;
                font-size: 14px;
                height: 32px;
                line-height: 32px;
            }

            .post-item {
                cursor: pointer;
                padding: 5px 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-radius: 4px;

                &:hover {
                    background-color: #f5f5f5;
                }
            }
        }
    }
}
</style>
