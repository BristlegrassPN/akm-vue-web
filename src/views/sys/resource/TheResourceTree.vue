<template>
  <div>
    <el-row>
      <el-button @click="expandAll(true)" size="small" :disabled="!treeData.length">全部展开</el-button>
      <el-button @click="expandAll(false)" size="small" :disabled="!treeData.length">全部折叠</el-button>
      <el-button type="primary" @click="addNode('0')" size="small">新增根结点</el-button>
    </el-row>
    <el-input
      class="filter-input"
      placeholder="根据资源名称和资源编码过滤"
      size="small"
      v-model="filterText">
    </el-input>
    <el-tree
      ref="tree"
      :props="treeProps"
      :data="treeData"
      :default-expand-all="defaultExpandAll"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
      :filter-node-method="filterNode"
      @node-expand="onExpand"
      @node-collapse="onCollapse"
      @node-click="onNodeClick">
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <div :class="{ disable: !data.enable }">{{ node.label }}</div>
        <div>
          <el-button
            type="text"
            size="mini"
            @click="addNode(data.id,$event)">
            新增子节点
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="delNode(data,$event)">
            删除
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="addApi(data,$event)">
            分配Api
          </el-button>
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'TheResourceTree',
  data() {
    return {
      filterText: '',

      treeData: [],
      treeProps: {
        children: 'children',
        label: 'name'
      },
      defaultExpandAll: false,
      checkedKeys: [],
      defaultExpandedKeys: [],
      expandedKeys: [],
    }
  },
  created() {
    this.fetchTreeData()
  },
  methods: {
    fetchTreeData() {
      this.$http.post('/sys/resource/view/findAll').then(list => {
        this.treeData = this.buildTree('0', list)
        this.defaultExpandedKeys = this.expandedKeys
      })
    },
    buildTree(parentId, list) {
      let nodes = this.getChildren(parentId, list)
      nodes.forEach(item => {
        let children = this.buildTree(item.id, list)
        children.length && (item.children = this.buildTree(item.id, list))
      })
      return nodes
    },
    getChildren(parentId, list) {
      return list.filter(item => item.parentId === parentId)
    },
    onExpand(data) {
      this.expandedKeys.push(data.id)
    },
    onCollapse(data) {
      this.expandedKeys = this.expandedKeys.filter(key => key !== data.id)
    },
    // 点击node更新表单数据
    onNodeClick(data) {
      let formData = { ...data }
      delete formData.children
      this.$emit('nodeClick', formData)
    },
    addNode(parentId, event) {
      event && event.stopPropagation()
      this.$emit('nodeAdd', parentId)
    },
    delNode(data, event) {
      event.stopPropagation()
      let ids = []
      this.getNodeId(data, ids)
      this.batchDel(ids)
    },
    getNodeId(data, ids) {
      if (data.children && data.children.length) {
        data.children.forEach(item => this.getNodeId(item, ids))
      }
      ids.push(data.id)
    },
    expandAll(bool) {
      this.defaultExpandAll = bool
      this.$refs.tree.store._getAllNodes().forEach(node => node.expanded = bool)
    },
    addApi(data, event) {
      event.stopPropagation()
      this.$emit('nodeAddApi', parentId)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1 || data.code.indexOf(value) !== -1
    },
    batchDel(ids) {
      if (!ids || ids.length === 0) {
        return
      }
      this.$helper.warningConfirm(`即将删除${ids.length}条记录，确定删除吗？`).then(() => {
        this.$emit('nodeDel')
        this.$http.del('/sys/resource/op/batchDel', ids).then(() => {
          this.$helper.successMessage('删除成功')
          this.expandedKeys = this.expandedKeys.filter(key => ids.indexOf(key) === -1)
          this.fetchTreeData()
        }).catch(() => {
        })
      }).catch(() => {
      })
    },
    onFormSubmit(parentId) {
      // 新增子节点展开父节点
      if (!this.expandedKeys.includes(parentId)) {
        this.expandedKeys.push(parentId)
      }
      this.fetchTreeData()
    },
  }
}
</script>

<style lang="scss" scoped>
.filter-input {
  margin: 4px 0;
  width: 270px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.disable {
  text-decoration: line-through;
}
</style>