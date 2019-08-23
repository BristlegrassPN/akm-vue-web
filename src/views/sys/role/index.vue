<template>
  <el-card shadow="hover" v-loading="loading">
    <el-row>
      <el-col :xs="24" :sm="16">
        <div>
          <el-button type="primary" size="medium" @click="reset">新增角色</el-button>
        </div>
        <the-role-table
          ref="table"
          :data="tableData"
          @del-row="onDelRow"
          @edit-row="onEditRow"
          @set-resource="onSetResource"
          @current-change="onCurrentChange"
        ></the-role-table>
      </el-col>
      <el-col :xs="24" :sm="8">
        <the-role-form
          v-show="formShow"
          ref="form"
          :data="formData"
          @formReset="reset"
          @formSubmit="onFormSubmit"
        ></the-role-form>
        <the-role-resource-tree
          v-show="!formShow"
          :formData="formData"
          @update-resource="onUpdateResource"
        ></the-role-resource-tree>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import TheRoleTable from './TheRoleTable'
import TheRoleForm from './TheRoleForm'
import TheRoleResourceTree from './TheRoleResourceTree'

export default {
  name: 'role',
  components: {
    TheRoleTable,
    TheRoleForm,
    TheRoleResourceTree,
  },
  data() {
    return {
      loading: false,

      formShow: false,

      tableData: [],
      selectedList: [],

      formData: {
        id: '',
        name: '',
        remark: '',
        seq: '',
        clientType: 1,
        enable: true,
        resourceIdList: []
      },
    }
  },
  created() {
    this.fetchTableData()
  },
  methods: {
    fetchTableData() {
      this.$http.post('/sys/role/view/findAll').then(res => {
        this.tableData = res
      })
    },
    onCurrentChange(data) {
      data && (this.formData = this.$utils.clone(data))
    },
    onDelRow(data) {
      this.$http.del('/sys/role/op/batchDel', [data.id]).then(() => {
        this.$helper.successMessage('删除成功')
        this.reset()
      })
    },
    onEditRow(data) {
      this.formShow = true
      this.formData = this.$utils.clone(data)
    },
    onSetResource(data) {
      this.formShow = false
      this.formData = this.$utils.clone(data)
    },
    reset() {
      this.formData = {
        id: '',
        name: '',
        remark: '',
        seq: '',
        clientType: 1,
        enable: true,
        resourceIdList: []
      }
      this.$refs.form.focusInput()
      this.$refs.table.clearCurrentRow()
      this.fetchTableData()
      this.formShow = true
    },
    onFormSubmit() {
      this.loading = true
      this.$http.post('/sys/role/op/insertOrUpdate', this.formData).then(() => {
        this.loading = false
        this.$helper.successMessage(this.formData.id ? '修改成功' : '新增成功')
        this.reset()
      }).catch(() => {
        this.loading = false
      })
    },
    onUpdateResource(roleId, resourceIdList) {
      this.tableData.find(item => item.id === roleId).resourceIdList = resourceIdList
      this.tableData.forEach((item, index) => {
        if (item.id === roleId) {
          item.resourceIdList = resourceIdList
          this.$set(this.tableData, index, item)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>