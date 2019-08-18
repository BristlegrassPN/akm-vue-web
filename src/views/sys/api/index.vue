<template>
  <el-card shadow="hover">
    <el-row>
      <el-col :xs="24" :sm="14" :md="10">
        <el-row type="flex" justify="space-between">
          <el-col>
            <el-button type="primary" @click="addNode(0)" size="small">新增根结点</el-button>
            <el-button type="danger"
                       @click="batchDel(checkedKeys)"
                       size="small"
                       :disabled="!checkedKeys.length"
                       :loading="delLoading">
              删除
            </el-button>
          </el-col>
          <el-col class="akm-text-right">
            <el-button @click="expandAll(true)" size="small" :disabled="!treeData.length">全部展开</el-button>
            <el-button @click="expandAll(false)" size="small" :disabled="!treeData.length">全部折叠</el-button>
          </el-col>
        </el-row>
        <el-input
          class="filter-input"
          placeholder="输入关键字进行过滤"
          size="small"
          v-model="filterText">
        </el-input>
        <el-tree
          ref="tree"
          :props="treeProps"
          :data="treeData"
          :default-expand-all="defaultExpandAll"
          node-key="id"
          show-checkbox
          :default-expanded-keys="defaultExpandedKeys"
          :filter-node-method="filterNode"
          @node-expand="onExpand"
          @node-collapse="onCollapse"
          @check="onCheck"
          @node-click="onNodeClick">
          <div class="custom-tree-node" slot-scope="{ node, data }">
            <div>{{ node.label }}</div>
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
            </div>
          </div>
        </el-tree>
      </el-col>
      <el-col :xs="24" :sm="10" :md="12">
        <el-form :model="condition" :rules="rules" ref="form" label-width="120px" class="tree-form">
          <el-form-item label="api名称" prop="name">
            <el-input v-model="condition.name" clearable ref="nameInput"></el-input>
          </el-form-item>
          <el-form-item label="api地址" prop="uri">
            <el-input v-model="condition.uri" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="seq">
            <el-input type="number" min="0" v-model="condition.seq" clearable></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="condition.remark" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit" size="medium" :loading="addLoading">
              <span v-if="condition.id">编辑</span>
              <span v-else>新增</span>
            </el-button>
            <el-button @click="reset" size="medium">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
export default {
  name: 'api',
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    const validateUri = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_\-\*\/]+$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('接口uri输入不合法'))
      }
    }
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

      addLoading: false,
      delLoading: false,

      condition: {
        id: '',
        parentId: 0,
        name: '',
        uri: '',
        seq: '',
        remark: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入接口名称', trigger: 'change'}
        ],
        uri: [
          {required: true, message: '请输入接口uri', trigger: 'change'},
          {validator: validateUri, trigger: 'change'}
        ]
      },
    }
  },
  created() {
    this.fetchTreeData()
  },
  methods: {
    fetchTreeData() {
      this.$http.post('/sys/api/view/findAll').then(list => {
        this.treeData = this.buildTree(0, list)
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
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1 || data.uri.indexOf(value) !== -1
    },
    getChildren(parentId, list) {
      return list.filter(item => item.parentId === parentId)
    },
    onExpand(data) {
      this.expandedKeys.push(data.id)
    },
    onCollapse(data) {
      this.expandedKeys = this.expandedKeys.filter(key => key !== data.id)
      console.log(this.expandedKeys)
    },
    onCheck(data, checked) {
      this.checkedKeys = checked.checkedKeys
    },
    // 点击node更新表单数据
    onNodeClick(data) {
      let formData = {...data}
      delete formData.children
      this.condition = formData
    },
    addNode(parentId, event) {
      event && event.stopPropagation()
      this.reset()
      this.$refs.nameInput.focus()
      this.condition.parentId = parentId
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
    batchDel(ids) {
      if (!ids || ids.length === 0) {
        return
      }
      this.$helper.warningConfirm(`即将删除${ids.length}条记录，确定删除吗？`).then(() => {
        this.delLoading = true
        this.reset()
        this.$http.del('/sys/api/op/batchDel', ids).then(() => {
          this.$helper.successMessage('删除成功')
          this.expandedKeys = this.expandedKeys.filter(key => ids.indexOf(key) === -1)
          this.fetchTreeData()
          this.delLoading = false
        }).catch(() => {
          this.delLoading = false
        })
      }).catch(() => {
      })
    },
    reset() {
      this.$refs.form.resetFields()
      this.condition.id = ''
      this.condition.parentId = 0
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.addLoading = true
          this.$http.post('/sys/api/op/insertOrUpdate', this.condition).then(() => {
            this.$helper.successMessage(this.condition.id ? '修改成功' : '新增成功')
            this.reset()
            this.fetchTreeData()
            this.addLoading = false
          }).catch(() => {
            this.addLoading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-input {
  margin: 4px 0;
  width: 260px;
}

.tree-form {
  margin-top: 30px;
  .el-form-item {
    margin-bottom: 12px;
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>