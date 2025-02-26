<template>
  <div>
    <Navbar />
    <div class="login-container">
      <div class="card z-depth-2">
        <div class="card-content">
          <h3 class="white-text">Welcome</h3>
          <h4 class="white-text">登录</h4>
        </div>

        <div class="form-content">
          <el-form :model="loginForm" ref="loginForm" :rules="loginRules"  label-position="top" class="login-form">
            <el-form-item label="手机号: " prop="phone">
              <el-input v-model="loginForm.phone" autocomplete="off" class="input-field" />
            </el-form-item>
            <el-form-item label="密 码:" prop="password">
              <el-input type="password" v-model="loginForm.password" autocomplete="off" class="input-field" style="margin-left: 26px;" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin" class="login-button">登录</el-button>
            </el-form-item>
          </el-form>
          <router-link to="/register" class="sign-up-button">首次登录? 注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import api from '@/api.js';

export default {
  components: { Navbar },
  data() {
    return {
      loginForm: {
        phone: '',
        password: '',
      },
      loginRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(1[3-9]\d{9}|admin)$/, message: '请输入有效的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      isAdmin: false,
      isLoggedIn: false
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) return this.$message.error('请填写正确的信息');
        
        const loading = this.$loading({
          lock: true,
          text: '正在登录...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        const formData = new FormData();
        formData.append('phone', this.loginForm.phone);
        formData.append('password', this.loginForm.password);

        api.post('/petHospital/login', formData)
          .then(response => {
            loading.close();
            if (response.code !== 200) return this.$message.error(response.message || '登录失败');
            
            this.$message.success('登录成功');
            localStorage.setItem('isLoggedIn', 'true');
            this.isLoggedIn = true;
            this.$emit('updateLoginStatus', true);
            
            return api.get(`/admin/getUser?phone=${this.loginForm.phone}`);
          })
          .then(userResponse => {
            if (userResponse && userResponse.code === 200) {
              const userRole = userResponse.rows[0].role;
              this.isAdmin = (userRole == 1);
              localStorage.setItem('userRole', userRole);
              this.$emit('updateUserRole', userRole);
              if (this.isAdmin) this.$message.success('管理员权限');
            }
            this.$router.push('/');
          })
          .catch(error => {
            loading.close();
            console.error(error);
            this.$message.error('登录请求失败');
          });
      });
    }
  },
  created() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isAdmin = localStorage.getItem('userRole') == 1;
  }
};
</script>

<style scoped>
/* 页面居中 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(/image/doctor.jpg) center/cover;
}

/* 卡片居中 */
.card {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 标题居中 */
.card-content {
  text-align: center;
  width: 100%;
  background: radial-gradient(circle at center, #64b5f6 0%, #2196f3 100%);
  padding: 20px 0;
  border-radius: 10px 10px 0 0;
}

.white-text {
  color: white;
}

/* 表单居中 */
.form-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 50px;
}

/* 让 el-form 内部内容居中 */
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* form-item 让 label 左对齐，输入框占满剩余空间 */
.el-form-item {
  width: 100%;
  display: flex;
  justify-content: center; /* 让 label 和 input 整体居中 */
}

/* 输入框居中 */
.input-field {
  flex: 1;
  margin-left: 20px;
}

/* 按钮单独居中 */
.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.login-button {
  width: 100%;
  background-color: #2196f3;
  color: white;
}

.sign-up-button {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: black;
}
</style>