<template>
  <header>
    <nav class="blue darken-2">
      <div class="nav-wrapper container">
        <div class="left brand-text">宠物医院</div>
        <el-button class="return-button" @click="goHome" type="danger" size="medium" round style="margin-left: 30px;">返回首页</el-button>
        <div class="right help-text">如需帮助，请致电: 4000208888</div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  methods:{
    goHome() {
      this.$router.push('/');
    },
  }
};
</script>

<style scoped>
/* 让整个导航栏背景变蓝，文字变白 */
nav.blue.darken-2 {
  background-color: #2196f3 !important;
  color: white;
  height: 60px;
}

/* 让导航栏内容左右对齐 */
.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px; /* 添加左右间距 */
}

/* 左侧“宠物医院”样式 */
.brand-text {
  font-weight: 300;
  font-size: calc(100% + 1vw);
  color: white;
}

/* 右侧“如需帮助”样式 */
.help-text {
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-left: auto; /* 让它靠右 */
}
</style>
