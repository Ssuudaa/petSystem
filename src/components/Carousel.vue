<template>
  <el-carousel :interval="5000" arrow="hover" height="400px" class="carousel">
    <el-carousel-item v-for="(image, index) in images" :key="index">
      <div class="carousel-content">
        <img :src="image.src" :alt="image.alt" class="carousel-image" />
        <div class="overlay">
          <h3 class="overlay-text">{{ image.caption }}</h3>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      images: [
        { src: '/image/m2.jpeg', alt: '轮播图1', caption: '宠物医疗服务' },
        { src: '/image/m1.jpeg', alt: '轮播图2', caption: '关爱每一只宠物' },
        { src: '/image/m3.jpeg', alt: '轮播图3', caption: '专业护理团队' }
      ]
    };
  }
}
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
  object-fit: cover;
  border-radius: 12px;
}

.overlay {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 10px 20px;
  border-radius: 8px;
  color: #fff;
  font-size: 1.2em;
  text-align: center;
  white-space: nowrap;
}
</style>
