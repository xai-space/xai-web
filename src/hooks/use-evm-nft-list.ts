import { EVMNFTListRes, NetworkNFTList } from "@/api/nft"
import { useState } from "react"

export const useEvmNftList = () => {
    const [networkNftList, setNetworkNftList] = useState<NetworkNFTList[]>([])
    const address = '0x2192c06a46f2c0f851fbac993413ca49735160cc'

    const getEVMNFTList = async () => {
        const { data } = await (await fetch(`https://restapi.nftscan.com/api/v2/assets/chain/${address}?chain=eth;bnb;polygon;arbitrum;optimism;zksync;linea;avalanche;fantom`, {
            headers: {
                'X-API-KEY': 'zoDxKTSDDE2ELEm5SjWhpNsx'
            }
        })).json() as EVMNFTListRes


        console.log('evm', data);

        setNetworkNftList(data)
    }


    return {
        networkNftList,
        getEVMNFTList,
    }
}
