export const masterAbi = [{
    "inputs": [
        {
            "internalType": "address",
            "name": "_bond",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_uniswapV2Router02",
            "type": "address"
        }
    ],
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
    "name": "_Forbidden",
    "type": "error"
},
{
    "inputs": [],
    "name": "_InvalidAmountEth",
    "type": "error"
},
{
    "inputs": [],
    "name": "_InvalidAmountToken",
    "type": "error"
},
{
    "inputs": [],
    "name": "_NoOwner",
    "type": "error"
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
            "name": "pair",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountETH",
            "type": "uint256"
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
            "name": "time",
            "type": "uint256"
        }
    ],
    "name": "AddLiquidity",
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
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "addedLiquidityToken",
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
    "name": "bond",
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
            "name": "token",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "amountToken",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "amountEth",
            "type": "uint256"
        }
    ],
    "name": "execute",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "_amountToken",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "_amountETH",
            "type": "uint256"
        }
    ],
    "stateMutability": "payable",
    "type": "function"
},
{
    "inputs": [],
    "name": "getToken",
    "outputs": [
        {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
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
    "name": "liquidityOwner",
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
            "internalType": "address",
            "name": "_bond",
            "type": "address"
        }
    ],
    "name": "setBond",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_liquidityOwner",
            "type": "address"
        }
    ],
    "name": "setLiquidityOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_uniswapV2Router02",
            "type": "address"
        }
    ],
    "name": "setUniswapV2Router02",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "inputs": [],
    "name": "uniswapV2Router02",
    "outputs": [
        {
            "internalType": "contract IUniswapV2Router02",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
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
            "name": "amounts",
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