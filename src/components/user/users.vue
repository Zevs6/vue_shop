<template>
  <div id="users">

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">           
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" @change="getUserList" clearable>
                        <el-button @click='getUserList' slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <el-table :data="userList" border stripe>
                <el-table-column
                type="index"
                label="序号">
                </el-table-column>
                <el-table-column
                prop="username"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="email"
                label="邮箱"
                width="180">
                </el-table-column>
                <el-table-column
                prop="mobile"
                label="电话">
                </el-table-column>
                <el-table-column
                prop="role_name"
                label="角色">
                </el-table-column>
                <el-table-column
                label="状态">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)" ></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUser(scope.row.id)"></el-button>
                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                             <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>                    
                    </template>
                </el-table-column>
            </el-table>

             <!-- 分页区域 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[2, 4, 6, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
             background>
            
            </el-pagination>
        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed('addFormRef')">
       <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password" type="password" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model.number="addForm.mobile" clearable></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
        </el-dialog>

         <!-- 修改用户的对话框 -->
         <el-dialog
        title="修改用户信息"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="addDialogClosed('editFormRef')">
       <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="用户名">
                <el-input v-model="editForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="editForm.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model.number="editForm.mobile" clearable></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="EditUser">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>

export default {
  name: "users",
  data() {
      // 自定义表单校验规则
    var checkMobile = (rule, value, callback) => {
            // 验证手机号的正则表达式
            const regMobile = /^[1]([3-9])[0-9]{9}$/;
            if(regMobile.test(value)){
                return callback()
            }else{
                callback(new Error('请输入11位手机号码'));
            }
        };
      return {
          queryInfo:{
              // 搜索内容
              query: '',
              // 当前的页数
              pagenum: 1,
              // 当前每页显示多少条数据
              pagesize: 2
          },
          // 获取的用户数据
          userList:[],
          // 总记录数
          total: 0,
          // 控制添加对话框的显示与影藏
          addDialogVisible: false,
          // 控制修改对话框显示隐藏
          editDialogVisible: false,
          // 添加用户表单数据
          addForm: {
              username: '',
              password: '',
              email: '',
              mobile: ''
          },
          // 修改用户表单数据
          editForm:{},
          // 添加表单的验证规则对象
          addFormRules:{
              username: [
                  {required: true,message:"请输入用户名",trigger:'blur'},
                  {min: 3, max: 10 , message: '用户名的长度在3~10个字符之间',trigger:'blur'}
                ],
              password: [
                  {required: true,message:"请输入密码",trigger:'blur'},
                  {min: 3, max: 10 , message: '密码的长度在6~15个字符之间',trigger:'blur'}
              ],
              email: [
                  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                 { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ],
              mobile: [
                  { required: true, message: '请输入手机号', trigger: 'blur'},
                  { validator: checkMobile, trigger: 'blur'}
              ]
          },
      }
  },
  methods: {
      getUserList(){
          this.$http.get('users',{params:this.queryInfo}).then(res=>{
            const data = res.data;
            console.log(data)
            if(data.meta.status!==200){
                return this.$message.error('获取用户列表失败！')
            }else{
                this.userList = data.data.users;
                this.total = data.data.total;
            }
          })
      },
    //  监听 pagesize 改变的事件
      handleSizeChange(newSize){
        console.log(newSize)
        this.queryInfo.pagesize = newSize;
         this.getUserList()
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage){
          console.log(newPage)
          this.queryInfo.pagenum = newPage;
           this.getUserList()
      },
      // 监听用户状态的改变
      userStateChanged(data){
          console.log(data.mg_state);
          this.$http.put(`users/${data.id}/state/${data.mg_state}`).then(res=>{
              if(res.data.meta.status!==200){
                  data.mg_state = !data.mg_state;
                  return this.$message.error('更新用户状态失败')
              }else{
                  this.$message.success('更新用户状态成功！')
              }
          })
      },
      // 监听添加用户对话框的关闭事件
      addDialogClosed(formName){
          // 重置表单
          this.$refs[formName].resetFields();
      },
      // 点击按钮添加新用户
      addUser(){
          // 表单预校验
           this.$refs.addFormRef.validate(valid => {
               console.log(valid)
                if (!valid) return this.$message.error('请按要求添加数据！')
                // 可以发起数据添加的接口请求
                this.$http.post('users',this.addForm).then(res=>{
                    console.log(res);
                    const data = res.data;
                    if(data.meta.status!==201){
                        this.$message.error('用户添加失败')
                    }else{
                        this.$message.success('用户添加成功！');
                        // 隐藏添加用户对话框
                        this.addDialogVisible = false;
                        // 重新获取表单数据
                         this.getUserList()
                    }
                })
           })
      },
      // 展示编辑用户信息的对话框
      showEditDialog(id){
          this.$http.get(`users/${id}`).then(res=>{
              const data = res.data;
              if(data.meta.status!==200){
                  return this.$message.error('查询用户信息数据失败！')
              }else{
                  this.editForm = data.data;
              }
          })
          this.editDialogVisible = true;
      },
      // 点击按钮修改用户信息
      EditUser(){
         console.log(this.editForm)
          // 表单预校验
           this.$refs.editFormRef.validate(valid => {
               console.log(valid)
                if (!valid) return this.$message.error('您修改的数据不合法！')
                this.$http.put(`users/${this.editForm.id}`,this.editForm).then(res=>{
                    const data = res.data;
                    if(data.meta.status!==200){
                        return this.$message.error('用户信息修改失败')
                    }else{
                        this.$message.success('用户信息修改成功！')
                        // 隐藏添加用户对话框
                        this.editDialogVisible = false;
                        // 重新获取表单数据
                        this.getUserList()
                    }
                })           
           })
      },
    // 点击按钮删除用户
    delUser(id){
         console.log(id);
         this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete(`users/${id}`).then(res=>{
                if(res.data.meta.status!==200){
                    return this.$message.error('用户删除失败')
                }else{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 重新获取表单数据
                   this.getUserList()
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
      this.getUserList()
  },
};
</script>

<style>

</style>
