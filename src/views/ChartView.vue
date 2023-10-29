<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePopulationStore } from '@/stores/population'
import type { prefecture, populationPerYearPerPrefecture, populationPerYear } from '@/types/resas'
import ChartGraph from '@/components/ChartGraph.vue'

const prefectures = ref<prefecture[]>([])
const error = ref<string>('')

const labels = ref<string[]>(['総人口'])

const selectedPrefectures = ref<boolean[]>([])
const selectedLabel = ref<string>('')
const chartData = ref<populationPerYearPerPrefecture[]>([])

selectedLabel.value = labels.value[0]

watch(
  () => selectedPrefectures,
  () => setChartData(),
  { deep: true },
)

watch(selectedLabel, () => setChartData())

const setChartData = () => {
  chartData.value = []
  Object.keys(selectedPrefectures.value)
    .filter((val: string) => selectedPrefectures.value[parseInt(val)] === true)
    .forEach(async (prefCodeStr: string) => {
      const prefCode = parseInt(prefCodeStr)
      const pref = prefectures.value.find((prefDat: prefecture) => prefDat.prefCode === prefCode)
      if (!pref) {
        console.log("Couldn't find prefecture code: ", pref)
        return false
      }
      const prefData: populationPerYear[] = await usePopulationStore().fetchPopulationPerYear(pref.prefCode)

      //run once
      if (labels.value.length == 1) {
        prefData.forEach((prefDat) => {
          if (labels.value.indexOf(prefDat.label) === -1) {
            labels.value.push(prefDat.label)
          }
        })
      }

      const dat: populationPerYearPerPrefecture = {
        prefName: pref.prefName,
        prefData: prefData.filter((prefDat) => prefDat.label === selectedLabel.value),
      }

      chartData.value.push(dat)
    })
}

usePopulationStore()
  .fetchPrefectures()
  .then((res: prefecture[]) => {
    prefectures.value = res
  })
  .catch((res: string) => {
    error.value = res
  })
</script>
<template>
  <div class="error" v-if="error">
    {{ error }}
  </div>
  <div class="max-w-[85%] mx-auto">
    <h1 class="pageTitle">都道府県の人口</h1>
    <h2 class="subheader m-1"><span class="borderedText">都道府県</span></h2>
    <div class="prefectures__container flex flex-column-m flex-wrap w-full gap-3 text-left">
      <div class="w-1/3 sm:w-1/4 md:w-1/6 lg:w-[12%] xl:w-[10%] prefecture__item flex-auto grow-0 flex flex-column-s flex-nowrap" v-for="prefecture in prefectures" :key="prefecture.prefCode">
        <input
          v-model="selectedPrefectures[prefecture.prefCode]"
          type="checkbox"
          class="w-4 h-4 border-2 rounded-sm shrink-0 mt-1 mx-2 accent-blue-800 checked:border-0"
          :name="'selectedPrefectures_' + prefecture.prefCode"
        />
        <label :for="'selectedPrefectures_' + prefecture.prefCode" class="whitespace-nowrap">{{ prefecture.prefName }}</label>
      </div>
    </div>
  </div>
  <div class="chartBox" v-if="chartData.length">
    <ChartGraph :population-data="chartData" />
  </div>
  <div class="max-w-[85%] mx-auto mt-5">
    <h2 class="subheader m-1"><span class="borderedText">人口のタイプ</span></h2>
    <div class="dataTypes flex flex-column-m flex-wrap w-full gap-3">
      <div class="w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/6 xl:w-1/6 dataTypes__item flex-auto grow-0 flex flex-column-s flex-nowrap content-center mx-auto" v-for="label in labels" :key="label">
        <input v-model="selectedLabel" type="radio" class="w-4 h-4 border-2 rounded-sm shrink-0 mt-1 mx-2 accent-blue-800 checked:border-0" :value="label" name="selectedLabel" />
        <label for="selectedLabel" class="whitespace-nowrap">{{ label }}</label>
      </div>
    </div>
  </div>
</template>
