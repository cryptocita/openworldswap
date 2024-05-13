import { ChainId } from '@pancakeswap/chains'
// import { Ifo } from '@pancakeswap/ifos'
import { Token } from '@pancakeswap/swap-sdk-core'
import BigNumber from 'bignumber.js'

export const REFER_KEY = 'OWS-Referral'
export const ICO_REFER_KEY = 'OWS-ICO-Referral'
export const BANSHEES_REFER_KEY = 'OWS-ICO-Referral'

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished' | 'claimable'
export type IfoV3Status = 'idle' | 'coming_soon' | 'wl_sale' | 'pub_sale' | 'finished' | 'claimable'

export interface Ifo {
  id: string
  chainId: ChainId
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  projectSiteUrl: string
  releaseAt: number
  icoToken: Token
  version: number
  audit?: boolean
  kyc?: boolean
}

export interface VestingProp {
  interval: number
  percent: number
  beginPercent: number
}

// IFO public data
interface CommonPublicIfoData extends Ifo {
  isLoading: boolean
  startDateNum: number
  endDateNum: number
  claimDateNum: number
  hardcap: BigNumber
  softcap: BigNumber
  minPerUser: BigNumber
  maxPerUser: BigNumber
}

export interface PublicIfoDataV3 extends CommonPublicIfoData {
  pubDateNum: number // for the ifo v3, startDateNum will be used for wlStartDate
  wlPrice: BigNumber
  pubPrice: BigNumber
  wlVestingProp?: VestingProp
  pubVestingProp?: VestingProp
  totalWlContributed: BigNumber
  totalPubContributed: BigNumber
}

export interface PublicIfoData extends CommonPublicIfoData {
  icoPrice: BigNumber
  level1Price: BigNumber
  level2Price: BigNumber
  totalContributed: BigNumber
}

export interface PublicIfoDataV4 extends CommonPublicIfoData {
  icoPrice: BigNumber
  totalContributed: BigNumber
  referralFee: number
}

export interface UserIfoData {
  contributedAmount: BigNumber
  claimed: boolean
}

export interface UserIfoDataV3 {
  wlContributedAmount: BigNumber
  pubContributedAmount: BigNumber
  wlClaimedAmount: BigNumber
  pubClaimedAmount: BigNumber
  wlClaimableAmount: BigNumber
  pubClaimableAmount: BigNumber
}

export interface UserIfoDataV4 {
  contributedAmount: BigNumber
  referrerDistributes: BigNumber
  referredContributes: BigNumber
  referredCount: number
  claimed: boolean
}
