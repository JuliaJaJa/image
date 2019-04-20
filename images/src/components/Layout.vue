<style>
.ivu-layout-sider-children{
    height: 100vh;
   
}
.ivu-menu{
    font-size: 16px;
}
</style>

<template>
  <div class="layout">
        <Layout>
            <Header class="layout-header">
                <Row>
                    <Col offset="2" span="16" class="header-left">
                        云存储图片管理系统
                    </Col>
                    <Col span="1" class="header-right" v-if="userName !== ''">
                        {{userName}}
                    </Col>
                     <Col span="2" class="header-right">
                        <Button ghost type="text" icon="ios-image" class="exit-button" @click="home">
                            新建相册
                        </Button>
                    </Col>
                    <Col span="2" class="header-right">
                        <Button ghost type="text" icon="md-exit" class="exit-button" @click="quit">
                             退出系统
                        </Button>
                    </Col>                   
                </Row>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu theme="light" width="auto" @on-select="openView">
                        <Submenu name="1">
                            <!-- 根据相册id 在页面显示不同的照片-->
                            <template slot="title">
                                <Icon type="md-photos" size="20"></Icon>
                                相册
                            </template>
                            <MenuItem  v-for="(album, index) in albums" :key="index" :name="index">{{album.albumName}}</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-people" size="20"></Icon>
                                社区
                            </template>
                            <MenuItem name="community/myMoments">我的动态</MenuItem>
                            <MenuItem name="community/allMoments">好友动态</MenuItem>
                        </Submenu>                        
                         <Submenu name="3">
                            <template slot="title">
                                <Icon type="md-contacts" size="20"></Icon>
                                好友管理
                            </template>
                            <MenuItem name="friend/myFriends">我的好友</MenuItem>
                            <MenuItem name="friend/addFriend">添加好友</MenuItem>
                        </Submenu>
                         <Submenu name="4">
                            <template slot="title">
                                <Icon type="md-notifications" size="20"></Icon>
                                站内消息
                            </template>
                            <MenuItem name="info/browseInfo">查看消息</MenuItem>
                        </Submenu>
                        <Submenu name="5">
                            <template slot="title">
                                <Icon type="md-person" size="20"></Icon>
                                个人信息
                            </template>
                            <MenuItem name="personal/modifyPassword">修改密码</MenuItem>
                            <MenuItem name="personal/modifyPersonalInfo">修改个人信息</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}" separator=">">
                        <BreadcrumbItem v-for="(item,index) in crumbList" :key="index">{{item}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', background: '#fff'}">
                        <router-view></router-view>
                    </Content> 
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
  name: 'Homepage',
  data () {
    return {
        //userName: '',
        crumbList: [
            "首页"
        ]
    }     
  },
  computed: {
    userName() {
        return this.$store.state.name
    },
    albums: {
      get() { 
        return this.$store.state.albumList
      },
      set(newValue) {
        this.$store.state.albumList = newValue 
      }      
    }
  },
  watch: {
    userName(newData, oldData) {
      console.log(`${newData}--- ${oldData}`)
    },
    $route(to, from) {
        // /
        //console.log("333"+from.path) 
        // /photos/1
        console.log("222"+to.path) 
        this.crumbList = to.path.split("/").slice(1)
        if (this.crumbList[0] === '') {
            this.crumbList[0] = '首页'
        }
        if (this.crumbList[0] === "photos") {
            this.crumbList[0] = "相册"
            this.crumbList[1] = this.albums[this.crumbList[1]].albumName
        }
        if (this.crumbList[0] === "community") {
            this.crumbList[0] = "社区"
            if(this.crumbList[1] === "myMoments") {
                this.crumbList[1] = "我的动态"
            } else {
                this.crumbList[1] = "好友动态"
            }
        }
        if (this.crumbList[0] === "personal") {
            this.crumbList[0] = "个人信息"
            if(this.crumbList[1] === "modifyPassword") {
                this.crumbList[1] = "修改密码"
            } else {
                this.crumbList[1] = "修改个人信息"
            }
        }
        if (this.crumbList[0] === "friend") {
            this.crumbList[0] = "好友管理"
            if(this.crumbList[1] === "myFriends") {
                this.crumbList[1] = "我的好友"
            } else {
                this.crumbList[1] = "添加好友"
            }
        }
        if (this.crumbList[0] === "info") {
            this.crumbList[0] = "站内消息"
            if(this.crumbList[1] === "browseInfo") {
                this.crumbList[1] = "查看消息"
            }
        }
        console.log(this.crumbList)      
    }
  },
  created () {
    this.getAlbumList()
  },
  methods: {
    // 获取相册列表
    getAlbumList() {
      this.$axios.post('/getAlbumList', {
        userId: this.$store.state.userId,
      }).then(res => {
        console.log(res)
        if (res.data.data && res.data.data.length) {
          this.albums = res.data.data
          this.$store.commit('changeAlbumList', this.albums)
          console.log("list",this.$store.state.albumList)
        } else {
          this.albums = []
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    quit() {
        this.$router.push('/login')
    },
    home() {
        this.$router.push('/')
    },
    openView(e) {
        //e是index 0,1,2...
        console.log(e)
        if(isNaN(e)){
            this.$router.push("/" + e)
        } else {            
            this.$router.push({
                path: "/photos",
                name: 'photos',
                params: {
                    albumId: e
                }
            })
        }
        
    }
  }
}
</script>

<style lang="less" scoped>
.layout{  
    background: #f5f7f9;
    position: relative;
    overflow: hidden;

    .layout-header{
        padding: 0;
        color: #f5f7f9;

        .header-left{
            font-size: 20px;            
        }
        
        .header-right{
            .exit-button{
                font-size: 15px;   
                color: #f5f7f9;
                &active{
                    border-color:  #5b6270;
                }               
            }             
        }
    }

    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
}
</style>