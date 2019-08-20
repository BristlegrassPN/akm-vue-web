<template>
  <el-select
    style="width: 100%"
    :value="value"
    filterable
    clearable
    :placeholder="placeholder"
    @change="handleChange"
    :disabled="disabled"
  >
    <el-option
      v-for="(item, index) in data"
      :key="index"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'akm-select',
  props: ['value', 'placeholder', 'data', 'disabled'],
  methods: {
    handleChange(value) {
      this.$emit('update:value', value)
      this.$emit('change', value)
    }
  }
}
</script>
