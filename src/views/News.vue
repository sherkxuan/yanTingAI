<template>
  <div class="news-page">
    <Navbar />
    <div class="content">
      <h1>行业资讯</h1>
      <div class="news-section">
        <div class="news-filters">
          <el-radio-group v-model="category" size="small">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="industry">行业动态</el-radio-button>
            <el-radio-button label="policy">政策解读</el-radio-button>
            <el-radio-button label="academic">学术资讯</el-radio-button>
          </el-radio-group>
        </div>
        <div class="news-list">
          <el-card v-for="news in newsList" :key="news.id" class="news-card">
            <div class="news-content">
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-summary">{{ news.summary }}</p>
              <div class="news-meta">
                <span class="news-category">{{ news.category }}</span>
                <span class="news-date">{{ news.date }}</span>
                <span class="news-views">
                  <i class="el-icon-view"></i>
                  {{ news.views }}
                </span>
              </div>
            </div>
            <div class="news-image" v-if="news.image">
              <img :src="news.image" :alt="news.title">
            </div>
          </el-card>
        </div>
        <div class="load-more">
          <el-button type="primary" plain>加载更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'News',
  components: {
    Navbar
  },
  data() {
    return {
      category: 'all',
      newsList: [
        {
          id: 1,
          title: '高校论文查重新规定出台',
          summary: '近日，教育部发布关于加强学术论文查重管理的新规定，要求高校建立更严格的论文查重制度...',
          category: '政策解读',
          date: '2023-12-30',
          views: 1234,
          image: 'https://via.placeholder.com/120'
        },
        {
          id: 2,
          title: 'AI写作工具对学术界的影响',
          summary: '随着ChatGPT等AI工具的普及，学术界对AI辅助写作的态度和应对措施引发广泛讨论...',
          category: '行业动态',
          date: '2023-12-29',
          views: 986,
          image: 'https://via.placeholder.com/120'
        },
        {
          id: 3,
          title: '2024年学术论文写作新趋势',
          summary: '展望2024年，学术论文写作将呈现出哪些新特点？本文为您解析最新的学术写作趋势...',
          category: '学术资讯',
          date: '2023-12-28',
          views: 756,
          image: 'https://via.placeholder.com/120'
        }
      ]
    }
  }
}
</script>

<style scoped>
.news-page {
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

.news-section {
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.news-filters {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-card {
  display: flex;
  gap: 20px;
}

.news-content {
  flex: 1;
}

.news-title {
  color: #1f2937;
  font-size: 18px;
  margin-bottom: 12px;
  line-height: 1.4;
}

.news-summary {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #9ca3af;
  font-size: 12px;
}

.news-category {
  color: #1890ff;
}

.news-views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.news-image {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.load-more {
  text-align: center;
  margin-top: 32px;
}

@media screen and (max-width: 640px) {
  .news-card {
    flex-direction: column;
  }
  
  .news-image {
    width: 100%;
    height: 200px;
  }
}
</style>
