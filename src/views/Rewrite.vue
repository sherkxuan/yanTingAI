<template>
  <div class="rewrite-page">
    <Navbar />
    <div class="content">
      <h1>降重复写</h1>
      <div class="rewrite-section">
        <el-input
          type="textarea"
          v-model="content"
          :rows="8"
          placeholder="请输入需要降重的文本内容"
        />
        <div class="actions">
          <el-button type="primary" @click="startRewrite">开始降重</el-button>
          <el-button @click="clearContent">清空内容</el-button>
        </div>
        <div v-if="result" class="result-section">
          <h3>降重结果：</h3>
          <el-input
            type="textarea"
            v-model="result"
            :rows="8"
            readonly
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Rewrite',
  components: {
    Navbar
  },
  data() {
    return {
      content: '',
      result: ''
    }
  },
  methods: {
    startRewrite() {
      // 实现降重逻辑
      this.result = '这里是降重后的结果...'
      this.$message.success('降重完成')
    },
    clearContent() {
      this.content = ''
      this.result = ''
    }
  }
}
</script>

<style scoped>
.rewrite-page {
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

.rewrite-section {
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.actions {
  margin: 20px 0;
  display: flex;
  gap: 12px;
}

.result-section {
  margin-top: 24px;
}

h3 {
  color: #1f2937;
  margin-bottom: 16px;
}
</style>
