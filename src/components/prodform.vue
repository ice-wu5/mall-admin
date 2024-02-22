<template>
  <div class="prodform">
    <el-table
    :data="prodList"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="序号"
      type="index">
    </el-table-column>
    <el-table-column
      prop="id"
      label="id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      >
    </el-table-column>
    <el-table-column
      prop="desc"
      label="描述">
    </el-table-column>
    <el-table-column
      prop=""
      label="类目"
      width="50"
      >
      <template v-slot="{row}">
        {{ getCategoryName(row.category) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="price"
      label="预售价"
      width="50">
    </el-table-column>
    <el-table-column
      prop="price_off"
      label="折扣价"
      width="50"
      >
    </el-table-column>

    <el-table-column
    prop=""
    label="标签">
    <template v-slot="{row}">
      <el-tag v-for="t,index in row.tags" :key="index">{{t}}</el-tag>
    </template>
  </el-table-column>
  <el-table-column
    prop="inventory"
    label="限购数量"
    width="50">
  </el-table-column>
  <el-table-column
    prop="status"
    label="上架状态"
    width="80">
    <template v-slot="{row}">
      {{ getProdStatusText(row.status) }}
    </template>
  </el-table-column>
  <el-table-column
    prop="address"
    label="操作">
    <template v-slot="{row}">
      <el-button size="mini" @click="toEdit(row)">编辑</el-button>
      <el-popconfirm
      @confirm="toDelete(row)"
      title="这是一段内容确定删除吗？"
      >
        <el-button slot="reference" size="mini">删除</el-button>
      </el-popconfirm>
    </template>
  </el-table-column>
  </el-table>
  <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="searchParams.page"
  :page-sizes="[10, 20, 30, 40]"
  :page-size="10"
  layout="prev, pager, next, jumper,->,total, sizes"
  :total="total"
  v-if="total"
  >
</el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getTextByStatus } from '@/utils/prodstatus'
import { getCategoryNameByCategoryId } from '@/utils/getcategotyname'
import { Message } from 'element-ui'
import { deletProduct } from '@/api/prod.js'
export default {
  name: 'ProdForm',
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      prodList: state => state.search.prodList
    }),
    ...mapState({
      categoryList: state => state.search.categoryList
    }),
    ...mapState({
      searchParams: state => state.search.searchParams
    }),
    ...mapState({
      total: state => state.search.total
    })
  },
  methods: {
    getProdStatusText (status) {
      return getTextByStatus(status)
    },
    getCategoryName (id) {
      return getCategoryNameByCategoryId(id, this.categoryList)
    },

    async getAllProductList () {
      try {
        await this.$store.dispatch('search/getProdList')
      } catch (error) {
        Message.warning('获取全部商品列表失败')
      }
    },
    async handleCurrentChange (val) {
      try {
        await this.$store.dispatch('search/handleCurrentPageChange', val)
      } catch (error) {
        Message.warning('切换当前页失败')
      }
    },
    async handleSizeChange (val) {
      try {
        await this.$store.dispatch('search/handlePerSizeChange', val)
      } catch (error) {
        Message.warning('切换每页数量失败')
      }
    },
    toEdit (params) {
      this.$router.push({ name: 'Prodadd', params })
    },
    async toDelete (row) {
      try {
        await deletProduct(row.id)
        Message.success('删除成功')
        this.$store.dispatch('search/getProdList')
      } catch (error) {
        Message.warning('删除失败')
      }
    }
  },
  mounted () {
    this.getAllProductList()
  }
}
</script>

<style>

</style>
