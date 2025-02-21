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
          <el-menu-item index="team" @click="scrollToSection('team')"><a>宠物服务</a></el-menu-item>
          <el-menu-item index="teamCarousel" @click="scrollToSection('teamCarousel')"><a>医疗团队</a></el-menu-item>
          <el-menu-item index="aboutUs" @click="scrollToSection('aboutUs')"><a>关于我们</a></el-menu-item>
        </el-menu>

        <!-- 右上角 登录/注册 按钮 -->
        <el-button @click="goToSetting" type="success" round>配置管理</el-button>
        <el-button @click="goToLogin" type="primary" round v-if="!isLoggedIn">登录/注册</el-button>
        <el-button v-else @click="logout" round>退出</el-button>
        <el-button @click="1" type="danger" round style="margin-right:50px;">致电: 4000208888</el-button>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <el-row class="main-content">
      <el-col :span="24" :md="16">
        <carousel /> <!-- 轮播图 -->
      </el-col>
      <el-col :span="24" :md="8" id="hospital" class="hospital">
        <el-card class="box-card">
          <h2>医院介绍</h2>
          <p>
            欢迎来到测试数据宠物医院！我们致力于为各种宠物提供专业的医疗和护理服务，无论是犬猫、鸟类、兔子还是爬行动物，我们都能提供贴心的健康保障。
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

    <!-- 底部：关于我们 -->
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
      isLoggedIn: false, 
    };
  },
  created() {
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
            top: rect.top + window.scrollY - 100,
            behavior: 'smooth',
          });
        }
      });
    },
    goToSetting() {
      this.$router.push('/user');
    },
    goToLogin() {
      this.$router.push({ name: "login" });
    },
    logout() {
      this.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
/* PC + 移动端适配 */
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 头部区域 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #d2d7da;
  padding: 15px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* logo */
.logo {
  position: absolute;
  left: 140px;
  top: 50%;
  transform: translateY(-50%);
}

.logo img {
  height: 160px;
  width: auto;
}

/* 导航栏 */
.nav-container {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 100px;
}

.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: #d2d7da;
  border: none;
  height: 60px;
  padding: 0;
}

.nav-menu .el-menu-item {
  font-size: 16px;
  font-weight: bold;
  padding: 0 20px;
  color: white;
}

.home-page {
  padding-top: 100px;
}

/* 主要内容 */
.main-content {
  margin-top: 3vw;
  display: flex;
  gap: 30px;
}

.hospital .el-card {
  border-radius: 10px;
  padding: 70px;
  background: linear-gradient(135deg, #ffffff, #4eb7b4);
}

/* 响应式适配 */
@media (max-width: 768px) {
  /* 头部 */
  .header {
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  .logo {
    position: static;
    transform: none;
    margin-bottom: 10px;
  }

  .nav-container {
    flex-direction: column;
    align-items: center;
    padding-left: 0;
  }

  .nav-menu {
    flex-direction: column;
    width: 100%;
  }

  .nav-menu .el-menu-item {
    width: 100%;
    text-align: center;
  }

  /* 按钮适配 */
  .el-button {
    width: 80%;
    margin-top: 5px;
  }

  /* el-col 全宽 */
  .main-content .el-col {
    width: 100%;
    margin-bottom: 20px;
  }

  /* el-card 调整 */
  .hospital .el-card {
    padding: 20px;
  }

  .aboutUs {
    padding: 20px;
  }

  /* 轮播图适配 */
  .carousel {
    width: 100%;
  }
}
</style>
