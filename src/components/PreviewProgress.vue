<!-- PreviewProgress.vue -->
<template>
  <div class="form-card">
    <div class="card-header">
      <div class="header-icon">
        <i class="el-icon-document"></i>
      </div>
      <div class="header-text">
        <h3>预览与下载</h3>
        <p>Preview & Download</p>
      </div>
    </div>

    <div class="preview-content">
      <!-- 预览区域 -->
      <div class="preview-area">
        <!-- A4 纸张预览 -->
        <div class="paper">
          <!-- 标题 -->
          <div class="paper-title">
            <h1>{{ title || '论文标题' }}</h1>
          </div>

          <!-- 作者信息 -->
          <div class="author-info">
            <p>作者：{{ authorName || '未填写' }}</p>
            <p>学号：{{ studentId || '未填写' }}</p>
            <p>专业：{{ major || '未填写' }}</p>
            <p>指导教师：{{ supervisor || '未填写' }}</p>
          </div>

          <!-- 摘要 -->
          <div class="abstract">
            <h2>摘要</h2>
            <p>{{ abstract || '摘要内容...' }}</p>
            <p class="keywords">关键词：{{ keywords.join('；') || '关键词1；关键词2；关键词3' }}</p>
          </div>

          <!-- 目录 -->
          <div class="table-of-contents">
            <h2>目录</h2>
            <div class="toc-item" v-for="(item, index) in outline" :key="index">
              <span class="toc-number">{{ generateNumber(item.level, index) }}</span>
              <span class="toc-title">{{ item.label }}</span>
              <span class="toc-dots"></span>
              <span class="toc-page">{{ index + 1 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作区域 -->
      <div class="actions-area">
        <div class="format-settings">
          <h3>排版设置</h3>
          <div class="setting-item">
            <span>页边距</span>
            <el-tooltip placement="left" open-delay="500">
              <template #content>
                <div class="margin-tooltip">
                  <p><strong>窄：</strong>上下 1.91cm，左右 1.91cm</p>
                  <p><strong>普通：</strong>上下 2.54cm，左右 3.18cm</p>
                  <p><strong>适中：</strong>上下 2.54cm，左右 1.91cm</p>
                  <p><strong>宽：</strong>上下 2.54cm，左右 5.08cm</p>
                </div>
              </template>
              <el-select v-model="margin" size="small" @change="updateMargins">
                <el-option label="窄" value="narrow"></el-option>
                <el-option label="普通" value="normal"></el-option>
                <el-option label="适中" value="moderate"></el-option>
                <el-option label="宽" value="wide"></el-option>
              </el-select>
            </el-tooltip>
          </div>
          <div class="setting-item">
            <span>标题编号</span>
            <el-tooltip placement="right" open-delay="500">
              <template #content>
                <div class="numbering-tooltip">
                  <p><strong>数字：</strong>1、1.1、1.1.1</p>
                  <p><strong>中文1：</strong>一、（一）、1</p>
                  <p><strong>中文2：</strong>第一章、第一节、1</p>
                  <p><strong>中文3：</strong>第一章、1、1.1</p>
                </div>
              </template>
              <el-select v-model="titleNumbering" size="small">
                <el-option label="数字" value="decimal"></el-option>
                <el-option label="中文1" value="chinese"></el-option>
                <el-option label="中文2" value="chapter"></el-option>
                <el-option label="中文3" value="mixed"></el-option>
              </el-select>
            </el-tooltip>
          </div>
        </div>

        <div class="download-options">
          <h3>导出选项</h3>
          <el-radio-group v-model="exportFormat" size="small">
            <el-radio-button label="docx">Word</el-radio-button>
            <el-radio-button label="pdf">PDF</el-radio-button>
          </el-radio-group>
          <el-button type="primary" @click="handleDownload" class="download-btn">
            下载文档
          </el-button>
        </div>
      </div>
    </div>

    <div class="form-footer">
      <el-button 
        type="primary" 
        plain
        @click="$emit('prev')"
      >
        上一步
      </el-button>
      <el-button 
        type="primary" 
        @click="$emit('next')"
      >
        完成
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewProgress',
  data() {
    return {
      // 文档信息
      title: '',
      authorName: '',
      studentId: '',
      major: '',
      supervisor: '',
      abstract: '',
      keywords: [],
      outline: [],

      // 排版设置
      margin: 'normal', // 默认使用普通边距
      titleNumbering: 'decimal', // 新增标题编号样式选项
      exportFormat: 'docx'
    }
  },
  methods: {
    handleDownload() {
      // TODO: 实现下载功能
      console.log('Downloading document...')
    },
    updateMargins() {
      const margins = this.marginSettings[this.margin];
      const paper = document.querySelector('.paper');
      if (paper) {
        paper.style.padding = `${margins.top} ${margins.right} ${margins.bottom} ${margins.left}`;
      }
    },
    // 生成标题编号
    generateNumber(level, index) {
      const chineseNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      
      switch (this.titleNumbering) {
        case 'decimal':
          // 1、1.1、1.1.1
          return level === 1 ? `${index + 1}、` :
                 level === 2 ? `${Math.floor((index + 1) / 10) + 1}.${(index + 1) % 10}、` :
                 `${Math.floor((index + 1) / 100) + 1}.${Math.floor(((index + 1) % 100) / 10) + 1}.${(index + 1) % 10}、`;
        
        case 'chinese':
          // 一、（一）、1
          return level === 1 ? `${chineseNums[index % 10]}、` :
                 level === 2 ? `（${chineseNums[index % 10]}）、` :
                 `${index + 1}、`;
        
        case 'chapter':
          // 第一章、第一节、1
          return level === 1 ? `第${chineseNums[index % 10]}章、` :
                 level === 2 ? `第${chineseNums[index % 10]}节、` :
                 `${index + 1}、`;
        
        case 'mixed':
          // 第一章、1、1.1
          return level === 1 ? `第${chineseNums[index % 10]}章、` :
                 level === 2 ? `${index + 1}、` :
                 `${Math.floor((index + 1) / 10) + 1}.${(index + 1) % 10}、`;
        
        default:
          return `${index + 1}、`; // 默认使用数字编号
      }
    },
  },
  mounted() {
    this.updateMargins(); // 初始化页边距
  }
}
</script>

<style scoped>
.form-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: 16px;
  background: linear-gradient(135deg, #74b9ff 0%, #5ca8ff 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px 8px 0 0;
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
  font-size: 12px;
  margin: 2px 0 0;
  opacity: 0.8;
}

.preview-content {
  flex: 1;
  display: flex;
  padding: 20px;
  gap: 20px;
  overflow: hidden;
}

.preview-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.paper {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: padding 0.3s ease;
}

.paper-title {
  text-align: center;
  margin-bottom: 40px;
}

.paper-title h1 {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}

.author-info {
  text-align: center;
  margin-bottom: 40px;
}

.author-info p {
  margin: 8px 0;
  line-height: 1.5;
}

.abstract {
  margin-bottom: 40px;
}

.abstract h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}

.abstract p {
  text-indent: 2em;
  line-height: 1.8;
  margin: 12px 0;
}

.keywords {
  margin-top: 16px;
}

.table-of-contents {
  margin-bottom: 40px;
}

.table-of-contents h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}

.toc-item {
  display: flex;
  align-items: center;
  margin: 8px 0;
  line-height: 1.5;
}

.toc-number {
  margin-right: 8px;
  color: #333;
}

.toc-title {
  flex: 1;
}

.toc-dots {
  flex: 1;
  border-bottom: 1px dotted #999;
  margin: 0 8px;
}

.toc-page {
  color: #666;
}

.actions-area {
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.format-settings, .download-options {
  background: white;
  border-radius: 4px;
  padding: 16px;
  border: 1px solid #e4e7ed;
}

.format-settings h3, .download-options h3 {
  margin: 0 0 16px;
  font-size: 14px;
  color: #333;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.setting-item span {
  color: #666;
  font-size: 14px;
}

.setting-item :deep(.el-select) {
  width: 120px;
}

.download-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.download-btn {
  margin-top: 8px;
}

.form-footer {
  padding: 24px;
  text-align: center;
  border-top: 1px solid #e4e7ed;
}

.form-footer .el-button {
  min-width: 120px;
  margin: 0 10px;
}

.margin-tooltip {
  font-size: 12px;
  line-height: 1.8;
}

.margin-tooltip p {
  margin: 4px 0;
  white-space: nowrap;
}

.margin-tooltip strong {
  color: #409EFF;
}

.numbering-tooltip {
  font-size: 12px;
  line-height: 1.8;
}

.numbering-tooltip p {
  margin: 4px 0;
  white-space: nowrap;
}

.numbering-tooltip strong {
  color: #409EFF;
}

.style-group {
  margin-bottom: 20px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 4px;
}

.style-header {
  font-size: 13px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid #e4e7ed;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.setting-item:last-child {
  margin-bottom: 0;
}

.setting-item span {
  color: #666;
  font-size: 13px;
}

.setting-item :deep(.el-select) {
  width: 130px;
}

.form-card {
  margin-bottom: 20px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 4px;
}

.setting-item span {
  color: #666;
  font-size: 13px;
}

.setting-item :deep(.el-select) {
  width: 130px;
}

.style-header {
  font-size: 13px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid #e4e7ed;
}
</style>
