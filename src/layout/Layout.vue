<template>
  <div class="layout-container">
    <!-- //左侧菜单 -->
      <div class="all-menu-list" >
        <MenuList></MenuList>
    </div>
  <!-- //右侧主体 -->
    <div class="main-app" :class="{'left65':isCollapse,'left200':!isCollapse}">
          <!-- //头部导航栏 -->
      <div class="header-nav">
          <HeaderNav></HeaderNav>
        </div>
          <!-- //二级路由出口 -->
          <router-view></router-view>
        </div>
  </div>
</template>

<script>
import MenuList from './MenuList.vue'
import HeaderNav from '@/layout/HeaderNav.vue'
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  components: {
    MenuList, HeaderNav
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.layout.isCollapse
    })
  }
}
</script>

<style lang="scss" scoped>
.layout-container{

  .all-menu-list{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;

  }
  .main-app{
    transition: all 0.3s;
    .header-nav{
      margin: 5px;
    }
  }
  .left65{
    margin-left: 65px;

  }

  .left200{
    margin-left: 200px;

  }

}

</style>>
