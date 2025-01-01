export const bondingCurveAbi = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
},
{
    "inputs": [],
    "name": "_AlreadyGraduated",
    "type": "error"
},
{
    "inputs": [],
    "name": "_CallerNotEOA",
    "type": "error"
},
{
    "inputs": [],
    "name": "_DeadlineExceeded",
    "type": "error"
},
{
    "inputs": [],
    "name": "_FeeTooHigh",
    "type": "error"
},
{
    "inputs": [],
    "name": "_InsufficientOutput",
    "type": "error"
},
{
    "inputs": [],
    "name": "_InvalidAmountIn",
    "type": "error"
},
{
    "inputs": [],
    "name": "_InvalidParamsReferrers",
    "type": "error"
},
{
    "inputs": [],
    "name": "_InvalidSell",
    "type": "error"
},
{
    "inputs": [],
    "name": "_InvalidToken",
    "type": "error"
},
{
    "inputs": [],
    "name": "_NoOwner",
    "type": "error"
},
{
    "inputs": [],
    "name": "_TooMuchMcap",
    "type": "error"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "reserveETH",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "reserveToken",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
        }
    ],
    "name": "ContinuousBurn",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "reserveETH",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "reserveToken",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
        }
    ],
    "name": "ContinuousMint",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "flag",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "version",
            "type": "string"
        }
    ],
    "name": "ContractDeploy",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "maxSupply",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "totalSupply",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "reserveETH",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "reserveToken",
            "type": "uint256"
        }
    ],
    "name": "DeployToken",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "referrer",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "flag",
            "type": "uint256"
        }
    ],
    "name": "Referrer",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "headmaster",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountToken",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountETH",
            "type": "uint256"
        }
    ],
    "name": "TokenGraduated",
    "type": "event"
},
{
    "inputs": [],
    "name": "FEE_DENOMINATOR",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "K_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "MAX_FEE",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "ZERO_ADDRESS",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "addPoolETHAmount_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "referrers",
            "type": "address[]"
        }
    ],
    "name": "burn",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        }
    ],
    "name": "calcAmountOutFromEth",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        }
    ],
    "name": "calcAmountOutFromToken",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        }
    ],
    "name": "calcAmountOutFromTokenCutOff",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "initAmountIn",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "referrers",
            "type": "address[]"
        },
        {
            "internalType": "string[]",
            "name": "_infos",
            "type": "string[]"
        },
        {
            "internalType": "uint256[]",
            "name": "_params",
            "type": "uint256[]"
        }
    ],
    "name": "createToken",
    "outputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        }
    ],
    "stateMutability": "payable",
    "type": "function"
},
{
    "inputs": [],
    "name": "creationFee_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "factory_",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "feeRate_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "feeTo_",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "getMaxSupply",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address[]",
            "name": "tokens",
            "type": "address[]"
        }
    ],
    "name": "getPool",
    "outputs": [
        {
            "components": [
                {
                    "internalType": "uint256",
                    "name": "k",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenReserve",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "virtualTokenReserve",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ethReserve",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "virtualEthReserve",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "addPoolETHAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "graduationThreshold",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "creator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "headmaster",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "maxSupply",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "initVirtualEthReserve",
                    "type": "uint256"
                }
            ],
            "internalType": "struct _BondingCurve.Pool[]",
            "name": "",
            "type": "tuple[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "graduationThreshold_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "headmaster_",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "initVirtualEthReserve_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "initVirtualTokenReserve_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "name": "isAdmin",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "maxBuy_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "maxSupply_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        },
        {
            "internalType": "address[]",
            "name": "referrers",
            "type": "address[]"
        }
    ],
    "name": "mint",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        }
    ],
    "stateMutability": "payable",
    "type": "function"
},
{
    "inputs": [],
    "name": "owner",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "name": "pools_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "k",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenReserve",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "virtualTokenReserve",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "ethReserve",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "virtualEthReserve",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "addPoolETHAmount",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "graduationThreshold",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "creator",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "headmaster",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "maxSupply",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "initVirtualEthReserve",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "recommendFee_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "recommend_",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
        }
    ],
    "name": "rescueETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "_addPoolETHAmount",
            "type": "uint256"
        }
    ],
    "name": "setAddPoolETHAmountOfToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_addPoolETHAmount",
            "type": "uint256"
        }
    ],
    "name": "setAddPoolETHAmounts",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_admin",
            "type": "address"
        },
        {
            "internalType": "bool",
            "name": "_status",
            "type": "bool"
        }
    ],
    "name": "setAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
        }
    ],
    "name": "setCreationFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_factory",
            "type": "address"
        }
    ],
    "name": "setFactory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_feeRate",
            "type": "uint256"
        }
    ],
    "name": "setFeeRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_feeTo",
            "type": "address"
        }
    ],
    "name": "setFeeTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_headmaster",
            "type": "address"
        }
    ],
    "name": "setHeadmaster",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_maxBuy",
            "type": "uint256"
        }
    ],
    "name": "setMaxBuy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_maxSupply",
            "type": "uint256"
        }
    ],
    "name": "setMaxSupply",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_initVirtualEthReserve",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "_initVirtualTokenReserve",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "_addPoolETHAmount",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "_maxSupply",
            "type": "uint256"
        }
    ],
    "name": "setNewBond",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_totalSupply",
            "type": "uint256"
        }
    ],
    "name": "setTotalSupply",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_recommend",
            "type": "address"
        }
    ],
    "name": "setrecommend",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "totalSupply_",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
        }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256[]",
            "name": "_recommendFee",
            "type": "uint256[]"
        }
    ],
    "name": "updateRecommedFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "versions",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }
    ],
    "name": "withdrawtoken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "stateMutability": "payable",
    "type": "receive"
}
]