import { BN } from '@coral-xyz/anchor'

import { BI_ZERO } from '@/constants/number'
import { parseSol, useProgram } from '@/packages/react-sol'
import { programIds } from '@/program'
import { getCurveAccount, getFeeAccount } from '@/program/token/account'
import { IDL } from '@/program/token/idl'

export const useSvmTradeAmount = (tokenAddr?: string) => {
  const { program, error } = useProgram({
    idl: IDL,
    programId: programIds.programId,
  })

  const checkConfig = () => {
    if (!program || !!error || !tokenAddr) {
      return false
    }

    return true
  }

  const comments = async (amount: string) => {
    const amountIn = new BN(parseSol(amount).toFixed(0))

    const { curveConfig } = getCurveAccount(tokenAddr!)
    const feeConfig = getFeeAccount()

    const curve = await program?.account.curveConfig.fetch(curveConfig)
    const fee = await program?.account.feeConfig.fetch(feeConfig)

    return {
      amountIn,
      curveConfig: curve,
      feeConfig: fee,
    }
  }

  const getTokenAmount = async (reserveAmount: string) => {
    if (!checkConfig()) return BI_ZERO

    const { amountIn, curveConfig, feeConfig } = await comments(reserveAmount)

    // TX fee
    const txFee = amountIn
      .mul(
        feeConfig?.tradeFeeNumerator
          // Ensure correct accuracy
          .mul(new BN(1000))
          .div(feeConfig?.tradeFeeDenominator)
      )
      .div(new BN(1000))
    // Minus commission
    const amountInWithoutFee = amountIn.sub(txFee)

    const newVirtualSolReserve =
      curveConfig?.virtualSolReserve.add(amountInWithoutFee)
    const newVirtualTokenReserve = curveConfig?.k.div(newVirtualSolReserve)

    return curveConfig?.virtualTokenReserve.sub(newVirtualTokenReserve)
  }

  const getReserveAmount = async (tokenAmount: string) => {
    if (!checkConfig()) return BI_ZERO

    const { amountIn, curveConfig, feeConfig } = await comments(tokenAmount)

    const newVirtualTokenReserve =
      curveConfig?.virtualTokenReserve.add(amountIn)
    const newVirtualSolReserve = curveConfig?.k.div(newVirtualTokenReserve)
    const amountOut = curveConfig?.virtualSolReserve.sub(newVirtualSolReserve)

    const txFee = amountOut
      .mul(
        feeConfig?.tradeFeeNumerator
          .mul(new BN(1000))
          .div(feeConfig.tradeFeeDenominator)
      )
      .div(new BN(1000))
    return amountOut.sub(txFee)
  }

  return {
    getTokenAmount,
    getReserveAmount,
  }
}
