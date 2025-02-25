<template>
  <div class="team-carousel">
    <h2 class="title">团队成员</h2>
    <h6 class="subtitle">了解给您的宠物提供护理和治疗的专业兽医</h6>

    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="(member, index) in teamMembers" :key="index">
        <div class="team-card">
          <img :src="member.image" :alt="member.name" class="team-image" />
          <h5>{{ member.name }}</h5>
          <span class="team-subtitle">{{ member.role }}</span>
          <p>{{ member.description }}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import api from '@/api.js'; // 确保你有封装好的api工具来处理接口请求

export default {
  data() {
    return {
      teamMembers: []
    };
  },
  mounted() {
    this.fetchStaff(); // 组件加载完成时调用获取团队成员数据
  },
  methods: {
    // 获取团队成员数据
    fetchStaff() {
      api.get('/admin/getStaff')
        .then(response => {
          if (response.code === 200) {
            this.teamMembers = response.data || [];
          } else {
            this.$message.error('获取团队成员失败！');
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
.team-carousel {
  text-align: center;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
}

.subtitle {
  text-align: center;
  font-size: 1.1em;
  color: #666;
  margin-bottom: 2vw;
}

.team-card {
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.team-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.team-subtitle {
  display: block;
  font-size: 14px;
  color: #007cb6;
  margin-top: 5px;
}
</style>
