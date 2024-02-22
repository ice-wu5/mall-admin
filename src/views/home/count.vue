<template>
  <div class="count">
    <div class="card">
      <Card></Card>
      <Card></Card>
    </div>

    <div class="charts">

    </div>
  </div>
</template>

<script>
import Card from '@/views/home/components/card.vue'
export default {
  name: 'CountIndex',
  components: { Card },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  display: flex;
  justify-content: space-around;
}
</style>
