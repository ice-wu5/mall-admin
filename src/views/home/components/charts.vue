<template>
  <div class="charts" v-if="dataCharts">
    <ve-line :data="dataCharts" width="100px" ></ve-line>
  </div>
</template>

<script>
export default {
  name: 'ChartIndex',
  props: ['dataCharts']
}
</script>

<style>

</style>
