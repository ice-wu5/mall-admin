<template>
  <div class="search">
    <div class="searchform">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="searchParams.searchWord" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类目">
          <el-select clearable v-model="searchParams.category" placeholder="请选择">
            <el-option v-for="c in categoryList" :key="c.id" :label="c.name" :value="c.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="addprod">
      <el-button type="primary" @click="toAdd">添加商品</el-button>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.search.categoryList
    }),
    ...mapState({
      searchParams: state => state.search.searchParams
    })
  },
  methods: {
    async getCategoryAll () {
      try {
        await this.$store.dispatch('search/getCategoryList')
      } catch (error) {
        Message.warning('获取初始化类目列表失败')
      }
    },
    async search () {
      try {
        await this.$store.dispatch('search/getProdList')
      } catch (error) {
        Message.warning('获取初始化商品列表失败')
      }
    },
    toAdd () {
      this.$router.push('/prod/add')
    }
  },
  mounted () {
    this.getCategoryAll()
  }
}
</script>

<style lang="scss" scoped>
.search{
  display: flex;
  justify-content: space-between;
}
</style>
