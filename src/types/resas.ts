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
