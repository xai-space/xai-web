import { BigNumber } from 'bignumber.js'
import { Hash, parseEther } from 'viem'
import dayjs from 'dayjs'
import { getBlock } from 'wagmi/actions'
import { isEmpty } from 'lodash'

import { wagmiConfig } from '@/config/wagmi'
import { Network } from '@/enums/contract'
import { parseSol } from '@/packages/react-sol'

// Whether user rejected error.
export const isUserReject = (err: string | unknown) => {
  const e = String(err).toLowerCase()
  return e.includes('user rejected') || e.includes('user denied')
}

/**
 * Add slippage to value.
 * @example
 * ```ts
 * addSlippage('1', '5') // amount, slippage
 * // 1050000000000000000n = 1.05
 * ```
 */
export const addSlippage = (value: string, slippage: string) => {
  const biValue = parseEther(value)
  if (BigNumber(slippage).lte(0)) return biValue

  const slippagePercent = BigNumber(slippage).dividedBy(100).plus(1)
  const total = BigNumber(biValue.toString())
    .multipliedBy(slippagePercent)
    .toFixed(0)

  return BigInt(total)
}

/**
 * Subtract slippage from value.
 * @example
 * ```ts
 * subSlippage('1', '5') // amount, slippage
 * // 950000000000000000n === 0.95
 * ```
 */
export const subSlippage = (
  value: string,
  slippage: string,
  network?: Network
) => {
  // TODO/mul: more chain...
  const parseFunc = network === Network.Svm ? parseSol : parseEther

  return calculateSlippage(value, slippage, parseFunc)
}
const calculateSlippage = (
  value: string,
  slippage: string,
  parseFunc: Function
): string => {
  const biValue = parseFunc(value)
  if (BigNumber(slippage).lte(0)) return biValue

  const slippagePercent = BigNumber(1).minus(BigNumber(slippage).div(100))
  const total = BigNumber(biValue).multipliedBy(slippagePercent).toFixed(0)

  return total
}

/** Add `0x` prefix. */
export const addPrefix0x = (input: string | string[]) => {
  input = Array.isArray(input) ? input : [input]
  return input.map((s) => (s.startsWith('0x') ? s : '0x' + s)) as Hash[]
}

/**
 * Get timestamp of block chain & plus offset seconds,
 * use local timestamp as fallback.
 * @default seconds `300`(5m)
 */
export const getDeadline = async (seconds = 300) => {
  const addOffset = (value: bigint | number) => {
    return BigNumber(value.toString()).plus(seconds).toFixed(0)
  }

  const ts = await getBlock(wagmiConfig)
    .then(({ timestamp }) => addOffset(timestamp))
    .catch(() => addOffset(dayjs().unix())) // fallback.

  return BigInt(ts)
}

/**
 * @example
 * ```ts
 * formatHash(BigInt('743682847302839237012018537797613726790590966769178093576926872255665103969'))
 * // '0x01a4e8d9e9ec74503ba4d82cc1305e238cb3e9d9d40f062201a5a40aba356461'
 * ```
 */
export const formatHash = (value: bigint, with0x = true) => {
  const hex = value.toString(16).padStart(64, '0')
  return with0x ? addPrefix0x(hex)[0] : hex
}

/**
 * @example
 * ```ts
 * parseHash('1a4e8d9e9ec74503ba4d82cc1305e238cb3e9d9d40f062201a5a40aba356461')
 * // 743682847302839237012018537797613726790590966769178093576926872255665103969n
 * ```
 */
export const parseHash = (value: string) => {
  console.log('parseHash', value)
  value = value.startsWith('0x') ? value.slice(2) : value
  const [hex] = addPrefix0x(value.padStart(64, '0'))
  return BigInt(hex)
}

/**
 * @example
 * ```ts
 * const n1 = getNetwork('Solana')
 * // Network.Sol
 * const n2 = getNetwork('Ton')
 * // Network.Ton
 * const n3 = getNetwork('Ethereum')
 * // Network.Evm
 * ```
 */
export const getNetwork = (chainName: string) => {
  const c = chainName.toLowerCase()

  if (c.includes('sol')) return Network.Svm
  if (c.includes('ton')) return Network.Tvm

  return Network.Evm
}

export const getContractsEnabled = <T extends any[]>(
  list: T,
  versionKey: keyof NonNullable<T[number]>,
  addressKey: keyof NonNullable<T[number]>,
  ...conditions: boolean[]
) => {
  if (isEmpty(list.filter(Boolean))) return false

  const versions = list.map((item) => item[versionKey]).filter(Boolean)
  const addresses = list.map((item) => item[addressKey]).filter(Boolean)
  if (versions.length !== addresses.length) return false

  const hasFalse = conditions.some((c) => !c)

  return list.length === versions.length && !hasFalse
}

export const getTokenProgress = (
  left: bigint | string,
  total: bigint | string,
  isGraduated = false
) => {
  if (isGraduated) return '100'
  if (isGraduated && BigNumber(left.toString()).isZero()) return '0'

  const percent = BigNumber(total?.toString())
    .minus(left?.toString())
    .div(total?.toString())
    .multipliedBy(100)

  return percent.lt(0.01) || percent.isNaN() ? '0' : percent.toFixed(2)
}
