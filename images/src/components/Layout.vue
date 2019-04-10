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
                    <Col offset="2" span="17" class="header-left">
                        云存储图片管理系统
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
                            <MenuItem  v-for="album in albums" :key="album.index" :name="album.index">{{album.name}}</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-people" size="20"></Icon>
                                社区
                            </template>
                            <MenuItem name="community/myMoments">我的动态</MenuItem>
                            <MenuItem name="community/allMoments">所有动态</MenuItem>
                        </Submenu>
                        <Submenu name="3">
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
                        <!-- 保存组件状态到内存，避免重新渲染 -->
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
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
        crumbList: [
            "首页"
        ],
        albums: [
            {
                index: 1,
                name: "相册1"
            },
            {
                index: 2,
                name: "相册2"
            },
            {
                index: 3,
                name: "相册3"
            }
            
        ]
    }     
  },
//   mounted(){
//       this.loadChange()
//   },
  watch: {
    $route(to, from) {
        // /
        //console.log("333"+from.path) 
        // /photos/1
        console.log("222"+to.path) 
        this.crumbList = to.path.split("/").slice(1)
        if (this.crumbList[0] === "photos") {
            this.crumbList[0] = "相册"
            this.crumbList[1] = "相册" + this.crumbList[1]
        }
        if (this.crumbList[0] === "community") {
            this.crumbList[0] = "社区"
            if(this.crumbList[1] === "myMoments") {
                this.crumbList[1] = "我的动态"
            } else {
                this.crumbList[1] = "所有动态"
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
        console.log(this.crumbList)      
    }
  },
  methods: {
    quit() {
        this.$router.push('/login')
    },
    home() {
        this.$router.push('/')
    },
    openView(e) {
        //console.log(e)
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