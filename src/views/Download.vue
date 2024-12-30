<template>
  <div class="download-page">
    <Navbar />
    <div class="content">
      <h1>报告下载</h1>
      <div class="download-section">
        <div class="search-bar">
          <el-input
            v-model="searchQuery"
            placeholder="搜索报告"
            prefix-icon="el-icon-search"
          >
            <template #append>
              <el-button icon="el-icon-search">搜索</el-button>
            </template>
          </el-input>
        </div>
        <div class="report-list">
          <el-card v-for="report in reports" :key="report.id" class="report-card">
            <div class="report-info">
              <div class="report-title">{{ report.title }}</div>
              <div class="report-meta">
                <span>{{ report.date }}</span>
                <span>{{ report.size }}</span>
              </div>
            </div>
            <div class="report-actions">
              <el-button type="primary" size="small" @click="downloadReport(report)">
                <i class="el-icon-download"></i>
                下载
              </el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Download',
  components: {
    Navbar
  },
  data() {
    return {
      searchQuery: '',
      reports: [
        {
          id: 1,
          title: '2023年度论文查重报告示例',
          date: '2023-12-30',
          size: '2.5MB'
        },
        {
          id: 2,
          title: '论文降重技巧指南',
          date: '2023-12-29',
          size: '1.8MB'
        },
        {
          id: 3,
          title: '学术写作规范手册',
          date: '2023-12-28',
          size: '3.2MB'
        }
      ]
    }
  },
  methods: {
    downloadReport(report) {
      this.$message.success(`开始下载：${report.title}`)
    }
  }
}
</script>

<style scoped>
.download-page {
  min-height: 100vh;
  background: #f8fafc;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  text-align: center;
  color: #1f2937;
  margin-bottom: 40px;
}

.download-section {
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-bar {
  margin-bottom: 24px;
}

.report-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.report-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.report-info {
  flex: 1;
}

.report-title {
  color: #1f2937;
  font-size: 16px;
  margin-bottom: 8px;
}

.report-meta {
  color: #6b7280;
  font-size: 14px;
  display: flex;
  gap: 16px;
}

.report-actions {
  margin-left: 16px;
}
</style>
