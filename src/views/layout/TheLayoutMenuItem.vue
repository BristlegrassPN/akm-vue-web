<template>
  <el-submenu
    v-if="menu.type === 1"
    :index="menu.id"
    :data="menu"
  >
    <template slot="title">
      <i :class="menu.icon"></i>
      <span>{{ menu.name }}</span>
    </template>
    <the-layout-menu-item
      v-for="subMenu in menu.children"
      :key="subMenu.id"
      :menu="subMenu"
      @selecte="select(subMenu)"
    ></the-layout-menu-item>
  </el-submenu>

  <el-menu-item
    v-else
    :index="menu.uri"
    :data="menu"
    @click="select(menu)"
  >
    <i :class="menu.icon"></i>
    <span slot="title">{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'TheLayoutMenuItem',
  props: {
    menu: {
      type: Object,
      required: true
    },
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    select(menu) {
      console.log(menu)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>