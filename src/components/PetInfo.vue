<template>
  <el-card class="box-card">
    <h3 class="title">爱宠百科</h3>
    <p class="description">在这里，我们提供关于宠物健康、护理等方面的信息...</p>

    <!-- 宠物展示区域 -->
    <el-row class="pet-info-section" gutter="20">
      <el-col :span="8" v-for="(pet, index) in pets" :key="index">
        <el-card class="pet-card" shadow="hover">
          <img :src="pet.image" alt="宠物图片" class="pet-image" />
          <div class="pet-info">
            <h4 class="pet-name">{{ pet.name }}</h4>
            <p class="pet-description">{{ pet.description }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import api from '@/api.js';  // 确保你有一个封装好的 api 服务来处理接口请求

export default {
  name: 'PetInfo',
  data() {
    return {
      pets: [],
    };
  },
  mounted() {
    this.fetchPets();
  },
  methods: {
    // 获取宠物数据
    fetchPets() {
      api.get('/admin/getPetCyc')
        .then(response => {
          if (response.code === 200) {
            this.pets = response.data || [];
          } else {
            this.$message.error('获取宠物数据失败！');
          }
        })
        .catch(error => {
          this.$message.error('请求失败，请检查网络！');
        });
    }
  }
};
</script>

<style scoped>
.box-card {
  padding: 2vw;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff, #a1c4fd);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
}

.description {
  text-align: center;
  font-size: 1.1em;
  color: #666;
  margin-bottom: 2vw;
  font-weight: bold;
}

.pet-info-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pet-card {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  background: white;
}

.pet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.pet-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
}

.pet-info {
  padding: 1.2vw;
}

.pet-name {
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
}

.pet-description {
  font-size: 1em;
  color: #666;
}

.el-col {
  display: flex;
  justify-content: center;
}
</style>
