import { recommendAbi0_1_0 } from './0.1.0'

export const recommendAbiMap = {
  '0.1.0': recommendAbi0_1_0,
}

export type RecommendVersion = keyof typeof recommendAbiMap
