<template>
  <div v-loading="loading">
    <div>分配Api<span v-show="formData.id">【{{formData.name}}】</span></div>
    <el-input
      class="filter-input"
      placeholder="根据Api名称和地址过滤"
      size="small"
      v-model="filterText">
    </el-input>
    <el-tree
      v-show="show"
      ref="tree"
      :props="treeProps"
      :data="treeData"
      node-key="id"
      show-checkbox
      :default-expanded-keys="defaultExpandedKeys"
      :filter-node-method="filterNode"
      @check="onCheck">
      <div class="custom-tree-node" slot-scope="{ node }">
        <div> {{ node.label }}</div>
      </div>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'TheResourceApiTree',
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    return {
      show: false,
      loading: false,
      filterText: '',

      formData: {},

      defaultExpandedKeys: [],
      treeData: [],
      treeProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.fetchTreeData()
  },
  methods: {
    fetchTreeData() {
      this.$http.post('/sys/api/view/findAll').then(list => {
        this.treeData = this.buildTree('0', list)
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
    onCheck(data, checked) {
      // 排除api目录类型，只保留uri类型，数据库只记录资源和uri的关系
      let apiIdList = checked.checkedNodes.filter(node => node.type !== 1).map(node => node.id)
      this.loading = true
      this.$http.post(`/sys/resource/op/updateApiByResourceId?resourceId=${this.formData.id}`, apiIdList).then(() => {
        this.loading = false
        this.$helper.successMessage()
        this.$emit('updateApi', this.formData.id, apiIdList)
      }).catch(() => {
        this.$helper.errorMessage()
        this.loading = false
      })
    },
    collapseAll() {
      this.$refs.tree.store._getAllNodes().forEach(node => node.expanded = false)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1 || data.uri.indexOf(value) !== -1
    },
    onNodeClick(formData) {
      if (formData.type === 1) { // 资源类型为目录，不需要分配api
        this.show = false
        return
      }
      this.formData = formData
      this.collapseAll()
      this.show = true
      this.$refs.tree.setCheckedKeys(formData.apiIdList)
      this.defaultExpandedKeys = formData.apiIdList
    },
    reset() {
      this.$refs.tree.setCheckedKeys([])
      this.defaultExpandedKeys = []
      this.collapseAll()
      this.show = false
    },
  }
}
</script>

<style lang="scss" scoped>
.filter-input {
  margin-top: 6px;
  width: 170px;
}

.custom-tree-node {
  font-size: 14px;
  padding-left: 4px;
}
</style>