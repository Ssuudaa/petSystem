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
      <div>
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
          v-model="phoneValue"
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
        :label="item.label"
        :value="item.value"
          ></el-option>
        </el-select>

        <el-button class="ml-5" type="primary" round @click="handleSearch" style="margin-left: 10px;"
          >搜索</el-button
        >
        <el-button round @click="reset">重置</el-button>
        <div class="button">
          <el-button type="primary" @click="addPetSys()"  style="margin-left: -12px;">医院介绍模块配置</el-button>
          <el-button type="success" @click="addPetInfo()" >爱宠百科模块配置</el-button>
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
    label="姓名"
    prop="name"
    width="100"
    align="center"
  />
  <el-table-column
    label="手机号"
    prop="phone"
    width="200"
    align="center"
  />

  <!-- 性别列 -->
  <el-table-column
    label="性别"
    prop="sex"
    width="100"
    align="center"
  />

  <!-- 密码列 -->
  <el-table-column
    label="密码"
    prop="password"
    width="200"
    align="center"
  />
  <el-table-column
  label="角色"
  prop="role"
  width="100"
  align="center">
  <template slot-scope="scope">
    <!-- 根据 role 的值动态显示角色 -->
    {{ scope.row.role === 1 ? '管理员' : '用户' }}
  </template>
</el-table-column>
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
    <el-form-item label="轮播图 1">
    <el-upload
      class="upload-demo"
      :action="uploadPath"
      :on-success="handleSuccess1"
      :file-list="fileList1"
      list-type="picture-card"
      :limit="1"
      :on-remove="handleRemove1"
       accept="image/*"
    >
      <el-button v-if="fileList1.length === 0">{{ uploadText1 }}</el-button>
    </el-upload>
  </el-form-item>

  <!-- 轮播图 2 -->
  <el-form-item label="轮播图 2">
    <el-upload
      class="upload-demo"
      :action="uploadPath"
      :on-success="handleSuccess2"
      :file-list="fileList2"
      list-type="picture-card"
      :limit="1"
      :on-remove="handleRemove2"
       accept="image/*"
    >
      <el-button v-if="fileList2.length === 0">{{ uploadText2 }}</el-button>
    </el-upload>
  </el-form-item>

  <!-- 轮播图 3 -->
  <el-form-item label="轮播图 3">
    <el-upload
      class="upload-demo"
      :action="uploadPath"
      :on-success="handleSuccess3"
      :file-list="fileList3"
      list-type="picture-card"
      :limit="1"
      :on-remove="handleRemove3"
       accept="image/*"
    >
      <el-button v-if="fileList3.length === 0">{{ uploadText3 }}</el-button>
    </el-upload>
  </el-form-item>

  <!-- 介绍内容 -->
  <el-form-item label="介绍内容">
    <el-input v-model="petsys.description" type="textarea" placeholder="请输入介绍内容"></el-input>
  </el-form-item> 

    <div class="dialog-footer" style="text-align: center;">
      <el-button @click="petSyScancel">取消</el-button>
      <el-button type="primary" @click="submitPetSys">确定</el-button>
    </div>
  </el-form>
</el-dialog>
<el-dialog :visible.sync="aboutUsDialogVisible" title="关于我们模块配置">
  <el-form :model="aboutUs" ref="aboutUsForm" label-width="100px">
    
    <!-- 地址 -->
    <el-form-item label="地址" :rules="[{ required: true, message: '请输入地址', trigger: 'blur' }]">
      <el-input v-model="aboutUs.address" placeholder="请输入地址"></el-input>
    </el-form-item>

    <!-- 联系方式（改为 contact，与后端一致） -->
    <el-form-item label="联系方式" :rules="[{ required: true, message: '请输入联系方式', trigger: 'blur' }]">
      <el-input v-model="aboutUs.contact" placeholder="请输入联系方式"></el-input>
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

    <!-- 友情链接（改为 url，与后端一致） -->
    <el-form-item label="友情链接" :rules="[{ required: true, message: '请输入友情链接', trigger: 'blur' }]">
      <el-input v-model="aboutUs.url" placeholder="请输入友情链接"></el-input>
    </el-form-item>

    <div class="dialog-footer" style="text-align: center;">
      <el-button @click="aboutUsDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submitAboutUs">确定</el-button>
    </div>

  </el-form>
</el-dialog>


<el-dialog :visible.sync="petInfoDialogVisible" title="爱宠百科模块配置">
  <el-tabs type="card">
    <!-- 宠物1 -->
    <el-tab-pane label="宠物1">
      <el-form :model="pet1" ref="pet1Form" label-width="100px">
        <el-form-item label="宠物1姓名" :rules="[{ required: true, message: '请输入宠物1姓名', trigger: 'blur' }]">
          <el-input v-model="pet1.name" placeholder="请输入宠物1姓名"></el-input>
        </el-form-item>

        <el-form-item label="宠物1照片" :rules="[{ required: true, message: '请上传宠物1照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            :action="uploadPath"
            :on-success="(response, file, fileList) => handlePetPhotoSuccess(pet1, response, file, fileList)"
            :before-upload="beforeUpload"
            :file-list="pet1.fileList"
            list-type="picture-card"
            :limit="1"
            accept="image/*"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
          <!-- 回显图片 -->
          <el-image
            v-if="pet1.image"
            :src="pet1.image"
            style="width: 100px; height: 100px; margin-top: 10px;"
            fit="cover"
          />
        </el-form-item>

        <el-form-item label="宠物1描述" :rules="[{ required: true, message: '请输入宠物1描述', trigger: 'blur' }]">
          <el-input v-model="pet1.description" placeholder="请输入宠物1描述"></el-input>
        </el-form-item>

        <!-- 提交按钮和取消按钮 -->
        <div class="dialog-footer" style="text-align: center; display: flex; justify-content: center; gap: 20px;">
          <el-button @click="petInfoDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPetInfo('pet1')">提交宠物1</el-button>
        </div>
      </el-form>
    </el-tab-pane>

    <!-- 宠物2 -->
    <el-tab-pane label="宠物2">
      <el-form :model="pet2" ref="pet2Form" label-width="100px">
        <el-form-item label="宠物2姓名" :rules="[{ required: true, message: '请输入宠物2姓名', trigger: 'blur' }]">
          <el-input v-model="pet2.name" placeholder="请输入宠物2姓名"></el-input>
        </el-form-item>

        <el-form-item label="宠物2照片" :rules="[{ required: true, message: '请上传宠物2照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            :action="uploadPath"
            :on-success="(response, file, fileList) => handlePetPhotoSuccess(pet2, response, file, fileList)"
            :before-upload="beforeUpload"
            :file-list="pet2.fileList"
            list-type="picture-card"
            :limit="1"
            accept="image/*"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
          <!-- 回显图片 -->
          <el-image
            v-if="pet2.image"
            :src="pet2.image"
            style="width: 100px; height: 100px; margin-top: 10px;"
            fit="cover"
          />
        </el-form-item>

        <el-form-item label="宠物2描述" :rules="[{ required: true, message: '请输入宠物2描述', trigger: 'blur' }]">
          <el-input v-model="pet2.description" placeholder="请输入宠物2描述"></el-input>
        </el-form-item>

        <!-- 提交按钮和取消按钮 -->
        <div class="dialog-footer" style="text-align: center; display: flex; justify-content: center; gap: 20px;">
          <el-button @click="petInfoDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPetInfo('pet2')">提交宠物2</el-button>
        </div>
      </el-form>
    </el-tab-pane>

    <!-- 宠物3 -->
    <el-tab-pane label="宠物3">
      <el-form :model="pet3" ref="pet3Form" label-width="100px">
        <el-form-item label="宠物3姓名" :rules="[{ required: true, message: '请输入宠物3姓名', trigger: 'blur' }]">
          <el-input v-model="pet3.name" placeholder="请输入宠物3姓名"></el-input>
        </el-form-item>

        <el-form-item label="宠物3照片" :rules="[{ required: true, message: '请上传宠物3照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            :action="uploadPath"
            :on-success="(response, file, fileList) => handlePetPhotoSuccess(pet3, response, file, fileList)"
            :before-upload="beforeUpload"
            :file-list="pet3.fileList"
            list-type="picture-card"
            :limit="1"
            accept="image/*"
          >
            <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
          </el-upload>
          <!-- 回显图片 -->
          <el-image
            v-if="pet3.image"
            :src="pet3.image"
            style="width: 100px; height: 100px; margin-top: 10px;"
            fit="cover"
          />
        </el-form-item>

        <el-form-item label="宠物3描述" :rules="[{ required: true, message: '请输入宠物3描述', trigger: 'blur' }]">
          <el-input v-model="pet3.description" placeholder="请输入宠物3描述"></el-input>
        </el-form-item>

        <!-- 提交按钮和取消按钮 -->
        <div class="dialog-footer" style="text-align: center; display: flex; justify-content: center; gap: 20px;">
          <el-button @click="petInfoDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPetInfo('pet3')">提交宠物3</el-button>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</el-dialog>








<el-dialog :visible.sync="teamInfoDialogVisible" title="医疗团队模块配置">
  <el-tabs type="card">
    <el-tab-pane v-for="(member, index) in teamMembers" :key="index" :label="'员工' + (index + 1)">
      <el-form :model="member" label-width="100px">
        <!-- 员工姓名 -->
        <el-form-item label="员工姓名" :rules="[{ required: true, message: '请输入员工姓名', trigger: 'blur' }]">
          <el-input v-model="member.name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>

        <!-- 员工照片 -->
        <el-form-item label="员工照片" :rules="[{ required: true, message: '请上传员工照片', trigger: 'change' }]">
          <el-upload
            class="upload-demo"
            :action="uploadPath"
            :file-list="member.image ? [{ name: member.name, url: member.image }] : []"
            :on-success="(response, file, fileList) => handleTeamMemberPhotoSuccess(member, response, file, fileList)"
            :before-upload="beforeUpload"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!-- 职位 -->
        <el-form-item label="职位" :rules="[{ required: true, message: '请输入员工职位', trigger: 'blur' }]">
          <el-input v-model="member.role" placeholder="请输入员工职位"></el-input>
        </el-form-item>

        <!-- 备注 -->
        <el-form-item label="备注" :rules="[{ required: true, message: '请输入员工备注', trigger: 'blur' }]">
          <el-input v-model="member.description" placeholder="请输入员工备注"></el-input>
        </el-form-item>
      </el-form>

      <div class="dialog-footer" style="text-align: center; display: flex; justify-content: center; gap: 20px;">
        <el-button @click="closeDialog(index)">取消</el-button>
        <el-button type="primary" @click="submitTeamInfo(index)">提交员工{{ index + 1 }}</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</el-dialog>






<el-dialog
  :title="dialogtitle"
  :visible.sync="dialogFormVisible"
  width="30%"
  height="40%"
  center
>
  <el-form>
    <el-form-item label="姓 名:" style="text-align: center;">
      <el-input
        v-model="tableData.name"
        style="width: 63%; margin-left: 5px;"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="手机号:" style="text-align: center;">
      <el-input
        v-model="tableData.phone"
        style="width: 63%; margin: 0 auto;"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="性 别:" style="text-align: center;">
      <el-select
        v-model="tableData.sex"
        style="width: 63%; margin-left: 5px;"
        placeholder="请选择性别"
      >
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editUserCancel()">取 消</el-button>
    <el-button type="primary" @click="submitEditUser()">确 定</el-button>
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
import api from '@/api.js';

export default {
  // name: "home",
  data() {
    return {
      nameValue:"",
      phoneValue:"",
      roleValue:"",
      uploadPath: 'http://localhost:8080/admin/upload',
      dataPhone:"",
      dataSex:"",
      dataPassword:"",
      dataRole:"",
      sysuser: {},
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSizes: [10, 50, 100, 200],
        pageSize: 10,
        total: 0,
      },
      hospitalId: null,  // 用来区分是新增还是编辑
    petsys: {
      id: "",
      name: "",
      description: "",
      imageOne: "",
      imageTwo: "",
      imageThree: ""
    },
      petInfoDialogVisible: false, // 控制对话框显示
      pet1: {
        name: '', // 宠物1姓名
        image: '', // 宠物1照片的图片链接
        description: '', // 宠物1描述
      },
      pet2: {
        name: '', // 宠物2姓名
        image: '', // 宠物2照片的图片链接
        description: '', // 宠物2描述
      },
      pet3: {
        name: '', // 宠物3姓名
        image: '', // 宠物3照片的图片链接
        description: '', // 宠物3描述
      },
      uploadSuccess1: false, // 控制轮播图1上传按钮状态
      uploadSuccess2: false, // 控制轮播图2上传按钮状态
      uploadSuccess3: false, // 控制轮播图3上传按钮状态
      uploadPetSuccess1: false, // 控制轮播图1上传按钮状态
      uploadPetSuccess2: false, // 控制轮播图2上传按钮状态
      uploadPetSuccess3: false, // 控制轮播图3上传按钮状态
      teamInfoDialogVisible: false, // 控制对话框显示
      teamMembers: [
      { id: null, name: '', role: '', image: '', description: '' },
      { id: null, name: '', role: '', image: '', description: '' },
      { id: null, name: '', role: '', image: '', description: '' },
      { id: null, name: '', role: '', image: '', description: '' },
      { id: null, name: '', role: '', image: '', description: '' }
    ],
      petSysDialogFormVisible: false,
      aboutUsDialogVisible: false,
      aboutUs: {
        address: '',
        contact: '', // 修改字段名，和后端保持一致
        businessHours: '',
        latitude: '',
        longitude: '',
        url: '' // 修改字段名，和后端保持一致
      },
      fileList1: [],
    fileList2: [],
    fileList3: [],
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
      roleStatus: true,
      options: [
        { value: 0, label: "用户" },
        { value: 1, label: "管理员" }
      ]
    };
  },
  created() {
  console.log("created 钩子函数被调用");
  this.fetchUserList();
  this.getHospitalInfo();
 },
 computed: {
  uploadText1() {
    return this.petsys.imageOne ? "已上传" : "点击上传图片";
  },
  uploadText2() {
    return this.petsys.imageTwo ? "已上传" : "点击上传图片";
  },
  uploadText3() {
    return this.petsys.imageThree ? "已上传" : "点击上传图片";
  },
},
  methods: {
    handleSuccess1(response, file, fileList) {
  this.petsys.imageOne = response.msg;  // 保存上传图片路径到imageOne字段
  this.uploadSuccess1 = true;
},

handleSuccess2(response, file, fileList) {
  this.petsys.imageTwo = response.msg;  // 保存上传图片路径到imageTwo字段
  this.uploadSuccess2 = true;
},

handleSuccess3(response, file, fileList) {
  this.petsys.imageThree = response.msg;  // 保存上传图片路径到imageThree字段
  this.uploadSuccess3 = true;
},
handlePicturePreview(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  },
  // 删除图片
  handleRemove1() {
    this.petsys.imageOne = "";
    this.fileList1 = [];
  },
  handleRemove2() {
    this.petsys.imageTwo = "";
    this.fileList2 = [];
  },
  handleRemove3() {
    this.petsys.imageThree = "";
    this.fileList3 = [];
  },
    addAboutUs() {
      this.fetchAboutUs()
      this.aboutUsDialogVisible = true;
    },
    addPetInfo() {
      this.getPetCyc(); 
      this.petInfoDialogVisible = true;
    },
    // 上传照片成功的处理函数
    handlePetPhotoSuccess(pet, response, file, fileList) {
      pet.image = response.msg;
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
      _this.phoneValue = "";
      _this.roleValue ="";
      _this.pagination.currentPage = 1;
      _this.fetchUserList();
    },
    closeDialog(index) {
    // 清除该员工的数据
    this.teamMembers[index] = {
      name: '',
      image: '',
      role: '',
      description: ''
    };
    // 取消对话框
    this.teamInfoDialogVisible = false;
  },
    handleSearch() {
      // 构建查询条件对象
      const searchParams = {
        name: this.nameValue,
        phone: this.phoneValue,
        role: this.roleValue
      };

      // 调用后端API获取数据
      this.fetchData(searchParams);
    },
    // 请求后端接口获取数据
    fetchData(queryParams) {
      const queryString = new URLSearchParams(queryParams).toString();
      api.get(`/admin/getUser?${queryString}`).then((response) => {
        if (response.code === 200) {
          // 假设返回的数据是tableData
          this.tableData = response.rows;  // 更新表格数据
        } else {
          this.$message.error('查询失败');
        }
      });
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
    editUserCancel() {
      this.dialogFormVisible = false;
    },
    edit(row) {
    // 将选中行的数据赋值给 tableData，确保数据回显
      this.tableData = { ...row };  // 使用 spread 操作符避免直接引用
      this.dialogFormVisible = true;  // 打开对话框
      this.dialogFormVisible = true;
      this.dialogtitle = "编辑信息";
    },
    editPassWord(row) {
      this.tableData = { ...row }; 
      this.passwordVisiable = true;
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
      this.fetchStaffData();
      this.teamInfoDialogVisible = true;
    },
    // 上传照片成功的处理函数
    handleTeamMemberPhotoSuccess(member, response, file, fileList) {
      member.image = response.msg;
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
      // 提交后取消对话框
      this.teamInfoDialogVisible = false;
    },
  getHospitalInfo() {
    api.get(`/admin/getHospital/1`)
      .then((response) => {
        if (response.data) {
          this.petsys = response.data;
          this.fileList1 = this.petsys.imageOne
          ? [{ name: "已上传图片", url: this.petsys.imageOne }]
          : [];
        this.fileList2 = this.petsys.imageTwo
          ? [{ name: "已上传图片", url: this.petsys.imageTwo }]
          : [];
        this.fileList3 = this.petsys.imageThree
          ? [{ name: "已上传图片", url: this.petsys.imageThree }]
          : [];  // 获取医院信息并填充到表单
        }
      })
  },
  submitPetSys() {
    if (this.petsys.id) {
      // 如果有 id，表示是编辑操作
      api.put(`/admin/editHospital`, this.petsys)
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("更新成功！");
            this.petSysDialogFormVisible = false;
          } else {
            this.$message.error("更新失败！");
          }
        })
        .catch((error) => {
          this.$message.error("提交失败，请稍后重试");
        });
    } else {
      // 如果没有 id，表示是新增操作
      this.petsys.id = 1
      api.put(`/admin/editHospital`, this.petsys)  // 假设同一个接口用于新增
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("新增成功！");
          } else {
            this.$message.error("新增失败！");
          }
        })
        .catch((error) => {
          this.$message.error("提交失败，请稍后重试");
        });
    }
  },
    fetchUserList() {
      api.get('/admin/getUser', {
        params: {
          page: this.pagination.currentPage,
          size: this.pagination.pageSize
        }
      })
        .then(response => {
          if (response.code === 200) {
            console.log("返回的数据:", response.rows);
            this.tableData = response.rows;
            this.pagination.total = response.total; // 假设后端返回 total
          } else {
            this.$message.error(response.message || '获取数据失败');
          }
        })
        .catch(error => {
          console.error('请求失败:', error);
          this.$message.error('数据加载失败');
        });
    },

    // 改变分页大小
    sizeChange(newSize) {
      this.pagination.pageSize = newSize;
      this.pagination.currentPage = 1; // 重新从第一页开始
      this.fetchUserList();
    },

    // 切换页码
    currentChange(newPage) {
      this.pagination.currentPage = newPage;
      this.fetchUserList();
    },
    submitpassword() {
      if (this.password !== this.confirmpassword) {
        return this.$message.error("两次输入的密码不一样");
      }
      if (this.password.length < 6 || this.confirmpassword < 6) {
        return this.$message.error("密码必须6位数以上");
      } else {
        const params = {
      id: this.tableData.id,
      password: this.password
    };
    api.put('/admin/editUser', params)
      .then(response => {
        if (response.code === 200) {
          this.$message.success('编辑成功');
          this.passwordVisiable = false;
          this.fetchUserList();  // 刷新数据
        } else {
          this.$message.error('编辑失败');
        }
      })
      .catch(error => {
        console.error('请求错误：', error);
        this.$message.error('请求失败');
      });
      }
    },
    cancelPassword() {
      this.passwordVisiable = false;
      this.password = "";
      this.confirmpassword = "";
    },
    openDelete(row) {
    // 弹出确认框，确认是否删除
    this.$confirm('确定删除该用户吗?', '删除用户', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 调用删除接口
      this.deleteUser(row.id);
    }).catch(() => {
      this.$message.info('已取消删除');
    });
  },
  deleteUser(id) {
    // 调用后端接口删除用户
    api.delete(`/admin/deleteUser/${id}`).then((res) => {
      if (res.code === 200) {
        this.$message.success('删除成功');
        this.fetchUserList(); // 重新加载用户列表
      } else {
        this.$message.error('删除失败');
      }
    });
  },
    submitEditUser() {
    // 构造提交的数据
    const updatedUser = {
      id:this.tableData.id,
      name:this.tableData.name,
      phone: this.tableData.phone,
      sex: this.tableData.sex,
      // 根据后端需要，添加其它字段
    };

    // 发送 PUT 请求
    api.put('/admin/editUser', updatedUser)
      .then(response => {
        if (response.code === 200) {
          this.$message.success('编辑成功');
          this.dialogFormVisible = false;
          this.fetchUserList();  // 刷新数据
        } else {
          this.$message.error('编辑失败');
        }
      })
      .catch(error => {
        console.error('请求错误：', error);
        this.$message.error('请求失败');
      });
    },
    submitPetInfo(pet) {
  // 根据传入的 pet（pet1, pet2, pet3）进行验证
  this.$refs[`${pet}Form`].validate((valid) => {
    if (!valid) {
      this.$message.error('请填写所有必填项');
      return;
    }

    // 提交当前宠物数据
    const petData = this[pet];  // 动态获取 pet1, pet2 或 pet3 对象

    // 使用 axios 发送 PUT 请求到后端接口
    console.log(petData);
    api.put('/admin/editPetCyc', petData)
      .then(response => {
        if (response.code === 200) {
          this.$message.success(`${pet} 更新成功`);
          this.petInfoDialogVisible = false; // 取消弹窗
        } else {
          this.$message.error(`${pet} 更新失败`);
        }
      })
      .catch(error => {
        console.error(error);
        this.$message.error('请求失败');
      });
  });
},
getPetCyc() {
    api.get('/admin/getPetCyc')
      .then(response => {
        if (response.code === 200) {
          const pets = response.data; // 假设返回的是一个宠物信息数组
          this.pet1 = pets[0] || {};
          this.pet2 = pets[1] || {};
          this.pet3 = pets[2] || {};
        } else {
          this.$message.error('获取宠物信息失败');
        }
      })
      .catch(error => {
        console.error(error);
        this.$message.error('请求失败');
      });
  },
  submitTeamInfo(index) {
    const staff = this.teamMembers[index];
    if (!staff.name || !staff.role || !staff.description) {
      this.$message.error("请填写完整的员工信息！");
      return;
    }

    // 组织员工数据
    const staffData = {
      id: staff.id,          // 如果是编辑已有员工，传递员工的 ID
      name: staff.name,
      role: staff.role,
      image: staff.image,     // 这里假设员工照片数据已经处理好
      description: staff.description
    };

    // 调用后端接口
    api.put('/admin/editStaff', staffData)
      .then(response => {
        if (response.code === 200) {
          this.$message.success('员工信息更新成功！');
          this.closeDialog(index);  // 关闭对话框
        } else {
          this.$message.error('更新员工信息失败，请重试！');
        }
      })
      .catch(error => {
        this.$message.error('请求失败，请检查网络！');
      });
  },
  fetchStaffData() {
  api.get('/admin/getStaff')
    .then(response => {
      if (response.code === 200) {
        let data = response.data || []; // 确保 data 不为空
        this.teamMembers = Array.from({ length: 5 }, (_, i) => data[i] || { 
          id: null, // 这里可以是 null 或者不写
          name: '', 
          role: '', 
          image: '', 
          description: '' 
        });
      }
    })
    .catch(error => {
      this.$message.error('请求失败，请检查网络！');
    });
},
   fetchAboutUs() {
      api.get('/admin/getAboutUs')
        .then(response => {
          if (response.code === 200) {
            this.aboutUs = response.data[0] || {};
          }
        })
    },

    // 提交修改
    submitAboutUs() {
  this.$refs.aboutUsForm.validate(valid => {
    if (valid) {
      // 构造请求数据
      const requestData = {
        id: this.aboutUs.id,
        address: this.aboutUs.address,
        contact: this.aboutUs.contact,
        businessHours: this.aboutUs.businessHours,
        latitude: this.aboutUs.latitude,
        longitude: this.aboutUs.longitude,
        url: this.aboutUs.url
      };

      // 判断是否有 id，选择调用修改接口或新增接口
      if (this.aboutUs.id) {
        // 调用修改接口
        api.put('/admin/editAboutUs', requestData)
          .then(response => {
            if (response.code === 200) {
              this.$message.success('修改成功！');
              this.aboutUsDialogVisible = false;
            } else {
              this.$message.error(response.message || '修改失败！');
            }
          })
          .catch(error => {
            this.$message.error('提交失败，请检查网络！');
          });
      } else {
        // 调用新增接口
        api.put('/admin/editAboutUs', requestData)
          .then(response => {
            if (response.code === 200) {
              this.$message.success('新增成功！');
              this.aboutUsDialogVisible = false;
            } else {
              this.$message.error(response.message || '新增失败！');
            }
          })
          .catch(error => {
            this.$message.error('提交失败，请检查网络！');
          });
      }
    }
  });
}


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
.container_main_pagination {
  position: fixed;
  bottom: 20px;
  right: 20px;  /* 靠右 */
  display: flex;
  justify-content: flex-end;  /* 内容向右对齐 */
  z-index: 10;
  background: white;
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