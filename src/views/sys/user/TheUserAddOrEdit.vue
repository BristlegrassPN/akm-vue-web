<template>
  <div>
    <el-form
      :model="data"
      ref="form"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-show="!data.id">
        <el-input v-model="data.password" clearable></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="data.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input type="number" v-model="data.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="data.enable"></el-switch>
      </el-form-item>
      <el-form-item label="账号过期时间">
        <el-date-picker
          v-model="data.expiredTime"
          value-format="timestamp"
          type="datetime"
          clearable
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="分配角色">
        <el-select
          style="width: 100%"
          v-model="data.roleIdList"
          multiple
          filterable
          default-first-option
          placeholder="请给用户选择角色">
          <el-option-group
            v-for="group in roleGroup"
            :key="group.value"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { elementValidator, regex } from '@/providers/validate'

export default {
  name: 'TheUserAddOrEdit',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      roleGroup: [],

      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { validator: elementValidator(regex.username, '只能是字母或数字，4到16位字符'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        name: [
          { validator: elementValidator(regex.name, '只能是字母或中文，2到16位字符'), trigger: 'blur' }
        ],
        phone: [
          { validator: elementValidator(regex.phone, '手机号码输入不合法'), trigger: 'blur' }
        ],
      },
    }
  },
  created() {
    this.fetchAllRole()
  },
  methods: {
    fetchAllRole() {
      this.$http.post(`/sys/role/view/findAll?enable=true`).then(res => {
        let roleGroup = []
        res.forEach(item => {
          let group = roleGroup.find(group => group.value === item.clientType)
          if (group) {
            group.options.push({
              label: item.name,
              value: item.id
            })
          } else {
            roleGroup.push({
              label: item.clientTypeName,
              value: item.clientType,
              options: [{
                label: item.name,
                value: item.id
              }]
            })
          }
        })
        this.roleGroup = roleGroup
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>