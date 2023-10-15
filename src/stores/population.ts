import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { prefecture } from '@/types/resas'
import { usePopulationService } from '@/services/population'

export const usePopulationStore = defineStore('population', () => {
  const prefectures = ref<prefecture[]>([])
  const isPrefecturesLoaded: boolean = false

  const fetchPrefectures = async (): Promise<prefecture[]> => {
    if (!isPrefecturesLoaded) {
      const res = await usePopulationService(import.meta.env.VITE_RESAS_API_KEY).fetchPrefectures()
      // 文字列の場合はエラーが発生した
      if (typeof res === 'string') {
        return Promise.reject(res)
      } else {
        prefectures.value = res
      }
    }
    return prefectures.value
  }

  return { fetchPrefectures, prefectures }
})
