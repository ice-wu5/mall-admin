<template>
<div class="header-nav">
  <div class="header-list">
    <el-button @click="changeCollapse"  :icon="isCollapse?`el-icon-s-unfold`:`el-icon-s-fold`" ></el-button>
    <div class="breadcrumb">
      <el-breadcrumb separator="/" style="display:inline-block;margin-left:5px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userInfo">
      <ul>
        <li> <span>用户信息</span>
          <i class="el-icon-arrow-down"></i></li>

        <li><span>退出</span>
          <i class="el-icon-s-release"></i>
        </li>
      </ul>

    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeaderNav',
  computed: {
    ...mapState({
      isCollapse: state => state.layout.isCollapse
    })
  },
  methods: {
    // ...mapActions('layout', ['changeIsCollapse']),
    changeCollapse () {
      // this.changeIsCollapse(this.isCollapse)
      this.$store.dispatch('layout/changeIsCollapse', this.isCollapse)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-list {
  display: flex;
  height: 50px;
  line-height: 50px;

  .breadcrumb{
    text-align: left;
    flex: 1;

  }

  .userInfo{
    text-align: center;
    ul{
width: 100px;
    li {

        cursor: pointer;
        &:hover{
          background-color: #eee;
          color: #999;
        }
      }

    }
    &:hover{
      ul li:not(:first-child) {
        display: block;
      }
    }
    ul li:not(:first-child) {
      display: none;
    }
  }
}
</style>
