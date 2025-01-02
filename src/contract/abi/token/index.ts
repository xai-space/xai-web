import { tokenAbi0_1_0 } from './0.1.0'
export const tokenAbiMap = {
  '0.1.0': tokenAbi0_1_0,
}

export type TokenVersion = keyof typeof tokenAbiMap
