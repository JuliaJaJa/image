<template>
    <div class="container">
        <h1>添加好友</h1>
        <hr>
        <Form :label-width="80" class="form">
            <FormItem label="用户名：">
                <Input v-model="name" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="search">查询</Button>
            </FormItem>
        </Form>
        <Table class="table" border stripe :columns="columns" :data="data" :loading="loading"></Table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            loading: false,
            btnLabel: '添加好友',
            friendIds: [],
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
                                       this.addFriend(params.row.userId, params.row.name)
                                    }
                                }
                            }, "添加好友")
                        ])
                    }
                }
            ],
            data: []
        }
    },
    created () {
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
                    this.getAllUser()
                } else {
                    // 没有好友 就展示所有好友
                    this.friendIds = []
                    this.getAllUser()
                    this.$Message.info(res.data.msg)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getAllUser() {
            this.loading = true
            this.$axios.post('/selectAllUser', {
                friendIds: this.friendIds,
                userId: this.$store.state.userId,
                name: this.name
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
        search() {
            this.getAllUser()
        },
        // 发送加好友请求
        addFriend(userId, name) {
            this.$axios.post('/addFriend', {
                requestId: this.$store.state.userId,
	            requestName: this.$store.state.name,
	            acceptId: userId,
	            acceptName: name,
	            relation: 0
            }).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    this.$Message.success(res.data.msg)
                } else {
                    this.$Message.error(res.data.msg)
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
    background: url("../assets/login_bg2.jpg");
    background-repeat:no-repeat; 
    background-size:100% 100%;
    width: 100%;
    height: 100%;
    .form {
        display: flex;
        margin: 20px;
    }
    .table {
        margin: 20px;
    }
}
</style>

