<template>
  <div>
    首页内容
    <akm-editor ref="editor"></akm-editor>
    <el-button type="primary" @click="setContent">设置内容</el-button>
    <el-button type="primary" @click="getContent">获取内容</el-button>
    <el-button type="primary" @click="clearContent">清空内容</el-button>
    <el-button type="primary" @click="appendContent">追加内容</el-button>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      editorContent: '<h2 style="text-align: center;"><span style="font-weight: bold;">hello world</span></h2>'
    }
  },
  methods: {
    setContent() {
      this.$refs.editor.set(this.editorContent)
    },
    getContent() {
      console.log(this.$refs.editor.get())
    },
    clearContent() {
      this.$refs.editor.clear()
    },
    appendContent() {
      this.$refs.editor.append(this.editorContent)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>