<template>
  <div class="saleinfo">
    <div class="baseinfo">
      <el-form   label-width="100px" class="demo-ruleForm" >
        <el-form-item label="商品售价" prop="name">
          <el-input v-model="prodFormData.price"></el-input>
        </el-form-item>
        <el-form-item label="商品折扣价" prop="name">
          <el-input  v-model="prodFormData.price_off"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="region" style="width:100%">
          <el-input  v-model="prodFormData.inventory"></el-input>
        </el-form-item>
        <el-form-item label="计量单位" prop="region" style="width:100%">
          <el-input  v-model="prodFormData.unit"></el-input>
        </el-form-item>
        <el-form-item label="商品相册" prop="desc" class="tags" style="width:100%">
          <el-upload
            name="avatar"
            :action="actionUrl"
            list-type="picture-card"
            :file-list="prodFormData.images"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess">

            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-top: 12px;" @click="toPrev" class="positioncenter">上一步</el-button>
          <el-button type="primary" style="margin-top: 12px;" @click="toNext" class="positioncenter">下一步</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'SaleInfo',
  props: ['prodForm'],
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      prodFormData: {
        title: ''
      },
      imageList: []
    }
  },
  computed: {
    actionUrl () {
      return 'https://mallapi.duyiedu.com/upload/images?appkey=' + this.$store.state.user.appkey
    }
  },
  mounted () {
    this.prodFormData = cloneDeep(this.prodForm)
    // console.log(this.actionUrl)
  },
  methods: {
    handleSuccess (response, file, fileList) {
      console.log(this.prodFormData.images)
      // console.log(response, file, fileList)
      this.imageList = fileList
      // this.prodFormData.images=
    },
    handleRemove (file, fileList) {
      this.imageList = fileList
      // console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    toPrev () {
      this.$emit('changeActive', 0)
      this.$emit('sendBaseInfo')
    },
    toNext () {
      this.$emit('next')
      // console.log(this.prodFormData, this.imageList)
      const obj = this.prodFormData
      obj.images = this.imageList.map(item => {
        if (item) {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        } else {
          return ''
        }
      })

      this.$emit('save', obj)
    }
  }
}
</script>

<style>

</style>
