import { bcAbi0_1_0 } from './0.1.0'

export const bcAbiMap = {
  '0.1.0': bcAbi0_1_0,
} as const

export type BcVersion = keyof typeof bcAbiMap
