<template>
    <el-card class="box-card">
      <el-row gutter={20}>  <!-- gutter 用来设置列之间的间距 -->
        <!-- 第一行（四个元素） -->
        <el-col :span="6">
          <div class="key-icon-box icon-default icon-top cont-center ib-hover-1 kd-animated fadeIn kd-animate" style="background-color: transparent;" data-animation-delay="400">
            <div class="ib-wrapper">
              <div class="tt-iconbox-customimg img_big_size">
                <img decoding="async" src="https://www.ekko-wp.com/static/wp-content/uploads/sites/3/2019/04/vet-ico3.png" alt="宠物咨询" />
              </div>
              <h5 class="service-heading" style="color: #007cb6;">宠物咨询</h5>
              <p>我们提供广泛的宠物咨询，包括健康检查和疾病检查</p>
            </div>
          </div>
        </el-col>
  
        <el-col :span="6">
          <div class="key-icon-box icon-default icon-top cont-center ib-hover-1 kd-animated fadeIn kd-animate" style="background-color: transparent;" data-animation-delay="400">
            <div class="ib-wrapper">
              <div class="tt-iconbox-customimg img_big_size">
                <img decoding="async" src="https://www.ekko-wp.com/static/wp-content/uploads/sites/3/2019/04/vet-ico1.png" alt="疫苗接种" />
              </div>
              <h5 class="service-heading" style="color: #007cb6;">疫苗接种</h5>
              <p>我们的兽医将根据您的宠物和生活方式与您讨论最佳的接种疫苗种类，以预防常见的传染病</p>
            </div>
          </div>
        </el-col>
  
        <el-col :span="6">
          <div class="key-icon-box icon-default icon-top cont-center ib-hover-1 kd-animated fadeIn kd-animate" style="background-color: transparent;" data-animation-delay="400">
            <div class="ib-wrapper">
              <div class="tt-iconbox-customimg img_big_size">
                <img decoding="async" src="https://www.ekko-wp.com/static/wp-content/uploads/sites/3/2019/04/vet-ico4.png" alt="芯片植入" />
              </div>
              <h5 class="service-heading" style="color: #007cb6;">芯片植入</h5>
              <p>我们建议您为您的宠物植入微芯片并进行注册，因为这可以让它们有最好的机会被识别出来并在丢失时返还给您</p>
            </div>
          </div>
        </el-col>
  
        <el-col :span="6">
          <div class="key-icon-box icon-default icon-top cont-center ib-hover-1 kd-animated fadeIn kd-animate" style="background-color: transparent;" data-animation-delay="400">
            <div class="ib-wrapper">
              <div class="tt-iconbox-customimg img_big_size">
                <img decoding="async" src="https://www.ekko-wp.com/static/wp-content/uploads/sites/3/2019/04/vet-ico6.png" alt="口腔护理" />
              </div>
              <h5 class="service-heading" style="color: #007cb6;">口腔护理</h5>
              <p>我们的兽医将非常乐意讨论和制定适合您的宠物的牙科食品和牙刷，以及专业的去除牙结石和牙齿抛光等一系列的牙科护理</p>
            </div>
          </div>
        </el-col>
      </el-row>
  
      <!-- 第二行（四个元素） -->
      <el-row gutter={20}>
        <el-col :span="6">
          <div class="key-icon-box icon-default icon-top cont-center ib-hover-1 kd-animated fadeIn kd-animate" style="background-color: transparent;" data-animation-delay="400">
            <div class="ib-wrapper">
              <div class="tt-iconbox-customimg img_big_size">
                <img decoding="async" src="https://www.ekko-wp.com/static/wp-content/uploads/sites/3/2019/04/vet-ico5.png" alt="宠物绝育" />
              </div>
              <h5 class="service-heading" style="color: #007cb6;">宠物绝育</h5>
              <p>绝育是宠物医院的常规外科手术。这包括对狗、猫、兔子和其他一些小动物进行绝育</p>
            </div>
          </div>
        </el-col>
  
        <el-col :span="6">
          <div class="key-icon-box icon-default icon-top cont-center ib-hover-1 kd-animated fadeIn kd-animate" style="background-color: transparent;" data-animation-delay="400">
            <div class="ib-wrapper">
              <div class="tt-iconbox-customimg img_big_size">
                <img decoding="async" src="https://www.ekko-wp.com/static/wp-content/uploads/sites/3/2019/04/vet-ico8.png" alt="手术" />
              </div>
              <h5 class="service-heading" style="color: #007cb6;">手术</h5>
              <p>我们有配备齐全的麻醉监护和手术设备，我们的工作人员在手术过程中将提供全程护理，因此我们可以提供范围广泛的宠物手术</p>
            </div>
          </div>
        </el-col>
  
        <el-col :span="6">
          <div class="key-icon-box icon-default icon-top cont-center ib-hover-1 kd-animated fadeIn kd-animate" style="background-color: transparent;" data-animation-delay="400">
            <div class="ib-wrapper">
              <div class="tt-iconbox-customimg img_big_size">
                <img decoding="async" src="https://www.ekko-wp.com/static/wp-content/uploads/sites/3/2019/04/vet-ico3.png" alt="血液检测和病理分析" />
              </div>
              <h5 class="service-heading" style="color: #007cb6;">血液检测和病理分析</h5>
              <p>我们提供广泛的内部血液检测，包括路由血液检测，特定检测，妊娠激素检测等</p>
            </div>
          </div>
        </el-col>
  
        <el-col :span="6">
          <div class="key-icon-box icon-default icon-top cont-center ib-hover-1 kd-animated fadeIn kd-animate" style="background-color: transparent;" data-animation-delay="400">
            <div class="ib-wrapper">
              <div class="tt-iconbox-customimg img_big_size">
                <img decoding="async" src="https://www.ekko-wp.com/static/wp-content/uploads/sites/3/2019/04/vet-ico9.png" alt="X光和CT" />
              </div>
              <h5 class="service-heading" style="color: #007cb6;">X光和CT</h5>
              <p>我们进行各种X光和CT检查，例如胸部，腹部和肌肉骨骼系统的许多部位</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </template>
  
  <script>
  export default {
    name: 'TeamSection'
  }
  </script>
  
  <style scoped>
  .el-card {
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #ffffff, #a1c4fd);

  }
  
  .key-icon-box {
    padding: 15px;
    text-align: center;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
  }
  
  .key-icon-box:hover {
    transform: translateY(-10px); /* 向上移动 */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); /* 增加阴影效果 */
  }
  
  .key-icon-box img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 10px;
  }
  
  .service-heading {
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .service-heading + p {
    font-size: 14px;
    color: #555;
  }
  </style>
  