<template>
  <div class="home">
    <el-header class="header">
      <el-button class="return-button" @click="goHome" type="primary" size="medium">返回首页</el-button>
      <div class="logo-title">
        <div class="logo">
          <img src="@/assets/logo.png" alt="宠物医院 Logo" />
        </div>
        <span class="title">宠物医院管理系统</span>
      </div>
    </el-header>
    <el-main>
      <div v-if="roleStatus">
        姓名:
        <el-input
          style="width: 170px; margin-left: 10px"
          placeholder="请输入"
          clearable
          v-model="nameValue"
        ></el-input>
        手机号:
        <el-input
          style="width: 170px; margin-left: 10px"
          placeholder="请输入"
          clearable
          v-model="userAccountValue"
        ></el-input>
        角色:
        <el-select
          style="width: 170px; margin-left: 10px"
          placeholder="请输入"
          clearable
          v-model="roleValue"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-button class="ml-5" type="primary" round @click="handleSearch" style="margin-left: 10px;"
          >搜索</el-button
        >
        <el-button round @click="reset">重置</el-button>
        <div class="button">
          <el-button type="primary" @click="addPetSys()"  style="margin-left: -12px;">医院介绍模块配置</el-button>
          <el-button type="success" @click="addPetInfo()" >宠物百科模块配置</el-button>
          <el-button type="warning" @click="addTeamInfo()" >医疗团队模块配置</el-button>
          <el-button type="danger" @click="addAboutUs()" >关于我们模块配置</el-button>
        </div>
      </div>

      <div class="container_main_table">
        <el-table
          ref="adviseTable"
          :data="tableData"
          header-row-class-name="headerClass"
          tooltip-effect="dark"
          style="width: 100%"
          :height="height"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
    type="index"
    label="序号"
    width="150"
    align="center"
  />

  <!-- 姓名列 -->
  <el-table-column
    label="手机号"
    prop="dataPhone"
    width="200"
    align="center"
  />

  <!-- 性别列 -->
  <el-table-column
    label="性别"
    prop="dataSex"
    width="200"
    align="center"
  />

  <!-- 密码列 -->
  <el-table-column
    label="密码"
    prop="dataPassword"
    width="200"
    align="center"
  />
  <el-table-column
    label="角色"
    prop="dataRole"
    width="200"
    align="center"
  />
          <el-table-column label="操作" min-width="100" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                round
                @click="edit(scope.row)"
                v-if="roleStatus"
                >编辑</el-button
              >
              
              <el-button
                size="mini"
                type="primary"
                round
                @click="editPassWord(scope.row)"
                >修改密码</el-button
              >
              <el-button
                size="mini"
                type="danger"
                round
                @click="openDelete(scope.row)"
                v-if="roleStatus"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="container_main_pagination">
        <el-pagination
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
      <el-dialog :visible.sync="petSysDialogFormVisible" :title="dialogtitle">
  <el-form :model="petsys" ref="form" label-width="100px">
    <!-- 轮播图 1 -->
    <el-form-item label="轮播图 1" :rules="[{ required: true, message: '请上传轮播图1', trigger: 'change' }]">
      <el-upload
        class="upload-demo"
        action="/upload"   
        :on-success="handleSuccess1"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button>点击上传图片</el-button>
      </el-upload>
      <el-input v-model="petsys.carousel1Caption" placeholder="请输入轮播图1的描述" :rules="[{ required: true, message: '请输入轮播图1描述', trigger: 'blur' }]"></el-input>
    </el-form-item>
    
    <!-- 轮播图 2 -->
    <el-form-item label="轮播图 2" :rules="[{ required: true, message: '请上传轮播图2', trigger: 'change' }]">
      <el-upload
        class="upload-demo"
        action="/upload"   
        :on-success="handleSuccess2"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button>点击上传图片</el-button>
      </el-upload>
      <el-input v-model="petsys.carousel2Caption" placeholder="请输入轮播图2的描述" :rules="[{ required: true, message: '请输入轮播图2描述', trigger: 'blur' }]"></el-input>
    </el-form-item>

    <!-- 轮播图 3 -->
    <el-form-item label="轮播图 3" :rules="[{ required: true, message: '请上传轮播图3', trigger: 'change' }]">
      <el-upload
        class="upload-demo"
        action="/upload"
        :on-success="handleSuccess3"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button>点击上传图片</el-button>
      </el-upload>
      <el-input v-model="petsys.carousel3Caption" placeholder="请输入轮播图3的描述" :rules="[{ required: true, message: '请输入轮播图3描述', trigger: 'blur' }]"></el-input>
    </el-form-item>

    <!-- 介绍标题 -->
    <el-form-item label="介绍标题" :rules="[{ required: true, message: '请输入介绍标题', trigger: 'blur' }]">
      <el-input v-model="petsys.title" placeholder="请输入介绍标题"></el-input>
    </el-form-item>

    <!-- 介绍内容 -->
    <el-form-item label="介绍内容" :rules="[{ required: true, message: '请输入介绍内容', trigger: 'blur' }]">
      <el-input v-model="petsys.content" type="textarea" placeholder="请输入介绍内容"></el-input>
    </el-form-item>

    <div class="dialog-footer" style="text-align: center;">
      <el-button @click="petSyScancel">取消</el-button>
      <el-button type="primary" @click="submitPetSys">确定</el-button>
    </div>
  </el-form>
</el-dialog>
<el-dialog :visible.sync="aboutUsDialogVisible" title="医疗团队模块配置">
  <el-form :model="aboutUs" ref="aboutUsForm" label-width="100px">
    
    <!-- 地址 -->
    <el-form-item label="地址" :rules="[{ required: true, message: '请输入地址', trigger: 'blur' }]">
      <el-input v-model="aboutUs.address" placeholder="请输入地址"></el-input>
    </el-form-item>

    <!-- 联系方式 -->
    <el-form-item label="联系方式" :rules="[{ required: true, message: '请输入联系方式', trigger: 'blur' }]">
      <el-input v-model="aboutUs.phone" placeholder="请输入联系方式"></el-input>
    </el-form-item>

    <!-- 营业时间 -->
    <el-form-item label="营业时间" :rules="[{ required: true, message: '请输入营业时间', trigger: 'blur' }]">
      <el-input v-model="aboutUs.businessHours" placeholder="请输入营业时间"></el-input>
    </el-form-item>

    <!-- 纬度 -->
    <el-form-item label="纬度" :rules="[{ required: true, message: '请输入纬度', trigger: 'blur' }]">
      <el-input v-model="aboutUs.latitude" placeholder="请输入纬度"></el-input>
    </el-form-item>

    <!-- 经度 -->
    <el-form-item label="经度" :rules="[{ required: true, message: '请输入经度', trigger: 'blur' }]">
      <el-input v-model="aboutUs.longitude" placeholder="请输入经度"></el-input>
    </el-form-item>

    <!-- 友情链接 -->
    <el-form-item label="友情链接" :rules="[{ required: true, message: '请输入友情链接', trigger: 'blur' }]">
      <el-input v-model="aboutUs.links" placeholder="请输入友情链接"></el-input>
    </el-form-item>

    <div class="dialog-footer" style="text-align: center;">
      <el-button @click="aboutUsDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submitAboutUs">确定</el-button>
    </div>

  </el-form>
</el-dialog>

      <el-dialog :visible.sync="petInfoDialogVisible" title="宠物百科模块配置">
  <el-tabs type="card">
    <!-- 宠物1 -->
    <el-tab-pane label="宠物1">
      <el-form :model="pet1" label-width="100px">
        <el-form-item label="宠物1姓名" :rules="[{ required: true, message: '请输入宠物1姓名', trigger: 'blur' }]">
          <el-input v-model="pet1.name" placeholder="请输入宠物1姓名"></el-input>
        </el-form-item>
        
        <el-form-item label="宠物1照片" :rules="[{ required: true, message: '请上传宠物1照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success="(response, file, fileList) => handlePetPhotoSuccess(pet1, response, file, fileList)"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="宠物1描述" :rules="[{ required: true, message: '请输入宠物1描述', trigger: 'blur' }]">
          <el-input v-model="pet1.description" placeholder="请输入宠物1描述"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <!-- 宠物2 -->
    <el-tab-pane label="宠物2">
      <el-form :model="pet2" label-width="100px">
        <el-form-item label="宠物2姓名" :rules="[{ required: true, message: '请输入宠物2姓名', trigger: 'blur' }]">
          <el-input v-model="pet2.name" placeholder="请输入宠物2姓名"></el-input>
        </el-form-item>

        <el-form-item label="宠物2照片" :rules="[{ required: true, message: '请上传宠物2照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success="(response, file, fileList) => handlePetPhotoSuccess(pet2, response, file, fileList)"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="宠物2描述" :rules="[{ required: true, message: '请输入宠物2描述', trigger: 'blur' }]">
          <el-input v-model="pet2.description" placeholder="请输入宠物2描述"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <!-- 宠物3 -->
    <el-tab-pane label="宠物3">
      <el-form :model="pet3" label-width="100px">
        <el-form-item label="宠物3姓名" :rules="[{ required: true, message: '请输入宠物3姓名', trigger: 'blur' }]">
          <el-input v-model="pet3.name" placeholder="请输入宠物3姓名"></el-input>
        </el-form-item>

        <el-form-item label="宠物3照片" :rules="[{ required: true, message: '请上传宠物3照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success="(response, file, fileList) => handlePetPhotoSuccess(pet3, response, file, fileList)"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="宠物3描述" :rules="[{ required: true, message: '请输入宠物3描述', trigger: 'blur' }]">
          <el-input v-model="pet3.description" placeholder="请输入宠物3描述"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

  <div class="dialog-footer" style="text-align: center;">
    <el-button @click="petInfoDialogVisible = false">取消</el-button>
    <el-button type="primary" @click="submitPetInfo">确定</el-button>
  </div>
</el-dialog>


<el-dialog :visible.sync="teamInfoDialogVisible" title="医疗团队模块配置">
  <el-tabs type="card">
    <!-- 员工1 -->
    <el-tab-pane label="员工1">
      <el-form :model="teamMembers[0]" label-width="100px">
        <el-form-item label="员工姓名" :rules="[{ required: true, message: '请输入员工姓名', trigger: 'blur' }]">
          <el-input v-model="teamMembers[0].name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工照片" :rules="[{ required: true, message: '请上传员工照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success="(response, file, fileList) => handleTeamMemberPhotoSuccess(teamMembers[0], response, file, fileList)"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="职位" :rules="[{ required: true, message: '请输入员工职位', trigger: 'blur' }]">
          <el-input v-model="teamMembers[0].role" placeholder="请输入员工职位"></el-input>
        </el-form-item>
        <el-form-item label="备注" :rules="[{ required: true, message: '请输入员工备注', trigger: 'blur' }]">
          <el-input v-model="teamMembers[0].description" placeholder="请输入员工备注"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    
    <!-- 员工2 -->
    <el-tab-pane label="员工2">
      <el-form :model="teamMembers[1]" label-width="100px">
        <el-form-item label="员工姓名" :rules="[{ required: true, message: '请输入员工姓名', trigger: 'blur' }]">
          <el-input v-model="teamMembers[1].name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工照片" :rules="[{ required: true, message: '请上传员工照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success="(response, file, fileList) => handleTeamMemberPhotoSuccess(teamMembers[1], response, file, fileList)"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="职位" :rules="[{ required: true, message: '请输入员工职位', trigger: 'blur' }]">
          <el-input v-model="teamMembers[1].role" placeholder="请输入员工职位"></el-input>
        </el-form-item>
        <el-form-item label="备注" :rules="[{ required: true, message: '请输入员工备注', trigger: 'blur' }]">
          <el-input v-model="teamMembers[1].description" placeholder="请输入员工备注"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    
    <!-- 员工3 -->
    <el-tab-pane label="员工3">
      <el-form :model="teamMembers[2]" label-width="100px">
        <el-form-item label="员工姓名" :rules="[{ required: true, message: '请输入员工姓名', trigger: 'blur' }]">
          <el-input v-model="teamMembers[2].name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工照片" :rules="[{ required: true, message: '请上传员工照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success="(response, file, fileList) => handleTeamMemberPhotoSuccess(teamMembers[2], response, file, fileList)"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="职位" :rules="[{ required: true, message: '请输入员工职位', trigger: 'blur' }]">
          <el-input v-model="teamMembers[2].role" placeholder="请输入员工职位"></el-input>
        </el-form-item>
        <el-form-item label="备注" :rules="[{ required: true, message: '请输入员工备注', trigger: 'blur' }]">
          <el-input v-model="teamMembers[2].description" placeholder="请输入员工备注"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    
    <!-- 员工4 -->
    <el-tab-pane label="员工4">
      <el-form :model="teamMembers[3]" label-width="100px">
        <el-form-item label="员工姓名" :rules="[{ required: true, message: '请输入员工姓名', trigger: 'blur' }]">
          <el-input v-model="teamMembers[3].name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工照片" :rules="[{ required: true, message: '请上传员工照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success="(response, file, fileList) => handleTeamMemberPhotoSuccess(teamMembers[3], response, file, fileList)"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="职位" :rules="[{ required: true, message: '请输入员工职位', trigger: 'blur' }]">
          <el-input v-model="teamMembers[3].role" placeholder="请输入员工职位"></el-input>
        </el-form-item>
        <el-form-item label="备注" :rules="[{ required: true, message: '请输入员工备注', trigger: 'blur' }]">
          <el-input v-model="teamMembers[3].description" placeholder="请输入员工备注"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    
    <!-- 员工5 -->
    <el-tab-pane label="员工5">
      <el-form :model="teamMembers[4]" label-width="100px">
        <el-form-item label="员工姓名" :rules="[{ required: true, message: '请输入员工姓名', trigger: 'blur' }]">
          <el-input v-model="teamMembers[4].name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工照片" :rules="[{ required: true, message: '请上传员工照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            action="/upload"
            :on-success="(response, file, fileList) => handleTeamMemberPhotoSuccess(teamMembers[4], response, file, fileList)"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="职位" :rules="[{ required: true, message: '请输入员工职位', trigger: 'blur' }]">
          <el-input v-model="teamMembers[4].role" placeholder="请输入员工职位"></el-input>
        </el-form-item>
        <el-form-item label="备注" :rules="[{ required: true, message: '请输入员工备注', trigger: 'blur' }]">
          <el-input v-model="teamMembers[4].description" placeholder="请输入员工备注"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

  <div class="dialog-footer" style="text-align: center;">
    <el-button @click="teamInfoDialogVisible = false">取消</el-button>
    <el-button type="primary" @click="submitTeamInfo">确定</el-button>
  </div>
</el-dialog>




      <el-dialog
        :title="dialogtitle"
        :visible.sync="dialogFormVisible"
        width="30%"
        height="10%"
        center
      >
        <el-form>
          <el-form-item label="手机号:">
            <el-input
              v-model="tableData.dataPhone"
              style="width: 63%"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label=" 性 别 ：  ">
            <el-input
              v-model="tableData.sex"
              style="width: 63%"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submittype()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <el-dialog
        title="修改密码"
        :visible.sync="passwordVisiable"
        width="30%"
        height="10%"
        center
      >
        <el-form>
          <el-form-item label="修改密码">
            <el-input
              v-model="password"
              style="width: 80%"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="再次确认">
            <el-input
              v-model="confirmpassword"
              style="width: 80%"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelPassword">取 消</el-button>
          <el-button type="primary" @click="submitpassword()">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
export default {
  // name: "home",
  data() {
    return {
      dataPhone:"",
      dataSex:"",
      dataPassword:"",
      dataRole:"",
      sysuser: {},
      tableData: [
      
        {
          dataPhone: "13800138000",
          dataSex: "男",
          dataPassword: "123456",
          dataRole: "管理员",
        },
      ],
      pagination: {
        currentPage: 1,
        pageSizes: [10, 50, 100, 200, 1000],
        pageSize: 10,
        total: 0,
      },
      petsys: {
        carousel1Src: "",
        carousel1Caption: "",
        carousel2Src: "",
        carousel2Caption: "",
        carousel3Src: "",
        carousel3Caption: "",
      },
      petInfoDialogVisible: false, // 控制对话框显示
      pet1: {
        name: '', // 宠物1姓名
        photoSrc: '', // 宠物1照片的图片链接
        description: '', // 宠物1描述
      },
      pet2: {
        name: '', // 宠物2姓名
        photoSrc: '', // 宠物2照片的图片链接
        description: '', // 宠物2描述
      },
      pet3: {
        name: '', // 宠物3姓名
        photoSrc: '', // 宠物3照片的图片链接
        description: '', // 宠物3描述
      },
      teamInfoDialogVisible: false, // 控制对话框显示
      teamMembers: [
        { name: '', photoSrc: '', role: '', description: '' },
        { name: '', photoSrc: '', role: '', description: '' },
        { name: '', photoSrc: '', role: '', description: '' },
        { name: '', photoSrc: '', role: '', description: '' },
        { name: '', photoSrc: '', role: '', description: '' }],
      petSysDialogFormVisible: false,
      aboutUsDialogVisible: false,
      aboutUs: {
        address: "",
        phone: "",
        businessHours: "",
        latitude: "",
        longitude: "",
        links: "",
      },
      nameValue: "",
      depNameValue: "",
      userAccountValue: "",
      height: "calc(120vh - 368px)",
      userId: "",
      dialogtitle: "",
      dialogFormVisible: false,
      passwordVisiable: false,
      confirmpassword: "",
      password: "",
      readStatus:false,
      userName: "",
      userAccount: "",
      role: "",
      roleValue: "管理员",
      roleStatus: true,
      options: [
        {
          value: "用户",
        },
        {
          value: "管理员",
        },
      ],
    };
  },
  created() {
    if (this.$route.query.id) {
      this.userId = this.$route.query.id;
    }
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userName = userInfo.userName;
    this.userAccount = userInfo.userAccount;
    this.role = userInfo.role;
    if (userInfo.role == "学生") {
      this.roleStatus = false;
      this.roleValue='学生'
      this.height = "calc(135vh - 368px)";
    }
    this.getUserList();
  },
  methods: {
    addAboutUs() {
      this.aboutUsDialogVisible = true;
    },
    submitAboutUs() {
      this.$refs.aboutUsForm.validate((valid) => {
        if (valid) {
          // 提交数据
          console.log("提交数据:", this.aboutUs);

          // 这里可以调用接口提交数据，例如：
          // axios.post("/api/aboutUs", this.aboutUs).then(response => { ... });

          this.$message.success("提交成功！");
          this.aboutUsDialogVisible = false;
        } else {
          this.$message.error("请填写完整的信息！");
        }
      });
    },
    addPetInfo() {
      this.petInfoDialogVisible = true;
    },
    // 上传照片成功的处理函数
    handlePetPhotoSuccess(pet, response, file, fileList) {
      pet.photoSrc = response.url;
    },
    // 上传之前的钩子函数，可以用来验证文件大小等
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        this.$message.error('上传的文件必须是图片！');
      }
      const isLt2M = file.size / 1024 / 1024 < 2; // 限制文件大小2MB
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },
    // 提交表单数据
    submitPetInfo() {
      // 这里可以做提交请求的操作
      console.log('提交数据:', { pet1: this.pet1, pet2: this.pet2, pet3: this.pet3 });
      // 提交后关闭对话框
      this.petInfoDialogVisible = false;
    },
    goHome() {
      this.$router.push('/');
    },
    currentChange(val) {
      const _this = this;
      _this.pagination.currentPage = val;
      _this.getUserList();
    },
    reset() {
      const _this = this;
      _this.nameValue = "";
      _this.depNameValue = "";
      _this.userAccountValue = "";
      _this.pagination.currentPage = 1;
      _this.getUserList();
    },
    handleSearch() {
      this.pagination.currentPage = 1;
      this.getUserList();
    },
    sizeChange(val) {
      const _this = this;
      _this.pagination.pageSize = val;
      _this.getUserList();
    },
    sizeChange(val) {
      const _this = this;
      _this.pagination.pageSize = val;
      _this.getUserList();
    },
    selectionChange(val) {
      const _this = this;
      _this.multipleSelection = val;
    },
    add() {
      this.dialogFormVisible = true;
      this.dialogtitle = "新增信息";
    },
    cancel() {
      this.dialogFormVisible = false;
      this.sysuser = {};
    },
    edit(row) {
      this.dialogFormVisible = true;
      this.dialogtitle = "编辑信息";
      this.rowObj = JSON.parse(JSON.stringify(row))
      this.sysuser=this.rowObj
      this.readStatus=true
    },
    editPassWord(row) {
      this.passwordVisiable = true;
      this.id = row.id;
    },
    addPetSys() {
      this.petSysDialogFormVisible = true;
      this.dialogtitle = "医院介绍模块配置";
    },
    petSyScancel() {
      this.petSysDialogFormVisible = false;
      this.sysuser = {
        carousel1Src: "",
        carousel1Caption: "",
        carousel2Src: "",
        carousel2Caption: "",
        carousel3Src: "",
        carousel3Caption: "",
      };
    },
    // 打开医疗团队模块配置对话框
    addTeamInfo() {
      this.teamInfoDialogVisible = true;
    },
    // 上传照片成功的处理函数
    handleTeamMemberPhotoSuccess(member, response, file, fileList) {
      member.photoSrc = response.url;
    },
    // 上传之前的钩子函数，可以用来验证文件大小等
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        this.$message.error('上传的文件必须是图片！');
      }
      const isLt2M = file.size / 1024 / 1024 < 2; // 限制文件大小2MB
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isImage && isLt2M;
    },
    // 提交表单数据
    submitTeamInfo() {
      // 这里可以做提交请求的操作
      console.log('提交数据:', this.teamMembers);
      // 提交后关闭对话框
      this.teamInfoDialogVisible = false;
    },
    submitPetSys() {
      // 处理提交逻辑
      // 这里可以根据需要添加接口请求或其他处理
      console.log(this.sysuser); // 打印数据，可以进行进一步的提交
      this.petSysDialogFormVisible = false;
      this.sysuser = {
        carousel1Src: "",
        carousel1Caption: "",
        carousel2Src: "",
        carousel2Caption: "",
        carousel3Src: "",
        carousel3Caption: "",
      };
    },
    submitpassword() {
      if (this.password !== this.confirmpassword) {
        return this.$message.error("两次输入的密码不一样");
      }
      if (this.password.length < 6 || this.confirmpassword < 6) {
        return this.$message.error("密码必须6位数以上");
      } else {
        let params = new URLSearchParams();
        params.append("id", this.id);
        params.append("password", this.password);
        this.request.post("/user/updatePassword", params).then((res) => {
          if (res.status === 200) {
            this.$message.success("修改成功");
            this.getUserList();
            this.passwordVisiable = false;
            this.password = "";
            this.confirmpassword = "";
          } else {
            this.$message.error("修改失败");
          }
        });
      }
    },
    getUserList() {
      let params = new URLSearchParams();
      if (this.role == "学生") {
        params.append("userAccount", this.userAccount);
      }
      params.append("queryUserAccount", this.userAccountValue);
      params.append("userName", this.nameValue);
      params.append("role", this.role);
      params.append("queryRole", this.roleValue);
      params.append("pageNo", this.pagination.currentPage);
      params.append("pageSize", this.pagination.pageSize);
      this.request.post("/user/queryAllUser", params).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data.sysUserList;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    cancelPassword() {
      this.passwordVisiable = false;
      this.password = "";
      this.confirmpassword = "";
    },
    submitSysuser() {
      let params = new URLSearchParams();
      if(this.sysuser.userAccount==null){
        return this.$message.error("账户不能为空");
      }
      if(this.sysuser.userName == null){
        return this.$message.error("账户姓名不能为空");
      }
      if(this.sysuser.depName==null){
        return this.$message.error("管理职务不能为空");
      }
      params.append("userAccount", this.sysuser.userAccount);
      params.append("userName", this.sysuser.userName);
      params.append("depName", this.sysuser.depName);
      params.append("telNumber", this.sysuser.telNumber);
      this.request.post("/user/addSysUser", params).then((res) => {
        if (res.status === 200) {
          this.$message.success("添加成功");
          this.dialogFormVisible = false;
          this.sysuser = {};
          this.getUserList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    updateSysuser() {
      let params = new URLSearchParams();
      if(this.sysuser.userAccount==null||this.sysuser.userAccount==''){
        return this.$message.error("账户不能为空");
      }
      if(this.sysuser.userName == null||this.sysuser.userName ==''){
        return this.$message.error("账户姓名不能为空");
      }
      if(this.sysuser.depName==null||this.sysuser.depName==''){
        return this.$message.error("管理职务不能为空");
      }
      params.append("id", this.sysuser.id);
      params.append("userAccount", this.sysuser.userAccount);
      params.append("userName", this.sysuser.userName);
      params.append("depName", this.sysuser.depName);
      params.append("telNumber", this.sysuser.telNumber);
      this.request.post("/user/updateSysUser", params).then((res) => {
        if (res.status === 200) {
          this.$message.success("编辑成功");
          this.dialogFormVisible = false;
          this.sysuser = {};
          this.getUserList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    openDelete(row) {
      this.$confirm("是否要删除该信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id", row.id);
        this.request.post("/user/deleteSysUser", params).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getUserList();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    submittype(){
      if(this.dialogtitle == "新增信息"){
          this.submitSysuser()
      }else{
        this.updateSysuser()
      }
    },
  },
};
</script>

<style>
.el-aside {
  color: #333;
}
.headerClass {
  color: black;
}
.el-table th {
  background-color: #eee !important;
}
.button {
  margin: 10px;
}
.logo img {
  width: 120px;  /* 设置 logo 的宽度 */
  height: auto; /* 保持比例 */
}
.el-header {
  background-color: #d2d7da;
  padding: 10px !important;
  display: flex;
  align-items: center;
  height: 100px !important;
}

.return-button {
  margin-right: 20px;
}

.logo-title {
  display: flex;
  align-items: center;
  margin-left: 20px; /* 控制 logo 和标题的左边距 */
  flex-grow: 1; /* 让 logo 和标题占用剩余空间 */
}

.logo {
  margin-right: 10px; /* 控制 logo 与标题之间的间距 */
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.el-header img {
  width: 120px;  /* 设置 logo 大小 */
  height: auto;
}

.el-main {
  margin-top: 20px;
}
</style>