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
export default {
  name: 'PetInfo',
  data() {
    return {
      pets: [
        {
          name: "小花",
          image: "/image/pet1.jpeg",
          description: "小花是一只可爱的玄风鹦鹉，喜欢玩耍，性格活泼。",
        },
        {
          name: "小黑",
          image: "/image/pet2.jpeg",
          description: "小黑是一只安静的猫咪，喜欢晒太阳，爱干净。",
        },
        {
          name: "小白",
          image: "/image/pet3.jpeg",
          description: "小白是一只聪明的小狗，喜欢在草地上奔跑。",
        },
      ],
    };
  },
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
