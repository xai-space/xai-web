import { ContractSolanaXai } from './type'

export const IDL: ContractSolanaXai = {
  "version": "0.1.0",
  "name": "contract_solana_xai",
  "instructions": [
    {
      "name": "initialize1",
      "accounts": [
        {
          "name": "programSystemAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_system_account"
              }
            ]
          }
        },
        {
          "name": "programSigner",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_signer"
              }
            ]
          }
        },
        {
          "name": "feeConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "fee_config"
              }
            ]
          }
        },
        {
          "name": "migrationAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeReceiverAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initialize2",
      "accounts": [
        {
          "name": "initTokenConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "init_token_config"
              }
            ]
          }
        },
        {
          "name": "programConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_config"
              }
            ]
          }
        },
        {
          "name": "recommendRewardVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "recommend_reward_vault"
              }
            ]
          }
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "__event_authority"
              }
            ]
          }
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initCreateTokenAccount",
      "accounts": [
        {
          "name": "identifierAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "identifier_account"
              }
            ]
          }
        },
        {
          "name": "curveConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "curve_config"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "programSigner",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_signer"
              }
            ]
          }
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitTokenParams"
          }
        }
      ]
    },
    {
      "name": "createToken",
      "accounts": [
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "identifierAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "identifier_account"
              }
            ]
          }
        },
        {
          "name": "curveConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "curve_config"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "programSigner",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_signer"
              }
            ]
          }
        },
        {
          "name": "feeConfig",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "fee_config"
              }
            ]
          }
        },
        {
          "name": "feeReceiverAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initTokenConfig",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "init_token_config"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitTokenParams"
          }
        }
      ]
    },
    {
      "name": "initializeFeeRecommendReward",
      "accounts": [
        {
          "name": "feeRecommendReward",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "fee_recommend_reward"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "recommender"
              }
            ]
          }
        },
        {
          "name": "recommender",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "curveConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "curve_config"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultSol",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "curve_config"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "programSigner",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_signer"
              }
            ]
          }
        },
        {
          "name": "feeConfig",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "fee_config"
              }
            ]
          }
        },
        {
          "name": "feeReceiverAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiverAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recommendRewardVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "recommend_reward_vault"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountIn",
          "type": "u128"
        },
        {
          "name": "amountOutMin",
          "type": "u128"
        }
      ]
    },
    {
      "name": "sell",
      "accounts": [
        {
          "name": "curveConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "curve_config"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultSol",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "curve_config"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "programSigner",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_signer"
              }
            ]
          }
        },
        {
          "name": "feeConfig",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "fee_config"
              }
            ]
          }
        },
        {
          "name": "feeReceiverAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recommendRewardVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "recommend_reward_vault"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountIn",
          "type": "u128"
        },
        {
          "name": "amountOutMin",
          "type": "u128"
        }
      ]
    },
    {
      "name": "recommenderClaimSol",
      "accounts": [
        {
          "name": "feeRecommendReward",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "fee_recommend_reward"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "recommender"
              }
            ]
          }
        },
        {
          "name": "recommendRewardVault",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "recommend_reward_vault"
              }
            ]
          }
        },
        {
          "name": "recommender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "__event_authority"
              }
            ]
          }
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "graduate",
      "accounts": [
        {
          "name": "ammProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "amm",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammCoinMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammPcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammCoinVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammPcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "createFeeDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userTokenCoin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenPc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "curveConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "curve_config"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "amm_coin_mint"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarRent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nonce",
          "type": "u8"
        },
        {
          "name": "openTime",
          "type": "u64"
        },
        {
          "name": "initPcAmount",
          "type": "u64"
        },
        {
          "name": "initCoinAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "programSigner",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_signer"
              }
            ]
          }
        },
        {
          "name": "vaultToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultSol",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "curve_config"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Mint",
                "path": "token_mint"
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programSystemAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_system_account"
              }
            ]
          }
        },
        {
          "name": "migration",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "migrationAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withdrawSolAmount",
          "type": "u64"
        },
        {
          "name": "withdrawTokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setOwner",
      "accounts": [
        {
          "name": "programSystemAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_system_account"
              }
            ]
          }
        },
        {
          "name": "newOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "setAdmin",
      "accounts": [
        {
          "name": "programSystemAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_system_account"
              }
            ]
          }
        },
        {
          "name": "newAdmin",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "setFeeReceiverAccount",
      "accounts": [
        {
          "name": "programSystemAccount",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_system_account"
              }
            ]
          }
        },
        {
          "name": "feeConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "fee_config"
              }
            ]
          }
        },
        {
          "name": "newFeeReceiverAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "setFeeConfig",
      "accounts": [
        {
          "name": "programSystemAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_system_account"
              }
            ]
          }
        },
        {
          "name": "feeConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "fee_config"
              }
            ]
          }
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeConfigParams",
          "type": {
            "defined": "FeeConfigParams"
          }
        }
      ]
    },
    {
      "name": "setInitTokenConfig",
      "accounts": [
        {
          "name": "programSystemAccount",
          "isMut": false,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "program_system_account"
              }
            ]
          }
        },
        {
          "name": "initTokenConfig",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "init_token_config"
              }
            ]
          }
        },
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "initTokenConfigParams",
          "type": {
            "defined": "InitTokenConfigParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "curve",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initVirtualTokenReserve",
            "type": "u128"
          },
          {
            "name": "initVirtualEthReserve",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "feeRecommendReward",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "unclaimedSol",
            "type": "u64"
          },
          {
            "name": "totalReward",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "programSystemAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "migrationAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "feeConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradeFeeNumerator",
            "type": "u64"
          },
          {
            "name": "tradeFeeDenominator",
            "type": "u64"
          },
          {
            "name": "creationFee",
            "type": "u64"
          },
          {
            "name": "feeReceiverAccount",
            "type": "publicKey"
          },
          {
            "name": "recommendAwardList",
            "type": {
              "array": [
                "u16",
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "initTokenConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initVirtualTokenReserve",
            "type": "u128"
          },
          {
            "name": "initVirtualSolReserve",
            "type": "u128"
          },
          {
            "name": "mintAmount",
            "type": "u64"
          },
          {
            "name": "tokenTotalSupply",
            "type": "u128"
          },
          {
            "name": "tokenMaxSupply",
            "type": "u128"
          },
          {
            "name": "solAim",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "curveConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "virtualTokenReserve",
            "type": "u128"
          },
          {
            "name": "virtualSolReserve",
            "type": "u128"
          },
          {
            "name": "tokenReserve",
            "type": "u128"
          },
          {
            "name": "tokenMaxSupply",
            "type": "u128"
          },
          {
            "name": "solReserve",
            "type": "u128"
          },
          {
            "name": "solAim",
            "type": "u128"
          },
          {
            "name": "k",
            "type": "u128"
          },
          {
            "name": "graduated",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "programConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": {
              "array": [
                "u8",
                8
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitTokenParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "FeeConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradeFeeNumerator",
            "type": "u64"
          },
          {
            "name": "tradeFeeDenominator",
            "type": "u64"
          },
          {
            "name": "creationFee",
            "type": "u64"
          },
          {
            "name": "feeReceiverAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "InitTokenConfigParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initVirtualTokenReserve",
            "type": "u128"
          },
          {
            "name": "initVirtualSolReserve",
            "type": "u128"
          },
          {
            "name": "mintAmount",
            "type": "u64"
          },
          {
            "name": "tokenTotalSupply",
            "type": "u128"
          },
          {
            "name": "tokenMaxSupply",
            "type": "u128"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "RecommenderClaimSolEvent",
      "fields": [
        {
          "name": "recommender",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "claimAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "InitializeEvent",
      "fields": [
        {
          "name": "version",
          "type": "string",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InsufficientOutputAmount",
      "msg": "The output amount is less than the minimum required"
    },
    {
      "code": 6001,
      "name": "TokenGraduated",
      "msg": "This token have graduated"
    },
    {
      "code": 6002,
      "name": "InvalidAmountIn",
      "msg": "Invalid amount in"
    },
    {
      "code": 6003,
      "name": "GraduateNotAllowed",
      "msg": "This token still swap in inner pool"
    },
    {
      "code": 6004,
      "name": "FeeRecommendRewardUninitialized",
      "msg": "FeeRecommendReward PDA is not initialized"
    },
    {
      "code": 6005,
      "name": "FeeRecommendRewardError",
      "msg": "FeeRecommendReward PDA error"
    }
  ]
};