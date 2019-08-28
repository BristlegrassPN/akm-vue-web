<template>
  <div>
    <el-card shadow="hover" class="card-form-warp">
      <el-form
        inline
        :model="condition"
        ref="form"
        label-width="120px"
        @keydown.enter.native="query"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="condition.username"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="condition.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="condition.phone"></el-input>
        </el-form-item>
        <el-button type="primary" @click="query" size="medium">查询</el-button>
        <el-button type="warning" @click="reset" size="medium">清空查询条件</el-button>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <div>
        <el-button type="primary" size="medium" @click="add">新增用户</el-button>
      </div>
      <the-user-table
        :data="tableData"
        @del-row="onDelRow"
        @edit-row="onEditRow"
      ></the-user-table>
      <div class="block">
        <el-pagination
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
          :current-page="pagination.pageNum"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </el-card>

    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="500px">
      <the-user-add-or-edit
        :data="formData"
      ></the-user-add-or-edit>
      <div class="akm-text-right">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import TheUserTable from './TheUserTable'
import TheUserAddOrEdit from './TheUserAddOrEdit'

export default {
  name: 'user',
  components: { TheUserTable, TheUserAddOrEdit },
  data() {
    return {
      loading: false,

      tableData: [],

      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },

      condition: {
        username: '',
        name: '',
        phone: '',
      },

      dialog: {
        title: '新增',
        visible: false,
      },

      defaultFormData: {},
      formData: {
        id: '',
        username: '',
        password: '123456',
        name: '',
        phone: '',
        enable: true,
        expiredTime: '',
        roleIdList: []
      },
    }
  },
  created() {
    this.defaultFormData = this.formData
    this.fetchTableData()
  },
  methods: {
    query() {
      this.pagination.currentPage = 1
      this.fetchTableData()
    },
    reset() {
      this.$refs.form.resetFields()
      this.query()
    },
    fetchTableData() {
      this.$http.post('/sys/user/view/findPage', {
        ...this.pagination,
        condition: this.condition
      }).then(res => {
        this.tableData = res.list
        this.pagination.total = res.total
      })
    },
    onCurrentChange(pageNum) {
      this.pagination.pageNum = pageNum
      this.fetchTableData()
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize
      this.fetchTableData()
    },
    // 新增用户
    add() {
      this.formData = this.$utils.clone(this.defaultFormData)
      this.formData.roleIdList = []
      this.dialog.title = '新增用户'
      this.dialog.visible = true
    },
    // 编辑用户记录
    onEditRow(row) {
      row.roleIdList = row.roleList.map(item => item.id)
      this.formData = this.$utils.clone(row)
      this.dialog.title = '编辑用户'
      this.dialog.visible = true
    },
    onDelRow(row) {
      this.$http.del(`/sys/user/op/del?id=${row.id}`).then(() => {
        this.$helper.successMessage('删除成功')
        this.fetchTableData()
      })
    },
    submit() {
      this.loading = true
      this.$http.post('/sys/user/op/insertOrUpdate', this.formData).then(res => {
        return this.$http.post(`/sys/user/op/updateRoleByUserId?userId=${res.userId}`, this.formData.roleIdList)
      }).then(() => {
        this.loading = false
        this.$helper.successMessage(this.formData.id ? '编辑成功' : '新增成功')
        this.fetchTableData()
        this.dialog.visible = false
      }).catch(() => {
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>