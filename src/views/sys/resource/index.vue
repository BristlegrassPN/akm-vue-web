<template>
  <el-card shadow="hover">
    <el-row>
      <el-col :xs="24" :sm="9" :md="9">
        <the-resource-tree
          ref="tree"
          @nodeClick="onNodeClick"
          @nodeAdd="onNodeAdd"
          @nodeDel="onNodeDel"
        ></the-resource-tree>
      </el-col>
      <el-col :xs="24" :sm="9" :md="9">
        <the-resource-form
          ref="form"
          @formReset="onFormReset"
          @formSubmit="onFormSubmit"
        ></the-resource-form>
      </el-col>
      <el-col :xs="24" :sm="6" :md="6">
        <the-resource-api-tree
          ref="apiTree"
          @updateApi="onUpdateApi"
        ></the-resource-api-tree>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import TheResourceTree from './TheResourceTree'
import TheResourceForm from './TheResourceForm'
import TheResourceApiTree from './TheResourceApiTree'

export default {
  name: 'resource',
  components: {
    TheResourceTree,
    TheResourceForm,
    TheResourceApiTree,
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    onNodeClick(formData) {
      this.$refs.form.onNodeClick(formData)
      this.$refs.apiTree.onNodeClick(formData)
    },
    onNodeAdd(parentId) {
      this.$refs.form.onNodeAdd(parentId)
    },
    onNodeDel() {
      this.$refs.form.reset()
    },
    onNodeAddApi() {
      debugger
    },
    onFormReset(parentId) {
      this.$refs.apiTree.onFormReset()
    },
    onFormSubmit(parentId) {
      this.$refs.tree.onFormSubmit(parentId)
    },
    onUpdateApi(resourceId, apiIdList) {
      this.$refs.tree.onUpdateApi(resourceId, apiIdList)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>