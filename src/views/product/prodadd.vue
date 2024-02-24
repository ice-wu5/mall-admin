<template>
  <div class="prodadd">
    <div class="steps">
      <el-steps :active="active" align-center finish-status="success">
        <el-step title="填写商品基本信息" ></el-step>
        <el-step title="填写商品销售信息" ></el-step>
      </el-steps>
      <div class="prodform">
        <BaseInfo
        v-if="active===0"
        :baseInfo="baseInfo"
        @next="next"
        @getSubCategoryList="getSubCategoryList"
        :categoryList="categoryList"
        :subCategoryList="subCategoryList"
        :prodForm="prodForm"
        ></BaseInfo>
        <SaleInfo
        v-if="active===1"
        :prodForm="prodForm"
        @changeActive="changeActive"
        @next="next"
        @save="save"
        > </SaleInfo>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInfo from '@/views/product/components/baseinfo.vue'
import SaleInfo from '@/views/product/components/saleinfo.vue'
import { getCategoryList, getProdDetails, addOrUpdateProd } from '@/api/prod.js'
import { getSubCategoryListByCategoryList } from '@/utils/prodadd.js'
import { Message } from 'element-ui'
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'ProdaddIndex',
  components: { BaseInfo, SaleInfo },
  data () {
    return {
      active: 0,
      categoryList: [],
      subCategoryList: [],
      baseInfo: {
        title: ''
      },
      prodForm: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: '',
        price_off: '',
        unit: '',
        status: 0,
        images: [],
        inventory: ''
        // 非必须

      },
      originProdForm: {}
    }
  },
  created () {
    this.getCategoryLists()
    // console.log(this.$route)
    this.sendDataToChildren()
  },
  mounted () {
  },
  methods: {
    sendDataToChildren () {
      if (this.$route.params.id) {
      // 来自编辑,深克隆一份后台返回的数据
        this.getDetail()
      } else {
      // 来自新增
        this.getCategoryLists()
        this.prodForm = {
          title: '',
          desc: '',
          category: '',
          c_items: [],
          tags: [],
          price: '',
          price_off: '',
          unit: '',
          status: 0,
          images: [],
          inventory: ''
        }
        this.originProdForm = cloneDeep(this.prodForm)

        // console.log(this.prodForm)
      }
    },
    next (value) {
      if (this.active++ > 2) this.active = 0
      // console.log(value)
      this.baseInfo = { ...value }
      this.prodForm = { ...this.prodForm, ...value }
      console.log('baseinfo的数据', this.baseInfo)
    },
    sendBaseInfo () {
      this.prodForm = this.baseInfo
    },
    changeActive (num) {
      this.active = num
    },
    async getDetail () {
      try {
        const res = await getProdDetails(this.$route.params.id)
        const obj = cloneDeep(res)
        // console.log(res)
        const { images } = obj
        if (images) {
          const formatImages = images.map(item => {
            return {
              name: item,
              url: item
            }
          })
          obj.images = formatImages
        }
        // console.log(res)
        this.prodForm = obj
        this.originProdForm = cloneDeep(this.prodForm)
        console.log('获取商品详情成功', this.prodForm)
      } catch (error) {
        Message.warning('获取商品详情失败')
      }
    },
    async getCategoryLists () {
      try {
        const res = await getCategoryList()
        this.categoryList = res.data
      } catch (error) {
        Message.warning('获取category失败')
      }
    },
    getSubCategoryList (id) {
      this.subCategoryList = getSubCategoryListByCategoryList(id, this.categoryList)
    },
    async save (obj) {
      console.log(obj)
      if (JSON.stringify(obj) === JSON.stringify(this.originProdForm)) {
        Message.warning('数据未更新，无需保存')
      } else {
        try {
          await addOrUpdateProd(obj)
          Message.warning(`${obj.id ? '编辑' : '新增'}商品成功`)
          this.$router.push('/prod/manage')
        } catch (error) {
          Message.warning(`${obj.id ? '编辑' : '新增'}商品失败`)
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>
::v-deep .positioncenter{
  display: block;
  margin: 0 auto;
}
.prodform{
  width: 500px;
  margin: 0 auto;
  padding-top: 50px;
  .tags{
    ::v-deep .el-input-group__prepend {
      background-color: #fff;
    }

    ::v-deep .el-input__inner:focus {
      border-color: #DCDFE6;
      outline: 0;
    }
    ::v-deep .el-input-group--prepend .el-input__inner, .el-input-group__append {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: 0;
  }
  }

  .tag{
  border: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  }
}

.el-tag + .el-tag {
  display: inline-block;
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
