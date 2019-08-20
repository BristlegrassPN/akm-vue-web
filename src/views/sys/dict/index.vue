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
        <el-form-item label="字典类型" prop="type">
          <el-input v-model="condition.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="字典类型名称" prop="typeName">
          <el-input v-model="condition.typeName" clearable></el-input>
        </el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="warning" @click="reset">清空查询条件</el-button>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <div>
        <el-button type="primary" size="medium">新增</el-button>
        <el-button type="danger" size="medium" :disabled="!selectedList.length">删除</el-button>
      </div>
      <the-dict-table
        @selection-change="onSelectionChange"
        :data="tableData"
      ></the-dict-table>
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
  </div>
</template>

<script>
import TheDictTable from './TheDictTable'

export default {
  name: 'dict',
  components: {
    TheDictTable
  },
  data() {
    return {
      tableData: [],
      selectedList: [],

      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },

      condition: {
        type: '',
        typeName: '',
        remark: '',
      }
    }
  },
  created() {
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
      this.$http.post('/sys/dict/view/findPage', {
        ...this.pagination,
        condition: this.condition
      }).then(res => {
        this.tableData = res.list
        this.pagination.total = res.total
      })
    },
    onSelectionChange(val) {
      this.selectedList = val
    },
    onCurrentChange(pageNum) {
      this.pagination.pageNum = pageNum
      this.fetchTableData()
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize
      this.fetchTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
.card-form-warp {
  margin-bottom: 10px;
  .el-card__body {
    padding-bottom: 0;
  }
}
</style>