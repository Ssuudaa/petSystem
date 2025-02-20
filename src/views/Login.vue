<template>
    <div>
      <Navbar />
  
      <div class="login-container">
        <div class="card z-depth-2">
          <div class="card-content">
            <div class="row white-text">
              <h3 class="center">Welcome</h3>
              <h4 class="center">登录</h4>
            </div>
          </div>
  
          <div style="padding: 50px;">
            <el-form :model="loginForm" ref="loginForm" :rules="loginRules" status-icon label-width="100px">
              <el-form-item style="margin-left: -40px;" label="手机号" prop="phone">
                <el-input v-model="loginForm.phone" autocomplete="off" class="input-field" />
              </el-form-item>
              <el-form-item style="margin-left: -40px;" label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off" class="input-field" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleLogin" class="btn-large waves-effect blue darken-2" style="margin-left: -40px;">登录</el-button>
              </el-form-item>
            </el-form>
  
            <div class="row">
              <router-link to="/register" class="sign-up-button waves-effect waves btn blue">
                <i class="material-icons left"></i>首次登录? 注册
              </router-link>
            </div>
  
            <div class="row">
              <router-link to="/reset-password" class="waves-effect waves-light btn-flat right">
                忘记密码?
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import api from '@/api.js';
  
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        loginForm: {
          phone: '',
          password: '',
        },
        loginRules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleLogin() {
  this.$refs.loginForm.validate(valid => {
    if (valid) {
      // 启动 loading 动画
      const loading = this.$loading({
        lock: true,
        text: '正在登录...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      console.log(this.loginForm);
      
      // 延迟启动 loading 动画，确保能看到动画
      setTimeout(() => {
        // 发送登录请求
        const formData = new FormData();
        formData.append('phone', this.loginForm.phone);
        formData.append('password', this.loginForm.password);
        
        api.post('/login', formData)
          .then(response => {
            loading.close(); // 关闭 loading 动画
            if (response.code === 200) {
              this.$message.success('登录成功');
              // 跳转到首页
              this.$router.push('/');
              localStorage.setItem('isLoggedIn', 'true'); // 将登录状态保存到 localStorage
              // 更新首页的登录状态
              this.$emit('updateLoginStatus', true); 
            } else {
              this.$message.error(response.message || '登录失败');
            }
          })
          .catch(error => {
            console.error(error);
            loading.close(); // 关闭 loading 动画
            this.$message.error('登录失败');
          });
      }, 900); // 100ms 延迟，确保动画可以看到
    } else {
      this.$message.error('请填写正确的信息');
    }
  });
}
  }
  };
  </script>
  
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url(/image/doctor.jpg); /* 设置背景图片 */
  background-size: cover;
  background-position: center;
  }
  
  .card {
  width: 100%;
  max-width: 400px;
  height: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.3); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 背景模糊 10px */
  border: 1px solid rgba(255, 255, 255, 0.2); /* 轻微边框 */
}
  
.card-content {
  padding: 50px 0;
  background-image: radial-gradient(circle 300px at center, #64b5f6 0%, #2196f3 100%);
  text-align: center; /* 让所有文本居中 */
}

  
  .form-content {
    padding: 30px 50px 50px 50px;
  }
  
  .white-text {
    color: white;
  }
  
  .input-field {
    margin-bottom: 20px;
  }
  
  .el-button {
    width: 100%;
    margin-top: 20px;
    background-color: #2196f3;
    color: white;
  }
  
  .sign-up-button {
    width: 100%;
    margin-top: 10px;
    background-color: #ff4081;
    color: white;
  }
  
  a {
    display: block;
    text-align: center;
    margin-top: 10px;
  }
  
  a .material-icons {
    margin-right: 10px;
  }
  </style>
  