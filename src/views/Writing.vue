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
            <el-steps :active="1" align-center finish-status="success" class="custom-steps">
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
            <div class="form-card">
              <div class="card-header">
                <div class="header-icon">
                  <i class="el-icon-edit-outline"></i>
                </div>
                <div class="header-text">
                  <h3>论文信息</h3>
                  <p>Paper Information</p>
                </div>
              </div>

              <div class="form-content">
                <div class="form-item">
                  <div class="label-required">
                    <span class="required-star">*</span>
                    论文标题/选题关键词:
                  </div>
                  <div class="input-with-button">
                    <el-input 
                      v-model="title"
                      placeholder="输入完整的论文标题或选题关键词(3-200字内)"
                      :maxlength="200"
                      @input="handleTitleInput"
                    />
                    <el-button type="primary" class="smart-button" @click="generateTopics">
                      <i class="el-icon-magic-stick"></i>
                      智能选题
                      <span class="smart-tip">选题及思路用智能选题</span>
                    </el-button>
                  </div>
                  <!-- 预选项列表 -->
                  <div v-if="showTopics" class="topic-suggestions">
                    <div class="topic-header">
                      <span>推荐选题</span>
                      <el-button type="text" class="refresh-btn" @click="refreshTopics">
                        <i class="el-icon-refresh"></i>
                        换一批
                      </el-button>
                    </div>
                    <div class="topic-list">
                      <div 
                        v-for="(topic, index) in suggestedTopics" 
                        :key="index"
                        class="topic-item"
                        @click="selectTopic(topic)"
                      >
                        <div class="topic-content">
                          <div class="topic-title">{{ topic.title }}</div>
                          <div class="topic-desc">{{ topic.description }}</div>
                        </div>
                        <i class="el-icon-check" v-if="topic.selected"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-item">
                  <div class="label">研究思路/研究内容/资料:</div>
                  <el-input 
                    type="textarea"
                    v-model="research"
                    :autosize="{ minRows: 4, maxRows: 8 }"
                    :maxlength="1000"
                    :show-word-limit="false"
                    
                    resize="none"
                    placeholder="建议输入相关研究思路，方便AI能够更加准确了解你的需求，如关键词，核心思路，观点，研究方法、参考的辅助材料"
                  />
                </div>

                <div class="options-card">
                  <div class="option-group">
                    <div class="label">语言选择:</div>
                    <el-radio-group v-model="language" class="radio-button-group">
                      <el-radio-button label="chinese">
                        <i class="el-icon-document"></i>
                        中文
                      </el-radio-button>
                    </el-radio-group>
                  </div>

                  <div class="option-group">
                    <div class="label">学历要求:</div>
                    <el-radio-group v-model="education" class="radio-button-group">
                      <el-radio-button label="specialist">
                        <i class="el-icon-notebook-1"></i>
                        专科 (6000字)
                      </el-radio-button>
                      <el-radio-button label="bachelor">
                        <i class="el-icon-notebook-2"></i>
                        本科 (1.5万字)
                      </el-radio-button>
                      <el-radio-button label="master">
                        <i class="el-icon-collection"></i>
                        硕士 (3万字)
                      </el-radio-button>
                      <el-radio-button label="doctor">
                        <i class="el-icon-collection-tag"></i>
                        博士 (5万字)
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <el-button type="primary" size="large" class="next-button">
                  <span>下一步</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Writing',
  components: {
    Navbar
  },
  data() {
    return {
      activeMenu: '1',
      title: '',
      research: '',
      language: 'chinese',
      education: 'bachelor',
      showTopics: false,
      suggestedTopics: [],
      selectedTopic: null
    }
  },
  methods: {
    handleTitleInput() {
      // 当用户输入时，隐藏预选项
      this.showTopics = false
    },
    generateTopics() {
      // 模拟API调用，生成预选项
      this.suggestedTopics = [
        {
          title: '基于深度学习的图像识别技术研究与应用',
          description: '研究深度学习在图像识别领域的应用，包括卷积神经网络模型的优化和实际场景应用',
          selected: false
        },
        {
          title: '智能物联网在智慧城市中的应用研究',
          description: '探讨物联网技术在城市管理、交通控制等方面的应用及其效果分析',
          selected: false
        },
        {
          title: '区块链技术在供应链金融中的应用研究',
          description: '研究区块链如何提升供应链金融的效率和安全性，并分析实际案例',
          selected: false
        }
      ]
      this.showTopics = true
    },
    refreshTopics() {
      // 模拟刷新预选项
      this.generateTopics()
    },
    selectTopic(topic) {
      // 选择预选项
      this.suggestedTopics.forEach(t => t.selected = false)
      topic.selected = true
      this.title = topic.title
      this.research = topic.description
      // 选择后隐藏预选项区域
      setTimeout(() => {
        this.showTopics = false
      }, 300) // 添加短暂延迟，让用户看到选中效果
    }
  },
  created() {
    // 从路由参数获取文档类型
    const docType = this.$route.query.type
    if (docType) {
      // 根据文档类型设置激活的菜单项
      switch(docType) {
        case 'thesis':
          this.activeMenu = '1'
          break
        case 'task':
          this.activeMenu = '2'
          break
        case 'proposal':
          this.activeMenu = '3'
          break
        case 'practice':
          this.activeMenu = '4'
          break
        case 'literature':
          this.activeMenu = '5'
          break
        case 'course':
          this.activeMenu = '6'
          break
        default:
          this.activeMenu = '1'
      }
    }
  },
  watch: {
    // 监听路由变化
    '$route'(to) {
      const docType = to.query.type
      if (docType) {
        switch(docType) {
          case 'thesis':
            this.activeMenu = '1'
            break
          case 'task':
            this.activeMenu = '2'
            break
          case 'proposal':
            this.activeMenu = '3'
            break
          case 'practice':
            this.activeMenu = '4'
            break
          case 'literature':
            this.activeMenu = '5'
            break
          case 'course':
            this.activeMenu = '6'
            break
          default:
            this.activeMenu = '1'
        }
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
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
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
  color: #1890ff;
}

.gradient-hover {
  position: relative;
  transition: all 0.3s ease;
  height: 40px !important;
  line-height: 40px !important;
}

.gradient-hover:hover {
  background: linear-gradient(to right, rgba(24, 144, 255, 0.1), transparent);
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

.progress-card, .form-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  padding: 16px;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon i {
  font-size: 18px;
}

.header-text h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.header-text p {
  margin: 2px 0 0;
  font-size: 12px;
  opacity: 0.8;
}

/* Steps Styles */
.custom-steps {
  padding: 24px 16px;
}

.step-item {
  transition: all 0.3s ease;
}

/* 自定义 el-step 样式 */
:deep(.el-step__icon) {
  width: 32px;
  height: 32px;
  border: 2px solid #e4e7eb;
  border-radius: 0;
}

:deep(.el-step__line) {
  background-color: #e4e7eb;
}

:deep(.el-step__title) {
  font-size: 14px;
  color: #606266;
}

:deep(.el-step__description) {
  font-size: 12px;
  color: #909399;
}

:deep(.el-step__head.is-process) {
  color: #1890ff;
  border-color: #1890ff;
}

:deep(.el-step__head.is-process .el-step__icon) {
  background-color: #fff;
  border-color: #1890ff;
}

:deep(.el-step__head.is-process .el-step__icon-inner) {
  color: #1890ff;
}

:deep(.el-step__head.is-finish) {
  color: #1890ff;
  border-color: #1890ff;
}

:deep(.el-step__head.is-finish .el-step__icon) {
  background-color: #fff;
  border-color: #1890ff;
}

:deep(.el-step__head.is-finish .el-step__icon-inner) {
  color: #1890ff;
}

:deep(.el-step__head.is-finish .el-step__line) {
  background-color: #1890ff;
}

:deep(.el-step__title.is-process) {
  color: #1890ff;
  font-weight: 500;
}

:deep(.el-step__title.is-finish) {
  color: #1890ff;
  font-weight: 500;
}

/* Form Styles */
.form-content {
  padding: 24px;
}

.form-item {
  margin-bottom: 20px;
}

.label-required, .label {
  margin-bottom: 6px;
  font-weight: 500;
  color: #1f2937;
  font-size: 14px;
}

.required-star {
  color: #ff4d4f;
  margin-right: 4px;
}

.input-with-button {
  display: flex;
  gap: 12px;
}

.smart-button {
  position: relative;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border: none;
  padding: 0 16px;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.smart-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.smart-button i {
  font-size: 16px;
}

.smart-tip {
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: #666;
  white-space: nowrap;
}

.options-card {
  background: #f8fafc;
  border-radius: 6px;
  padding: 16px;
  margin-top: 20px;
}

.option-group {
  margin-bottom: 20px;
}

.option-group:last-child {
  margin-bottom: 0;
}

/* 自定义单选按钮样式 */
.radio-button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

:deep(.el-radio-button__inner) {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  background: white;
  color: #606266;
  font-size: 14px;
  height: 36px;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
}

:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
  background: #1890ff;
  border-color: #1890ff;
  box-shadow: -1px 0 0 0 #1890ff;
  color: white;
}

:deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-left: 1px solid #dcdfe6;
}

:deep(.el-radio-button:first-child:hover .el-radio-button__inner) {
  border-color: #1890ff;
}

:deep(.el-radio-button:hover .el-radio-button__inner) {
  color: #1890ff;
  border-color: #1890ff;
}

/* 确保选中状态下悬浮时文字保持白色 */
:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner:hover) {
  color: white;
}

:deep(.el-radio-button__orig-radio:disabled + .el-radio-button__inner) {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
  box-shadow: none;
}

/* 图标样式 */
:deep(.el-radio-button__inner i) {
  color: inherit;
  transition: all 0.3s;
}

:deep(.el-radio-button:hover .el-radio-button__inner i) {
  color: #1890ff;
}

/* 确保选中状态下悬浮时图标保持白色 */
:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner:hover i) {
  color: white;
}

:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner i) {
  color: white;
}

.form-actions {
  padding: 16px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%);
  display: flex;
  justify-content: flex-end;
}

.next-button {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border: none;
  padding: 0 24px;
  height: 36px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.next-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* 自定义文本框样式 */
:deep(.el-textarea__inner) {
  resize: none;
  font-size: 14px;
  line-height: 1.6;
  padding: 12px;
  border-radius: 4px;
  border-color: #dcdfe6;
  transition: all 0.3s;
}

:deep(.el-textarea__inner:hover) {
  border-color: #1890ff;
}

:deep(.el-textarea__inner:focus) {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

:deep(.el-input__count) {
  background: transparent;
  font-size: 12px;
  color: #909399;
  padding: 0 2px;
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

  .input-with-button {
    flex-direction: column;
  }

  .smart-button {
    width: 100%;
    margin-top: 12px;
  }

  .custom-steps {
    padding: 16px 12px;
  }

  .form-content {
    padding: 16px 12px;
  }

  .options-card {
    padding: 12px;
  }

  .form-actions {
    padding: 12px;
  }

  .next-button {
    width: 100%;
  }
}

/* 预选项样式 */
.topic-suggestions {
  margin-top: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.topic-header {
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1f2937;
  font-size: 14px;
  font-weight: 500;
}

.refresh-btn {
  color: #1890ff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.refresh-btn i {
  font-size: 16px;
}

.topic-list {
  padding: 8px;
}

.topic-item {
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: all 0.3s;
}

.topic-item:hover {
  background: #f8fafc;
}

.topic-content {
  flex: 1;
}

.topic-title {
  color: #1f2937;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  line-height: 1.4;
}

.topic-desc {
  color: #6b7280;
  font-size: 12px;
  line-height: 1.5;
}

.topic-item i {
  color: #1890ff;
  font-size: 16px;
  margin-top: 2px;
}
</style>