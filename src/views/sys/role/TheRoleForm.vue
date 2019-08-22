<template>
  <div>
    <el-form :model="data" :rules="rules" ref="form" label-width="100px" class="form">
      <el-form-item label="是否启用">
        <el-switch v-model="data.enable"></el-switch>
      </el-form-item>
      <el-form-item label="角色分类" prop="clientType">
        <akm-select
          :data="clientTypeList"
          :value.sync="data.clientType"
          size="medium"
          placeholder="请选择资源类型"
        ></akm-select>
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="data.name" clearable autofocus ref="nameInput" placeholder="如：用户管理"
                  size="medium"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="seq">
        <el-input type="number" min="0" v-model="data.seq" clearable size="medium"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" autosize v-model="data.remark" clearable size="medium"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-show="!data.id" type="primary" @click="submit" size="medium">新增</el-button>
        <el-button v-show="data.id" type="success" @click="submit" size="medium">编辑</el-button>
        <el-button @click="reset" size="medium">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TheRoleForm',
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
      clientTypeList: [],
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'change' }
        ],
      },
    }
  },
  created() {
    this.$helper.fetchDictData('client_type').then(res => {
      this.clientTypeList = res
    })
  },
  methods: {
    focusInput(){
      this.$refs.nameInput.focus()
    },
    reset() {
      this.$emit('formReset')
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('formSubmit')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>