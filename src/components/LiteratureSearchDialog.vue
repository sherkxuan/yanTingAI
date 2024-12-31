<!-- LiteratureSearchDialog.vue -->
<template>
  <el-dialog
    title="文献搜索"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose"
    class="literature-search-dialog"
    top="10vh"
  >
    <div class="dialog-content">
      <!-- 左侧搜索区域 -->
      <div class="search-section">
        <div class="search-header">
          <el-input
            v-model="searchQuery"
            placeholder="搜索文献"
            class="search-input"
          >
            <el-select
              v-model="searchDatabase"
              slot="prepend"
              placeholder="选择数据库"
              style="width: 120px"
            >
              <el-option label="全部词库" value="all"></el-option>
              <el-option label="中文文献" value="cn"></el-option>
              <el-option label="英文文献" value="en"></el-option>
            </el-select>
            <el-select
              v-model="searchYear"
              slot="append"
              placeholder="年份"
              style="width: 120px"
            >
              <el-option label="全部年份" value="all"></el-option>
              <el-option label="2024" value="2024"></el-option>
              <el-option label="2023" value="2023"></el-option>
              <el-option label="2022" value="2022"></el-option>
            </el-select>
          </el-input>
          <el-button type="primary" @click="handleSearch" class="search-btn">
            搜索
          </el-button>
        </div>

        <div class="search-results">
          <div 
            v-for="(item, index) in searchResults" 
            :key="index" 
            class="literature-item"
            @click="toggleItemSelection(item)"
          >
            <div class="item-type">{{ item.type }}</div>
            <div class="item-header">
              <el-checkbox 
                v-model="item.selected"
                @click.stop
              ></el-checkbox>
              <h3 class="item-title">{{ item.title }}</h3>
            </div>
            <div class="item-abstract">{{ item.abstract }}</div>
            <div class="item-meta">
              <span class="author">{{ item.author }}</span>
              <span class="journal">{{ item.journal }}</span>
              <span class="year">{{ item.year }}</span>
            </div>
            <div class="item-tags">
              <el-tag 
                v-for="(tag, tagIndex) in item.keywords" 
                :key="tagIndex"
                size="small"
                type="info"
                effect="plain"
              >
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧已选区域 -->
      <div class="selected-section">
        <div class="selected-header">
          <h3>已选文献 ({{ selectedCount }})</h3>
          <el-button 
            type="text" 
            @click="clearSelected"
            :disabled="selectedCount === 0"
          >
            清空
          </el-button>
        </div>
        <div class="selected-list">
          <div 
            v-for="(item, index) in localSelectedLiterature" 
            :key="index"
            class="selected-item"
          >
            <div class="selected-item-content">
              <div class="selected-item-title">{{ item.title }}</div>
              <div class="selected-item-meta">
                <span>{{ item.author }}</span>
                <span>{{ item.journal }}</span>
                <span>{{ item.year }}</span>
              </div>
            </div>
            <el-button 
              type="text" 
              icon="el-icon-close"
              @click="removeSelected(item)"
              class="remove-btn"
            ></el-button>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'LiteratureSearchDialog',
  props: {
    selectedLiterature: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      searchQuery: '',
      searchDatabase: 'all',
      searchYear: 'all',
      searchResults: [],
      localSelectedLiterature: []
    }
  },
  watch: {
    selectedLiterature: {
      immediate: true,
      handler(newVal) {
        this.localSelectedLiterature = [...newVal]
        // 更新搜索结果的选中状态
        this.searchResults.forEach(item => {
          item.selected = this.localSelectedLiterature.some(selected => 
            selected.title === item.title && 
            selected.author === item.author && 
            selected.journal === item.journal
          )
        })
      }
    }
  },
  computed: {
    selectedCount() {
      return this.localSelectedLiterature.length
    }
  },
  methods: {
    show(database = 'all') {
      this.searchDatabase = database
      this.dialogVisible = true
      // 自动执行搜索
      this.handleSearch()
    },
    handleSearch() {
      // 这里模拟搜索逻辑
      let results = []
      if (this.searchDatabase === 'en') {
        results = [
          {
            type: 'Journal Article',
            title: 'Application of an artificial intelligence system for endoscopic diagnosis of...',
            abstract: 'The application of artificial intelligence (AI) in medical imaging has shown promising results...',
            author: 'Smith, J.',
            journal: 'Medical AI Journal',
            year: '2023'
          },
          {
            type: 'Conference Paper',
            title: 'Deep Learning Approaches in Medical Image Analysis',
            abstract: 'This paper presents a comprehensive review of deep learning applications in medical imaging...',
            author: 'Johnson, M. et al.',
            journal: 'IEEE Conference on AI in Medicine',
            year: '2024'
          }
        ]
      } else if (this.searchDatabase === 'cn') {
        results = [
          {
            type: '学术期刊',
            title: 'AI运用于享乐艺术传播的可能性初探',
            abstract: '从中国古代"口传心授"的音乐传播基本模式分析,到近代声音记录、电子媒介对于音乐的传播影响梳理,享乐艺术传播的媒介发生翻天覆地转变;随着计算机音乐和人工智能技术逐渐在音乐领域的应用,人机互动式"教学辅助平台应运而生。探索AI技术运用于享乐艺术传播的可能性,反映了二十一世纪科技与艺术深度融合的发展趋势。',
            keywords: ['AI', '音乐艺术', '传播'],
            author: '孟文武',
            journal: '黄河之声',
            year: '2021'
          },
          {
            type: '学术期刊',
            title: '中国移动邓超:运营融合和规模落地是运营商AI运用关键',
            abstract: '依托九天人工智能平台,中国移动已经开始面向客服、网络、市场、管理和衍生业务领域落地AI规模化应用。从2017年底推出九天人工智能平台,到今年8月客服系统中机器服务的比例达到20%,再到积极推动开放网络自动化平台(ONAP)工作,毫无疑问,在落地AI方面,中国移动走在了全球运营商的前列。',
            author: '舒文琼',
            journal: '通信世界',
            year: '2018'
          }
        ]
      } else {
        results = [
          {
            type: 'Journal Article',
            title: 'Application of an artificial intelligence system for endoscopic diagnosis of...',
            abstract: 'The application of artificial intelligence (AI) in medical imaging has shown promising results...',
            author: 'Smith, J.',
            journal: 'Medical AI Journal',
            year: '2023'
          },
          {
            type: '学术期刊',
            title: 'AI运用于享乐艺术传播的可能性初探',
            abstract: '从中国古代"口传心授"的音乐传播基本模式分析,到近代声音记录、电子媒介对于音乐的传播影响梳理,享乐艺术传播的媒介发生翻天覆地转变;随着计算机音乐和人工智能技术逐渐在音乐领域的应用,人机互动式"教学辅助平台应运而生。探索AI技术运用于享乐艺术传播的可能性,反映了二十一世纪科技与艺术深度融合的发展趋势。',
            keywords: ['AI', '音乐艺术', '传播'],
            author: '孟文武',
            journal: '黄河之声',
            year: '2021'
          }
        ]
      }

      // 为搜索结果添加选中状态
      this.searchResults = results.map(item => ({
        ...item,
        selected: this.localSelectedLiterature.some(selected => 
          selected.title === item.title && 
          selected.author === item.author && 
          selected.journal === item.journal
        )
      }))
    },
    toggleItemSelection(item) {
      item.selected = !item.selected
      if (item.selected) {
        this.localSelectedLiterature.push(item)
      } else {
        const index = this.localSelectedLiterature.findIndex(selected => 
          selected.title === item.title && 
          selected.author === item.author && 
          selected.journal === item.journal
        )
        if (index > -1) {
          this.localSelectedLiterature.splice(index, 1)
        }
      }
    },
    removeSelected(item) {
      const index = this.localSelectedLiterature.findIndex(selected => 
        selected.title === item.title && 
        selected.author === item.author && 
        selected.journal === item.journal
      )
      if (index > -1) {
        this.localSelectedLiterature.splice(index, 1)
        // 更新搜索结果中的选中状态
        const searchItem = this.searchResults.find(i => i.title === item.title)
        if (searchItem) {
          searchItem.selected = false
        }
      }
    },
    clearSelected() {
      this.localSelectedLiterature = []
      this.searchResults.forEach(item => {
        item.selected = false
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.$emit('confirm', this.localSelectedLiterature)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.literature-search-dialog {
  :deep(.el-dialog) {
    min-height: 600px;
    display: flex;
    flex-direction: column;
  }

  :deep(.el-dialog__body) {
    flex: 1;
    padding: 0;
    overflow: hidden;
  }
}

.dialog-content {
  height: 600px;
  display: flex;
  overflow: hidden;
}

.search-section {
  width: 50%;
  padding: 20px;
  border-right: 1px solid #e4e7eb;
  display: flex;
  flex-direction: column;
}

.search-header {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;

  :deep(.el-input-group__append) {
    width: 120px;
    padding: 0;
    
    .el-select {
      width: 100%;
      
      .el-input {
        width: 120px;
      }
      
      .el-input__inner {
        border: none;
        padding-right: 30px;
        width: 120px;
      }
    }
  }

  :deep(.el-input-group__prepend) {
    padding: 0;
    width: 120px;
    
    .el-select {
      width: 100%;
      
      .el-input {
        width: 120px;
      }
      
      .el-input__inner {
        border: none;
        padding-right: 30px;
        width: 120px;
      }
    }
  }
}

.search-btn {
  min-width: 80px;
}

.search-results {
  flex: 1;
  overflow-y: auto;
  padding-right: 16px;
}

.literature-item {
  padding: 16px;
  border: 1px solid #e4e7eb;
  border-radius: 8px;
  margin-bottom: 16px;
  background: white;
  transition: all 0.3s;
  cursor: pointer;
}

.literature-item:hover {
  border-color: #74b9ff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.item-type {
  display: inline-block;
  padding: 2px 8px;
  background: #f0f9ff;
  color: #74b9ff;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 8px;
}

.item-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}

.item-title {
  flex: 1;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
  line-height: 1.4;
}

.item-abstract {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.item-meta {
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 13px;
  margin-bottom: 8px;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.selected-section {
  width: 50%;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e4e7eb;
}

.selected-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7eb;
  background: white;
}

.selected-header h3 {
  margin: 0;
  font-size: 16px;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
}

.selected-header h3::before {
  content: '';
  display: block;
  width: 4px;
  height: 16px;
  background: #74b9ff;
  border-radius: 2px;
}

.selected-header .el-button {
  padding: 0;
  font-size: 13px;
}

.selected-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 12px;
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
}

.selected-item {
  padding: 12px;
  background: white;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  border: 1px solid #e4e7eb;
  transition: all 0.3s ease;
  position: relative;
}

.selected-item:hover {
  border-color: #74b9ff;
  box-shadow: 0 2px 8px rgba(116, 185, 255, 0.1);
}

.selected-item:last-child {
  margin-bottom: 0;
}

.selected-item-content {
  flex: 1;
  min-width: 0;
}

.selected-item-title {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.selected-item-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

.selected-item-meta span {
  position: relative;
}

.selected-item-meta span:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 12px;
  background: #e4e7eb;
}

.remove-btn {
  padding: 4px;
  color: #999;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin-right: -4px;
}

.remove-btn:hover {
  color: #f56c6c;
  background: #fff2f2;
}

.remove-btn i {
  font-size: 16px;
  line-height: 1;
}

/* 自定义滚动条样式 */
.search-results::-webkit-scrollbar,
.selected-list::-webkit-scrollbar {
  width: 4px;
}

.search-results::-webkit-scrollbar-thumb,
.selected-list::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.search-results::-webkit-scrollbar-track,
.selected-list::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 2px;
}

.search-results:hover::-webkit-scrollbar-thumb,
.selected-list:hover::-webkit-scrollbar-thumb {
  background: #9ca3af;
}
</style>
