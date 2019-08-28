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
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码">
      </el-table-column>
      <el-table-column
        align="center"
        prop="enable"
        label="是否启用">
        <template slot-scope="scope">
          {{scope.row.enable?'是':'否'}}
        </template>
      </el-table-column>
      <el-table-column
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
          <el-button type="text" @click="updatePassword(scope.row,$event)">重置密码</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="edit(scope.row,$event)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="500px">
      <el-form
        label-width="100px"
      >
        <el-form-item label="请输入新密码">
          <el-input v-model="password" clearable></el-input>
        </el-form-item>
      </el-form>
      <div class="akm-text-right">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
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
    return {
      loading: false,
      dialog: {
        title: '重置密码',
        visible: false,
      },
      password: '123456',
      userId: '',
    }
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
    updatePassword(val, event) {
      event.stopPropagation()
      this.userId = val.id
      this.dialog.visible = true
    },
    submit() {
      this.$http.postQueryString('/sys/user/op/updatePassword', {
        id: this.userId,
        newPassword: this.password
      }).then(() => {
        this.dialog.visible = false
        this.$helper.successMessage('密码重置成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>