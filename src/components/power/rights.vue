<template>
  <div id="rights">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <el-table 
            :data="rightsList" 
            border stripe lazy
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            row-key="id">
                <el-table-column
                type="index"
                label="序号">
                </el-table-column>
                <el-table-column
                prop="authName"
                label="权限名称"
                width="300">
                </el-table-column>
                <el-table-column
                prop="path"
                label="访问路径"
                width="300">
                </el-table-column>
                <el-table-column label="权限ID">
                    <template slot-scope="scope">
                        <el-row type="flex" class="row-bg" justify="space-between">
                            <el-col :span="6"><el-tag v-if="scope.row.id!==0" style=" margin-right: 16px;">权限ID:{{scope.row.id}}</el-tag></el-col>
                            <el-col :span="6"> <el-tag type="danger" v-if="scope.row.pid!==0">权限父ID:{{scope.row.pid}}</el-tag> </el-col>
                        </el-row> 
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
  </div>
</template>

<script>

export default {
  name: "rights",
  data() {
      return {
          // 权限列表
          rightsList: []
      }
  },
  methods: {
     async getRightsList(){
        const {data:res} = await this.$http.get('rights/tree');
        console.log(res)
        if(res.meta.status!==200){
            this.$message.error('权限列表请求失败')
        }else{
            this.rightsList = res.data;
        }
      }
  },
  created() {
      this.getRightsList()
  },

};
</script>

<style>

</style>
