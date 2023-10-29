import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColorsStore = defineStore('colors', () => {
  const legendColors = ref<{ [key: string]: string }>({})

  return {
    legendColors,
  }
})
