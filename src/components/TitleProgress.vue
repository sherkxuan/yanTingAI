<!-- TitleProgress.vue -->
<template>
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
</template>

<script>
export default {
  name: 'TitleProgress',
  data() {
    return {
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
      this.showTopics = false
      this.$emit('update:title', this.title)
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
          }
        ]
      }, 1000)
    },
    refreshTopics() {
      this.generateTopics()
    },
    selectTopic(topic) {
      this.suggestedTopics.forEach(t => t.selected = false)
      topic.selected = true
      this.selectedTopic = topic
      this.title = topic.title
      this.showTopics = false
      this.$emit('update:title', this.title)
    },
    nextStep() {
      this.$emit('next')
    }
  }
}
</script>

<style scoped>
.form-card {
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
  display: flex;
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
  font-size: 12px;
  margin: 2px 0 0;
  opacity: 0.8;
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
  color: white !important;
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
  background-color: #ecf5ff;
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

/* 确保选中状态下悬浮时图标和文字保持白色 */
:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner:hover) {
  color: white !important;
  background: #85c2ff;
}

:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner:hover i) {
  color: white !important;
}

:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner i) {
  color: white !important;
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
}

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

/* Responsive Design */
@media screen and (max-width: 768px) {
  .input-with-button {
    flex-direction: column;
  }

  .smart-button {
    width: 100%;
    margin-top: 12px;
  }

  .options-card {
    padding: 12px;
  }

  .radio-button-group {
    gap: 8px;
  }
}
</style>
