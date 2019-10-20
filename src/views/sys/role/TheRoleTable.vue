<template>
  <el-table
    ref="table"
    :data="data"
    highlight-current-row
    @current-change="onCurrentChange">
    <el-table-column
      width="120"
      prop="name"
      label="角色名称">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注">
    </el-table-column>
    <el-table-column
      width="60"
      prop="seq"
      label="排序">
    </el-table-column>
    <el-table-column
      width="80"
      prop="enable"
      label="启用状态">
      <template slot-scope="scope">
        <el-switch :value="scope.row.enable" disabled></el-switch>
      </template>
    </el-table-column>
    <el-table-column
      width="120"
      prop="clientType"
      label="角色分类">
      <template slot-scope="scope">
        {{scope.row.clientType | translateDictValue(clientTypeList)}}
      </template>
    </el-table-column>
    <el-table-column
      width="180"
      class-name="akm-no-padding"
      label="操作">
      <template slot-scope="scope">
        <el-popover
          placement="top"
          width="160"
          v-model="scope.row.visible">
          <p><i class="el-icon-question akm-del-icon-question"></i>确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" @click="scope.row.visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="del(scope.row,$event)">确定</el-button>
          </div>
          <el-button type="text" slot="reference" style="color: #f56c6c" @click="$event.stopPropagation()">删除
          </el-button>
        </el-popover>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="edit(scope.row,$event)">编辑</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="set(scope.row,$event)">分配权限</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TheRoleTable',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      clientTypeList: [],
    }
  },
  created() {
    this.$helper.fetchDictData('client_type').then(res => {
      this.clientTypeList = res
    })
  },
  methods: {
    onCurrentChange(val) {
      this.$emit('current-change', val)
    },
    del(val, event) {
      event.stopPropagation()
      this.$emit('del-row', val)
    },
    edit(val, event) {
      event.stopPropagation()
      this.$emit('edit-row', val)
    },
    set(val, event) {
      event.stopPropagation()
      this.$emit('set-resource', val)
    },
    clearCurrentRow() {
      this.$refs.table.setCurrentRow()
    }
  }
}
</script>

<style lang="scss" scoped>


</style>