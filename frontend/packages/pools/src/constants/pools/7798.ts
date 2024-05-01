import { oexTestnetTokens } from '@pancakeswap/tokens'
import { getAddress } from 'viem'

import { PoolCategory, SerializedPool } from '../../types'

export const livePools: SerializedPool[] = [
  {
    sousId: 3,
    stakingToken: oexTestnetTokens.ows,
    earningToken: oexTestnetTokens.ows,
    contractAddress: '0xF2da6a64292fD530D1542835EDDebB492F59a837',
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '1',
    // version: 3,
  },
  // {
  //   sousId: 0,
  //   stakingToken: oexTestnetTokens.ows,
  //   earningToken: oexTestnetTokens.ows,
  //   contractAddress: '0xb915Ac86EfeB25c2096eeaE28046288792d72f47',
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '1',
  //   isFinished: false,
  // },
].map((p) => ({
  ...p,
  contractAddress: getAddress(p.contractAddress),
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

// known finished pools
export const finishedPools: SerializedPool[] = []
// export const finishedPools: SerializedPool[] = [
//   {
//     sousId: 2,
//     stakingToken: arbitrumGoerliTokens.cake,
//     earningToken: arbitrumGoerliTokens.mockA,
//     contractAddress: '0x4aB4ec9EC094E6042E822A73Cd3979A946280E56',
//     poolCategory: PoolCategory.CORE,
//     tokenPerSecond: '0.01',
//     version: 3,
//   },
//   {
//     sousId: 1,
//     stakingToken: arbitrumGoerliTokens.cake,
//     earningToken: arbitrumGoerliTokens.mockA,
//     contractAddress: '0x5b37404299Ef7DCABA32B00A8f36f0F43eC28E92',
//     poolCategory: PoolCategory.CORE,
//     tokenPerSecond: '0.01',
//     version: 3,
//   },
// ].map((p) => ({
//   ...p,
//   isFinished: true,
//   contractAddress: getAddress(p.contractAddress),
//   stakingToken: p.stakingToken.serialize,
//   earningToken: p.earningToken.serialize,
// }))

export const pools: SerializedPool[] = [...livePools]
