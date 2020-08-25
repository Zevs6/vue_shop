<template>
  <div id="add">
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>

       <!-- 卡片视图区域 -->
      <el-card class="box-card">  
           <!-- 提示信息 -->
            <el-alert
              title="添加商品信息"
              type="info"
              center
              :closable="false"
              show-icon>
           </el-alert>
           <!-- 状态步骤条 -->
           <el-steps :space="200" align-center :active="activeIndex" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
           </el-steps>
            <!-- Tab栏区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
              <el-tabs  v-model="activeName" :tab-position="'left'" @tab-click="tabClicked" :before-leave="beforeTabLeave">
                <el-tab-pane label="基本信息" name='0'>
                    <el-form-item label="商品名称" prop="goods_name">
                      <el-input v-model="addForm.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="goods_price">
                      <el-input type="number" v-model.number="addForm.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goods_weight">
                      <el-input type="number" v-model.number="addForm.goods_weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goods_number">
                      <el-input type="number" v-model.number="addForm.goods_number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_cat">
                      <el-cascader
                        v-model="addForm.goods_cat"
                        :options="cateList"
                        :props="cascaderProps"
                        @change="handleChange"
                        clearable>
                        </el-cascader>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name='1'>
                    <el-form-item :label="item.attr_name"  v-for="item in manyTableData" :key="item.attr_id">
                        <el-checkbox-group v-model="item.attr_vals">
                          <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-alert v-show="manyTableData.length==0" title="暂无商品动态参数数据！" type="warning" close-text="知道了"></el-alert>
                </el-tab-pane>
                <el-tab-pane label="商品属性" name='2'>
                    <el-form-item :label="item.attr_name"  v-for="item in onlyTableData" :key="item.attr_id">
                      <el-input v-model="item.attr_vals" placeholder="暂无该项数据！！"></el-input>
                    </el-form-item>
                    <el-alert v-show="onlyTableData==''" title="暂无静态属性数据！" type="warning" close-text="知道了"></el-alert>
                </el-tab-pane>
                <el-tab-pane label="商品图片" name='3'>
                    <el-upload
                    :action="uploadURL"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleAvatarError"
                    list-type="picture-card"
                    :file-list="fileImageList"
                    :headers="headerObj"
                    multiple>
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" :title="'图片预览  '+dialogImageName">
                    <img width="100%" :src="dialogImageUrl" :alt="dialogImageName">
                  </el-dialog>
                </el-tab-pane>
                <el-tab-pane label="商品内容" name='4'>
                    <!-- 富文本编辑器组件 -->
                    <quill-editor style="height: 500px" ref="myQuillEditor" v-model="addForm.goods_introduce" />
                    <el-button type="primary" @click="add('addFormRef')">添加商品</el-button>
                </el-tab-pane>
            </el-tabs>
          </el-form>
      </el-card>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: "add",
	data() {
    return {
        // 设置进度条当前激活步骤
        activeIndex: 0,
        // 当前激活的Tab栏
        activeName: '0',
        // 添加商品的表单数据对象
        addForm:{
          goods_name: '',  // 商品名称
          goods_price: 0,  // 商品价格
          goods_weight: 0, // 商品重量
          goods_number: 0, // 商品数量
          goods_cat: [], // 商品分类ID
          pics: [], // 图片的数组
          goods_introduce: '', // 商品详情描述
          attrs: [] // 商品参数
        },
        // 获取所有商品分类列表
        cateList: [],
        // 指定级联选择器的配置对象
        cascaderProps: {
              value: 'cat_id',
              label: 'cat_name',
              children: 'children',
              expandTrigger: 'hover',
          },
        // 动态参数数据列表
        manyTableData: [],
        // 静态属性数据列表
        onlyTableData: [],
        // 上传图片的url地址
        uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
        // 图片预览链接
        dialogImageUrl: '',
        // 预览图片的名称
        dialogImageName: '',
        // 显示的图片文件列表
        fileImageList: [
          {
            name: 'avatar.jpg', 
            url: 'http://127.0.0.1:8888/tmp_uploads/7c6a736c07f8d22f3c9d2b3fd390a0d8.jpg'
          }
        ],
        // 显示图片预览效果弹窗
        dialogVisible: false,
        // 图片上传组件的header请求头
        headerObj: {
          Authorization: ''
        },
        // 表单的验证规则
        addFormRules:{
          goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
          ],
          goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'blur' },
          ],
          goods_number: [
            { required: true, message: '请输入商品数量', trigger: 'blur' },
          ],
          goods_cat: [
            { required: true, message: '请输入商品分类', trigger: 'blur' },
          ],
        }
    }
  },
  methods: {
      // Tab栏切换触发该函数
      tabClicked(){
          this.activeIndex = this.activeName-0;
          // 商品参数面板
          if(this.activeName==1){
            console.log('动态参数面板')
            // 发起动态参数列表获取
            this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel: 'many'}})
            .then(ret=>{
                const res = ret.data;
                if(res.meta.status!==200){
                  this.$message.error('获取动态参数列表失败')
                }else{
                  console.log(res.data);
                  // 将动态参数数组分割成逗号分隔字符串
                  res.data.forEach(item=>{
                    item.attr_vals = item.attr_vals.length==0?[]:item.attr_vals.split(',')
                  })
                  this.manyTableData = res.data;
                }
            })
          }else if(this.activeName==2){
              console.log('静态属性面板')
            // 发起静态属列表获取
            this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel: 'only'}})
            .then(ret=>{
                const res = ret.data;
                if(res.meta.status!==200){
                  this.$message.error('获取静态属性失败')
                }else{
                  console.log(res.data);
                  this.onlyTableData = res.data;
                }
            })
          }else if(this.activeName==3){
            this.$notify.info({
              title: '提示',
              message: '点击+上传商品图片'
            });
            // 获取token用于上传图片的请求头
            this.headerObj.Authorization = window.sessionStorage.getItem('token') || '';
          }else if(this.activeName==4){
            this.$notify.info({
              title: '提示',
              message: '上传商品内容'
            });
          }
      },
      // Tab栏切换钩子函数
      beforeTabLeave(activeName,oldActiveName){
          // console.log('即将离开的标签页名字是'+oldActiveName)
          // console.log('即将进入的标签页名字是'+activeName)
          if(oldActiveName==0){
            if(this.addForm.goods_cat.length==0){
              // 清除选中项、参数数据列表
              this.addForm.goods_cat = [];
              // 提示信息
              this.$message.error('请选择商品分类信息！')
              return false
            }
          }
      },
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
          console.log(this.addForm.goods_cat)
          // 判断选中的是否为三级分类
          if(this.addForm.goods_cat.length!==3){
              // 清除选中项、参数数据列表
             return this.addForm.goods_cat = [];
          }
          // 将商品分类ID的数组转换为字符串
          //this.addForm.goods_cat = this.addForm.goods_cat.join(',')
      },
      // 点击图片列表中已上传的文件时的钩子(图片预览)
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogImageName = file.name;
        this.dialogVisible = true;
      },
      // 图片列表移除文件时的钩子（图片删除）
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.$notify({
              title: '成功',
              message: '图片删除成功！！',
              type: 'success'
            });
        // 方法一 过滤出当前删除的图片链接 
        // this.addForm.pics = this.addForm.pics.filter(item=>{
        //     return item.pic!== file.response.data.tmp_path
        // })
        // 查询出当前删除图片链接的索引值 调用splice移除
        const filePath = file.response.data.tmp_path 
        const i = this.addForm.pics.findIndex(i=>i.pic == filePath);
        this.addForm.pics.splice(i,1);
        console.log(this.addForm)
      },
      // 文件上传成功时的钩子(图片上传成功)
      handleAvatarSuccess(res, file) {
        console.log(res,file)
        this.$notify({
              title: '成功',
              message: '图片上传成功！！',
              type: 'success'
            });
        const picInfo = {pic: res.data.tmp_path}
        this.addForm.pics.push(picInfo);
        console.log(this.addForm)
      },
      // 文件上传失败时的钩子 (图片上传失败)
      handleAvatarError(err, file, fileList){
        console.log(err,file,fileList)
        this.$notify({
              title: '失败',
              message: '图片上传失败！！',
              type: 'error'
            });
      },
      // 添加商品
      add(addform){
           // 表单预校验
           this.$refs[addform].validate(valid => {
                if (!valid) return this.$message.error('请将数据添加完整！！！')
                // 进度条切换到完成
                this.activeIndex = 5
                // 将addForm深拷贝一份格式化数据用于添加商品 lodash cloneDeep(obj)
                // 安装运行 npm i lodash
                const form = _.cloneDeep(this.addForm) // 我们只格式化form，addForm用于和页面双向绑定
                // 处理商品分类的数组
                form.goods_cat = form.goods_cat.join(',')
                // 处理商品参数的数组
                this.manyTableData.forEach(item=>{
                  const newInfo = {
                    attr_id: item.attr_id,
                    attr_value: item.attr_vals.join(',')
                  }
                  form.attrs.push(newInfo)
                })
                this.onlyTableData.forEach(item=>{
                  const newInfo = {
                    attr_id: item.attr_id,
                    attr_value: item.attr_vals
                  }
                  form.attrs.push(newInfo)
                })
                console.log(form)
                // 可以发起数据添加的接口请求
                this.$http.post('goods', form).then(ret=>{
                    const res = ret.data;
                    if(res.meta.status!==201){
                        this.$message.error('商品添加失败')
                    }else{
                        this.$message.success('商品添加成功！');
                        this.activeIndex = 6;
                        // 跳转到商品列表页面
                        this.$router.push('/goods');
                    }
                })
           })
      }
  },
  created() {
    this.getCateList()
  },
  computed: {
      cateId(){
        return this.addForm.goods_cat.length==3?this.addForm.goods_cat[2]:null;
      }
  },
};
</script>

<style lang="less">
.el-steps{
    margin: 20px 0;
}
.el-step__title{
    font-size: 13px;
}
.el-checkbox{
  margin: 0 20px 0 0  !important;
}
.quill-editor{
  height: 360px;
  margin-bottom: 60px;
}
</style>
