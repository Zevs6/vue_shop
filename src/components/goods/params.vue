<template>
  <div id="params">
     <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类参数</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 卡片视图区域 -->
      <el-card class="box-card">  
             <!-- 提示信息 -->
           <el-alert
                title="注意：只允许为第三级分类设置相关参数！！！"
                type="warning"
                show-icon
                :closable="false">
            </el-alert>  
             <!-- 商品分类级联菜单 -->
            <el-row type="flex" align="middle" class="cat_opt">
                <el-col :span="3">
                    <span>选择商品分类：</span>
                </el-col>
                <el-col :span="10">
                   <el-cascader
                    v-model="selectKeys"
                    :options="cateList"
                    :props="cascaderProps"
                    @change="handleChange"
                    clearable>
                    </el-cascader>
                </el-col>
            </el-row>
             <!-- 菜单选项卡 -->
             <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <!-- 添加动态参数的面板 -->
                <el-tab-pane label="动态参数" name="many">
                    <el-button type="primary" size="mini" round :disabled='isBtnDisabled' @click='addDialogVisible = true'>添加参数</el-button>
                    <el-table
                        :data="manyTableData"
                        stripe
                        border
                        style="width: 100%">
                        <!-- 展开行 -->
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag
                                :key="index"
                                v-for="(tag,index) in scope.row.attr_vals"
                                closable
                                @close="handleClose(tag,scope.row)">
                                {{tag}}
                                </el-tag>
                                <el-input v-if="scope.row.inputVisible" 
                                v-model="scope.row.inputValue" 
                                ref="saveTagInput" 
                                size="small" 
                                class="input-new-tag"
                                @keyup.enter.native="handleInputConfirm(scope.row)"
                                @blur="handleInputConfirm(scope.row)">
                                </el-input>
                                <el-button v-else  size="small" class="button-new-tag" @click="showInput(scope.row)">+ 添加</el-button>
                            </template> 
                        </el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini"  @click="showEditDialog(scope.row)">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delParams(scope.row.attr_id)">删除</el-button>
                            </template> 
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                 <!-- 添加静态属性的面板 -->
                <el-tab-pane label="静态属性" name="only">
                    <el-button type="primary" size="mini" round :disabled='isBtnDisabled' @click='addDialogVisible = true'>添加</el-button>
                    <el-table
                        :data="onlyTableData"
                        stripe
                        border
                        style="width: 100%">
                        <!-- 展开行 -->
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag
                                :key="index"
                                v-for="(tag,index) in scope.row.attr_vals"
                                closable
                                @close="handleClose(tag,scope.row)">
                                {{tag}}
                                </el-tag>
                                <el-input v-if="scope.row.inputVisible" 
                                v-model="scope.row.inputValue" 
                                ref="saveTagInput" 
                                size="small" 
                                class="input-new-tag"
                                @keyup.enter.native="handleInputConfirm(scope.row)"
                                @blur="handleInputConfirm(scope.row)">
                                </el-input>
                                <el-button v-else  size="small" class="button-new-tag" @click="showInput(scope.row)">+ 添加</el-button>
                            </template> 
                        </el-table-column>
                        <!-- 索引列 -->
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" size="mini"  @click="showEditDialog(scope.row)">编辑</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delParams(scope.row.attr_id)">删除</el-button>
                            </template> 
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
      </el-card>

      <!-- 添加参数的对话框 -->
      <el-dialog
        :title="'添加'+titleText"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="DialogClosed('addFormRef')">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
            <el-form-item :label="titleText" prop="attr_name">
                <el-input v-model="addForm.attr_name" clearable></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addParams('addFormRef')">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 修改参数的对话框 -->
      <el-dialog
        :title="'修改'+titleText"
        :visible.sync="editDialogVisible"
        width="50%"
         @close="DialogClosed('editFormRef')">
        <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="80px">
            <el-form-item :label="titleText" prop="attr_name">
                <el-input v-model="editForm.attr_name" clearable></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editParams('editFormRef')">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>

export default {
  name: "params",
  data() {
      return {
          // 商品分类数据列表
          cateList: [],
          // 指定级联选择器的配置对象
          cascaderProps: {
              value: 'cat_id',
              label: 'cat_name',
              children: 'children',
              expandTrigger: 'hover',
          },
          // 选中的分类的ID数组
          selectKeys: [],
          // 当前激活的选项卡名称
          activeName: 'many',
          // 动态参数数据列表
          manyTableData: [],
          // 静态属性数据列表
          onlyTableData: [],
          // 控制添加对话框显示与隐藏
          addDialogVisible: false,
          // 控制修改对话框显示与隐藏
          editDialogVisible: false,
          // 添加参数的表单数据对象
          addForm: {
              attr_name: ''
          },
          // 修改参数的表单对象
          editForm: {},
          // 添加参数表单的验证规则对象
          addFormRules:{
              attr_name: [
                  { required: true,message: "请输入参数名称",trigger:'blur'}
                ]
          },
          // 不能用这两个属性，不然他们的所有文本框会是同一个属性值绑定，同时显示与隐藏
          // 控制添加按钮和文本框的切换显示
          // inputVisible: false,
          // 文本框中输入的内容
          // inputValue: '',
      }
  },
  methods: {
      // 获取所有的商品分类数据
      getCateList(){
          this.$http.get('categories').then(ret=>{
            const res = ret.data;
            if(res.meta.status!==200){
              return this.$message.error('获取商品分类失败！');
            }else{
              console.log(res);
              // 把数据列表赋值给cateList
              this.cateList = res.data;
            }
          })
      },
      // 级联选择框选中项变化触发该函数
      handleChange(){
          console.log(this.selectKeys)
          // 判断选中的是否为三级分类
          if(this.selectKeys.length!==3){
              // 清除选中项、参数数据列表
              this.selectKeys = [];
              this.manyTableData = [];
              this.onlyTableData = [];
              return
          }
          // 获取参数列表
          this.getParamsData();
      },
      // 获取参数列表
      getParamsData(){
          // 判断选中的是否为三级分类
          if(this.selectKeys.length!==3){
              // 清除选中项、参数数据列表
              this.selectKeys = [];
              this.manyTableData = [];
              this.onlyTableData = [];
              return
          }
          // 根据所选三级分类的ID和点击的当前所处选项卡面板，获取对应的动态参数或者静态属性数据请求
          this.$http.get(`categories/${this.cateId}/attributes`,{params: {sel: this.activeName}})
          .then(ret=>{
              const res = ret.data;
              if(res.meta.status!==200){
                  return this.$message.error('获取参数列表失败')
              }else{
                  // 循环将服务器返回的数据中的attr_vals参数标签字符串转换为数组
                  res.data.forEach(item=>{
                      // 将字符串以空格做分割，转换为数组
                      const arr = item.attr_vals.split(',');
                      // 判断字符串是否为空，避免将空字符串转换为数组
                      item.attr_vals = item.attr_vals==''?[]:arr;
                      // 控制文本框的显示与隐藏（我们为每一个添加文本框设置独立的属性）
                      item.inputVisible = false;
                      // 为每一个添加文本框绑定一个value属性值(文本框输入的值)
                      item.inputValue = ''
                  })
                  console.log(res.data)
                  // 判断当前获取到的数据时动态参数还是静态属性
                  if( this.activeName==="many"){
                      this.manyTableData = res.data;
                  }else{
                      this.onlyTableData = res.data;
                  }
              }
          })
      },
      // Tab页签点击事件的处理函数
      handleTabClick(){
          console.log(this.activeName)
          // 当切换选项卡面板时，也要重新请求参数数据
          this.getParamsData();
      },
      // 监听对话框的关闭事件
      DialogClosed(formName){
          // 重置表单
          this.$refs[formName].resetFields();  
      },
      // 点击确认按钮,添加参数名称
      addParams(addform){
          // 表单预校验
           this.$refs[addform].validate(valid => {
                if (!valid) return this.$message.error('请填写参数名称！！')
                // 可以发起数据添加的接口请求
                this.$http.post(`categories/${this.cateId}/attributes`,{
                    attr_name: this.addForm.attr_name,
                    attr_sel: this.activeName
                })
                .then(ret=>{
                    const res = ret.data;
                    if(res.meta.status!==201){
                        return this.$message.error('参数添加失败！！！')
                    }else{
                        this.$message.success('参数添加成功');
                        this.getParamsData();
                        this.addDialogVisible = false;
                    }
                })
           })
      },
      // 点击修改按钮，展示修改参数对话框
      showEditDialog(data){
          console.log(data)
          this.editForm = data;
          this.editDialogVisible = true;
      },
      // 点击确认按钮,修改参数名称
      editParams(form){
          // 表单预校验
           this.$refs[form].validate(valid => {
                if (!valid) return this.$message.error('请填写参数名称！！')
                // 可以发起数据添加的接口请求
                this.$http.put(`categories/${this.cateId}/attributes/${this.editForm.attr_id}`,{
                    attr_name: this.editForm.attr_name,
                    attr_sel: this.activeName
                })
                .then(ret=>{
                    const res = ret.data;
                    if(res.meta.status!==200){
                        return this.$message.error('参数修改失败！！！')
                    }else{
                        this.$message.success('参数修改成功');
                        this.getParamsData();
                        this.editDialogVisible = false;
                    }
                })
           })
      },
      // 根据ID删除对应的参数项
      delParams(attrid){
          this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete(`categories/${this.cateId}/attributes/${attrid}`).then(res=>{
                if(res.data.meta.status!==200){
                    return this.$message.error('参数删除失败')
                }else{
                    this.$message({
                        type: 'success',
                        message: '参数删除成功!'
                    });
                    // 重新获取表单数据
                   this.getParamsData()
                }
            }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 
      },
      // 文本框失去焦点或按下回车键触发函数
      handleInputConfirm(data){
          if (data.inputValue) {
            data.attr_vals.push(data.inputValue);
          }
          // 再将attr_vals从数组转换为原来的字符串
          const str = data.attr_vals.join(',')
          console.log(str);
          // 发起请求修改参数
          this.$http.put(`categories/${this.cateId}/attributes/${data.attr_id}`,{
                    attr_name: data.attr_name,
                    attr_sel: this.activeName,
                    attr_vals: str
                })
                .then(ret=>{
                    const res = ret.data;
                    if(res.meta.status!==200){
                        return this.$message.error('添加失败！！！')
                    }else{
                        this.$message.success('添加成功');
                        // 将返回的数据中attr_vals转换为字符串
                        data.attr_vals = res.data.attr_vals.split(',');
                    }
                })
          // 隐藏文本框
          data.inputVisible = false
          // 清空文本框内容
          data.inputValue = ''
      },
      // 点击按钮展示文本输入框
      showInput(data){
          // 显示文本框
          data.inputVisible = true;
          // $nextTick 方法的作用：就是当页面上元素被重新渲染之后才会执行回调函数中的代码
          this.$nextTick(()=> {
              // 选择当前表单元素的文本框让他自动获得焦点
            this.$refs.saveTagInput.$refs.input.focus();
          });
      },
      // 点击删除对应的参数的属性值
      handleClose(tag,data){
          this.$confirm(`此操作将永久删除“${tag}”, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log(tag,data);
            // 数组筛选，将当前点击的标签项从数组中移除
            const arr = data.attr_vals.filter(item=>{
                return item!== tag
            });
            console.log(arr)
            // 在将过滤后的数组转换为字符串
            const str = arr.join(',');
            this.$http.put(`categories/${this.cateId}/attributes/${data.attr_id}`,{
                    attr_name: data.attr_name,
                    attr_sel: this.activeName,
                    attr_vals: str
                })
                .then(ret=>{
                    const res = ret.data;
                    if(res.meta.status!==200){
                        return this.$message.error('删除失败！！！')
                    }else{
                        this.$message.success('删除成功');
                        // 将返回的数据中attr_vals转换为字符串
                        data.attr_vals = res.data.attr_vals.split(',');
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
  computed: {
      // 如果按钮需要被禁言，则返回true 否则返回false
      isBtnDisabled(){
          // 判断是否选中三级分类
        return this.selectKeys.length!==3?true:false
      },
      // 当前级联菜单选中的三级分类ID
      cateId(){
        return  this.selectKeys.length==3?this.selectKeys[2]:null
      },
      // 根据激活选项卡动态计算添加对话框标题
      titleText(){
          return this.activeName=='many'?'动态参数':'静态属性';
      }
  },
};
</script>

<style lang="less" scoped>
#params{
    .cat_opt{
        margin: 16px 0 ;
    }
   .el-tag + .el-tag {
    margin-left: 15px;
    margin-top: 15px;
  }
  .button-new-tag {
    margin-left: 15px;
    margin-top: 15px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 150px;
    margin-left: 15px;
    margin-top: 15px;
    vertical-align: bottom;
  }
}
</style>
