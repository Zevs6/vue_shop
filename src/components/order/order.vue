<template>
  <div id="order">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
         <el-card class="box-card">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" @change="getOrderList" clearable>
                        <el-button @click='getOrderList' slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
            </el-row>

            <el-table :data="orderList" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="order_number" label="订单编号"></el-table-column>
                <el-table-column label="订单价格" width="120" align='center'>
                    <template slot-scope="scope">
                        {{'￥'+scope.row.order_price}}                
                    </template>
                </el-table-column>
                <el-table-column  label="是否付款"  width="120"  align='center'>
                    <template slot-scope="scope">
                        <el-tag type="danger" v-if="scope.row.pay_status==0">未付款</el-tag>  
                        <el-tag type="success" v-else>已付款</el-tag>           
                    </template>
                </el-table-column>
               <el-table-column prop="is_send" label="是否发货" width="120"  align='center'></el-table-column>
                <el-table-column label="下单时间"  width="200"  align='center'>
                     <template slot-scope="scope">
                        {{scope.row.create_time | dataFormat}}                
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="260"  align='center'>
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
                        <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox(scope.row)"></el-button>                
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

         <!-- 修改地址的对话框 -->
         <el-dialog
        title="修改地址"
        :visible.sync="addressDialogVisible"
        width="50%"
        @close="addressDialogClosed('addressFormRef')">
        <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
            <el-form-item label="省市区/县" prop="address1">
                <el-cascader
                v-model="addressForm.address1"
                :options="cityData"
                expandTrigger='hover'
                clearable>
                </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address2">
                <el-input v-model.number="addressForm.address2" clearable></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addressDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addressDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 展示物流进度的对话框 -->
         <el-dialog
          title="物流进度"
          :visible.sync="progressDialogVisible"
          width="50%">
          <el-timeline>
            <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            type="success"
            color="green"
            :timestamp="activity.time">
            {{activity.context}}
           </el-timeline-item>
          </el-timeline>
        </el-dialog>
  </div>
</template>

<script>
import cityData from './citydata.js'
export default {
  name: "order",
  data() {
    return {
      queryInfo: {
        query: '', // 搜索内容参数
        pagesize: 10, // 每页显示条数
        pagenum: 1, // 当前页码
      },
      // 订单列表
      orderList: [],
      // 总数据条数
      total: 0,
      // 控制修改地址对话框的显示与隐藏
      addressDialogVisible: false,
      // 控制物流进度对话框的显示与隐藏
      progressDialogVisible: false,
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRules:{
        address1: [
            {required: true,message:"请选择省市区/县",trigger:'blur'},
          ],
        address2: [
            {required: true,message:"请填写详细地址",trigger:'blur'},
        ]
      },
      // 省市区三级联动数据
      cityData: cityData,
      // 物流进度信息
      progressInfo: [],

    }
  },
  methods: {
    // 获取订单的数据列表
    async getOrderList(){
        const {data:res} = await this.$http.get('orders',{params: this.queryInfo})
        if(res.meta.status!==200){
          return this.$message.error('订单列表获取失败！');
        }else{
          console.log(res.data);
          this.orderList = res.data.goods;
          this.total = res.data.total;
        }
    },
    //  监听 pagesize 改变的事件
      handleSizeChange(newSize){
        console.log(newSize)
        this.queryInfo.pagesize = newSize;
         this.getOrderList()
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage){
          console.log(newPage)
          this.queryInfo.pagenum = newPage;
           this.getOrderList()
      },
      // 展示修改地址的对话框
      showEditDialog(data){
          console.log(data);
          this.addressDialogVisible = true
      },
      // 显示物流进度对话框
      async showProgressBox(data){
        console.log(data);
        // 测试数据单号 模拟物流查询 实际单号是从订单中获取
        const {data: res} = await this.$http.get('/kuaidi/773051686341128')
        if(res.meta.status!==200){
          return this.$message.error('物流进度查询失败')
        }else{
          this.progressInfo =res.data
          console.log(res.data)
        }
        this.progressDialogVisible = true
      },
      // 对话框关闭触发该函数
      addressDialogClosed(formName){
           this.$refs[formName].resetFields();
      }
  },
  created() {
    this.getOrderList();
  },
};
</script>

<style lang="less" sceped>

</style>
