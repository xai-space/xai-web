import { web3 } from '@coral-xyz/anchor'

export const getSimulateComputeUnits = async (
  connection: web3.Connection,
  instructions: Array<web3.TransactionInstruction>,
  payer: web3.PublicKey,
  version: web3.TransactionVersion = 0,
  lookupTables: Array<web3.AddressLookupTableAccount> | [] = []
) => {
  const testInstructions = [
    // Set an arbitrarily high number in simulation
    // so we can be sure the transaction will succeed
    // and get the real compute units used
    web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 1_400_000 }),
    ...instructions,
  ]

  const transactionMessage = new web3.TransactionMessage({
    instructions: testInstructions,
    payerKey: payer,
    // RecentBlockhash can by any public key during simulation
    // since 'replaceRecentBlockhash' is set to 'true' below
    recentBlockhash: web3.PublicKey.default.toString(),
  })
  let message: web3.VersionedMessage

  if (version === 'legacy') {
    message = transactionMessage.compileToLegacyMessage()
  } else if (version === 0) {
    message = transactionMessage.compileToV0Message(lookupTables)
  } else {
    throw new Error('Invalid transaction version')
  }

  const testTransaction = new web3.VersionedTransaction(message)

  const { value } = await connection.simulateTransaction(testTransaction, {
    replaceRecentBlockhash: true,
    sigVerify: false,
  })

  if (value.err) throw new Error(value.err.toString())
  if (!value.unitsConsumed) throw new Error('Invalid compute units')

  return value.unitsConsumed
}
