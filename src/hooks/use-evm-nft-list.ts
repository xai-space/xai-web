import { Asset, NFTListRes, NetworkNFTList } from "@/api/nft"
import { useState } from "react"

export const useEvmNftList = () => {
    const [evmNftList, setNetworkNftList] = useState<NetworkNFTList[]>([])
    const address = '0x2192c06a46f2c0f851fbac993413ca49735160cc'

    const getEVMNFTList = async () => {
        const { data } = await (await fetch(`https://restapi.nftscan.com/api/v2/assets/chain/${address}?chain=eth;bnb;polygon;arbitrum;optimism;zksync;linea;avalanche;fantom`, {
            headers: {
                'X-API-KEY': 'zoDxKTSDDE2ELEm5SjWhpNsx'
            }
        })).json() as NFTListRes<NetworkNFTList>


        const collectionAssets = data.map((item) => {
            item.collection_assets = item.collection_assets.filter((assets) => {
                return assets.contract_name && assets.items_total >= 1000 && assets.floor_price
            })
            return item
        })

        setNetworkNftList(collectionAssets)
    }


    return {
        evmNftList,
        getEVMNFTList,
    }
}
