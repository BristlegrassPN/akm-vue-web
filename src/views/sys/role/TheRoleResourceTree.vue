<template>
  <div v-loading="loading">
    <div>分配资源<span v-show="formData.id">【{{formData.name}}】</span></div>
    <el-input
      class="filter-input"
      placeholder="根据资源名称和资源编码过滤"
      size="small"
      v-model="filterText">
    </el-input>
    <el-tree
      ref="tree"
      check-strictly
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
  name: 'TheRoleResourceTree',
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    formData() {
      this.collapseAll()
      this.$refs.tree.setCheckedKeys(this.formData.resourceIdList)
      this.defaultExpandedKeys = this.formData.resourceIdList
    }
  },
  props: {
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      filterText: '',

      resourceList: [],

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
      this.$http.post('/sys/resource/view/findAll').then(list => {
        this.resourceList = list
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
      let checkedNodes = checked.checkedNodes
      // 由于tree设置check-strictly属性，节点之间选中没有关系，选中子节点需要找出父节点并选中
      checkedNodes.forEach(item => this.getParent(item, checkedNodes))
      // 找出节点id并去重
      let resourceIdList = Array.from(new Set(checkedNodes.map(item => item.id)))
      debugger
      this.$refs.tree.setCheckedKeys(resourceIdList)
      this.loading = true
      this.$http.post(`/sys/role/op/updateResourceByRoleId?roleId=${this.formData.id}`, resourceIdList).then(() => {
        this.loading = false
        this.$helper.successMessage()
        this.$emit('update-resource', this.formData.id, resourceIdList)
      }).catch(() => {
        this.$helper.errorMessage()
        this.loading = false
      })
    },
    // 找出node节点的所有父节点
    getParent(node, parentNodes) {
      if (node.parentId === '0') {
        return parentNodes
      }
      let parentNode = this.resourceList.find(item => node.parentId === item.id)
      parentNodes.push(parentNode)
      this.getParent(parentNode, parentNodes)
    },
    collapseAll() {
      this.$refs.tree.store._getAllNodes().forEach(node => node.expanded = false)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1 || data.uri.indexOf(value) !== -1
    },
    reset() {
      this.$refs.tree.setCheckedKeys([])
      this.defaultExpandedKeys = []
      this.collapseAll()
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