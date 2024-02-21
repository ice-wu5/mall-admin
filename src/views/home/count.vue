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
      dataCharts: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { 日期: '2018-05-22', 访问用户: 32371, 下单用户: 19810 },
          { 日期: '2018-05-23', 访问用户: 12328, 下单用户: 4398 },
          { 日期: '2018-05-24', 访问用户: 92381, 下单用户: 52910 }
        ]
      }
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
