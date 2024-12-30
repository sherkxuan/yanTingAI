<template>
  <div class="check-page">
    <Navbar />
    <div class="content">
      <h1>论文查重</h1>
      <div class="upload-section">
        <el-upload
          class="upload-demo"
          drag
          action="#"
          :auto-upload="false"
          :on-change="handleFileChange"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">支持doc, docx格式，单个文件不超过10MB</div>
          </template>
        </el-upload>
        <el-button type="primary" class="check-button" @click="startCheck">
          开始查重
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Check',
  components: {
    Navbar
  },
  methods: {
    handleFileChange(file) {
      console.log(file)
    },
    startCheck() {
      // 实现查重逻辑
      this.$message.success('查重请求已提交')
    }
  }
}
</script>

<style scoped>
.check-page {
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

.upload-section {
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.check-button {
  width: 100%;
  margin-top: 24px;
}

:deep(.el-upload-dragger) {
  width: 100%;
}
</style>
