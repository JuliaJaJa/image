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
            data: [],
            columns: [
                {
                    title: '已添加的好友',
                    key: 'acceptName',
                    align: 'center'
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
            this.$axios.post('/getFriends', {
                requestId: this.$store.state.userId
            })
            .then(res => {
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
