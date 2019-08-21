<template>
  <el-card shadow="hover">
    <el-row>
      <el-col :xs="24" :sm="14" :md="10">
        <the-resource-tree
          ref="tree"
          @nodeClick="onNodeClick"
          @nodeAdd="onNodeAdd"
          @nodeDel="onNodeDel"
          @nodeAddApi="onNodeAddApi"
        ></the-resource-tree>
      </el-col>
      <el-col :xs="24" :sm="10" :md="12">
        <the-resource-form
          ref="form"
          @formSubmit="onFormSubmit"
        ></the-resource-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import TheResourceTree from './TheResourceTree'
import TheResourceForm from './TheResourceForm'

export default {
  name: 'resource',
  components: {
    TheResourceTree,
    TheResourceForm
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    onNodeClick(formData) {
      this.$refs.form.onNodeClick(formData)
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
    onFormSubmit(parentId) {
      this.$refs.tree.onFormSubmit(parentId)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>