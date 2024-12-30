<template>
  <div class="promote-page">
    <Navbar />
    <div class="content">
      <h1>推广赚钱</h1>
      <div class="promote-section">
        <div class="stats-cards">
          <el-card class="stat-card">
            <div class="stat-title">今日收益</div>
            <div class="stat-value">¥ 0.00</div>
          </el-card>
          <el-card class="stat-card">
            <div class="stat-title">本月收益</div>
            <div class="stat-value">¥ 0.00</div>
          </el-card>
          <el-card class="stat-card">
            <div class="stat-title">总收益</div>
            <div class="stat-value">¥ 0.00</div>
          </el-card>
        </div>
        <div class="promote-info">
          <h3>推广方式</h3>
          <div class="promote-methods">
            <el-card>
              <template #header>
                <div class="method-header">
                  <span>推广链接</span>
                  <el-button type="text">复制链接</el-button>
                </div>
              </template>
              <div class="method-content">
                https://example.com/ref/123456
              </div>
            </el-card>
            <el-card>
              <template #header>
                <div class="method-header">
                  <span>推广二维码</span>
                  <el-button type="text">下载二维码</el-button>
                </div>
              </template>
              <div class="method-content qrcode">
                <!-- 这里放二维码图片 -->
                <div class="qrcode-placeholder"></div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Promote',
  components: {
    Navbar
  }
}
</script>

<style scoped>
.promote-page {
  min-height: 100vh;
  background: #f8fafc;
}

.content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  text-align: center;
  color: #1f2937;
  margin-bottom: 40px;
}

.promote-section {
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  text-align: center;
}

.stat-title {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 8px;
}

.stat-value {
  color: #1f2937;
  font-size: 24px;
  font-weight: 600;
}

.promote-info h3 {
  color: #1f2937;
  margin-bottom: 20px;
}

.promote-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.method-content {
  padding: 12px;
  background: #f8fafc;
  border-radius: 4px;
  word-break: break-all;
}

.qrcode {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.qrcode-placeholder {
  width: 200px;
  height: 200px;
  background: #e5e7eb;
  border-radius: 4px;
}

@media screen and (max-width: 768px) {
  .stats-cards,
  .promote-methods {
    grid-template-columns: 1fr;
  }
}
</style>
