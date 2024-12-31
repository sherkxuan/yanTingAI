<template>
  <div class="outline-editor">
    <div class="outline-header">
      <div class="tip">
        <i class="el-icon-warning-outline"></i>
        提示：双击标题可以编辑，点击右侧图标插入图表/公式/代码/表格等
      </div>
    </div>

    <div class="outline-content">
      <el-tree
        :data="outlineData"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template slot-scope="{ node, data }">
          <span class="custom-tree-node" @dblclick="startEdit(data)">
            <span class="node-title">
              <span class="title-number">{{ getTitleNumber(node, data) }}</span>
              <el-input
                v-if="editingNode === data.id"
                v-model="editingLabel"
                size="small"
                @blur="handleTitleBlur(data)"
                @keyup.enter.native="handleTitleBlur(data)"
                ref="titleInput"
              ></el-input>
              <span v-else>{{ data.label }}</span>
            </span>
            <span class="node-actions">
              <template v-if="data.id.length > 1">
                <el-tooltip content="插入数据(表)" placement="top" :open-delay="500">
                  <i 
                    class="el-icon-finished" 
                    :class="{ 'is-active': data.actions && data.actions.table }"
                    @click.stop="handleAction('table', data)"
                  ></i>
                </el-tooltip>
                <el-tooltip content="插入图" placement="top" :open-delay="500">
                  <i 
                    class="el-icon-picture-outline"
                    :class="{ 'is-active': data.actions && data.actions.image }"
                    @click.stop="handleAction('image', data)"
                  ></i>
                </el-tooltip>
                <el-tooltip content="插入公式" placement="top" :open-delay="500">
                  <i 
                    class="el-icon-edit"
                    :class="{ 'is-active': data.actions && data.actions.formula }"
                    @click.stop="handleAction('formula', data)"
                  ></i>
                </el-tooltip>
                <el-tooltip content="插入代码" placement="top" :open-delay="500">
                  <i 
                    class="el-icon-s-order"
                    :class="{ 'is-active': data.actions && data.actions.code }"
                    @click.stop="handleAction('code', data)"
                  ></i>
                </el-tooltip>
              </template>
              <el-dropdown trigger="click" size="small" @command="(command) => handleCommand(command, node, data)">
                <i class="el-icon-more"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="addSibling">添加同级</el-dropdown-item>
                  <el-dropdown-item command="addChild" :disabled="data.id.length >= 3">添加子集</el-dropdown-item>
                  <el-dropdown-item command="delete" divided>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </template>
      </el-tree>
      <div class="outline-footer">
        <div class="left-actions">
          <el-button type="success" plain size="small">推荐提纲</el-button>
          <div class="format-settings">
            <el-button plain size="small">格式设置</el-button>
          </div>
          <div class="hint-text">
            <i class="el-icon-info"></i>
            每支付一篇，送3次推荐提纲次数。
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
          下一步
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OutlineEditor',
  data() {
    return {
      outlineData: [
        {
          id: '1',
          label: '引言',
          children: [],
          actions: {
            table: false,
            image: false,
            formula: false,
            code: false
          }
        },
        {
          id: '2',
          label: 'RPA技术概述',
          children: [
            {
              id: '21',
              label: 'RPA技术的定义与特征',
              children: [],
              actions: {
                table: false,
                image: false,
                formula: false,
                code: false
              }
            },
            {
              id: '22',
              label: 'RPA技术的发展现状',
              children: [],
              actions: {
                table: false,
                image: false,
                formula: false,
                code: false
              }
            },
            {
              id: '23',
              label: 'RPA技术的主要应用领域',
              children: [],
              actions: {
                table: false,
                image: false,
                formula: false,
                code: false
              }
            }
          ],
          actions: {
            table: false,
            image: false,
            formula: false,
            code: false
          }
        },
        {
          id: '3',
          label: '技能等级评价信息管理工作现状及问题分析',
          children: [
            {
              id: '31',
              label: '技能等级评价信息管理工作的主要内容',
              children: [],
              actions: {
                table: false,
                image: false,
                formula: false,
                code: false
              }
            },
            {
              id: '32',
              label: '技能等级评价信息管理工作面临的主要挑战',
              children: [],
              actions: {
                table: false,
                image: false,
                formula: false,
                code: false
              }
            },
            {
              id: '33',
              label: '信息管理效率与质量亟待提升',
              children: [],
              actions: {
                table: false,
                image: false,
                formula: false,
                code: false
              }
            }
          ],
          actions: {
            table: false,
            image: false,
            formula: false,
            code: false
          }
        },
        {
          id: '4',
          label: 'RPA技术在技能等级评价信息管理中的应用',
          children: [
            {
              id: '41',
              label: 'RPA技术在数据采集与整理中的应用',
              children: [],
              actions: {
                table: false,
                image: false,
                formula: false,
                code: false
              }
            },
            {
              id: '42',
              label: 'RPA技术在信息审核与校验中的应用',
              children: [],
              actions: {
                table: false,
                image: false,
                formula: false,
                code: false
              }
            },
            {
              id: '43',
              label: 'RPA技术在统计分析与报表生成中的应用',
              children: [],
              actions: {
                table: false,
                image: false,
                formula: false,
                code: false
              }
            },
            {
              id: '44',
              label: 'RPA技术应用的效果分析',
              children: [],
              actions: {
                table: false,
                image: false,
                formula: false,
                code: false
              }
            }
          ],
          actions: {
            table: false,
            image: false,
            formula: false,
            code: false
          }
        },
        {
          id: '5',
          label: '结论',
          children: [],
          actions: {
            table: false,
            image: false,
            formula: false,
            code: false
          }
        }
      ],
      editingNode: null,
      editingLabel: ''
    }
  },
  methods: {
    handleAction(type, data) {
      if (!data.actions) {
        this.$set(data, 'actions', {
          table: false,
          image: false,
          formula: false,
          code: false
        });
      }
      // 切换状态
      this.$set(data.actions, type, !data.actions[type]);
      console.log('Handle action:', type, 'for node:', data);
    },
    handleCommand(command, node, data) {
      switch (command) {
        case 'addSibling': {
          // 处理根级节点
          const isRootLevel = data.id.length === 1;
          const siblings = isRootLevel ? this.outlineData : (node.parent ? node.parent.data.children : []);
          
          if (!siblings) {
            console.error('Unable to find siblings array');
            return;
          }

          const index = siblings.findIndex(sibling => sibling.id === data.id);
          if (index === -1) {
            console.error('Unable to find current node in siblings');
            return;
          }
          
          // 生成新ID
          let newId;
          if (isRootLevel) {
            // 获取当前节点的数字ID
            const currentNum = parseInt(data.id, 10);
            newId = (currentNum + 1).toString();
            
            // 更新后续节点及其子节点的ID
            const needsUpdate = siblings.slice(index + 1);
            let updateNum = currentNum + 2;
            
            const updateNodeAndChildren = (node, newParentId) => {
              // 更新当前节点ID
              const newId = newParentId || updateNum.toString();
              node.id = newId;
              
              // 更新子节点ID
              if (node.children && node.children.length > 0) {
                node.children.forEach((child, idx) => {
                  const childNum = idx + 1;
                  updateNodeAndChildren(child, newId + childNum);
                });
              }
              
              if (!newParentId) {
                updateNum++;
              }
            };
            
            needsUpdate.forEach(node => {
              updateNodeAndChildren(node);
            });
          } else {
            const prefix = data.id.slice(0, -1);
            // 获取所有相同前缀的节点
            const samePrefix = siblings.filter(node => node.id.startsWith(prefix));
            // 找到当前节点在相同前缀节点中的位置
            const currentPrefixIndex = samePrefix.findIndex(node => node.id === data.id);
            // 生成新的序号，确保按顺序插入
            const newNum = parseInt(samePrefix[currentPrefixIndex].id.slice(-1), 10) + 1;
            
            // 如果后面还有节点，需要更新它们的序号
            const needsUpdate = samePrefix.slice(currentPrefixIndex + 1);
            if (needsUpdate.length > 0) {
              let updateNum = newNum + 1;
              needsUpdate.forEach(node => {
                node.id = prefix + updateNum;
                updateNum++;
              });
            }
            
            newId = prefix + newNum;
          }
          
          const newNode = {
            id: newId,
            label: '新节点',
            children: [],
            actions: {
              table: false,
              image: false,
              formula: false,
              code: false
            }
          };
          
          siblings.splice(index + 1, 0, newNode);
          
          this.$nextTick(() => {
            this.startEdit(newNode);
          });
          break;
        }
        
        case 'addChild': {
          if (data.id.length >= 3) {
            this.$message.warning('最多只能添加三级大纲');
            return;
          }
          if (!data.children) {
            data.children = [];
          }
          const newId = this.generateNewId(data.id, 'child');
          const newNode = {
            id: newId,
            label: '新节点',
            children: [],
            actions: {
              table: false,
              image: false,
              formula: false,
              code: false
            }
          };
          data.children.push(newNode);
          this.$nextTick(() => {
            this.startEdit(newNode);
          });
          break;
        }
        
        case 'delete': {
          const isRootLevel = data.id.length === 1;
          const siblings = isRootLevel ? this.outlineData : (node.parent ? node.parent.data.children : []);
          
          if (!siblings) {
            console.error('Unable to find siblings array');
            return;
          }

          const index = siblings.findIndex(sibling => sibling.id === data.id);
          if (index === -1) {
            console.error('Unable to find current node in siblings');
            return;
          }

          // 删除当前节点
          siblings.splice(index, 1);

          // 更新后续节点的序号
          if (isRootLevel) {
            // 更新一级节点及其子节点
            const updateNodesAfterDelete = (nodes, startIndex) => {
              nodes.slice(startIndex).forEach((node, idx) => {
                const newBaseNum = startIndex + idx + 1;
                node.id = newBaseNum.toString();
                
                // 更新子节点
                if (node.children && node.children.length > 0) {
                  node.children.forEach((child, childIdx) => {
                    const updateChildrenRecursively = (childNode, parentId, childIndex) => {
                      childNode.id = parentId + (childIndex + 1);
                      if (childNode.children && childNode.children.length > 0) {
                        childNode.children.forEach((grandChild, grandChildIdx) => {
                          updateChildrenRecursively(grandChild, childNode.id, grandChildIdx);
                        });
                      }
                    };
                    updateChildrenRecursively(child, node.id, childIdx);
                  });
                }
              });
            };
            
            updateNodesAfterDelete(siblings, index);
          } else {
            // 更新同级节点的序号
            const prefix = data.id.slice(0, -1);
            const samePrefix = siblings.filter(node => node.id.startsWith(prefix));
            
            samePrefix.slice(index).forEach((node, idx) => {
              const newNum = parseInt(data.id.slice(-1), 10) + idx;
              node.id = prefix + newNum;
            });
          }
          break;
        }
      }
    },
    generateNewId(currentId, type) {
      if (type === 'sibling') {
        const parentId = currentId.slice(0, -1);
        const currentNum = parseInt(currentId.slice(-1));
        return parentId + (currentNum + 1);
      } else if (type === 'child') {
        if (currentId.length === 1) {
          // For first level nodes, find max child id
          const children = this.outlineData.find(item => item.id === currentId)?.children || [];
          const maxChildNum = children.length > 0
            ? Math.max(...children.map(child => parseInt(child.id.slice(currentId.length))))
            : 0;
          return currentId + (maxChildNum + 1);
        } else if (currentId.length === 2) {
          // For second level nodes
          const parentNode = this.outlineData.find(item => item.id === currentId[0]);
          const currentNode = parentNode?.children?.find(item => item.id === currentId);
          const children = currentNode?.children || [];
          const maxChildNum = children.length > 0
            ? Math.max(...children.map(child => parseInt(child.id.slice(currentId.length))))
            : 0;
          return currentId + (maxChildNum + 1);
        }
      }
      return currentId + '1';
    },
    generateSiblingId(currentId, existingIds) {
      // For root level nodes (single digit)
      if (currentId.length === 1) {
        const nums = existingIds.map(id => parseInt(id, 10));
        const maxNum = nums.length > 0 ? Math.max(...nums) : 0;
        return (maxNum + 1).toString();
      }
      
      // For nested nodes
      const prefix = currentId.slice(0, -1); // Get parent prefix
      const siblingNums = existingIds
        .filter(id => id.startsWith(prefix))
        .map(id => parseInt(id.slice(-1), 10));
      
      const maxNum = siblingNums.length > 0 ? Math.max(...siblingNums) : 0;
      return prefix + (maxNum + 1).toString();
    },
    startEdit(data) {
      this.editingNode = data.id;
      this.editingLabel = data.label;
      this.$nextTick(() => {
        this.$refs.titleInput.focus();
      });
    },
    handleTitleBlur(data) {
      if (this.editingLabel !== data.label) {
        data.label = this.editingLabel;
      }
      this.editingNode = null;
      this.editingLabel = '';
    },
    getTitleNumber(node, data) {
      const level = data.id.length;
      let index;

      if (level === 1) {
        index = this.outlineData.findIndex(item => item.id === data.id) + 1;
        return this.toChineseNumber(index) + '、';
      } else if (level === 2) {
        const parentIndex = parseInt(data.id[0]);
        index = parseInt(data.id[1]);
        return `${parentIndex}.${index}`;
      } else {
        const parentIndex = parseInt(data.id[0]);
        const subIndex = parseInt(data.id[1]);
        index = parseInt(data.id[2]);
        return `${parentIndex}.${subIndex}.${index}`;
      }
    },

    toChineseNumber(num) {
      const chineseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      return chineseNumbers[num - 1] || num.toString();
    }
  }
}
</script>

<style scoped>
.outline-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.outline-header {
  padding: 16px;
  background: linear-gradient(135deg, #74b9ff 0%, #5ca8ff 100%);
  color: white;
  border-radius: 8px 8px 0 0;
}

.tip {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.tip i {
  font-size: 16px;
}

.outline-content {
  flex: 1;
  padding: 16px 24px;
  overflow-y: auto;
  position: relative;
}

.el-tree {
  font-size: 14px;
  background: transparent;
  color: #303133;
}

/* 树节点样式 */
.el-tree >>> .el-tree-node {
  margin: 8px 0;
}

.el-tree >>> .el-tree-node__content {
  height: 24px !important;
  line-height: 24px !important;
  padding-right: 16px;
}

.el-tree >>> .el-tree-node__children {
  padding-left: 24px;
  border-left: 1px solid #e4e7ed;
}

/* 节点内容样式 */
.custom-tree-node {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
}

.node-title {
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 14px;
  line-height: 24px;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 120px;
}

.node-title span {
  cursor: text;
}

.node-title .el-input {
  width: calc(100% - 24px);
}

.node-title .el-input__inner {
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
}

.title-number {
  margin-right: 8px;
  color: #666;
  font-weight: normal;
}

/* 操作图标样式 */
.node-actions {
  position: absolute;
  right: 24px;
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 0 4px;
  user-select: none;
}

.node-actions i {
  font-size: 16px;
  color: #909399;
  cursor: pointer;
  transition: color 0.2s;
}

.node-actions i:hover {
  color: #409EFF;
}

.node-actions i.is-active {
  color: #409EFF;
  font-weight: bold;
}

.node-actions .el-dropdown {
  margin-left: 2px;
}

.node-actions .el-icon-more {
  font-size: 16px;
}

/* 提示区域样式 */
.outline-footer {
  padding: 12px;
  border-top: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
}

.left-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hint-text {
  color: #909399;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.hint-text i {
  color: #74b9ff;
}

/* 按钮样式 */
.outline-footer :deep(.el-button--success.is-plain) {
  color: #74b9ff;
  background: rgba(116, 185, 255, 0.1);
  border-color: #74b9ff;
}

.outline-footer :deep(.el-button--success.is-plain:hover) {
  color: #fff;
  background-color: #74b9ff;
  border-color: #74b9ff;
}

.outline-footer :deep(.el-button.is-plain) {
  color: #909399;
  border-color: #e4e7ed;
}

.outline-footer :deep(.el-button.is-plain:hover) {
  color: #74b9ff;
  border-color: #74b9ff;
  background-color: rgba(116, 185, 255, 0.1);
}

/* 表单底部 */
.form-footer {
  padding: 24px;
  text-align: center;
  border-top: 1px solid #e4e7ed;
  margin-top: 20px;
}

.form-footer .el-button {
  min-width: 120px;
  margin: 0 10px;
}

/* ... 其他样式保持不变 ... */

/* 悬停效果 */
.el-tree-node__content:hover {
  background-color: rgba(116, 185, 255, 0.05);
}

/* 隐藏叶子节点的折叠图标 */
.el-tree >>> .el-tree-node.is-leaf > .el-tree-node__content .el-tree-node__expand-icon {
  visibility: hidden;
}
</style>