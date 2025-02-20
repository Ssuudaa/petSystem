<template>
  <el-card class="box-card">
    <h3 class="title">关于我们</h3>
    <p class="description">我们致力于为宠物提供最专业的医疗服务，关爱每一只宠物的健康。</p>

    <el-row gutter="20" class="content-section">
      <!-- 地图 -->
      <el-col :span="10" class="map-container">
        <l-map :zoom="13" :center="[37.7749, -122.4194]" class="map">
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
        </l-map>
      </el-col>

      <!-- 文字内容区域 -->
      <el-col :span="14" class="info-section">
        <el-row>
          <!-- 联系我们 -->
          <el-col :span="12" class="contact-info">
            <h4>联系我们</h4>
            <div><strong>地址：</strong> 黄边北路588号（工商银行旁）</div>
            <div><strong>电话：</strong> 4000208888</div>
            <div><strong>营业时间：</strong><br>周一至周五: 08:00 - 18:00<br>周六至周日: 09:00 - 15:00</div>
          </el-col>

          <!-- 其他链接 -->
          <el-col :span="12" class="links">
            <h4>友情链接</h4>
            <ul>
              <li><a href="https://localsite.baidu.com/okam/pages/institution/index?categoryLv1=%E5%AE%A0%E7%89%A9%E6%9C%8D%E5%8A%A1&ch=53&city=%E5%B9%BF%E5%B7%9E%E5%B8%82&crd=12611518_2642882&pathSource=okam%2Fpages%2Fhome%2Findex&qid=16419975128735164572&query=%E5%AE%A0%E7%89%A9%E5%8C%BB%E9%99%A2&shopId=21459245&source=51022&srcid=51022&title=%E5%AE%A0%E7%89%A9%E5%8C%BB%E9%99%A2&rank=6">宠物医院</a></li>
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

export default {
  name: 'AboutUs',
  components: {
    LMap,
    LTileLayer
  }
}
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