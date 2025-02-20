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
  export default {
    data() {
      return {
        teamMembers: [
          {
            name: "小明",
            role: "首席兽医",
            image: "https://happytailsvet.com.au/wp-content/uploads/2021/11/1-copy-1.png",
            description: "主要负责监督、管理和制定与动物健康、疾病防控、兽医护理以及相关法规合规性相关的政策和标准"
          },
          {
            name: "小红",
            role: "实践经理",
            image: "https://happytailsvet.com.au/wp-content/uploads/2021/11/015A0348.jpeg",
            description: "主要负责宠物医院的日常运营和管理，确保医院高效运作并提供优质服务"
          },
          {
            name: "小孙",
            role: "护士长",
            image: "https://happytailsvet.com.au/wp-content/uploads/2021/11/015A0345.jpeg",
            description: "主要负责监督和管理护理团队，确保医院提供高质量的动物护理服务"
          },
          {
            name: "小张",
            role: "接待员",
            image: "https://happytailsvet.com.au/wp-content/uploads/2021/11/cathy-Zhang-receptionist1.jpeg",
            description: "主要负责接待客户、管理预约和提供基本的客户服务"
          },
          {
            name: "小静",
            role: "接待员",
            image: "https://happytailsvet.com.au/wp-content/uploads/2021/11/015A0346.jpeg",
            description: "主要负责接待客户、管理预约和提供基本的客户服务"
          }
        ]
      };
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
  