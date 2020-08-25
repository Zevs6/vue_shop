<template>
  <div id="list">
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>

       <!-- 卡片视图区域 -->
      <el-card class="box-card">  
          <el-row :gutter="30">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" @change="getGoodsList" clearable>
                        <el-button @click='getGoodsList' slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddpage">添加商品</el-button>
                </el-col>
          </el-row>

          <el-table :data="goodsList" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>
                <el-table-column prop="goods_weight" label="商品重量"  width="70"></el-table-column>
                <el-table-column label="创建时间"  width="140">
                     <template slot-scope="scope">
                        {{scope.row.add_time | dataFormat}}                
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)">删除</el-button>                
                    </template>
                </el-table-column>
            </el-table>

             <!-- 分页区域 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-size="queryInfo.pagesize"
            :page-sizes="[6, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
             background>
            </el-pagination>

      </el-card>
  </div>
</template>

<script>

export default {
  name: "list",
	data() {
    return {
      queryInfo: {
        query: '', // 搜索内容参数
        pagesize: 6, // 每页显示条数
        pagenum: 1, // 当前页码
      },
      // 商品列表
      goodsList: [],
      // 总数据条数
      total: 0
    }
  },
  methods: {
    // 获取所有商品的数据列表
    async getGoodsList(){
      const {data:res} = await this.$http.get('goods',{params: this.queryInfo})
      if(res.meta.status!==200){
        return this.$message.error('商品列表获取失败！');
      }else{
        console.log(res.data);
        this.goodsList = res.data.goods;
        this.total = res.data.total;
      }
    },
    //  监听 pagesize 改变的事件
      handleSizeChange(newSize){
        console.log(newSize)
        this.queryInfo.pagesize = newSize;
         this.getGoodsList()
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage){
          console.log(newPage)
          this.queryInfo.pagenum = newPage;
           this.getGoodsList()
      },
      // 点击删除商品
      removeById(id){
          this.$confirm(`此操作将永久删除该商品, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete(`goods/${id}`)
                .then(ret=>{
                    const res = ret.data;
                    if(res.meta.status!==200){
                        return this.$message.error('商品删除失败！！！')
                    }else{
                        this.$message.success('商品删除成功');
                        this.getGoodsList()
                    }
                })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 
      },
      // 点击添加按钮，利用编程式导航跳转到添加商品组件页面
      goAddpage(){
        this.$router.push('/goods/add');
      }
  },
  created() {
    this.getGoodsList()
  },
  computed: {
    
  },
};
</script>

<style lang="less" scoped>

</style>
