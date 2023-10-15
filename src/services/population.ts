import axios from 'axios'
import type { prefecture, populationPerYear } from '@/types/resas'

const apiUrl = 'https://opendata.resas-portal.go.jp/api/v1/'

export function usePopulationService(apiKey: string) {
  const apiRequest = axios.create({
    baseURL: apiUrl,
    headers: {
      common: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    },
  })

  apiRequest.interceptors.response.use(
    (res) => {
      if (res?.data && res?.data?.statusCode != '403') {
        return Promise.resolve(res.data.result)
      } else {
        throw new Error('リクエストの結果は正しくない')
      }
    },
    (error) => {
      if (error.response.status !== 200) {
        throw error
      }
    },
  )

  const fetchPrefectures = async (): Promise<prefecture[]> => {
    try {
      const results = await apiRequest.get('prefectures')
      return Promise.resolve(results as any)
    } catch (e: any) {
      return Promise.reject(e.message)
    }
  }

  const fetchPopulationPerYear = async (prefCode: number): Promise<populationPerYear[]> => {
    try {
      const results = await apiRequest.get('population/composition/perYear', { params: { prefCode } })
      return Promise.resolve(results.data)
    } catch (e: any) {
      return Promise.reject(e.message)
    }
  }

  return {
    fetchPrefectures,
    fetchPopulationPerYear,
  }
}
