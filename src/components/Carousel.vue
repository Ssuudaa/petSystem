<template>
  <el-carousel :interval="5000" arrow="hover" height="400px" class="carousel">
    <el-carousel-item v-for="(image, index) in images" :key="index">
      <div class="carousel-content">
        <img :src="image" alt="轮播图" class="carousel-image" />
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import api from '@/api.js';


export default {
  name: 'Carousel',
  data() {
    return {
      images: [] // 存放从 API 获取的图片
    };
  },
  mounted() {
    this.fetchImages(); // 组件加载时获取数据
  },
  methods: {
    async fetchImages() {
      try {
        const response = await api.get('/admin/getHospital/1'); // 调用 API
        if (response.code == 200) {
          const hospitalData = response.data;
          this.images = [
            hospitalData.imageOne,
            hospitalData.imageTwo,
            hospitalData.imageThree
          ].filter(Boolean); // 过滤掉空值，避免出现空图片
        }
      } catch (error) {
        console.error('获取轮播图失败:', error);
      }
    }
  }
};
</script>

<style scoped>
.carousel {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #f9f9f9, #e3f2fd);
  padding: 10px;
}

.carousel-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 400px;
  object-fit: fill; /* 拉伸图片以适应容器 */
  border-radius: 12px;
}
</style>
