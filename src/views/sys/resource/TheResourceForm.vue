<template>
  <el-form :model="formData" :rules="rules" ref="form" label-width="100px" v-loading="loading" class="form">
    <el-form-item label="是否启用">
      <el-switch v-model="formData.enable"></el-switch>
    </el-form-item>
    <el-form-item label="资源类型" prop="type">
      <akm-select
        :data="resourceTypeList"
        :value.sync="formData.type"
        size="medium"
        placeholder="请选择资源类型"
      ></akm-select>
    </el-form-item>
    <el-form-item label="资源名称" prop="name">
      <el-input v-model="formData.name" clearable ref="nameInput" placeholder="如：用户管理" size="medium"></el-input>
    </el-form-item>
    <el-form-item label="资源编码" prop="code">
      <el-input v-model="formData.code" clearable placeholder="如：sys:add；前端根据该值判断是否显示菜单、按钮" size="medium"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="seq">
      <el-input type="number" min="0" v-model="formData.seq" clearable size="medium"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="textarea" autosize v-model="formData.remark" clearable size="medium"></el-input>
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
  name: 'TheResourceForm',
  watch: {
    clientType() {
      this.reset()
    }
  },
  props: {
    clientType: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      resourceTypeList: [],

      formData: {
        id: '',
        parentId: '0',
        type: 1,
        name: '',
        code: '',
        remark: '',
        seq: '',
        clientType: this.clientType,
        enable: true,
        apiIdList: []
      },
      rules: {
        type: [
          { required: true, message: '请选择资源类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请选择资源类型', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请选择资源类型', trigger: 'change' }
        ],
      },
    }
  },
  created() {
    this.$helper.fetchDictData('resource_type').then(res => {
      this.resourceTypeList = res
    })
  },
  methods: {
    reset() {
      this.$refs.form.resetFields()
      this.formData.id = ''
      this.formData.parentId = '0'
      this.formData.clientType = this.clientType
      this.$refs.nameInput.focus()
      this.$emit('formReset')
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.post('/sys/resource/op/insertOrUpdate', this.formData).then(() => {
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
    onNodeClick(formData) {
      this.formData = formData
    },
    onNodeAdd(parentId) {
      this.reset()
      this.formData.parentId = parentId
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding-right: 30px;
}
</style>