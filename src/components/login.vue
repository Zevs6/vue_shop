<template>
  <div id="login">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="loginForm.password"
            @change="submitLoginForm"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitLoginForm">登陆</el-button>
          <el-button type="info" @click="resetLoginForm('loginFormRef')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitLoginForm() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.$http.post('login', this.loginForm).then(ret => {
          const data = ret.data
          if (data.meta.status !== 200) {
            return this.$message.error('用户名或密码错误，请重新输入！')
          } else {
            this.$message({
              message: '恭喜你，登陆成功！',
              type: 'success'
            })
            // 将登陆成功获取的token 保存起来
            window.sessionStorage.setItem('token', data.data.token)
            console.log(window.sessionStorage.getItem('token') || '')
            // 编程式导航跳转至首页
            this.$router.push('/home')
          }
        })
      })
    },
    resetLoginForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  padding: 0;
  margin: 0;
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
