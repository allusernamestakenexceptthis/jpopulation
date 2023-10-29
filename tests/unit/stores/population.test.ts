import { usePopulationStore } from '@/stores/population.ts'
import { describe, expect, vi, test, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'

import type { populationTypePerYearResults, prefecturesResults } from '@/types/resas'
import * as prefecturesSample from '../../data/prefecturesSample.json'
import * as populationSample from '../../data/populationSample.json'

//import mockedAxios from '../../mocks/axios.ts'

vi.mock('axios')

describe('Population Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Getters', () => {
    describe('fetchPrefectures', () => {
      test('makes a GET request to fetch prefectures', async () => {
        vi.mocked(axios.get).mockResolvedValue(prefecturesSample as prefecturesResults)

        const prefectures = await usePopulationStore().fetchPrefectures()
        expect(prefectures).toStrictEqual(prefecturesSample)
      })
    }),
      describe('fetchPopulationPerYear', () => {
        test('makes a GET request to fetch population data per prefecture per year', async () => {
          vi.mocked(axios.get).mockResolvedValue(populationSample as populationTypePerYearResults)

          const prefectures = await usePopulationStore().fetchPrefectures()
          expect(prefectures).toStrictEqual(populationSample)
        })
      })
  })
})
