import { Asset, NFTInfo } from '@/api/nft'
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
import { isSolAddress } from '@/packages/react-sol'
import { utilLang } from '@/utils/lang'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCheck } from 'react-icons/fa6'
import { FaChevronLeft } from 'react-icons/fa6'
import { toast } from 'sonner'
import { isAddress } from 'viem'

enum Network {
  EVM = 'evm',
  SOL = 'sol',
}

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
  const { primaryWallet, setShowDynamicUserProfile } = useDynamicContext()
  const [collection, setCollection] = useState<NFTInfo>()

  const address = primaryWallet?.address

  const [network, setNetwork] = useState(
    isAddress(address!) ? Network.EVM : Network.SOL
  )

  const nftListRef = useRef<HTMLDivElement>(null)

  const { solList, loading: solLoading } = useSolNFTList(nftListRef)

  const { evmNftList, loading: evmLoading } = useEvmNftList()

  const onChangeVM = (n: string) => {
    if (n === Network.SOL) {
      if (address && isAddress(address)) {
        setShowDynamicUserProfile(true)
        toast.warning(utilLang.replace(t('switch_wallet'), [Network.SOL]))
        return
      }
    } else {
      if (address && isSolAddress(address)) {
        setShowDynamicUserProfile(true)
        toast.warning(utilLang.replace(t('switch_wallet'), [Network.EVM]))
        return
      }
    }
    setCollection(undefined)
    setNetwork(n as Network)
  }

  const getUrlByMetadataJson = (nftData: Asset) => {
    const data = JSON.parse(nftData.metadata_json) as { image: string }

    if (!data?.image || data?.image.startsWith('ipfs://')) {
      return nftData.nftscan_uri || nftData.image_uri
    }

    return data.image
  }

  const renderNftList = () => {
    // EVM
    // if (network === 'evm') {
    return collection?.assets.map((item, i) => {
      const id = item.token_id || item.token_address
      const imageUrl = getUrlByMetadataJson(item)

      const handleCollectionNmae = () => {
        if (network === Network.EVM) {
          return `${item.contract_name}${
            typeof item.token_id === 'string' ? `#${item.token_id}` : ''
          }`
        }

        return item.name
      }

      return (
        <DialogClose key={i}>
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
  }

  const renderCollectionList = () => {
    return (network === Network.EVM ? evmNftList : solList).map((item) => {
      return item.collection_assets.map((c) => {
        return (
          <div
            key={c.contract_address}
            className={cn(
              'cursor-pointer text-center px-3 pt-2 pb-1 rounded-md hover:bg-slate-700 transition-all'
              // item.chain === selectNftID ? 'bg-slate-700' : ''
            )}
            onClick={() => {
              setCollection(c)
            }}
          >
            <div className="relative">
              <img
                referrerPolicy="no-referrer"
                src={c?.logo_url}
                // With default image if error
                ref={(el) =>
                  el?.addEventListener('error', () => {
                    el.src = '/images/logo.png'
                  })
                }
                alt="Logo"
                width={90}
                height={90}
                className="w-[90px] h-[90px] object-cover rounded-md"
              />
              {c === collection ? (
                <div className="absolute right-1 top-1 rounded-full p-1 bg-purple-500">
                  <FaCheck size={16} color=""></FaCheck>
                </div>
              ) : null}
            </div>
            <div className="text-sm mt-1 truncate max-w-[90px]">
              {c.contract_name || c.collection}
            </div>
          </div>
        )
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        <div className="flex items-center space-x-2">
          <span className="mr-2"> {t('select.nft')}</span>
          <Select defaultValue={network} onValueChange={onChangeVM}>
            <SelectTrigger className="w-[115px]">
              <SelectValue placeholder="Theme" className="w-[115px]" />
            </SelectTrigger>
            <SelectContent className="w-[115px]">
              <SelectItem value={Network.EVM}>EVM</SelectItem>
              <SelectItem value={Network.SOL}>SOL</SelectItem>
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

          {network === Network.SOL ? (
            solLoading
          ) : evmLoading ? (
            <img
              src={loadingSVG}
              width={40}
              height={40}
              className="w-[40px] h-[40px] my-2 mx-auto"
              alt="loading"
            ></img>
          ) : null}

          {!collection &&
          network === Network.SOL &&
          !solLoading &&
          solList.length === 0 ? (
            <div className="text-center w-full mt-4 text-muted-foreground">
              {t('no.nft')}
            </div>
          ) : null}

          {!collection &&
          network === Network.EVM &&
          !evmLoading &&
          evmNftList.length === 0 ? (
            <div className="text-center w-full mt-4 text-muted-foreground">
              {t('no.nft')}
            </div>
          ) : null}
        </div>
      </div>
    </Dialog>
  )
}
