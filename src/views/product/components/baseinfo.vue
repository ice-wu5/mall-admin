<template>
  <div class="baseinfo">
    <el-form   label-width="100px" class="demo-ruleForm" >
      <el-form-item  label="副标题" prop="name">
        <el-input v-model="prodFormData.title"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="name">
        <el-input v-model="prodFormData.desc"   type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="商品类目" prop="region" style="width:100%">
        <el-select v-model="prodFormData.category" placeholder="请选择类目" @change="getSubCategory">
          <el-option v-for="c in categoryList" :key="c.id" :label="c.name" :value="c.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="region" style="width:100%">
        <el-select v-model="prodFormData.c_item"  placeholder="请选择子类目" >
          <el-option v-for="sc in subCategoryList" :key="sc" :label="sc" :value="sc"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品标签" prop="desc" class="tags" style="width:100%">
        <el-select
        v-model="prodFormData.tags"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择标签">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" style="margin-top: 12px;" @click="tonext" class="positioncenter">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'BaseInfo',
  props: ['categoryList', 'subCategoryList', 'prodForm', 'baseInfo'],
  data () {
    return {
      options: [{
        value: '默认包邮',
        label: '默认包邮'
      }],
      value: [],
      prodFormData: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: '',
        price_off: '',
        unit: '',
        status: 0,
        images: '',
        inventory: ''
      }
    }
  },
  mounted () {
    this.prodFormData = cloneDeep(this.prodForm)
    console.log('父传过来的数据', this.prodFormData)
  },
  watch: {
    // 监听父组件数据的变化
    prodForm: {
      immediate: true, // 立即执行回调
      handler (newValue) {
        this.prodFormData = cloneDeep(newValue) // 更新子组件数据
      }
    },
    baseInfo: {
      immediate: true, // 立即执行回调
      handler (newValue) {
        console.log(newValue)
        this.prodFormData = cloneDeep(newValue) // 更新子组件数据
      }
    }
  },
  methods: {

    tonext () {
      this.$emit('next', this.prodFormData)

      console.log(this.prodFormData)
    },
    getSubCategory (cid) {
      this.prodFormData.c_items = []
      this.$emit('getSubCategoryList', cid)
    }

  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-select>.el-input {
  display: block;
  width: 400px;
}
</style>
