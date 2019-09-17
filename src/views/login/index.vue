<template>
  <div class="login-page">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">登陆</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { elementValidator, regex } from '@/providers/validate'

export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { validator: elementValidator(regex.username, '只能是字母或数字，4到16位字符'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
      }
    }
  },
  created() {
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #fff;
  .login-form {
    width: 50%;
    max-width: 400px;
    min-width: 200px;
  }
}
</style>