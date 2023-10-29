export type prefecture = {
  prefCode: number
  prefName: string
}

export type populationTypePerYear = {
  year: number
  value: number
}

export type populationPerYear = {
  label: string
  data: populationTypePerYear[]
}

export type prefecturesResults = {
  message: string | null
  result: prefecture[]
}

export type populationTypePerYearResults = {
  message: string | null
  result: {
    boundaryYear: number
    data: populationPerYear[]
  }
}
