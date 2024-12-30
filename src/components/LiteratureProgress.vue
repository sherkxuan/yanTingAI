<!-- LiteratureProgress.vue -->
<template>
  <div class="form-card">
    <div class="card-header">
      <div class="header-icon">
        <i class="el-icon-collection"></i>
      </div>
      <div class="header-text">
        <h3>参考文献</h3>
        <p>Reference Literature</p>
      </div>
    </div>

    <div class="form-content">
      <div class="literature-input">
        <div class="input-header">
          <i class="el-icon-document"></i>
          <span>自定义输入文献时，请使用知网查新（引文格式）格式引文</span>
          <el-button type="primary" size="small" class="format-btn">
            解析按验文献格式
          </el-button>
        </div>
        <el-input
          type="textarea"
          v-model="customLiterature"
          :autosize="{ minRows: 8, maxRows: 15 }"
          placeholder="自定义输入文献（本科参考文献15个以上，硕士20个以上，博士30个以上~）"
          class="custom-textarea"
        />
      </div>

      <div class="recommended-literature">
        <div class="section-title">
          <i class="el-icon-collection-tag"></i>
          推荐文献
        </div>
        <div class="literature-items" style="max-height: 400px; overflow-y: auto;">
          <div v-for="(item, index) in recommendedLiterature" 
               :key="index" 
               class="literature-item"
               @click="item.selected = !item.selected; handleLiteratureSelect()">
            <el-checkbox 
              v-model="item.selected" 
              @change="handleLiteratureSelect"
              class="item-checkbox"
              @click.stop
            ></el-checkbox>
            <div class="item-content">
              <div class="item-tag">{{ item.type }}</div>
              <div class="item-title">{{ item.title }}</div>
              <div class="item-abstract">摘要：{{ item.abstract }}</div>
              <div class="item-meta">
                <div class="meta-left">
                  <span class="keywords" v-if="item.keywords">
                    关键词：
                    <el-tag 
                      v-for="(keyword, kidx) in item.keywords" 
                      :key="kidx"
                      size="small"
                      class="keyword-tag"
                    >
                      {{ keyword }}
                    </el-tag>
                  </span>
                </div>
                <div class="meta-right">
                  <span class="author">{{ item.author }}</span>
                  <span class="journal">{{ item.journal }}</span>
                  <span class="year">{{ item.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部操作栏 -->
        <div class="literature-footer">
          <div class="footer-left">
            <el-checkbox 
              v-model="selectAll"
              @change="handleSelectAll"
            >已选择文献{{ selectedCount }}个</el-checkbox>
            <div class="requirement-tip">
              <i class="el-icon-info"></i>
              本科参考文献15个以上，硕士20个以上，博士30个以上~
            </div>
          </div>
          <div class="footer-right">
            <el-button type="primary" size="small" @click="showEnglishSearch">
              添加英文
            </el-button>
            <el-button type="primary" size="small" @click="showChineseSearch">
              搜索
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="form-footer">
      <el-button 
        type="primary" 
        plain
        @click="prevStep"
      >
        上一步
      </el-button>
      <el-button 
        type="primary" 
        @click="nextStep"
      >
        下一步
      </el-button>
    </div>
    <LiteratureSearchDialog
      ref="searchDialog"
      :selected-literature="recommendedLiterature.filter(item => item.selected)"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
import LiteratureSearchDialog from './LiteratureSearchDialog.vue'

export default {
  name: 'LiteratureProgress',
  components: {
    LiteratureSearchDialog
  },
  data() {
    return {
      customLiterature: '',
      recommendedLiterature: [
        {
          type: '学术期刊',
          title: 'AI运用于享乐艺术传播的可能性初探',
          abstract: '从中国古代"口传心授"的音乐传播基本模式分析,到近代声音记录、电子媒介对于音乐的传播影响梳理,享乐艺术传播的媒介发生翻天覆地转变;随着计算机音乐和人工智能技术逐渐在音乐领域的应用,人机互动式"教学辅助平台应运而生。探索AI技术运用于享乐艺术传播的可能性,反映了二十一世纪科技与艺术深度融合的发展趋势。',
          keywords: ['AI', '音乐艺术', '传播'],
          author: '孟文武',
          journal: '黄河之声',
          year: '2021',
          selected: false
        },
        {
          type: '学术期刊',
          title: '人工智能在医疗影像诊断中的应用研究',
          abstract: '本文探讨了人工智能技术在医疗影像诊断领域的应用现状和发展趋势。通过分析深度学习算法在X光、CT、MRI等医学影像识别中的表现，发现AI辅助诊断系统能显著提高诊断准确率和效率。',
          author: '张明',
          journal: '中国医学影像技术',
          year: '2023',
          selected: false
        },
        {
          type: '学术期刊',
          title: 'AI技术在智慧城市建设中的应用与挑战',
          abstract: '随着城市化进程的加快，智慧城市建设成为城市发展的新趋势。本文分析了AI技术在交通管理、环境监测、公共安全等领域的具体应用，并探讨了实施过程中面临的技术和管理挑战。',
          author: '李华',
          journal: '城市发展研究',
          year: '2022',
          selected: false
        },
        {
          type: '学术期刊',
          title: '人工智能教育应用的现状与未来展望',
          abstract: '本研究调查了AI技术在教育领域的应用现状，包括智能辅导系统、个性化学习平台等创新实践。研究发现，AI教育应用能有效提升学习效果，但也存在数据安全、教师角色转变等问题需要解决。',
          author: '王芳',
          journal: '教育研究',
          year: '2023',
          selected: false
        },
        {
          type: '学术期刊',
          title: 'AI驱动的金融科技创新研究',
          abstract: '本文分析了人工智能技术在金融领域的创新应用，包括智能投顾、风险控制、反欺诈等方面。研究表明，AI金融科技能显著提升金融服务效率和安全性，但也带来了新的监管挑战。',
          author: '陈强',
          journal: '金融研究',
          year: '2023',
          selected: false
        },
        {
          type: '学术期刊',
          title: '人工智能在新能源管理中的应用研究',
          abstract: '本研究探讨了AI技术在新能源发电预测、智能电网调度、能源消费优化等方面的应用。结果表明，AI技术能有效提高新能源利用效率，促进能源系统的智能化转型。',
          author: '刘伟',
          journal: '能源科技',
          year: '2024',
          selected: false
        }
      ],
      selectAll: false
    }
  },
  computed: {
    selectedCount() {
      return this.recommendedLiterature.filter(item => item.selected).length
    }
  },
  methods: {
    handleLiteratureSelect() {
      this.selectAll = this.recommendedLiterature.every(item => item.selected)
    },
    handleSelectAll(val) {
      this.selectAll = val
      this.recommendedLiterature.forEach(item => {
        item.selected = val
      })
    },
    showEnglishSearch() {
      this.$refs.searchDialog.show('en')
    },
    showChineseSearch() {
      this.$refs.searchDialog.show('cn')
    },
    showSearchDialog() {
      this.$refs.searchDialog.show()
    },
    handleConfirm(selectedItems) {
      // 更新推荐文献的选中状态
      // 先重置所有文献的选中状态
      this.recommendedLiterature.forEach(item => {
        item.selected = false
      })

      // 更新选中状态
      selectedItems.forEach(selected => {
        const existingItem = this.recommendedLiterature.find(item => 
          item.title === selected.title && 
          item.author === selected.author && 
          item.journal === selected.journal
        )
        if (existingItem) {
          existingItem.selected = true
        } else {
          this.recommendedLiterature.push({
            ...selected,
            selected: true
          })
        }
      })

      // 更新全选状态
      this.selectAll = this.recommendedLiterature.length > 0 && 
                      this.recommendedLiterature.every(item => item.selected)
    },
    prevStep() {
      this.$emit('prev')
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

.form-content {
  padding: 24px;
}

.literature-input {
  margin-bottom: 30px;
}

.input-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #333;
}

.input-header i {
  margin-right: 8px;
  color: #74b9ff;
}

.input-header .format-btn {
  margin-left: auto;
}

.custom-textarea {
  :deep(.el-textarea__inner) {
    border: 1px dashed #dcdfe6;
    background-color: #fafafa;
    resize: none;
    font-size: 14px;
    line-height: 1.6;
    padding: 12px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      border-color: #74b9ff;
    }

    &:focus {
      border-color: #74b9ff;
      box-shadow: 0 0 0 2px rgba(116, 185, 255, 0.1);
    }
  }
}

.recommended-literature {
  margin-top: 30px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.section-title i {
  margin-right: 8px;
  color: #74b9ff;
}

.literature-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.literature-item {
  position: relative;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background: #fff;
  transition: all 0.3s;
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  cursor: pointer;
}

.literature-item:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-color: #74b9ff;
}

.item-checkbox {
  margin-top: 4px;
}

.item-content {
  flex: 1;
  min-width: 0; /* 防止内容溢出 */
}

.item-tag {
  display: inline-block;
  padding: 2px 8px;
  background: #f0f9ff;
  color: #74b9ff;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 8px;
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.4;
}

.item-abstract {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  color: #666;
}

.meta-left {
  flex: 1;
  min-width: 200px;
}

.meta-right {
  display: flex;
  gap: 12px;
  color: #909399;
  flex-wrap: wrap;
}

.keywords {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

:deep(.keyword-tag) {
  background-color: #f0f9ff;
  border-color: #74b9ff;
  color: #74b9ff;
  margin: 0;
}

.literature-footer {
  margin-top: 20px;
  padding: 16px 0;
  border-top: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-right {
  display: flex;
  gap: 8px;
}

.requirement-tip {
  color: #909399;
  font-size: 13px;
  display: flex;
  align-items: center;
}

.requirement-tip i {
  margin-right: 4px;
  color: #74b9ff;
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
  .form-content {
    padding: 16px;
  }

  .literature-footer {
    flex-direction: column;
    gap: 16px;
  }

  .footer-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .footer-right {
    width: 100%;
    justify-content: space-between;
  }

  .meta-left, .meta-right {
    width: 100%;
  }

  .meta-right {
    justify-content: flex-start;
  }
}

</style>
