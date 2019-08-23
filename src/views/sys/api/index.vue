<template>
  <el-card shadow="hover">
    <el-row>
      <el-col :xs="24" :sm="14" :md="10">
        <the-api-tree
          ref="tree"
          @nodeClick="onNodeClick"
          @nodeAdd="onNodeAdd"
          @nodeDel="onNodeDel"
        ></the-api-tree>
      </el-col>
      <el-col :xs="24" :sm="10" :md="12">
        <the-api-form
          ref="form"
          @formSubmit="onFormSubmit"
        ></the-api-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import TheApiTree from './TheApiTree'
import TheApiForm from './TheApiForm'

export default {
  name: 'api',
  components: {
    TheApiTree,
    TheApiForm
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
    onFormSubmit(parentId) {
      this.$refs.tree.onFormSubmit(parentId)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>