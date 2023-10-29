import { mount } from '@vue/test-utils'
import ChartGraph from '@/components/ChartGraph.vue'
import { expect, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
// import { expect, test } from "vitest";

setActivePinia(createPinia())

test('testing ChartGraph component running', async () => {
  const wrapper = mount(ChartGraph, {
    props: {
      populationData: [
        {
          prefName: 'test',
          prefData: [
            {
              label: 'label',
              data: [
                {
                  year: 2010,
                  value: 5,
                },
                {
                  year: 2015,
                  value: 20,
                },
              ],
            },
          ],
        },
      ],
    },
  })
  expect(wrapper.find('canvas')).toBeDefined()
})
