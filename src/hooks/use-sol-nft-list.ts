import { useState } from "react"

import { publicKey } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { das } from '@metaplex-foundation/mpl-core-das';
import { DasApiAsset, DasApiAssetList, dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { useInfiniteScroll } from "ahooks";


export const useSolNFTList = (nftListRef: React.RefObject<HTMLDivElement>) => {
    const [list, setList] = useState<DasApiAsset[]
    >([])
    let limit = 20

    const umi = createUmi(
        'https://maximum-crimson-spring.solana-mainnet.quiknode.pro/a6dab9a89e264894d6e1b914715a09b4befce3f6'
    ).use(dasApi())


    const getSolanaNFTAsset = async () => {
        const owner = publicKey('2Whhi93Ckub7Sc9DViCLTpKS4bdDy9zv3ctxEJAa7J6D')
        console.log('owner');

        // if (list.length % limit != 0) {
        //     return {
        //         list,
        //         noMore: list.length !== limit
        //     }
        // }

        const page = Math.floor(list.length / limit) + 1

        // @ts-ignore
        const { items } = await umi.rpc.getAssetsByOwner({
            owner,
            limit,
            page
        }) as DasApiAssetList

        setList([...list, ...items])
        return {
            list,
            noMore: items.length !== limit
        }
    }

    const { data, loading, loadingMore, mutate } = useInfiniteScroll(getSolanaNFTAsset, {
        target: nftListRef.current,
        isNoMore: (d) => d?.noMore == true
    })

    const getNFTList = () => {
        getSolanaNFTAsset()
    }

    return {
        list,
        getNFTList,
        setList,
        data,
        loading,
        loadingMore,
    }
}