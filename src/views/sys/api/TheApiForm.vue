<template>
  <el-form :model="formData" :rules="rules" ref="form" label-width="120px" class="tree-form" v-loading="loading">
    <el-form-item label="Api名称" prop="name">
      <el-input v-model="formData.name" clearable ref="nameInput" placeholder="如：用户管理"></el-input>
    </el-form-item>
    <el-form-item label="Api地址" prop="uri">
      <el-input v-model="formData.uri" clearable placeholder="如：/user/op/**"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="seq">
      <el-input type="number" min="0" v-model="formData.seq" clearable></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="textarea" v-model="formData.remark" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-show="!formData.id" type="primary" @click="submit" size="medium">新增</el-button>
      <el-button v-show="formData.id" type="success" @click="submit" size="medium">编辑</el-button>
      <el-button @click="reset" size="medium">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TheApiForm',
  data() {
    const validateUri = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_\-\*\/]+$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('接口uri输入不合法'))
      }
    }
    return {
      loading: false,

      formData: {
        id: '',
        parentId: 0,
        name: '',
        uri: '',
        seq: '',
        remark: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入接口名称', trigger: 'change' }
        ],
        uri: [
          { required: true, message: '请输入接口uri', trigger: 'change' },
          { validator: validateUri, trigger: 'change' }
        ]
      },
    }
  },
  created() {

  },
  methods: {
    reset() {
      this.$refs.form.resetFields()
      this.formData.id = ''
      this.formData.parentId = '0'
      this.$refs.nameInput.focus()
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.post('/sys/api/op/insertOrUpdate', this.formData).then(() => {
            this.loading = false
            this.$helper.successMessage(this.formData.id ? '修改成功' : '新增成功')
            this.$emit('formSubmit', this.formData.parentId)
            this.reset()
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    onNodeClick(data) {
      this.formData = data
    },
    onNodeAdd(parentId) {
      this.reset()
      this.formData.parentId = parentId
    },
  }

}
</script>

<style lang="scss" scoped>
.tree-form {
  margin-top: 30px;
}
</style>