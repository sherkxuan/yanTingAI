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
            <el-steps :active="currentStep" align-center finish-status="success" class="custom-steps">
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
            <div v-if="currentStep === 1" class="form-card">
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
                    :autosize="{ minRows: 4, maxRows: 15 }"
                    :maxlength="1000"
                    :show-word-limit="false"
                    resize="none"
                    placeholder="建议输入相关研究思路，方便AI能够更加准确了解你的需求，如关键词，核心思路，观点，研究方法、参考的辅助材料"
                    class="auto-height-textarea"
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

              <div class="form-footer">
                <el-button 
                  type="primary" 
                  plain
                  @click="nextStep"
                  :disabled="!title.trim()"
                >
                  下一步
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </div>
            </div>

            <!-- 第二步：文献选择 -->
            <div v-if="currentStep === 2" class="form-card">
              <div class="card-header">
                <div class="header-icon">
                  <i class="el-icon-collection"></i>
                </div>
                <div class="header-text">
                  <h3>参考文献</h3>
                  <p>Reference Literature</p>
                </div>
              </div>

              <div class="form-content">
                <div class="literature-input">
                  <div class="input-header">
                    <i class="el-icon-document"></i>
                    <span>自定义输入文献时，请使用知网查新（引文格式）格式引文</span>
                    <el-button type="primary" size="small" class="format-btn">
                      解析按验文献格式
                    </el-button>
                  </div>
                  <el-input
                    type="textarea"
                    v-model="customLiterature"
                    :autosize="{ minRows: 8, maxRows: 15 }"
                    placeholder="自定义输入文献（本科参考文献15个以上，硕士20个以上，博士30个以上~）"
                    class="custom-textarea"
                  />
                </div>

                <div class="recommended-literature">
                  <div class="section-title">
                    <i class="el-icon-collection-tag"></i>
                    推荐文献
                  </div>
                  <div class="literature-items">
                    <div v-for="(item, index) in recommendedLiterature" 
                         :key="index" 
                         class="literature-item">
                      <el-checkbox 
                        v-model="item.selected" 
                        @change="handleLiteratureSelect"
                        class="item-checkbox"
                      ></el-checkbox>
                      <div class="item-content">
                        <div class="item-tag">学术期刊</div>
                        <div class="item-title">{{ item.title }}</div>
                        <div class="item-abstract">摘要：{{ item.abstract }}</div>
                        <div class="item-meta">
                          <div class="meta-left">
                            <span class="keywords" v-if="item.keywords">
                              关键词：
                              <el-tag 
                                v-for="(keyword, kidx) in item.keywords" 
                                :key="kidx"
                                size="small"
                                class="keyword-tag"
                              >
                                {{ keyword }}
                              </el-tag>
                            </span>
                          </div>
                          <div class="meta-right">
                            <span class="author">{{ item.author }}</span>
                            <span class="journal">{{ item.journal }}</span>
                            <span class="year">{{ item.year }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 底部操作栏 -->
                  <div class="literature-footer">
                    <div class="footer-left">
                      <el-checkbox 
                        v-model="selectAll"
                        @change="handleSelectAll"
                      >已选择文献{{ selectedCount }}个</el-checkbox>
                      <div class="requirement-tip">
                        <i class="el-icon-info"></i>
                        本科参考文献15个以上，硕士20个以上，博士30个以上~
                      </div>
                    </div>
                    <div class="footer-right">
                      <el-button type="primary" size="small">
                        添加英文
                      </el-button>
                      <el-button type="primary" size="small">
                        搜索
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-footer">
                <el-button 
                  type="primary" 
                  plain
                  @click="prevStep"
                >
                  上一步
                </el-button>
                <el-button 
                  type="primary" 
                  @click="nextStep"
                >
                  下一步
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
      currentStep: 1,
      title: '',
      research: '',
      language: 'chinese',
      education: 'bachelor',
      customLiterature: '',
      recommendedLiterature: [
        {
          type: '学术期刊',
          title: 'AI运用于享乐艺术传播的可能性初探',
          abstract: '从中国古代"口传心授"的音乐传播基本模式分析,到近代声音记录、电子媒介对于音乐的传播影响梳理,享乐艺术传播的媒介发生翻天覆地转变;随着计算机音乐和人工智能技术逐渐在音乐领域的应用,人机互动式"教学辅助平台应运而生。探索AI技术运用于享乐艺术传播的可能性,反映了二十一世纪科技与艺术深度融合的发展趋势。',
          keywords: ['AI', '音乐艺术', '传播'],
          author: '孟文武',
          journal: '黄河之声',
          year: '2021',
          selected: false
        },
        {
          type: '学术期刊',
          title: '中国移动邓超:运营融合和规模落地是运营商AI运用关键',
          abstract: '依托九天人工智能平台,中国移动已经开始面向客服、网络、市场、管理和衍生业务领域落地AI规模化应用。从2017年底推出九天人工智能平台,到今年8月客服系统中机器服务的比例达到20%,再到积极推动开放网络自动化平台(ONAP)工作,毫无疑问,在落地AI方面,中国移动走在了全球运营商的前列。',
          author: '舒文琼',
          journal: '通信世界',
          year: '2018',
          selected: false
        }
      ],
      selectAll: false,
      showTopics: false,
      suggestedTopics: [],
      selectedTopic: null
    }
  },
  computed: {
    selectedCount() {
      return this.recommendedLiterature.filter(item => item.selected).length
    }
  },
  methods: {
    handleTitleInput() {
      // 当用户输入时，隐藏预选项
      this.showTopics = false
    },
    generateTopics() {
      this.showTopics = true
      // 模拟API调用
      setTimeout(() => {
        this.suggestedTopics = [
          {
            title: 'AI在教育领域的应用研究与展望',
            description: '探讨人工智能技术在教育领域的具体应用场景、实施效果及未来发展趋势。',
            selected: false
          },
          {
            title: 'AI辅助教学系统的设计与实现',
            description: '基于人工智能技术，设计并实现一个智能教学辅助系统，提升教学效率和学习效果。',
            selected: false
          },
          {
            title: 'AI个性化学习推荐系统研究',
            description: '研究基于人工智能的个性化学习内容推荐算法，为学习者提供定制化的学习路径。',
            selected: false
          }
        ]
      }, 1000)
    },
    refreshTopics() {
      this.generateTopics()
    },
    selectTopic(topic) {
      this.suggestedTopics.forEach(t => {
        t.selected = false
      })
      topic.selected = true
      this.title = topic.title
      this.selectedTopic = topic
      setTimeout(() => {
        this.showTopics = false
      }, 300) // 添加短暂延迟，让用户看到选中效果
    },
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    handleLiteratureSelect() {  
      this.selectAll = this.recommendedLiterature.every(item => item.selected)
    },
    handleSelectAll(val) {
      this.recommendedLiterature.forEach(item => {
        item.selected = val
      })
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

.progress-card, .form-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  padding: 16px;
  background: linear-gradient(135deg, #74b9ff 0%, #5ca8ff 100%);
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
  padding: 20px 0;
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
  color: #909399;
}

:deep(.el-step__title.is-process) {
  color: #74b9ff;
  font-weight: bold;
}

:deep(.el-step__title.is-success) {
  color: #74b9ff;
}

:deep(.el-step__description) {
  font-size: 12px;
  color: #909399;
}

:deep(.el-step__description.is-process) {
  color: #74b9ff;
}

:deep(.el-step__description.is-success) {
  color: #74b9ff;
}

:deep(.el-step__head.is-process) {
  color: #74b9ff;
  border-color: #74b9ff;
}

:deep(.el-step__icon.is-text) {
  border-color: #74b9ff;
  color: #74b9ff;
}

:deep(.el-step__line) {
  background-color: #e4e7ed;
}

:deep(.el-step__line.is-process) {
  background-color: #74b9ff;
}

:deep(.el-step.is-success .el-step__line) {
  background-color: #74b9ff;
}

:deep(.el-step__head.is-success) {
  color: #74b9ff;
  border-color: #74b9ff;
}

:deep(.el-step__icon-inner) {
  font-weight: bold;
}

:deep(.el-step.is-horizontal .el-step__line) {
  height: 2px;
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
  background: linear-gradient(135deg, #74b9ff 0%, #5ca8ff 100%);
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
  background: #74b9ff;
  border-color: #74b9ff;
  box-shadow: -1px 0 0 0 #74b9ff;
  color: white;
}

:deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-left: 1px solid #dcdfe6;
}

:deep(.el-radio-button:first-child:hover .el-radio-button__inner) {
  border-color: #74b9ff;
}

:deep(.el-radio-button:hover .el-radio-button__inner) {
  color: #74b9ff;
  border-color: #74b9ff;
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
  color: #74b9ff;
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
  background: linear-gradient(135deg, #74b9ff 0%, #5ca8ff 100%);
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
  border-color: #74b9ff;
}

:deep(.el-textarea__inner:focus) {
  border-color: #74b9ff;
  box-shadow: 0 0 0 2px rgba(116, 185, 255, 0.1);
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
  color: #74b9ff;
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
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
  line-height: 1.4;
}

.topic-desc {
  color: #6b7280;
  font-size: 12px;
  line-height: 1.5;
}

.topic-item i {
  color: #74b9ff;
  font-size: 16px;
  margin-top: 2px;
}

/* 自适应文本框样式 */
.auto-height-textarea {
  :deep(.el-textarea__inner) {
    transition: all 0.3s;
    line-height: 1.6;
    padding: 12px;
  }
  
  :deep(.el-input__count) {
    background: transparent;
    right: 10px;
    bottom: 10px;
    font-size: 12px;
    color: #909399;
  }
}

.form-footer {
  margin: 40px 0;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: center;
  gap: 12px;

  :deep(.el-button) {
    min-width: 120px;
    height: 40px;
    font-size: 14px;

    &.el-button--primary {
      background-color: #74b9ff;
      border-color: #74b9ff;

      &.is-plain {
        background: #fff;
        color: #74b9ff;
        border-color: #74b9ff;

        &:hover {
          background: #ecf5ff;
          border-color: #74b9ff;
          color: #74b9ff;
        }
      }

      &:hover {
        background: #85c2ff;
        border-color: #85c2ff;
      }
    }
  }
}

.literature-input {
  margin-bottom: 30px;
}

.input-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #333;
  
  i {
    margin-right: 8px;
    color: #74b9ff;
  }
  
  .format-btn {
    margin-left: auto;
  }
}

.custom-textarea {
  :deep(.el-textarea__inner) {
    border: 1px dashed #dcdfe6;
    background-color: #fafafa;
  }
}

.recommended-literature {
  margin-top: 30px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  i {
    margin-right: 8px;
    color: #74b9ff;
  }
}

.literature-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.literature-item {
  position: relative;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background: #fff;
  transition: all 0.3s;
  display: flex;
  gap: 16px;
  
  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
}

.item-checkbox {
  margin-top: 4px;
}

.item-content {
  flex: 1;
}

.item-tag {
  display: inline-block;
  padding: 2px 8px;
  background-color: #e6f3ff;
  color: #74b9ff;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 8px;
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 12px;
  line-height: 1.4;
}

.item-abstract {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #909399;
  
  .meta-left {
    .keywords {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .keyword-tag {
      background-color: #f0f2f5;
      border: none;
      color: #606266;
    }
  }
  
  .meta-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}

.literature-footer {
  margin-top: 20px;
  padding: 16px 0;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-right {
  display: flex;
  gap: 8px;
}

.requirement-tip {
  color: #909399;
  font-size: 13px;
  display: flex;
  align-items: center;
  
  i {
    margin-right: 4px;
    color: #74b9ff;
  }
}
</style>