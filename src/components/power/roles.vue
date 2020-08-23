<template>
  <div id="roles">
      <!-- 面包屑导航区域 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card class="box-card">
            <!-- 添加角色按钮区域 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 角色列表区域 -->
            <el-table :data="roleList" border stripe>
                <!-- 索引列 -->
                <el-table-column type="expand"  label="#">
                     <template slot-scope="scope">
                       <el-row v-for="(item1,index1) in scope.row.children" :key="index1" :class="['bdbottom',index1==0?'bdtop':'']" type="flex" align="middle">
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                             <!-- 渲染二级和三级权限 -->
                            <el-col :span="19">
                                <el-row v-for="(item2,index2) in item1.children" :key="index2" :class="[index2==0?'':'bdtop']" type="flex" align="middle">
                                  <!-- 渲染二级权限 -->
                                    <el-col :span="6">
                                        <el-tag closable @close="removeRightById(scope.row,item2.id)" type="success" >{{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <!-- 渲染三级权限 -->
                                        <el-tag closable @close="removeRightById(scope.row,item3.id)" type="warning" v-for="(item3,index3) in item2.children" :key="index3">{{item3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <!-- 展开列 -->
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                <el-table-column label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)" >编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="delRole(scope.row.id)">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加角色的对话框 -->
        <el-dialog
        title="添加角色"
        :visible.sync="addDialogVisible"
        width="60%"
        @close="DialogClosed('addFormRef')">
       <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="addForm.roleName" clearable></el-input>
            </el-form-item>
             <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="addForm.roleDesc" clearable></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRole">确 定</el-button>
        </span>
        </el-dialog>

         <!-- 修改角色的对话框 -->
         <el-dialog
        title="修改用户信息"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="DialogClosed('editFormRef')">
       <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="80px">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="editForm.roleName" clearable></el-input>
            </el-form-item>
             <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="editForm.roleDesc" clearable></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="EditRole">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 分配权限的对话框 -->
         <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%">
        <!-- 基础的树形结构 -->
        <el-tree ref="treeRef" :data="rightsList" :props="treeProps" show-checkbox default-expand-all :default-checked-keys="defkeys" node-key="id"></el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setRightDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>

export default {
  name: "roles",
  data() {
      return {
         // 所以角色的列表数据
         roleList: [],
         // 控制添加对话框的显示与影藏
          addDialogVisible: false,
          // 控制修改对话框显示隐藏
          editDialogVisible: false,
          // 控制分配权限对话框的显示与影藏
          setRightDialogVisible: false,
          // 添加角色表单数据
          addForm: {
              roleName: '',
              roleDesc: ''
          },
          // 修改角色表单数据
          editForm:{},
          // 权限列表
          rightsList: [],
          // 默认选中的节点ID值数组
          defkeys: [],
          // 当前点击要分配权限的角色ID
          roleId: '',
          // 树形控件的属性绑定对象
          treeProps:{children: 'children',label: 'authName'},
          // 添加表单的验证规则对象
          addFormRules:{
              roleName: [
                  {required: true,message:"请输入角色名称",trigger:'blur'}
                ]
          },
      }
  },
  methods: {
      async getRolesList(){
        const {data: res} = await this.$http.get('roles');
        console.log(res)
        if(res.meta.status!=200){
          return this.$message.error('获取角色列表数据失败')
        }else{
          this.roleList = res.data
        }
      },
      // 监听对话框的关闭事件
      DialogClosed(formName){
          // 重置表单
          this.$refs[formName].resetFields();
      },
      // 点击按钮添加新角色
      addRole(){
          // 表单预校验
           this.$refs.addFormRef.validate(valid => {
               console.log(valid)
                if (!valid) return this.$message.error('请按要求添加数据！')
                // 可以发起数据添加的接口请求
                this.$http.post('roles',this.addForm).then(res=>{
                    console.log(res);
                    const data = res.data;
                    if(data.meta.status!==201){
                        this.$message.error('角色添加失败')
                    }else{
                        this.$message.success('角色添加成功！');
                        // 隐藏添加用户对话框
                        this.addDialogVisible = false;
                        // 重新获取表单数据
                         this.getRolesList()
                    }
                })
           })
      },
      // 展示编辑角色信息的对话框
      showEditDialog(id){
          this.$http.get(`roles/${id}`).then(res=>{
              const data = res.data;
             if(data.meta.status!==200){
                  return this.$message.error('查询角色信息数据失败！')
              }else{
                  this.editForm = data.data;
                  console.log(this.editForm)
              }
          })
          this.editDialogVisible = true;
      },
      // 点击按钮修改用户信息
      EditRole(){
         console.log(this.editForm)
          // 表单预校验
           this.$refs.editFormRef.validate(valid => {
               console.log(valid)
                if (!valid) return this.$message.error('您修改的数据不合法！')
                this.$http.put(`roles/${this.editForm.roleId}`,this.editForm).then(res=>{
                    const data = res.data;
                    if(data.meta.status!==200){
                        return this.$message.error('用户信息修改失败')
                    }else{
                        this.$message.success('用户信息修改成功！')
                        // 隐藏添加用户对话框
                        this.editDialogVisible = false;
                        // 重新获取表单数据
                        this.getRolesList()
                    }
                })           
           })
      },
    // 点击按钮删除角色
    delRole(id){
         console.log(id);
         this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete(`roles/${id}`).then(res=>{
                if(res.data.meta.status!==200){
                    return this.$message.error('角色删除失败')
                }else{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 重新获取表单数据
                   this.getRolesList()
                }
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 
    },
    // 根据id删除对应的权限标签
    removeRightById(role,rightId){
        this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.delete(`roles/${role.id}/rights/${rightId}`).then(res=>{
                if(res.data.meta.status!==200){
                    return this.$message.error('权限删除失败')
                }else{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 重新获取表单数据 不建议这样，会让页面整体重新渲染，我们可以为当前角色重新复制（删除成功的返回值）
                    // this.getRolesList()
                   role.children = res.data.data
                }
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role){
        console.log(role);
        this.roleId = role.id;
        // 获取所以权限的数据 权限列表
        const {data:res} = await this.$http.get('rights/tree');
        console.log(res)
        if(res.meta.status!==200){
            this.$message.error('权限列表请求失败')
        }else{
            this.rightsList = res.data;
            // 从新获取三级节点ID的时候，先清空节点数组
            this.defkeys = []
            // 获取三级节点的ID
            this.getLeafKeys(role,this.defkeys);
        }

        this.setRightDialogVisible = true
    },
    // 递归循环出角色下所以三级节点的ID放到数组中
    getLeafKeys(node,arr){
        // 如果当前节点下没有children属性，说明则是三级节点，我们将id追加到数组中
        if(!node.children){
            return arr.push(node.id)
        }
        node.children.forEach(item=>{
            this.getLeafKeys(item,arr)
        })
    },
    // 点击确认为角色分配权限
    allotRights(){
        // this.$refs.treeRef.getCheckedKeys() 获取选中的选项  this.$refs.treeRef.getHalfCheckedKeys() 获取半选中的选项
        // ... 数组展开
        const keys = [...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()];
        // 将数组转换为逗号分隔的字符串
        const idStr = keys.join(',');
        console.log(idStr)
        this.$http.post(`roles/${this.roleId}/rights`,{rids: idStr}).then(res=>{
            const data = res.data;
            if(data.meta.status!==200){
                this.$message.error('分配权限失败')
            }else{
                this.$message.success('分配权限成功！！！');
                // 刷新数据列表
                this.getRolesList()
                // 隐藏分配权限对话框
                this.setRightDialogVisible = false
            }
        })
        
    }
  },
  created() {
     this.getRolesList()
  },

};
</script>

<style lang="less" scoped>
    .el-tag{
        margin: 7px;
    }
    .bdtop{
        border-top: 1px solid #eee;
    }
    .bdbottom{
        border-bottom: 1px solid #eee;
    }
</style>
