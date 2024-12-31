<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="修改正文样式"
    width="650px"
    :before-close="handleClose"
    class="text-style-dialog"
  >
    <div class="style-form">
      <div class="form-row">
        <div class="form-item">
          <span>字体</span>
          <el-select v-model="form.fontFamily" size="default">
            <el-option label="宋体" value="SimSun"></el-option>
            <el-option label="黑体" value="SimHei"></el-option>
            <el-option label="微软雅黑" value="Microsoft YaHei"></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <span>字号</span>
          <el-select v-model="form.fontSize" size="default">
            <el-option label="小五" value="10"></el-option>
            <el-option label="五号" value="10.5"></el-option>
            <el-option label="小四" value="12"></el-option>
            <el-option label="四号" value="14"></el-option>
            <el-option label="小三" value="15"></el-option>
            <el-option label="三号" value="16"></el-option>
            <el-option label="小二" value="18"></el-option>
            <el-option label="二号" value="22"></el-option>
            <el-option label="小一" value="24"></el-option>
            <el-option label="一号" value="26"></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <span>固定值</span>
          <el-select v-model="form.fontWeight" size="default">
            <el-option label="常规" value="normal"></el-option>
            <el-option label="加粗" value="bold"></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <span>行距</span>
          <div class="line-height-group">
            <el-select v-model="form.lineHeightType" size="default" style="width: 120px" @change="handleLineHeightTypeChange">
              <el-option label="单倍行距" value="1"></el-option>
              <el-option label="1.5倍行距" value="1.5"></el-option>
              <el-option label="双倍行距" value="2"></el-option>
              <el-option label="多倍行距" value="multiple"></el-option>
              <el-option label="固定值" value="fixed"></el-option>
              <el-option label="最小值" value="min"></el-option>
            </el-select>
            <el-input
              v-if="['multiple', 'fixed', 'min'].includes(form.lineHeightType)"
              v-model="form.lineHeightValue"
              style="width: 85px;"
              size="default"
            >
              <template slot="append">{{ lineHeightUnit }}</template>
            </el-input>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-item">
          <span>对齐方式</span>
          <el-select v-model="form.textAlign" size="default">
            <el-option label="左对齐" value="left"></el-option>
            <el-option label="居中" value="center"></el-option>
            <el-option label="右对齐" value="right"></el-option>
            <el-option label="两端对齐" value="justify"></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <span>缩进</span>
          <el-select v-model="form.textIndent" size="default">
            <el-option label="无" value="0"></el-option>
            <el-option label="首行缩进" value="2em"></el-option>
          </el-select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-item">
          <span>段前</span>
          <el-input-number v-model="form.marginTop" :min="0" size="default" style="width: 120px">
            <template slot="append">行</template>
          </el-input-number>
        </div>
        <div class="form-item">
          <span>段后</span>
          <el-input-number v-model="form.marginBottom" :min="0" size="default" style="width: 120px">
            <template slot="append">行</template>
          </el-input-number>
        </div>
      </div>

      <div class="preview-text">
        <div :style="{
          fontFamily: form.fontFamily,
          fontSize: form.fontSize + 'px',
          fontWeight: form.fontWeight,
          fontStyle: form.fontStyle,
          lineHeight: lineHeight,
          textAlign: form.textAlign,
          textIndent: form.textIndent,
          marginTop: form.marginTop + 'em',
          marginBottom: form.marginBottom + 'em'
        }">亲爱的用户您好，这是一段示例文字，用于预览当前设置的样式效果。您可以通过上方的设置来调整文字的显示效果。</div>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'TextStyleDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    initialStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        fontFamily: 'SimSun',
        fontSize: '12',
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeightType: '1.5',
        lineHeightValue: '14',
        textAlign: 'justify',
        textIndent: '2em',
        marginTop: 0,
        marginBottom: 0
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    },
    lineHeightUnit() {
      switch(this.form.lineHeightType) {
        case 'multiple':
          return '倍'
        case 'fixed':
        case 'min':
          return '磅'
        default:
          return '磅'
      }
    },
    lineHeight() {
      // 计算最终的行距值
      switch(this.form.lineHeightType) {
        case '1':
          return '1'
        case '1.5':
          return '1.5'
        case '2':
          return '2'
        case 'multiple':
          return this.form.lineHeightValue
        case 'fixed':
        case 'min':
          return this.form.lineHeightValue + 'pt'
        default:
          return '1.5'
      }
    }
  },
  watch: {
    initialStyle: {
      handler(newVal) {
        if (newVal) {
          // 处理行距值的转换
          if (newVal.lineHeight) {
            if (typeof newVal.lineHeight === 'string') {
              if (newVal.lineHeight.endsWith('pt')) {
                this.form.lineHeightType = 'fixed'
                this.form.lineHeightValue = newVal.lineHeight.replace('pt', '')
              } else {
                this.form.lineHeightType = newVal.lineHeight
                if (['multiple', 'fixed', 'min'].includes(newVal.lineHeight)) {
                  this.form.lineHeightValue = newVal.lineHeight === 'multiple' ? '3' : '14'
                }
              }
            } else {
              this.form.lineHeightType = String(newVal.lineHeight)
            }
          }
          // 合并其他样式
          const updatedForm = { ...this.form }
          Object.keys(newVal).forEach(key => {
            if (key !== 'lineHeight') {
              updatedForm[key] = newVal[key]
            }
          })
          this.form = updatedForm
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      const result = { ...this.form }
      // 根据行距类型设置最终的行距值
      switch(this.form.lineHeightType) {
        case 'multiple':
          result.lineHeight = this.form.lineHeightValue
          break
        case 'fixed':
        case 'min':
          result.lineHeight = this.form.lineHeightValue + 'pt'
          break
        default:
          result.lineHeight = this.form.lineHeightType
      }
      this.$emit('confirm', result)
      this.dialogVisible = false
    },
    toggleBold() {
      this.form.fontWeight = this.form.fontWeight === 'bold' ? 'normal' : 'bold'
    },
    toggleItalic() {
      this.form.fontStyle = this.form.fontStyle === 'italic' ? 'normal' : 'italic'
    },
    handleLineHeightTypeChange(value) {
      if (['multiple', 'fixed', 'min'].includes(value)) {
        this.form.lineHeightValue = value === 'multiple' ? '3' : '14'
      }
    }
  }
}
</script>

<style scoped>
.text-style-dialog >>> .el-dialog__body {
  padding: 20px;
}

.style-form {
  .form-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20px;
    gap: 15px;
  }
}

.form-item {
  display: flex;
  align-items: center;
  min-width: 280px;
}

.form-item span {
  width: 70px;
  text-align: right;
  color: #606266;
  margin-right: 12px;
  flex-shrink: 0;
}

.form-item .el-select,
.form-item .el-input,
.form-item .el-input-number {
  width: 180px;
}

.form-item .el-input >>> .el-input__inner {
  color: #606266;
}

.line-height-group {
  display: flex;
  gap: 8px;
  align-items: center;

  :deep(.el-input-group__append) {
    min-width: 35px;
    padding: 0 8px;
    width: 35px;
  }
}

.text-format-buttons {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.text-format-buttons .el-button {
  padding: 8px 12px;
}

.text-format-buttons .el-button.active {
  background-color: #409EFF;
  color: white;
}

.preview-text {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  min-height: 100px;
  white-space: pre-wrap;
  overflow: auto;
}
</style>
