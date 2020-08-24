<template>
  <div id="categories">
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 卡片视图区域 -->
      <el-card class="box-card">   
          <!-- 添加按钮 -->
          <el-row>
                <el-col>
                    <el-button type="primary" @click='showAddCateDialog'>添加分类</el-button>
                </el-col>
            </el-row><br/>
            <!-- 表格数据列表 -->
            <zk-table 
            :data="cateList"
            :columns="columns"
            :selection-type="false"
            :expand-type="false"
            show-index
            index-text="#"
            border
            :show-row-hover="false">
              <!-- 自定义插槽 -->
              <template slot='isok' slot-scope='scope'>
                  <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: #67C23A"></i>
                  <i class="el-icon-error" v-else style="color: #F56C6C" ></i>
              </template>
              <template slot='order' slot-scope='scope'>
                  <el-tag type="primary" size='mini' v-if="scope.row.cat_level===0">一级</el-tag>
                  <el-tag type="success" size='mini' v-else-if="scope.row.cat_level===1">二级</el-tag>
                  <el-tag type="warning" size='mini' v-else>三级</el-tag>
              </template>
              <template slot='opt' slot-scope='scope'>
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditCateDialog(scope.row)" >编辑</el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="delCate(scope.row.cat_id)">删除</el-button>
              </template>
            </zk-table>
            <!-- 分页区域 -->
            <el-pagination
            background
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
            :page-sizes="[3,5, 10, 15]"
            :page-size="queryInfo.pagesize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
          </el-pagination>
       </el-card> 

      <!-- 添加分类的对话框 -->
      <el-dialog
        title="添加分类"
        :visible.sync="addCateDialogVisible"
        width="50%"
        @close="DialogClosed('addCateFormRef')">
        <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="80px">
            <el-form-item label="分类名称" prop="cat_name">
                <el-input v-model="addCateForm.cat_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="父级分类">
                <!-- options 用来指定数据源 -->
                <!-- props 用来指定配置对象 -->
                <el-cascader
                v-model="selectKeys"
                :options="parentCateList"
                :props="cascaderProps"
                @change="parentCateChanged"
                clearable>
                </el-cascader>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addCateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCate()">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 修改分类的对话框 -->
      <el-dialog
        title="修改分类"
        :visible.sync="editCateDialogVisible"
        width="50%"
        @close="DialogClosed('editCateFormRef')">
        <el-form :model="editCateForm" :rules="addCateFormRules" ref="editCateFormRef" label-width="80px">
            <el-form-item label="分类名称" prop="cat_name">
                <el-input v-model="editCateForm.cat_name" clearable></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editCateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editCate()">确 定</el-button>
        </span>
        </el-dialog>

  </div>
</template>

<script>

export default {
  name: "categories",
  data() {
      return {
         // 商品分类数据列表
          cateList: [],
          // 查询分类列表传递的数据条件
          queryInfo:{
              type: 3, // 返回类型
              pagenum: 1, // 当前页码
              pagesize: 5, // 每页数量
          },
          // 总数据条数
          total: 0,
          // 为table指定列的定义配置
          columns:[
            {
              label: '分类名称', // 列名
              prop: 'cat_name', // 列数据
            },
            {
              label: '是否有效', // 列名
              type: 'template', // 模板列
              template: 'isok', // 模板名称
            },
            {
              label: '排序', // 列名
              type: 'template', // 模板列
              template: 'order', // 模板名称
            },
            {
              label: '操作', // 列名
              type: 'template', // 模板列
              template: 'opt', // 模板名称
            }
          ],
          // 控制添加分类对话框的显示与隐藏
         addCateDialogVisible: false,
         // 控制修改分类对话框的显示与隐藏
         editCateDialogVisible: false,
         // 添加分类的表单数据对象
         addCateForm: {
           // 将要添加的分类名称
           cat_name: '',
           // 父级分类的ID
           cat_pid: 0,
           // 默认添加的等级是1级分类
           cat_level: 0
         },
         // 修改分类的表单数据对象
         editCateForm: {},
         // 添加表单的验证规则对象
          addCateFormRules:{
              cat_name: [
                  {required: true,message: "请输入分类名称",trigger:'blur'}
                ]
          },
          // 父级分类的列表
          parentCateList: [],
          // 指定级联选择器的配置对象
          cascaderProps: {
              value: 'cat_id',
              label: 'cat_name',
              children: 'children',
              expandTrigger: 'hover',
              checkStrictly: true
          },
          // 选中的父级分类的ID数组
          selectKeys: []
      }
  },
  methods: {
    // 获取商品分类数据
      getCateList(){
          this.$http.get('categories',{params: this.queryInfo}).then(ret=>{
            const res = ret.data;
            if(res.meta.status!==200){
              return this.$message.error('获取商品分类失败！');
            }else{
              console.log(res);
              // 把数据列表赋值给cateList
              this.cateList = res.data.result;
              // 总记录数
              this.total = res.data.total;
            }
          })
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage){
          this.queryInfo.pagenum = newPage;
           this.getCateList()
      },
      //  监听 pagesize 改变的事件
      handleSizeChange(newSize){
        this.queryInfo.pagesize = newSize;
         this.getCateList()
      },
      // 点击添加按钮显示添加分类对话框
      showAddCateDialog(){
        // 先获取父级分类的数据列表
        this.getParentCateList();
        // 展示出添加对话框
        this.addCateDialogVisible = true;
      },
      // 获取所有父级分类的数据列表
      getParentCateList(){
        this.$http.get('categories',{params: {type: 2}})
        .then(ret=>{
            const res = ret.data;
            if(res.meta.status!==200){
              return this.$message.error('获取父级商品分类失败！');
            }else{
              // 保存所有父级分类列表
              this.parentCateList = res.data;
              console.log(this.parentCateList );
            }
          })
      },
      // 选择项发生变化触发该函数
      parentCateChanged(){
        console.log(this.selectKeys);
        // 如果selectKeys中的length大于0，证明选中了父级分类
        // 反之，就说明没有选中任何父级分类 默认为0 一级分类
        if(this.selectKeys.length>0){
          // 保存父级分类ID，也就是其中的最后一项
          this.addCateForm.cat_pid = this.selectKeys[this.selectKeys.length-1];
          // 为当前分类的等级赋值
          this.addCateForm.cat_level = this.selectKeys.length;
        }else{
          this.addCateForm.cat_pid = 0;
          this.addCateForm.cat_level = 0;
        }
      },
      // 点击确认按钮提交分类添加
      addCate(){
        console.log(this.addCateForm);
         // 表单预校验
           this.$refs.addCateFormRef.validate(valid => {
                if (!valid) return this.$message.error('请填写分类名称！！')
                // 可以发起数据添加的接口请求
                this.$http.post('categories',this.addCateForm).then(ret=>{
                    const res = ret.data;
                    if(res.meta.status!==201){
                        this.$message.error('分类添加失败')
                    }else{
                        this.$message.success('分类添加成功！');
                        // 隐藏添加对话框
                        this.addCateDialogVisible = false;
                        // 重新获取表单数据
                         this.getCateList()
                    }
                })
           })
      },
      // 监听对话框的关闭事件
      DialogClosed(formName){
          // 重置表单
          this.$refs[formName].resetFields();
          // 清空级联菜单选中内容
          this.selectKeys = [];
          this.addCateForm.cat_name = '';
          this.addCateForm.cat_pid = 0;
          this.addCateForm.cat_level = 0;
          
      },
      // 点击显示编辑分类对话框
      showEditCateDialog(data){
        // 保存当前编辑的分类对象
          this.editCateForm = data;
          // 显示编辑对话框
          this.editCateDialogVisible = true;
      },
      // 点击确认按钮，提交分类名称修改
      editCate(){
        // 表单预校验
           this.$refs.editCateFormRef.validate(valid => {
                if (!valid) return this.$message.error('请填写分类名称！！')
                // 可以发起数据添加的接口请求
                this.$http.put(`categories/${this.editCateForm.cat_id}`, this.editCateForm).then(ret=>{
                    const res = ret.data;
                    if(res.meta.status!==200){
                        this.$message.error('分类修改失败')
                    }else{
                        this.$message.success('分类修改成功！');
                        // 隐藏修改对话框
                        this.editCateDialogVisible = false;
                        // 重新获取表单数据
                         this.getCateList()
                    }
                })
           })
      },
      // 点击删除分类
      delCate(id){
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete(`categories/${id}`).then(res=>{
                if(res.data.meta.status!==200){
                    return this.$message.error('分类删除失败')
                }else{
                    this.$message({
                        type: 'success',
                        message: '分类删除成功!'
                    });
                    // 重新获取表单数据
                   this.getCateList()
                }
            }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 
      }
  },
  created() {
      this.getCateList();
  },
};
</script>

<style lang="less">
  .el-cascader-panel{
    height: 300px;
  }
  .el-cascader{
    width: 100%;
  }
</style>
