<template>
  <div class="home">
    <Navbar />
    
    <div class="content">
      <div class="main-section">
        <div class="hero-content">
          <h1 class="main-title">百万学生的共同选择</h1>
          <h2 class="subtitle">一站式毕业学习平台</h2>
          
          <div class="feature-groups">
            <div class="feature-group">
              <div class="group-label">查重：</div>
              <div class="features">
                <div class="feature-item">
                  <i class="el-icon-check"></i>
                  <span>免费查重</span>
                </div>
                <div class="feature-item">
                  <i class="el-icon-check"></i>
                  <span>智能降重</span>
                </div>
                <div class="feature-item">
                  <i class="el-icon-check"></i>
                  <span>AIGC服务</span>
                </div>
              </div>
            </div>
            
            <div class="feature-group">
              <div class="group-label">写作：</div>
              <div class="features">
                <div class="feature-item">
                  <i class="el-icon-check"></i>
                  <span>智能写作</span>
                </div>
                <div class="feature-item">
                  <i class="el-icon-check"></i>
                  <span>SiC润色</span>
                </div>
                <div class="feature-item">
                  <i class="el-icon-check"></i>
                  <span>毕设（源码）</span>
                </div>
              </div>
            </div>
          </div>

          <div class="placeholder-image">
            <div class="placeholder-box">主要内容占位区域</div>
          </div>
        </div>

        <div class="smart-writing-section">
          <div class="section-title">
            <div class="title-decoration">≡</div>
            <h2>智能写作</h2>
            <div class="title-decoration">≡</div>
          </div>
          <div class="section-subtitle">一键生成论文 安全生成大纲 免费选题</div>
        </div>
      </div>

      <div class="user-profile">
        <div class="profile-header">
          <div class="avatar">
            <div class="avatar-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60" height="60">
                <circle cx="50" cy="35" r="25" fill="#74b9ff" opacity="0.2"/>
                <path d="M10 90 Q50 60 90 90" fill="#74b9ff" opacity="0.2"/>
                <circle cx="50" cy="30" r="3" fill="#74b9ff"/>
                <path d="M45 80 L50 75 L55 80" stroke="#74b9ff" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="user-id">15680112879</div>
        <div class="user-type">推广等级: 普通用户</div>

        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">0.00</div>
            <div class="stat-label">收益</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">0</div>
            <div class="stat-label">下级会员</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">1</div>
            <div class="stat-label">兑换码</div>
          </div>
        </div>

        <div class="profile-actions">
          <el-button class="edit-btn" plain size="small">编辑资料</el-button>
          <el-button type="success" class="promote-btn" size="small">推广赚钱</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-top: 60px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 24px;
}

.main-section {
  flex: 1;
}

.hero-content {
  margin-bottom: 40px;
}

.main-title {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 24px;
  color: #666;
  margin-bottom: 30px;
}

.feature-groups {
  margin-bottom: 40px;
}

.feature-group {
  margin-bottom: 20px;
}

.group-label {
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
}

.features {
  display: flex;
  gap: 24px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.feature-item i {
  color: #67c23a;
}

.placeholder-image {
  width: 100%;
  margin-top: 30px;
  text-align: center;
}

.placeholder-box {
  width: 100%;
  height: 300px;
  background-color: #e5e9f2;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 16px;
}

.smart-writing-section {
  text-align: center;
  margin-top: 40px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.title-decoration {
  color: #67c23a;
  font-size: 24px;
}

.section-subtitle {
  color: #666;
}

.user-profile {
  width: 280px;
  height: 320px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.profile-header {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.avatar {
  width: 60px;
  height: 60px;
  margin: 0 auto;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-id {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}

.user-type {
  display: inline-block;
  font-size: 14px;
  color: #74b9ff;
  background-color: rgba(116, 185, 255, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
  text-align: center;
}

.stat-item {
  padding: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #74b9ff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
}

.profile-actions {
  display: flex;
  gap: 8px;
}

.edit-btn, .promote-btn {
  flex: 1;
  border-radius: 16px;
  padding: 6px 0;
  font-size: 12px;
}

.edit-btn {
  border-color: #dcdfe6;
}

.promote-btn {
  background-color: #74b9ff;
  border-color: #74b9ff;
}

.promote-btn:hover {
  background-color: #5aa3eb;
  border-color: #5aa3eb;
}
</style>