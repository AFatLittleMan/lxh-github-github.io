<template>
    <div>
        <div class="card-box">
            <div class="card-top" :style="{ backgroundColor: data.type == 'approval' ? '#ef8938' : '#3296fa' }">
                <p class="text">{{ data.type == 'approval' ? '审批节点' : '抄送节点' }}</p>
                <i class="icon el-icon-close" @click="removeNode"></i>
            </div>
            <div class="card-bottom">
                <div class="text" @click="openDialog" v-if="approverText">
                    {{ approverText }}
                </div>
                <i class="icon el-icon-arrow-right"></i>
            </div>
        </div>
        <div style="display: flex;align-items: center;justify-content: center;">
            <div class="box-block">
                <div class="add-button">
                    <i class="icon el-icon-circle-plus" @click="openMenu = !openMenu"></i>
                    <menu-card v-show="openMenu" class="menu-block" @addNode="addNode" @closeMenu="openMenu = false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import menuCard from './menu-card';

export default {
    components: { menuCard },
    props: {
        data: Object,
        index: Number
    },
    data() {
        return {
            openMenu: false,
            form: {
                name: '',
                remark: '',
                approver: []
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '需要选择一个', trigger: 'blur' }
                ],
                overdue: [
                    { required: true, message: '需要选择一个', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        /** 审批人 */
        approverText() {
            if (this.data.approver.length == 0) {
                return this.data.type == 'approval' ? '请选择审批人' : '请选择抄送人'
            }
            return this.data.approver.join(',')
        }
    },
    methods: {

        /** 添加节点 **/
        addNode(type) {
            this.$emit('addNode', type, this.index)
            this.openMenu = false;
        },
        /** 删除节点 **/
        removeNode() {
            this.$emit('removeNode', this.index)
        },
        openDialog() {
            this.$emit('selectData', this.index)
        }
    }
}
</script>

<style lang="scss" scoped>
.card-box {
    width: 200px;
    background: #fff;
    border-radius: 5px;
    position: relative;
    box-shadow: 0px 2px 5px 0 rgba(37, 38, 94, 0.1);

    .card-top {
        height: 30px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px 5px 0 0;

        .text {
            margin: 0;
            color: #fff;
        }

        .icon {
            cursor: pointer;
            color: #fff;
        }
    }

    .card-bottom {
        cursor: pointer;
        font-size: 14px;
        color: #999;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text {
            flex: 1;
            display: flex;
            align-items: center;
            width: 165px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 6px;
        }

        .icon {
            flex: 0;
            color: rgba(0, 0, 0, .5);
            font-size: 10px;
        }
    }
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
</style>