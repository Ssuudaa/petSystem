<template>
    <div class="home-page">
      <!-- 头部区域 -->
      <div class="header">
        <!-- 左侧 Logo -->
        <div class="logo">
          <img src="@/assets/logo.png" alt="宠物医院 Logo" />
        </div>
  
        <!-- 导航栏区域 -->
        <div class="nav-container">
          <el-menu mode="horizontal" class="nav-menu" :default-active="activeMenu">
  <el-menu-item index="home" @click="scrollToSection('hospital')"><a>医院介绍</a></el-menu-item>
  <el-menu-item index="petInfo" @click="scrollToSection('petInfo')"><a>宠物百科</a></el-menu-item>
  <el-menu-item index="teamCarousel" @click="scrollToSection('teamCarousel')"><a>医疗团队</a></el-menu-item>
  <el-menu-item index="team" @click="scrollToSection('team')"><a>宠物服务</a></el-menu-item>
  <el-menu-item index="aboutUs" @click="scrollToSection('aboutUs')"><a>关于我们</a></el-menu-item>
</el-menu>
  
          <!-- 右上角 登录/注册 按钮 -->
          <el-button @click="goToSetting"  type="success" round>配置管理</el-button>
          <el-button @click="goToLogin"   type="primary" round v-if="!isLoggedIn">登录/注册</el-button>
          <el-button v-else @click="logout" round>退出</el-button>
          <el-button @click="1"  type="danger" round style="margin-right:50px ;">致电: 4000208888</el-button>
        </div>
      </div>
  
      <!-- 其他内容区域 -->
      <el-row class="main-content">
        <el-col :span="24" :md="16">
          <carousel /> <!-- 轮播图 -->
        </el-col>
        <el-col :span="24" :md="8" id="hospital" class="hospital">
          <el-card class="box-card">
            <h2>医院介绍</h2>
            <p>
              欢迎来到XXX宠物医院！我们致力于为各种宠物提供专业的医疗和护理服务，无论是犬猫、鸟类、兔子还是爬行动物，我们都能提供贴心的健康保障。我们的团队由资深兽医和护理专家组成，结合先进的医疗设备和个性化的宠物管理方案，确保每一只宠物都能得到细致入微的照顾，帮助它们过上健康、快乐的生活。
            </p>
          </el-card>
        </el-col>
      </el-row>
  
      <!-- 更多内容区域 -->
      <el-row class="info-section">
        <el-col :span="24" id="petInfo">
          <pet-info /> <!-- 爱宠百科 -->
        </el-col>
        <el-col :span="24" id="teamCarousel">
          <team-carousel /> <!-- 团队员工 -->
        </el-col>
        <el-col :span="24" id="team">
          <team-section /> <!-- 医疗团队 -->
        </el-col>
      </el-row>
  
      <!-- 最下部分：关于我们 -->
      <div class="aboutUs" id="aboutUs">
        <aboutUs />
      </div>
    </div>
  </template>
  
  <script>
  import Carousel from "@/components/Carousel.vue";
  import PetInfo from "@/components/PetInfo.vue";
  import TeamSection from "@/components/TeamSection.vue";
  import AboutUs from "@/components/AboutUs.vue";
  import TeamCarousel from "@/components/TeamCarousel.vue";

  
  export default {
    components: {
      Carousel,
      PetInfo,
      TeamSection,
      AboutUs,
      TeamCarousel
    },
    data() {
      return {
        activeMenu: "home",
        isLoggedIn: false, // 默认选中的菜单项
      };
    },
    created() {
    // 页面加载时读取登录状态
    const status = localStorage.getItem('isLoggedIn');
    if (status === 'true') {
      this.isLoggedIn = true;
    }
  },
  methods: {
    scrollToSection(sectionId) {
    this.$nextTick(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY - 100, // 留出100px的空间，避免被固定导航栏遮挡
          behavior: 'smooth', // 平滑滚动
        });
      }
    });
  },
    goToSetting(){
      this.$router.push('/user');
    },
    goToLogin() {
      this.$router.push({ name: "login" });
    },
    logout() {
      this.isLoggedIn = false; // 退出时设置为未登录
      localStorage.setItem('isLoggedIn', 'false'); // 清除登录状态
      const loading = this.$loading({
            lock: true,
            text: '正在退出...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
      this.$router.push('/');
      loading.close(); // 关闭 loading 动画

    },
    updateLoginStatus(status) {
      this.isLoggedIn = status; // 更新登录状态
      localStorage.setItem('isLoggedIn', status.toString()); // 存储登录状态
    },
  },
  };
  </script>
  
  <style scoped>
  .home-page {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #ffffff, #a1c4fd);
    color: #333;
  }
  
  /* 头部区域 */
  .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #d2d7da; /* 顶部区域背景色 */
  padding: 15px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed; /* 让导航栏固定在页面顶部 */
  top: 0; /* 距离顶部为 0 */
  left: 0; /* 使导航栏横跨整个页面 */
  width: 100%; /* 宽度为 100% */
  z-index: 1000; /* 确保导航栏在所有内容之上 */

}

/* logo 部分需要额外的 padding-top 来调整位置 */
.logo {
  position: absolute;
  left: 140px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

/* 导航栏区域的其他调整 */
.nav-container {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 100px; /* 给 logo 留出空间 */
}

/* 使页面内容不被固定的导航栏覆盖 */
.home-page {
  padding-top: 100px; /* 给主页内容添加上方的空间 */
}
  
  .logo img {
    height: 160px; /* 设置 logo 的大小 */
    width: auto; /* 保持宽高比 */
  }
  
  /* 导航栏区域 */
  
  .nav-menu {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center; /* 垂直居中菜单项 */
    background-color: #d2d7da;
    border: none !important;
    height: 60px; /* 设置导航栏高度 */
    padding: 0;
  }
  
  .nav-menu .el-menu-item {
    font-size: 16px;
    font-weight: bold;
    padding: 0 20px; /* 调整左右内边距 */
    color: white;
    border-radius: 5px;
    text-decoration: none;
    border: none !important;
    background-color: transparent !important;
    display: flex;
    align-items: center; /* 确保文字垂直居中 */
  }
  
  .nav-menu .el-menu-item a {
    text-decoration: none;
    color: inherit;
  }
  
  .nav-menu .el-menu-item:hover {
    background-color: transparent !important;
    color: #42a5f5;
    transition: color 0.3s ease;
  }
  
  .nav-menu .el-menu-item.is-active {
    color: #42a5f5;
    background-color: transparent !important;
  }
  
  .nav-menu .el-menu-item.is-active:hover {
    background-color: transparent !important;
    color: #42a5f5 !important;
  }
  
  /* 登录按钮 */
  .login-btn {
    margin-left: auto;
    background-color: #ff668a;
    color: white;
  }
  
  .login-btn:hover {
    background-color: #1dc4da;
  }
  
  /* 页面布局 */
  .main-content {
    margin-top: 3vw;
    display: flex;
    gap: 30px;
  }
  
  .main-content .el-col {
    display: flex;
    align-items: stretch;
  }
  
  .hospital {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    background-color: #f0f8ff;
  }
  
  .info-section {
    margin-top: 4vw;
  }
  
  .aboutUs {
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .el-col {
    margin-bottom: 4vw;
  }
  
  /* 响应式布局 */
  @media (max-width: 768px) {
    .main-content .el-col {
      width: 100%;
      margin-bottom: 20px;
  }
  
  .aboutUs {
    padding: 4vw;
  }
  
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .nav-menu {
    width: 100%;
    justify-content: space-between;
  }
  }
  
  /* 优化医院卡片样式 */
  .hospital .el-card {
    border-radius: 10px;
    padding: 70px;
    background: linear-gradient(135deg, #ffffff, #4eb7b4);
    transition: box-shadow 0.3s ease;
  }
  
  /* 优化图片 */
  .el-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }
  </style>