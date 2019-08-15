<template>
  <el-card shadow="hover">
    <el-row>
      <el-col :span="12">
        左边
      </el-col>
      <el-col :span="12">
        <el-form :model="condition" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="接口名称" prop="name">
            <el-input v-model="condition.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="接口url" prop="url">
            <el-input v-model="condition.url" clearable></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="seq">
            <el-input type="number" min="0" v-model="condition.seq" clearable></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="condition.remark" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit()">立即创建</el-button>
            <el-button @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
export default {
  name: 'api',
  data() {
    const validateUrl = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_\-\*\\]+$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('接口url输入不合法'))
      }
    }
    return {
      condition: {
        name: '',
        url: '',
        seq: '',
        remark: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入接口名称', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请输入接口url', trigger: 'blur'},
          {validator: validateUrl, trigger: 'change'}
        ]
      },
    }
  },
  created() {
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.$http.post('/sys/api/op/insertOrUpdate', this.condition).then(res => {
          //   this.$message({
          //     message: '恭喜你，这是一条成功消息',
          //     type: 'success'
          //   });
          // })
          this.$helper.successMessage()
          
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

</style>