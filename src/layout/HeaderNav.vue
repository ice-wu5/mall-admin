<template>
<div class="header-nav">
  <div class="header-list">
    <el-button @click="changeCollapse"  :icon="isCollapse?`el-icon-s-unfold`:`el-icon-s-fold`" ></el-button>
    <div class="breadcrumb">
      <el-breadcrumb separator="/" style="display:inline-block;margin-left:5px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">活动</el-breadcrumb-item>

      </el-breadcrumb>
    </div>
    <div class="userInfo">
      <ul>
        <li> <span>username:{{$store.state.user.userInfo.username}}</span>
          <i class="el-icon-arrow-down"></i></li>

        <li ><el-popconfirm
          title="确定退出吗？"
          @confirm="logout"
        >
          <el-button slot="reference">退出</el-button>
        </el-popconfirm>
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
    },
    logout () {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-list {
  display: flex;
  position: relative;
  height: 50px;
  line-height: 50px;

  .breadcrumb{
    text-align: left;
    flex: 1;

  }

  .userInfo{
    position: absolute;
    right: 0;
    top:0;
    text-align: center;
    ul{
width: 150px;
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
