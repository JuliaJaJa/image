<template>
    <div class="container">
        <h1>查看消息</h1>
        <hr>
        <Table class="table" border stripe :columns="columns" :data="data" :loading="loading"></Table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            relation: '',
            columns:[
                {
                    title: '请求添加好友用户名',
                    key: 'requestName',
                    align: 'center'
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                       this.agreeAdd(params.row.relationId)
                                    }
                                }
                            }, "确认添加"),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                       this.unagreeAdd(params.row.relationId)
                                    }
                                }
                            }, "拒绝添加")
                        ])
                    }
                }
            ],
            data: []
        }
    },
    created() {
        this.getAddRequest()
    },
    methods: {
        getAddRequest() {
            this.loading = true
            this.$axios.post('/getAllRequest', {
                acceptId: this.$store.state.userId
            }).then(res => {
                this.loading = false
                console.log(res)
                if (res.data.data) {
                    this.data = res.data.data
                } else {
                    this.data = []
                    this.$Message.info(res.data.msg)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 同意添加
        agreeAdd(relationId) {
           this.relation = 1
           this.checkAdd(relationId)
        },
        // 不同意添加
        unagreeAdd(relationId) {
           this.relation = 2
           this.checkAdd(relationId)
        },
        // 是否同意添加
        checkAdd(relationId) {
            this.$axios.post('/checkAdd', {
                relationId: relationId,
                relation: this.relation
            }).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    this.$Message.success(res.data.msg)
                    this.getAddRequest()
                } else {
                    this.$Message.info(res.data.msg)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    .table {
        margin-top: 20px;
    }
}
</style>


