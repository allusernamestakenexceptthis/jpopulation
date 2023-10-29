<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Ref } from 'vue'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'vue-chartjs'
import { storeToRefs } from 'pinia'
import { useColorsStore } from '@/stores/colors'
import type { populationPerYearPerPrefecture } from '@/types/resas'

interface PropsType {
  populationData: populationPerYearPerPrefecture[]
}

const props = defineProps<PropsType>()
const colorsStore = useColorsStore()
const { legendColors }: { legendColors: Ref<{ [key: string]: string }> } = storeToRefs(colorsStore) as any

const options: any = {
  responsive: true,
  maintainAspectRatio: true,
  bezierCurve: true,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        padding: 20,
      },
    },
  },
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const availableColors = ['green', 'red', 'yellow', 'pink', 'blue']
const getColor = (code: string) => {
  if (!legendColors.value[code]) {
    let color = null
    const index = Object.keys(legendColors.value).length
    if (index < availableColors.length) {
      color = availableColors[index]
    } else {
      color = Math.floor(Math.random() * 16777215).toString(16)
    }

    legendColors.value[code] = color
  }

  return legendColors.value[code]
}

const sortedChartData = computed(() => {
  const populationData = props.populationData

  const data: any = {
    labels: [],
    datasets: [],
  }

  populationData.forEach((prefData) => {
    data.datasets?.push({
      label: prefData.prefName,
      backgroundColor: getColor(prefData.prefName),
      data: [],
    })
    Object.values(prefData.prefData).forEach((prefDataList) =>
      prefDataList.data.forEach((dataSet) => {
        data.labels?.push(dataSet.year)
        data.datasets[data.datasets.length - 1].data.push(dataSet.value)
      }),
    )
  })

  data.labels = [...new Set(data.labels)]
  data.labels?.sort()

  return data
})
</script>
<template>
  <div class="h-[50vh] mt-10 chart-container">
    <Line :data="sortedChartData" :options="options" />
  </div>
</template>
