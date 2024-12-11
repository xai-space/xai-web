import { Chart } from '@/components/chart'
import { CommentTradeTab } from './comment-trade-tab'
import { HoldersRank } from './holders-rank'
import { TokenInfoCard } from './token-info-card'
import { TokenInfoHeader } from './token-info-header'
import { TradeTab } from './trade-tabs'

export const TokenDesktop = () => {
  return (
    <>
      <div className="flex flex-col flex-1">
        <TokenInfoHeader />
        <Chart />

        <CommentTradeTab />
      </div>

      <div className="w-aside">
        <TradeTab />
        <TokenInfoCard />
        <HoldersRank />
      </div>
    </>
  )
}
