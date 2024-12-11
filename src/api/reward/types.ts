export interface RewardInfoRes {
  buy: RewardInfoTrade
  sell: RewardInfoTrade
  create: RewardInfoBase
  graduated: RewardInfoBase
  join_community: RewardInfoBase
  trade: RewardInfoBase
  answer_question: RewardInfoBase
}

export interface RewardInfoTrade {
  amount_unit: number
  desc: string
  usd_unit: number
}

export interface RewardInfoBase {
  desc: string
  reward_amount: number
}
