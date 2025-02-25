<template>
  <el-card class="box-card">
    <h3 class="title">关于我们</h3>
    <p class="description">致力打造最好的宠物医院，如有不便请联系我们</p>

    <el-row gutter="20" class="content-section">
      <!-- 地图 -->
      <el-col :span="10" class="map-container">
        <l-map :zoom="13" :center="[aboutInfo.latitude, aboutInfo.longitude]" class="map">
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
        </l-map>
      </el-col>

      <!-- 文字内容区域 -->
      <el-col :span="14" class="info-section">
        <el-row>
          <!-- 联系我们 -->
          <el-col :span="12" class="contact-info">
            <h4>联系我们</h4>
            <div><strong>地址：</strong> {{ aboutInfo.address }}</div>
            <div><strong>电话：</strong> {{ aboutInfo.contact }}</div>
            <div><strong>营业时间：</strong><br>{{ aboutInfo.businessHours }}</div>
          </el-col>

          <!-- 其他链接 -->
          <el-col :span="12" class="links">
  <ul>
    <li>
      <a :href="'http://' + aboutInfo.url" target="_blank">友情链接</a>
    </li>
  </ul>
</el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import api from '@/api.js';

export default {
  name: 'AboutUs',
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      aboutInfo: {
        address: "",
        contact: "",
        businessHours: "",
        latitude: "",
        longitude: "",
        links: []
      }
    };
  },
  mounted() {
    this.fetchAboutInfo();
  },
  methods: {
    async fetchAboutInfo() {
      try {
        const response = await api.get('/admin/getAboutUs');
        if (response.code === 200) {
          this.aboutInfo = response.data[0] || {}; 
          console.log("Latitude:", this.aboutInfo.latitude);
      console.log("Longitude:", this.aboutInfo.longitude);// 假设返回的是一个数组，取第一个元素
        } else {
          console.error('获取关于我们信息失败:', response.message);
        }
      } catch (error) {
        console.error('获取关于我们信息失败:', error);
      }
    }
  }
};
</script>

<style scoped>
.box-card {
  padding: 2vw;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #ffffff, #a1c4fd);
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

.content-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.map-container {
  display: flex;
  justify-content: center;
}

.map {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.info-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-info, .links {
  text-align: center;
}

.links ul {
  list-style: none;
  padding: 0;
}

.links ul li a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.links ul li a:hover {
  color: #0056b3;
}
</style>
