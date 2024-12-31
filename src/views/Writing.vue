<template>
  <div class="writing-page">
    <Navbar />
    <div class="main-wrapper">
      <div class="writing-container">
        <!-- 左侧菜单 -->
        <div class="sidebar">
          <div class="menu-header">
            <h3>选择文档类型</h3>
            <span class="menu-subtitle">Select document type</span>
          </div>
          <el-menu
            :default-active="activeMenu"
            class="writing-menu">
            <el-menu-item index="1" class="gradient-hover">
              <div class="menu-item-content">
                <i class="el-icon-document"></i>
                <span>毕业论文</span>
                <el-tag size="mini" type="danger" effect="dark" class="fire-tag">火爆</el-tag>
              </div>
            </el-menu-item>
            <el-menu-item index="2" class="gradient-hover">
              <div class="menu-item-content">
                <i class="el-icon-notebook-1"></i>
                <span>任务书</span>
                <el-tag size="mini" type="danger" effect="dark" class="fire-tag">火爆</el-tag>
              </div>
            </el-menu-item>
            <el-menu-item index="3" class="gradient-hover">
              <div class="menu-item-content">
                <i class="el-icon-notebook-2"></i>
                <span>开题报告</span>
                <el-tag size="mini" type="danger" effect="dark" class="fire-tag">火爆</el-tag>
              </div>
            </el-menu-item>
            <el-menu-item index="4" class="gradient-hover">
              <div class="menu-item-content">
                <i class="el-icon-document-copy"></i>
                <span>实践报告</span>
              </div>
            </el-menu-item>
            <el-menu-item index="5" class="gradient-hover">
              <div class="menu-item-content">
                <i class="el-icon-document-checked"></i>
                <span>文献综述</span>
                <el-tag size="mini" type="danger" effect="dark" class="fire-tag">火爆</el-tag>
              </div>
            </el-menu-item>
            <el-menu-item index="6" class="gradient-hover">
              <div class="menu-item-content">
                <i class="el-icon-collection"></i>
                <span>课程论文</span>
              </div>
            </el-menu-item>
          </el-menu>
        </div>

        <!-- 主要内容区 -->
        <div class="main-content">
          <!-- 进度条 -->
          <div class="progress-card">
            <div class="card-header">
              <div class="header-icon">
                <i class="el-icon-time"></i>
              </div>
              <div class="header-text">
                <h3>创建进度</h3>
                <p>Progress Tracking</p>
              </div>
            </div>
            <el-steps :active="currentStep" align-center class="custom-steps">
              <el-step 
                title="标题" 
                description="输入论文标题" 
                icon="el-icon-edit"
                class="step-item"
              ></el-step>
              <el-step 
                title="文献" 
                description="选择参考文献" 
                icon="el-icon-collection"
                class="step-item"
              ></el-step>
              <el-step 
                title="大纲" 
                description="生成文章大纲" 
                icon="el-icon-tickets"
                class="step-item"
              ></el-step>
              <el-step 
                title="完成" 
                description="预览与下载" 
                icon="el-icon-document-checked"
                class="step-item"
              ></el-step>
            </el-steps>
          </div>

          <!-- 表单区域 -->
          <div class="form-container">
            <!-- 第一步：论文信息 -->
            <TitleProgress 
              v-if="currentStep === 1"
              :title.sync="title"
              @next="nextStep"
            />

            <!-- 第二步：文献选择 -->
            <LiteratureProgress
              v-if="currentStep === 2"
              @prev="prevStep"
              @next="nextStep"
            />
            <OutlineEditor
              v-if="currentStep === 3"
              @prev="prevStep"
              @next="nextStep"
              class="outline-editor"
            />
            <PreviewProgress
              v-if="currentStep === 4"
              @prev="prevStep"
              @next="nextStep"
              class="preview-progress"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import TitleProgress from '@/components/TitleProgress.vue'
import LiteratureProgress from '@/components/LiteratureProgress.vue'
import OutlineEditor from '@/components/OutlineEditor.vue'
import PreviewProgress from '@/components/PreviewProgress.vue'

export default {
  name: 'Writing',
  components: {
    Navbar,
    TitleProgress,
    LiteratureProgress,
    OutlineEditor,
    PreviewProgress
  },
  data() {
    return {
      activeMenu: '1',
      currentStep: 1,
      title: '',
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    }
  }
}
</script>

<style scoped>
.writing-page {
  min-height: 100vh;
  background: #f5f7fa;
  padding-top: 60px;
}

.outline-editor {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: calc(100vh - 300px);
  margin-top: 16px;
}

.preview-progress {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: calc(100vh - 300px);
  margin-top: 16px;
}

.main-wrapper {
  padding: 16px 0 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.writing-container {
  display: flex;
  padding: 0 16px;
  gap: 16px;
}

/* Sidebar Styles */
.sidebar {
  width: 260px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.menu-header {
  padding: 16px;
  background: linear-gradient(135deg, #74b9ff 0%, #5ca8ff 100%);
  color: white;
}

.menu-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.menu-subtitle {
  font-size: 12px;
  opacity: 0.8;
}

.writing-menu {
  border: none;
}

.menu-item-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
}

.menu-item-content i {
  font-size: 16px;
  color: #74b9ff;
}

.gradient-hover {
  position: relative;
  transition: all 0.3s ease;
  height: 40px !important;
  line-height: 40px !important;
}

.gradient-hover:hover {
  background: linear-gradient(to right, rgba(116, 185, 255, 0.1), transparent);
}

.fire-tag {
  margin-left: auto;
  transform: scale(0.85);
}

/* Main Content Styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.progress-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.header-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #74b9ff 0%, #5ca8ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.header-icon i {
  color: white;
  font-size: 20px;
}

.header-text h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.header-text p {
  margin: 4px 0 0;
  font-size: 14px;
  color: #909399;
}

/* 自定义步骤条样式 */
.custom-steps {
  padding: 0 20px;
}

:deep(.el-step__head.is-success .el-step__icon) {
  background-color: #67C23A;
  border-color: #67C23A;
}

:deep(.el-step__head.is-success .el-step__icon i) {
  color: white;
}

:deep(.el-step__head.is-success .el-step__line) {
  background-color: #67C23A;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .writing-page {
    padding-top: 60px;
  }

  .main-wrapper {
    padding: 12px;
  }

  .writing-container {
    flex-direction: column;
    padding: 0;
  }

  .sidebar {
    width: 100%;
  }

  .custom-steps {
    padding: 16px 12px;
  }
}
</style>