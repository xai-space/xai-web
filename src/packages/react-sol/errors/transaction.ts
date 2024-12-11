export class TransactionPayerPubkeyErr extends Error {
  name = ' TransactionPayerPubkeyErr'

  constructor(msg = 'Transaction payer public key is invalid') {
    super(msg)
  }
}

export class TransactionVersionInvalidErr extends Error {
  name = 'TransactionVersionInvalidErr'

  constructor(msg = 'Transaction version is invalid') {
    super(msg)
  }
}

export class TransactionConfirmErr extends Error {
  name = 'TransactionConfirmErr'

  constructor(msg = 'Transaction confirm failed') {
    super(msg)
  }
}
