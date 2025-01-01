<!-- PreviewProgress.vue -->
<template>
  <div class="preview-progress">
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
              <h1>{{ documentData.title || '论文标题' }}</h1>
            </div>

            <!-- 作者信息 -->
            <div class="author-info">
              <div class="info-wrapper">
                <p><span class="label">作者</span>：{{ documentData.authorName || '未填写' }}</p>
                <p><span class="label">学号</span>：{{ documentData.studentId || '未填写' }}</p>
                <p><span class="label">专业</span>：{{ documentData.major || '未填写' }}</p>
                <p><span class="label">指导教师</span>：{{ documentData.supervisor || '未填写' }}</p>
              </div>
            </div>

            <!-- 摘要 -->
            <div class="abstract">
              <h2>摘要</h2>
              <p>{{ documentData.abstract || '摘要内容...' }}</p>
              <p class="keywords">关键词：{{ documentData.keywords.join('；') || '关键词1；关键词2；关键词3' }}</p>

              <h2>Abstract</h2>
              <p>{{ documentData.abstractEn || 'Abstract content...' }}</p>
              <p class="keywords">Keywords: {{ documentData.keywordsEn.join('; ') || 'keyword1; keyword2; keyword3' }}</p>
            </div>

            <!-- 目录 -->
            <div class="table-of-contents">
              <h2>目录</h2>
              <div class="toc-item" v-for="(item, index) in documentData.content" :key="index">
                <span class="toc-number">{{ generateNumber(1, index) }}</span>
                <span class="toc-title">{{ item.title }}</span>
                <span class="toc-dots"></span>
                <span class="toc-page">{{ index + 1 }}</span>
              </div>
            </div>

            <!-- 正文 -->
            <div class="content">
              <template v-for="(item, index) in documentData.content">
                <div :key="item.id" class="content-section">
                  <h2 :style="{
                    fontFamily: typographySettings.textStyle.fontFamily,
                    fontSize: '22px',
                    fontWeight: 'bold',
                    lineHeight: typographySettings.textStyle.lineHeight,
                    textAlign: 'left',
                    marginBottom: '0.5em'
                  }">{{ generateNumber(1, index) }}、{{ item.title }}</h2>
                  <p v-if="item.content" :style="{
                    fontFamily: typographySettings.textStyle.fontFamily,
                    fontSize: typographySettings.textStyle.fontSize + 'px',
                    fontWeight: typographySettings.textStyle.fontWeight,
                    lineHeight: typographySettings.textStyle.lineHeight,
                    textAlign: typographySettings.textStyle.textAlign,
                    textIndent: typographySettings.textStyle.textIndent,
                    marginTop: typographySettings.textStyle.marginTop + 'em',
                    marginBottom: typographySettings.textStyle.marginBottom + 'em',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                  }">{{ item.content }}</p>
                  
                  <!-- 如果有子节点，递归显示子节点内容 -->
                  <template v-if="item.children && item.children.length">
                    <div v-for="(child, childIndex) in item.children" :key="child.id" style="margin-bottom: 0.5em">
                      <h3 :style="{
                        fontFamily: typographySettings.textStyle.fontFamily,
                        fontSize: '16px',
                        fontWeight: 'bold',
                        lineHeight: typographySettings.textStyle.lineHeight,
                        textAlign: 'left',
                        marginBottom: '0.5em',
                        marginLeft: 0,
                        paddingLeft: 0
                      }">{{ generateNumber(2, childIndex) }}、{{ child.title }}</h3>
                      <p v-if="child.content" :style="{
                        fontFamily: typographySettings.textStyle.fontFamily,
                        fontSize: typographySettings.textStyle.fontSize + 'px',
                        fontWeight: typographySettings.textStyle.fontWeight,
                        lineHeight: typographySettings.textStyle.lineHeight,
                        textAlign: typographySettings.textStyle.textAlign,
                        textIndent: typographySettings.textStyle.textIndent,
                        marginTop: typographySettings.textStyle.marginTop + 'em',
                        marginBottom: typographySettings.textStyle.marginBottom + 'em',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word'
                      }">{{ child.content }}</p>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- 操作区域 -->
        <div class="actions-area">
          <div class="format-settings">
            <h3>排版设置</h3>
            <div class="setting-item">
              <span>页边距</span>
              <el-tooltip placement="left" :open-delay="500">
                <template #content>
                  <div class="margin-tooltip">
                    <p><strong>窄：</strong>上下 1.91cm，左右 1.91cm</p>
                    <p><strong>普通：</strong>上下 2.54cm，左右 3.18cm</p>
                    <p><strong>适中：</strong>上下 2.54cm，左右 1.91cm</p>
                    <p><strong>宽：</strong>上下 2.54cm，左右 5.08cm</p>
                  </div>
                </template>
                <el-select v-model="typographySettings.pageSettings.marginPreset" size="small" @change="updateMargins">
                  <el-option label="窄" value="narrow"></el-option>
                  <el-option label="普通" value="normal"></el-option>
                  <el-option label="适中" value="moderate"></el-option>
                  <el-option label="宽" value="wide"></el-option>
                </el-select>
              </el-tooltip>
            </div>
            <div class="setting-item">
              <span>标题编号</span>
              <el-tooltip placement="right" :open-delay="500">
                <template #content>
                  <div class="numbering-tooltip">
                    <p><strong>数字：</strong>1、1.1、1.1.1</p>
                    <p><strong>中文1：</strong>一、（一）、1</p>
                    <p><strong>中文2：</strong>第一章、第一节、1</p>
                    <p><strong>中文3：</strong>第一章、1、1.1</p>
                  </div>
                </template>
                <el-select v-model="typographySettings.titleNumbering.format" size="small">
                  <el-option label="数字" value="decimal"></el-option>
                  <el-option label="中文1" value="chinese"></el-option>
                  <el-option label="中文2" value="chapter"></el-option>
                  <el-option label="中文3" value="mixed"></el-option>
                </el-select>
              </el-tooltip>
            </div>
            <div class="setting-item">
              <span>文字样式</span>
              <div>
                <el-select v-model="typographySettings.currentStyle" size="small" @change="handleStyleChange">
                  <el-option label="正文" value="normal"></el-option>
                  <el-option label="标题1" value="heading1"></el-option>
                  <el-option label="标题2" value="heading2"></el-option>
                  <el-option label="标题3" value="heading3"></el-option>
                </el-select>
                <el-button size="small" @click="openStyleDialog">
                  <i class="el-icon-setting" ></i>
                </el-button>
              </div>
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
    
    <!-- 文字样式设置对话框 -->
    <TextStyleDialog
      :visible.sync="showStyleDialog"
      :initial-style="currentEditingStyle"
      @confirm="handleStyleConfirm"
    />
  </div>
</template>

<script>
import TextStyleDialog from './TextStyleDialog.vue'

export default {
  name: 'PreviewProgress',
  components: {
    TextStyleDialog
  },
  data() {
    return {
      // 文档内容
      documentData: {
        title: '',
        authorName: '',
        studentId: '',
        major: '',
        supervisor: '',
        abstract: '',
        abstractEn: '',
        keywords: [],
        keywordsEn: [],
        content: [] // 存储章节内容
      },
      // 排版设置
      typographySettings: {
        // 标题编号设置
        titleNumbering: {
          enabled: false,
          startFrom: 1,
          format: 'decimal'  // 改为 decimal 作为默认值
        },
        // 页面设置
        pageSettings: {
          orientation: 'portrait',
          paperSize: 'A4',
          marginPreset: 'normal',
          margins: {
            top: 2.54,
            bottom: 2.54,
            left: 3.17,
            right: 3.17
          }
        },
        // 样式设置
        textStyle: {
          fontFamily: 'SimSun',
          fontSize: '12',
          fontWeight: 'normal',
          fontStyle: 'normal',
          lineHeight: '1.5',
          textAlign: 'justify',
          textIndent: '2em',
          marginTop: 0,
          marginBottom: 0
        },
        currentStyle: 'normal'
      },
      showStyleDialog: false,
      currentEditingStyle: null,
      exportFormat: 'docx',
    }
  },
  computed: {
    currentStyleSettings() {
      return this.typographySettings.textStyle
    }
  },
  methods: {
    generateNumber(level, index) {
      const chineseNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      
      switch (this.typographySettings.titleNumbering.format) {
        case 'decimal':
          // 1、1.1、1.1.1
          return level === 1 ? `${index + 1}` :
                 level === 2 ? `${Math.floor(index / 3) + 1}.${index % 3 + 1}` :
                 `${Math.floor(index / 9) + 1}.${Math.floor((index % 9) / 3) + 1}.${index % 3 + 1}`;
        
        case 'chinese':
          // 一、（一）、1
          return level === 1 ? `${chineseNums[index % 10]}` :
                 level === 2 ? `（${chineseNums[index % 10]}）` :
                 `${index + 1}`;
        
        case 'chapter':
          // 第一章、第一节、1
          return level === 1 ? `第${chineseNums[index % 10]}章` :
                 level === 2 ? `第${chineseNums[index % 10]}节` :
                 `${index + 1}`;
        
        case 'mixed':
          // 第一章、1、1.1
          return level === 1 ? `第${chineseNums[index % 10]}章` :
                 level === 2 ? `${index + 1}` :
                 `${Math.floor(index / 3) + 1}.${index % 3 + 1}`;
        
        default:
          return `${index + 1}`;
      }
    },
    handleDownload() {
      // TODO: 实现下载功能
      console.log('Downloading document...')
    },
    updateMargins() {
      const marginPresets = {
        narrow: {
          top: 1.91,
          right: 1.91,
          bottom: 1.91,
          left: 1.91
        },
        normal: {
          top: 2.54,
          right: 3.18,
          bottom: 2.54,
          left: 3.18
        },
        moderate: {
          top: 2.54,
          right: 1.91,
          bottom: 2.54,
          left: 1.91
        },
        wide: {
          top: 2.54,
          right: 5.08,
          bottom: 2.54,
          left: 5.08
        }
      };

      const preset = marginPresets[this.typographySettings.pageSettings.marginPreset];
      if (preset) {
        this.typographySettings.pageSettings.margins = { ...preset };
        const paper = document.querySelector('.paper');
        if (paper) {
          paper.style.padding = `${preset.top}cm ${preset.right}cm ${preset.bottom}cm ${preset.left}cm`;
        }
      }
    },
    openStyleDialog() {
      this.currentEditingStyle = { ...this.currentStyleSettings }
      this.showStyleDialog = true
    },
    handleStyleChange(value) {
      // 当选择不同的样式时触发
      this.typographySettings.currentStyle = value
      // 可以在这里触发保存或其他操作
    },
    handleStyleConfirm(styleSettings) {
      // 更新当前样式
      this.typographySettings.textStyle = {
        ...styleSettings
      }
      // 这里可以触发保存到后端的操作
      this.$emit('typography-change', this.typographySettings)
    },
    async fetchExampleContent() {
      // 模拟示例数据
      const exampleData = {
        title: "基于人工智能的教育应用研究",
        authorName: "张三",
        studentId: "2023001001",
        major: "计算机科学与技术",
        supervisor: "李四 教授",
        abstract: "随着人工智能技术的快速发展，其在教育领域的应用日益广泛。本研究以教育信息化为背景，探讨人工智能技术在教育领域的应用现状、挑战及发展趋势。通过文献研究、问卷调查和实证分析，深入探讨人工智能教育应用的可行性和效果。研究表明，人工智能技术能够有效提升教学效率，个性化学习体验，但同时也面临着技术成熟度、教师适应性等挑战。本研究为人工智能教育应用提供了理论依据和实践指导。",
        abstractEn: "With the rapid development of artificial intelligence technology, its application in education has become increasingly widespread. This study explores the current status, challenges, and development trends of AI applications in education against the background of educational informatization. Through literature research, questionnaire surveys, and empirical analysis, this study deeply discusses the feasibility and effectiveness of AI educational applications. The research shows that AI technology can effectively improve teaching efficiency and personalized learning experience, but also faces challenges such as technology maturity and teacher adaptability. This study provides theoretical basis and practical guidance for AI educational applications.",
        keywords: ["人工智能", "教育应用", "个性化学习", "教育信息化", "教学效率"],
        keywordsEn: ["Artificial Intelligence", "Educational Application", "Personalized Learning", "Educational Informatization", "Teaching Efficiency"],
        content: [
          {
            id: "1",
            title: "绪论",
            content: "随着信息技术的快速发展，人工智能在各个领域的应用日益广泛。本研究旨在探讨人工智能在教育领域的应用前景及其可能带来的影响。通过对现有研究成果的梳理和实证研究，本文将深入分析人工智能教育应用的现状、挑战及未来发展趋势。",
            children: [
              {
                id: "1.1",
                title: "研究背景",
                content: "在全球数字化转型的大背景下，教育领域正经历着前所未有的变革。人工智能技术的引入为教育创新提供了新的可能性，同时也带来了诸多值得探讨的问题。",
                children: []
              },
              {
                id: "1.2",
                title: "研究意义",
                content: "本研究的开展具有重要的理论意义和实践价值。在理论层面，丰富了教育信息化和人工智能教育应用的研究成果；在实践层面，为教育机构和教育工作者提供了有价值的参考和指导。",
                children: []
              }
            ]
          },
          {
            id: "2",
            title: "相关工作",
            content: "本章节主要回顾和总结国内外相关研究成果，分析当前人工智能教育应用的主要方向和特点，为本研究奠定理论基础。",
            children: [
              {
                id: "2.1",
                title: "国内研究现状",
                content: "近年来，我国在人工智能教育应用方面取得了显著进展。多个教育机构和科技企业开展了广泛的实践探索，积累了丰富的应用经验。",
                children: []
              },
              {
                id: "2.2",
                title: "国外研究现状",
                content: "国外发达国家在人工智能教育应用方面起步较早，形成了较为成熟的理论体系和应用模式，为我国的发展提供了有益借鉴。",
                children: []
              }
            ]
          },
          {
            id: "3",
            title: "系统设计",
            content: "本章节详细描述了基于人工智能的教育应用系统的设计方案，包括系统架构、核心功能和关键技术实现。",
            children: [
              {
                id: "3.1",
                title: "总体架构",
                content: "系统采用分层设计，包括数据层、算法层、应用层和展示层。通过模块化设计，确保系统的可扩展性和维护性。",
                children: []
              },
              {
                id: "3.2",
                title: "关键技术",
                content: "系统的核心技术包括自然语言处理、知识图谱、机器学习等。这些技术的综合运用为实现个性化学习和智能教学提供了技术支持。",
                children: []
              }
            ]
          }
        ]
      }

      // 更新文档数据
      this.documentData = exampleData
    },
  },
  mounted() {
    // 组件挂载时获取示例内容
    this.fetchExampleContent()
    this.updateMargins(); // 初始化页边距
  }
}
</script>

<style scoped>
.preview-progress {
  /* 保持现有样式 */
}

/* 重置标题样式 */
.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
  margin: 0;
  padding: 0;
  font-weight: normal;
  line-height: inherit;
  font-size: inherit;
  font-family: inherit;
}

/* 根据Word默认样式设置标题大小 */
.content h1 {
  font-size: 26px;
}

.content h2 {
  font-size: 22px;
}

.content h3 {
  font-size: 16px;
}

.content h4 {
  font-size: 14px;
}

.content p {
  margin: 0;
  padding: 0;
}

/* 内容区域样式 */
.content-section {
  margin-bottom: 1em;
}

.content-section p,
.content-subsection p {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.content-subsection {
  margin-bottom: 0.5em;
}

.content-subsection h3 {
  margin-left: 0;
  padding-left: 0;
}

/* 纸张样式 */
.paper {
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin: 20px auto;
  width: 210mm;  /* A4纸宽度 */
  min-height: 297mm; /* A4纸高度 */
  box-sizing: border-box;
  position: relative;
}

.form-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  /* height: calc(100vh - 300px); */
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
  margin: 40px 0;
}

.info-wrapper {
  display: inline-block;
  text-align: left;
}

.author-info p {
  margin: 8px 0;
  line-height: 2;
}

.author-info .label {
  display: inline-block;
  width: 5em;
  text-align: justify;
  text-align-last: justify;
}

.abstract {
  margin-bottom: 40px;
}

.abstract h2 {
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0 10px;
  text-align: center;
}

.abstract p {
  text-indent: 2em;
  line-height: 1.8;
  margin: 10px 0;
  text-align: justify;
}

.abstract .keywords {
  text-indent: 0;
  margin-top: 16px;
}

.table-of-contents {
  margin-bottom: 40px;
}

.table-of-contents h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
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
  /* flex: 1; */
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
  width: 300px;
  padding: 20px 10px;
  background-color: #f5f7fa;
  border-left: 1px solid #e4e7ed;
  overflow-y: auto;
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
  gap: 8px;
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

.setting-item:last-child :deep(.el-select) {
  width: 90px;
}

.style-header {
  font-size: 13px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid #e4e7ed;
}
.el-button--small {
  padding: 9px 9px;
  margin-left: 8px;
}
</style>
