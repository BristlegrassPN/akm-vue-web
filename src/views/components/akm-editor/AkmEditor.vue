<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>
<script>
// 文档： https://www.kancloud.cn/wangfupeng/wangeditor3/332599
import E from 'wangeditor'

export default {
  name: 'akm-editor',
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor)
    // 自定义菜单配置
    this.editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      // 'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      // 'video',  // 插入视频
      // 'code',  // 插入代码
      'undo',  // 撤销
      // 'redo'  // 重复
    ]
    this.editor.create()
  },
  methods: {
    // 返回editor实例，可直接通过此实例调用editor方法
    getEditor() {
      return this.editor
    },
    set(html) {
      this.editor.txt.html(html)
    },
    get() {
      return this.editor.txt.html()
    },
    clear() {
      this.editor.txt.clear()
    },
    append(html) {
      this.editor.txt.append(html)
    },
  }
}
</script>
