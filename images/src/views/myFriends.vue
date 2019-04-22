<template>
    <div class="container">
        <h1>我的好友</h1>
        <hr>
        <Table class="table" border stripe :columns="columns" :data="data" :loading="loading"></Table>
    </div>
</template>

<script>
export default {
    data() {
        return{
            loading: false,
            friendIds: [],
            data: [],
            columns: [
                {
                    title: '用户名',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '手机号',
                    key: 'phone',
                    align: 'center'
                },
                {
                    title: '性别',
                    key: 'sex',
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.sex === '0') {
                            return h('span','男')
                        } else {
                            return h('span','女')
                        }
                    }
                },
                {
                    title: '个性签名',
                    key: 'signature',
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
                                on: {
                                    click: () => {
                                       this.deleteFriend(params.row.userId)
                                    }
                                }
                            }, "删除好友")
                        ])
                    }
                }
            ]
        }
    },
    created() {
        this.getFriends()
    },
    methods: {
        getFriends() {
            this.loading = true
            this.$axios.post('/getFriendsIds', {
                userId: this.$store.state.userId
            })
            .then(res => {
                this.loading = false
                console.log(res)
                if (res.data.data) {
                    this.friendIds = res.data.data
                    this.$store.commit('changeFriendIds', this.friendIds)
                    //根据Ids获取userList
                    this.$axios.post('/getUserListByIds', {
                        friendIds: this.friendIds
                    }).then(res => {
                        console.log(res)
                        if (res.data) {
                            this.data = res.data.data
                        } else {
                            this.data = []
                            this.$Message.info(res.data.msg)
                        }        
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    this.friendIds = []
                    this.$Message.info(res.data.msg)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        deleteFriend(userId) {
            this.$Modal.info({
                title: '提示信息',
                content: '您确定要删除该好友吗？',
                onOk: () => {
                    this.$axios.post('/deleteFriend', {
                        userId: this.$store.state.userId,
                        friendId: userId
                    }).then(res => {
                        console.log(res)
                        if (res.data.code === 200) {
                            this.$Message.success(res.data.msg)
                            this.getFriends()
                        } else {
                            this.$Message.error(res.data.msg)
                        }        
                    }).catch((err) => {
                        console.log(err);
                    })
                }        
            })
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    background: url("../assets/login_bg2.jpg");
    background-repeat:no-repeat; 
    background-size:100% 100%;
    width: 100%;
    height: 100%;
    .table {
        margin: 20px;
    }
}
</style>
