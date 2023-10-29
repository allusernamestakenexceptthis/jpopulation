<script setup lang="ts">
import { ref } from 'vue'
import { usePopulationStore } from '@/stores/population'
import type { prefecture } from '@/types/resas'

const prefectures = ref<prefecture[]>([])
const error = ref<string>('')

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
  <div>Start of a good thing</div>
  <div class="prefectures__container">
    <div class="prefecture__item" v-for="prefecture in prefectures" :key="prefecture.prefCode">
      {{ prefecture.prefName }}
    </div>
  </div>
</template>
