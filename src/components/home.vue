<template>
  <div id="home">
    <el-container class="home_container">
    <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/logo.png" alt="">
          <h1>电商后台管理系统</h1>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
    <!-- 页面主体区域 --> 
      <el-container>
       <!-- 侧边栏 -->
        <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
         <!-- 侧边栏菜单区域 -->
            <el-col :span="12">
                <el-menu
                  unique-opened router
                  :default-active="$route.path"
                  :collapse-transition="false"
                  :collapse="isCollapse"
                  class="el-menu-vertical-demo"
                  background-color="#333744"
                  text-color="#fff"
                  active-text-color="#409EFF">
                   <!-- 一级菜单 -->
                  <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                  <!-- 标题插槽 -->
                    <template slot="title">
                      <!-- 图标 -->
                      <i :class="iconsObj[item.id]"></i>
                      <!-- 名称 -->
                      <span>{{item.authName}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
                    <!-- 标题插槽 -->
                      <template slot="title">
                         <!-- 图标 -->
                        <i class="el-icon-menu"></i>
                        <!-- 名称 -->
                        <span>{{subItem.authName}}</span>
                      </template>
                    </el-menu-item>
                  </el-submenu>
                </el-menu>
              </el-col>
        </el-aside>
        <el-container>
           <!-- 右侧内容主体 -->
          <el-main>
            <router-view ></router-view>
          </el-main>
           <!-- 尾部区域 -->
          <el-footer>Copyright © 2020 小帅搜. All Rights Reserved.</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      menuList:[],
      iconsObj:{
        125: 'el-icon-user-solid',
        103: 'el-icon-s-operation',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing'
      },
      isCollapse: false,
    }
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    getMenuList(){
      this.$http.get('menus').then(ret=>{
        const res = ret.data;
        if(res.meta.status!==200){
          return this.$message.error(res.meta.msg)
        }else{
          this.menuList = res.data
        }
        console.log(res)
      })
    },
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    // 获取所有的菜单
    this.getMenuList();
  },
}
</script>

<style lang="less" scoped>
.home_container,#home{
  height: 100%;
}
.el-header, .el-footer {
    background-color: #373d41;
    color: #fff;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
.el-header div{
  height: 100%;
  display: flex;
  align-items: center;
  img{
    width: 60px;
    margin-right: 20px;
  }
}

.el-footer{
  justify-content:center;
  font-size: 12px;
}

  
  .el-aside {
    background-color: #333744;
    color: #333;
    text-align: center;
    line-height: 200px;
    .el-menu{
      border-right:0;
    }
    .toggle-button{
      background-color: #4A5064;
      line-height: 24px;
      font-size: 10px;
      color: #fff;
      letter-spacing:0.2em;
      cursor: pointer;
    }
  }
  
  .el-main {
    background-color: #eaedf1;
    color: #333;
  }
  

  
</style>
