import { BsArrowDownUp } from 'react-icons/bs'
import { BsGraphUpArrow } from 'react-icons/bs'
import { LuUsers } from 'react-icons/lu'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { TokenInfoHeader } from './token-info-header'
import { TradeTab } from './trade-tabs'
import { TokenInfoCard } from './token-info-card'
import { CommentTradeTab } from './comment-trade-tab'
import { Chart } from '@/components/chart'
import { HoldersRank } from './holders-rank'
import { Routes } from '@/routes'
import { joinPaths } from '@/utils'
import { IoArrowBack } from 'react-icons/io5'

const enum Tab {
  Trade = '0',
  Chart = '1',
  Holder = '2',
}

export const TokenMobile = () => {
  const { t } = useTranslation()
  const { query, back, ...router } = useRouter()
  const tab = (query.tab || Tab.Trade) as string

  return (
    <>
      <div
        onClick={back}
        className="sticky top-0 flex space-x-2 z-50 items-center font-semibold bg-background w-full py-3 lg:hidden"
      >
        <IoArrowBack />
        <span>{t('back')}</span>
      </div>
      <Tabs
        defaultValue={tab}
        className="w-full min-h-max flex flex-col justify-between"
        onValueChange={(tab) => {
          router.replace({
            pathname: joinPaths(
              Routes.Main,
              query.chain as string,
              query.address as string
            ),
            query: { tab },
          })
        }}
      >
        <TabsContent value={Tab.Trade}>
          <TokenInfoHeader />
          <div className="h-2"></div>
          <TradeTab />
          <div className="pt-2"></div>
          <TokenInfoCard />
          <CommentTradeTab />
        </TabsContent>
        <TabsContent value={Tab.Chart}>
          <Chart />
        </TabsContent>
        <TabsContent value={Tab.Holder}>
          <TokenInfoHeader />
          <HoldersRank />
        </TabsContent>
        <div className="h-[36px] mb-2">
          <div className="fixed left-0 bottom-0 w-full">
            <TabsList className="h-11 grid w-full rounded-none grid-cols-3 bg-background">
              <TabsTrigger value={Tab.Trade} className="bg-zinc-400">
                <BsArrowDownUp className="mr-1" size={16}></BsArrowDownUp>
                {t('trade.tab')}
              </TabsTrigger>
              <TabsTrigger
                className="border-x-2 border-black relative bg-zinc-400"
                value={Tab.Chart}
              >
                <BsGraphUpArrow className="mr-1" size={16}></BsGraphUpArrow>
                {t('chart')}
              </TabsTrigger>
              <TabsTrigger value={Tab.Holder} className="bg-zinc-400">
                <LuUsers className="mr-1" size={20}></LuUsers>
                {t('holder')}
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </Tabs>
    </>
  )
}
