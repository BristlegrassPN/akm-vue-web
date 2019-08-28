<template>
  <div>
    <el-table
      :data="data"
    >
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        width="120"
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        width="80"
        prop="name"
        label="用户姓名">
      </el-table-column>
      <el-table-column
        width="120"
        prop="phone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        width="80"
        align="center"
        prop="enable"
        label="是否启用">
        <template slot-scope="scope">
          {{scope.row.enable?'是':'否'}}
        </template>
      </el-table-column>
      <el-table-column
        width="140"
        prop="expiredTime"
        label="账号过期时间">
        <template slot-scope="scope">
          {{scope.row.expiredTime | formatDate('yyyy-MM-dd HH:mm')}}
        </template>
      </el-table-column>
      <el-table-column
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
          <el-button type="text" @click="set(scope.row,$event)">重置密码</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="edit(scope.row,$event)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TheUserTable',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>

</style>