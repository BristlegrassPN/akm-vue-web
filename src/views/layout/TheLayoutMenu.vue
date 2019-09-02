<template>
  <div>
    <el-menu
      router
      default-active="2-1"
      class="akm-layout-menu"
      @open="handleOpen"
      @close="handleClose"
      active-text-color="#fff">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2-1">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/layout/api">
          <i class="el-icon-star-on"></i>
          <span slot="title">后台Api管理</span>
        </el-menu-item>
        <el-menu-item index="/layout/resource">
          <i class="el-icon-star-on"></i>
          <span slot="title">系统资源管理</span>
        </el-menu-item>
        <el-menu-item index="/layout/role">
          <i class="el-icon-star-on"></i>
          <span slot="title">系统角色管理</span>
        </el-menu-item>
        <el-menu-item index="/layout/user">
          <i class="el-icon-star-on"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-star-on"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-star-on"></i>
        <span slot="title">导航四</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'TheLayoutMenu',
  data() {
    return {}
  },
  created() {
    this.fetchMenuData()
  },
  methods: {
    fetchMenuData() {
      this.$http.post('/sys/resource/view/findMenuResource').then(list => {
        let tree = this.$utils.listToTree(list)
        debugger
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss">
.akm-layout-menu {
  width: 220px;
  border-right: none;
  .el-submenu__title {
    background: #001529;
    color: #ddd;
    height: 50px;
    line-height: 50px;
    &:hover {
      color: #fff;
      background: rgba(0, 21, 41, 0.9);
      i {
        color: #fff;
      }
    }
  }
  .el-submenu.is-active {
    .el-submenu__title {
      color: #fff;
      i {
        color: #fff;
      }
    }
    .el-menu-item {
      background: #000c17;
    }
    .el-menu-item.is-active {
      background: #409EFF;
    }
  }
  .el-menu-item-group__title {
    background: #001529;
    color: #aaa;
  }
  .el-menu-item {
    background: #001529;
    color: #ddd;
    height: 44px;
    line-height: 44px;
    &:hover {
      color: #fff;
      background: rgba(0, 21, 41, 0.9);
    }
  }
  .el-menu-item.is-disabled {
    color: #aaa;
    opacity: 1;
    background: #001529 !important;
    &:hover {
      color: #aaa;
    }
  }
}
</style>