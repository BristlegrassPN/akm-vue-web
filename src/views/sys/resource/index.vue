<template>
  <div class="page-resource">
    <el-tabs v-model="activeTabName" type="card" @tab-click="onTabClick">
      <el-tab-pane
        v-for="(item, index) in clientTypeList"
        :key="index"
        :label="item.label"
        :name="item.value">
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :xs="24" :sm="8" class="resource-item">
        <the-resource-tree
          ref="tree"
          :clientType="clientType"
          @nodeClick="onNodeClick"
          @nodeAdd="onNodeAdd"
          @nodeDel="onNodeDel"
        ></the-resource-tree>
      </el-col>
      <el-col :xs="24" :sm="8" class="resource-item form-warp">
        <the-resource-form
          ref="form"
          :clientType="clientType"
          @formReset="onFormReset"
          @formSubmit="onFormSubmit"
        ></the-resource-form>
      </el-col>
      <el-col :xs="24" :sm="8" class="resource-item">
        <the-resource-api-tree
          ref="apiTree"
          @updateApi="onUpdateApi"
        ></the-resource-api-tree>
      </el-col>
    </el-row>
  </div>
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
    return {
      activeTabName: '1',
      clientType: 1,
      clientTypeList: []
    }
  },
  created() {
    this.$helper.fetchDictData('client_type').then(res => {
      res.forEach(item => {
        item.value = String(item.value)
      })
      this.clientTypeList = res
    })
  },
  methods: {
    onTabClick() {
      this.clientType = Number(this.activeTabName)
      this.$refs.apiTree.reset()
    },
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
    onFormReset() {
      this.$refs.apiTree.reset()
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
.resource-item{
  padding: 16px;
}
.form-warp {
  border-left: 1px solid #DCDFE6;
  border-right: 1px solid #DCDFE6;
}
</style>
<style lang="scss">
.page-resource {
  background: #fff;
  .el-tabs__header {
    margin: 0;
  }
}
</style>