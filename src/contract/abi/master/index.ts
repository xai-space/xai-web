import { masterAbi0_1_0 } from './0.1.0'

export const masterAbiMap = {
  '0.1.8': masterAbi0_1_0,
}

export const masterAbiLatest = masterAbi0_1_0

export type MasterVersion = keyof typeof masterAbiMap
