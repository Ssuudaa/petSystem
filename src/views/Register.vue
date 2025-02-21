<template>
  <div>
    <!-- 引入 Navbar 组件 -->
    <Navbar />

    <!-- 注册表单 -->
    <div class="login-container">
      <div class="card z-depth-2">
        <div class="card-content" style="padding: 15px 0; background-image: radial-gradient(circle 300px at center, #64b5f6 0%, #2196f3 100%);">
          <div class="row white-text">
            <h3 class="center title-text">Welcome</h3>
            <h4 class="center subtitle-text">创建您的账号</h4>
          </div>
        </div>
        <div style="padding: 15px;">
          <el-form :model="registerForm" ref="registerForm" :rules="registerRules" status-icon label-width="90px">
            <el-row gutter="20">
              <!-- 个人信息 -->
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="registerForm.name" autocomplete="off" class="input-field" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="registerForm.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="registerForm.phone" autocomplete="off" class="input-field" />
                </el-form-item>
              </el-col>

              <!-- 宠物信息 -->
              <el-col :span="12">
                <el-form-item label="宠物爱称" prop="petname">
                  <el-input v-model="registerForm.petname" autocomplete="off" class="input-field" />
                </el-form-item>
                <el-form-item label="宠物月龄" prop="petMonth">
                  <el-input v-model="registerForm.petMonth" autocomplete="off" class="input-field" />
                </el-form-item>
                <el-form-item label="具体品种" prop="petSpec">
                  <el-input v-model="registerForm.petSpec" autocomplete="off" class="input-field" />
                </el-form-item>
                <el-form-item label="是否接种疫苗" prop="isVac">
                  <el-radio-group v-model="registerForm.isVac">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-if="registerForm.isVac === '是'" label="疫苗名称" prop="vacName">
                  <el-input v-model="registerForm.vacName" autocomplete="off" class="input-field" />
                </el-form-item>
                <el-form-item label="过往病史" prop="isMedicalHistory">
                  <el-radio-group v-model="registerForm.isMedicalHistory">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-if="registerForm.isMedicalHistory === '是'" label="病史详情" prop="medicalHistoryDetails">
                  <el-input v-model="registerForm.medicalHistoryDetails" autocomplete="off" class="input-field" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item>
              <el-button type="primary" @click="handleRegister" class="btn-large waves-effect blue darken-2" style="margin-left: -40px;">注册</el-button>
            </el-form-item>
          </el-form>

          <!-- 登录链接 -->
          <div class="row">
            <router-link to="/login" class="sign-up-button waves-effect waves btn blue">
              <i class="material-icons left"></i>已有账号? 登录
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      registerForm: {
        name: '',
        sex: '',
        phone: '',
        petname: '',
        petMonth: '',
        petSpec: '',
        isVac: '',
        vacName: '',
        isMedicalHistory: '',
        medicalHistoryDetails: ''
      },
      registerRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
        ],
        petname: [{ required: true, message: '请输入宠物爱称', trigger: 'blur' }],
        petMonth: [{ required: true, message: '请输入宠物月龄', trigger: 'blur' }],
        petSpec: [{ required: true, message: '请输入宠物品种', trigger: 'blur' }],
        isVac: [{ required: true, message: '请选择是否接种疫苗', trigger: 'change' }],
        vacName: [{ required: true, message: '请输入疫苗名称', trigger: 'blur' }],
        isMedicalHistory: [{ required: true, message: '请选择是否有过往病史', trigger: 'change' }],
        medicalHistoryDetails: [{ required: true, message: '请输入病史详情', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          alert('注册成功！');
        } else {
          console.log('表单验证失败');
          return false;
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
  background-color: rgba(255, 255, 255, 0.8);
  background-image: url(/image/doctor.jpg); /* 设置背景图片 */
  background-size: cover;
  background-position: center;
}

.card {
  width: 100%;
  max-width: 600px; /* 更小的宽度 */
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.6); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 背景模糊 10px */
  border: 1px solid rgba(255, 255, 255, 0.2); /* 轻微边框 */
  margin-top: 0;
  margin-bottom: 20px;
}

.card-content {
  padding: 15px 0; /* 更小的内边距 */
  background-image: radial-gradient(circle 300px at center, #64b5f6 0%, #2196f3 100%);
  text-align: center;
}

.white-text {
  color: white;
}

.input-field {
  margin-bottom: 10px;
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
  color: black;
}

a {
  display: block;
  text-align: center;
  margin-top: 10px;
}

a .material-icons {
  margin-right: 10px;
}
.el-form-item__label {
  font-weight: bold;
}

.el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.el-form-item {
  width: 100%;
  max-width: 250px; /* 更小的输入框宽度 */
}

.el-input {
  width: 100%;
}

.title-text {
  color: #0d47a1;
  font-weight: 700;
  font-size: 20px; /* 更小的标题字体 */
}

.subtitle-text {
  font-weight: 700;
  font-size: 14px; /* 更小的副标题字体 */
}
.el-form-item__label {
  font-weight: bold;
}
</style>
