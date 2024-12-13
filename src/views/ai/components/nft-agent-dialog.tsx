import { Asset, NFTInfo, NetworkNFTList } from '@/api/nft'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { loadingSVG } from '@/config/link'
import { useEvmNftList } from '@/hooks/use-evm-nft-list'
import { useSolNFTList } from '@/hooks/use-sol-nft-list'
import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCheck } from 'react-icons/fa6'
import { FaChevronLeft } from 'react-icons/fa6'

interface Props {
  open: boolean
  nftInfo: NftInfo | undefined
  setOpen: (o: boolean) => void
  setNftInfo: (nftInfo: NftInfo) => void
}

export interface NftInfo {
  name: string
  id: string
  url: string
}

export const NftAgentDialog = ({
  open,
  setOpen,
  nftInfo,
  setNftInfo,
}: Props) => {
  const { t } = useTranslation()
  const [network, setNetwork] = useState('evm')

  const [showCollection, setShowCollection] = useState<string>('')
  const [collection, setCollection] = useState<NFTInfo>()

  const nftListRef = useRef<HTMLDivElement>(null)

  const { list, getNFTList } = useSolNFTList(nftListRef)

  const { evmNftList, getEVMNFTList } = useEvmNftList()

  const getUrlByMetadataJson = (nftData: Asset) => {
    const data = JSON.parse(nftData.metadata_json) as { image: string }

    if (!data?.image || data?.image.startsWith('ipfs://')) {
      return nftData.nftscan_uri || nftData.image_uri
    }

    return data.image
  }

  const handleImgUrl = (url?: string) => {
    return url
    // if (typeof url === 'string') {
    //   if (url.startsWith('data:')) return url
    //   return `https://images.weserv.nl/?url=${url}`
    // }
  }

  const renderNftList = () => {
    // EVM
    // if (network === 'evm') {
    return collection?.assets.map((item, i) => {
      const id = item.token_id || item.token_address
      const imageUrl = getUrlByMetadataJson(item)

      const handleCollectionNmae = () => {
        if (network === 'evm') {
          return `${item.contract_name}${
            typeof item.token_id === 'string' ? `#${item.token_id}` : ''
          }`
        }

        return item.name
      }

      return (
        <DialogClose>
          <div
            className={cn(
              'cursor-pointer text-center px-3 pt-2 pb-1 rounded-md hover:bg-slate-700 transition-all',
              id === nftInfo?.id ? 'bg-slate-700' : ''
            )}
            onClick={() => {
              setNftInfo({
                name: item.name,
                url: imageUrl,
                id,
              })
            }}
          >
            <div className="relative">
              <img
                referrerPolicy="no-referrer"
                src={handleImgUrl(imageUrl)}
                alt="Logo"
                width={90}
                height={90}
                className="w-[90px] h-[90px] object-cover rounded-md"
              />
              {id === nftInfo?.id ? (
                <div className="absolute right-1 top-1 rounded-full p-1 bg-purple-500">
                  <FaCheck size={16} color=""></FaCheck>
                </div>
              ) : null}
            </div>
            <div className="text-sm mt-1 truncate max-w-[90px]">
              {handleCollectionNmae()}
            </div>
          </div>
        </DialogClose>
      )
    })
    // }

    // Solana
    // return list.map((item, i) => {
    //   return (
    //     <DialogClose key={i}>
    //       <Card
    //         selectNftID={nftInfo?.id}
    //         data={{
    //           id: item.id,
    //           name: item.content.metadata.name,
    //           url: item.content.links?.image,
    //         }}
    //         setNftInfo={setNftInfo}
    //       ></Card>
    //     </DialogClose>
    //   )
    // })
  }

  const renderCollectionList = () => {
    return (network === 'evm' ? evmNftList : list).map((item, i) => {
      return item.collection_assets.map((_collection, i) => {
        return (
          <div
            key={_collection.contract_address}
            className={cn(
              'cursor-pointer text-center px-3 pt-2 pb-1 rounded-md hover:bg-slate-700 transition-all'
              // item.chain === selectNftID ? 'bg-slate-700' : ''
            )}
            onClick={() => {
              setCollection(_collection)
            }}
          >
            <div className="relative">
              <img
                referrerPolicy="no-referrer"
                src={handleImgUrl(_collection?.logo_url)}
                alt="Logo"
                width={90}
                height={90}
                className="w-[90px] h-[90px] object-cover rounded-md"
              />
              {_collection === collection ? (
                <div className="absolute right-1 top-1 rounded-full p-1 bg-purple-500">
                  <FaCheck size={16} color=""></FaCheck>
                </div>
              ) : null}
            </div>
            <div className="text-sm mt-1 truncate max-w-[90px]">
              {_collection.contract_name || _collection.collection}
            </div>
          </div>
        )
      })
    })
  }

  useEffect(() => {
    getNFTList()
    getEVMNFTList()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        <div className="flex items-center space-x-2">
          <span className="mr-2"> {t('select.nft')}</span>
          <Select
            defaultValue={network}
            onValueChange={(n) => {
              setCollection(undefined)
              setNetwork(n)
            }}
          >
            <SelectTrigger className="w-[115px]">
              <SelectValue placeholder="Theme" className="w-[115px]" />
            </SelectTrigger>
            <SelectContent className="w-[115px]">
              <SelectItem value="evm">EVM</SelectItem>
              <SelectItem value="sol">SOL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {collection ? (
          <div
            className="flex items-center mt-3 cursor-pointer"
            onClick={() => {
              setCollection(undefined)
            }}
          >
            <FaChevronLeft></FaChevronLeft>
            <span>{t('collection.list')}</span>
          </div>
        ) : null}

        <div ref={nftListRef} className="mt-4 max-h-[70vh] overflow-y-scroll">
          <div className="grid grid-cols-4 gap-y-2 max-sm:grid-cols-2 justify-between">
            {!collection ? renderCollectionList() : renderNftList()}
          </div>

          {/* {loading || loadingMore ? (
            <img
              src={loadingSVG}
              width={40}
              height={40}
              className="w-[40px] h-[40px] my-2 mx-auto"
            ></img>
          ) : null}

          {data?.noMore !== true && list.length === 20 ? (
            <div
              className="mx-auto cursor-pointer text-center mt-4"
              onClick={() => {
                getNFTList()
              }}
            >
              {t('more...')}
            </div>
          ) : null} */}
        </div>
      </div>
    </Dialog>
  )
}

interface CardProps {
  selectNftID?: string
  data: {
    id?: string
    name?: string
    url?: string
  }
  setNftInfo: (nftInfo: NftInfo) => void
}

const Card = ({ data, selectNftID, setNftInfo }: CardProps) => {
  return (
    <div
      className={cn(
        'cursor-pointer text-center px-3 pt-2 pb-1 rounded-md hover:bg-slate-700 transition-all',
        data.id === selectNftID ? 'bg-slate-700' : ''
      )}
      onClick={() => {
        setNftInfo({
          // @ts-ignore
          name: data.name,
          // @ts-ignore
          url: data.url,
          // @ts-ignore
          id: data.id,
        })
      }}
    >
      <div className="relative">
        <img
          referrerPolicy="no-referrer"
          src={`https://images.weserv.nl/?url=${data?.url}`}
          alt="Logo"
          width={90}
          height={90}
          className="w-[90px] h-[90px] object-cover rounded-md"
        />
        {data.id === selectNftID ? (
          <div className="absolute right-1 top-1 rounded-full p-1 bg-purple-500">
            <FaCheck size={16} color=""></FaCheck>
          </div>
        ) : null}
      </div>
      <div className="text-sm mt-1 truncate max-w-[90px]">{data.name}</div>
    </div>
  )
}
