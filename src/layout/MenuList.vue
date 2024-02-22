<template>
  <div class="menu-lists">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu :router="true" @select="handleSelect" background-color="#0f3c63"  text-color="#fff" :default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </template>
          <el-menu-item index="/count">统计</el-menu-item>
      </el-submenu>
      <el-submenu index="/prod">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">商品管理</span>
        </template>
          <el-menu-item index="/prod/manage">商品管理</el-menu-item>
          <el-menu-item index="/prod/add">商品添加</el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MenuList',
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.layout.isCollapse
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
      this.$router.push(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;

}

.menu-lists {
  height: 100%;

  .el-menu-vertical-demo{
    height: 100%;

  }
}
</style>
