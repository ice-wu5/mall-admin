<template>
  <div class="prodmanage">
    <div class="product">
      <Search></Search>
    </div>
    <div class="prod-form">
      <ProdForm></ProdForm>
    </div>
  </div>

</template>

<script>
import Search from '@/components/search.vue'
import ProdForm from '@/components/prodform.vue'
export default {
  name: 'ProdanageIndex',
  components: {
    Search,
    ProdForm
  }
}
</script>

<style lang="scss" scoped>
.prodmanage{
  padding: 20px;
}
</style>
