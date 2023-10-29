import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { populationPerYear, prefecture } from '@/types/resas'
import { usePopulationService } from '@/services/population'

export const usePopulationStore = defineStore('population', () => {
  const prefectures = ref<prefecture[]>([])
  const populationsPerYear = ref<{ [key: string]: populationPerYear[] }>({})

  const isPrefecturesLoaded = ref<boolean>(false)
  const isPopulationPerYearLoaded = ref<boolean[]>([])

  const fetchPrefectures = async (): Promise<prefecture[]> => {
    if (!isPrefecturesLoaded.value) {
      const res = await usePopulationService(import.meta.env.VITE_RESAS_API_KEY).fetchPrefectures()
      isPrefecturesLoaded.value = true
      // 文字列の場合はエラーが発生した
      if (typeof res === 'string') {
        return Promise.reject(res)
      } else {
        prefectures.value = res
      }
    }
    return prefectures.value
  }

  const fetchPopulationPerYear = async (prefCode: number): Promise<populationPerYear[]> => {
    if (!isPopulationPerYearLoaded.value[prefCode]) {
      const res = await usePopulationService(import.meta.env.VITE_RESAS_API_KEY).fetchPopulationPerYear(prefCode)
      isPopulationPerYearLoaded.value[prefCode] = true
      // 文字列の場合はエラーが発生した
      if (typeof res === 'string') {
        return Promise.reject(res)
      } else {
        populationsPerYear.value[prefCode] = res
      }
    }
    return populationsPerYear.value[prefCode]
  }

  return { fetchPrefectures, prefectures, fetchPopulationPerYear, populationsPerYear }
})
