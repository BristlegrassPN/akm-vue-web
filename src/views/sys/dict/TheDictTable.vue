<template>
  <div>
    <el-table
      :data="data"
      @selection-change="onSelectionChange">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        prop="type"
        label="字典类型编码">
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="字典类型名称">
      </el-table-column>
      <el-table-column
        prop="label"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="value"
        label="值">
      </el-table-column>
      <el-table-column
        prop="seq"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        class-name="akm-no-padding"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row,$event)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'TheDictTable',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    onSelectionChange(val) {
      this.$emit('selection-change', val)
    },
    edit(val, event) {
      event.stopPropagation()
      // this.$emit('edit-row', val)
    },
  }
}
</script>