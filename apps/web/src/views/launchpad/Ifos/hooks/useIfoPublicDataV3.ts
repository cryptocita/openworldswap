import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import ifoV3Abi from 'config/abi/ifo_v3.json'
import { useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { useState } from 'react'
// import { BIG_ZERO } from 'utils/bigNumber'
// import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import { publicClient } from 'utils/wagmi'
import { Ifo, PublicIfoDataV3 } from '../types'

const useIfoPublicDataV3 = (ifo: Ifo, dependency?: any): PublicIfoDataV3 => {
  const [data, setData] = useState<PublicIfoDataV3>({
    ...ifo,
    isLoading: true,
    startDateNum: 0,
    pubDateNum: 0,
    endDateNum: 0,
    claimDateNum: 0,
    hardcap: BIG_ZERO,
    softcap: BIG_ZERO,
    wlPrice: BIG_ZERO,
    pubPrice: BIG_ZERO,
    minPerUser: BIG_ZERO,
    maxPerUser: BIG_ZERO,
    totalWlContributed: BIG_ZERO,
    totalPubContributed: BIG_ZERO,
  })

  const { chainId, account } = useWeb3React()
  const { version, address: ifoAddress } = ifo

  useSlowRefreshEffect(() => {
    const client = publicClient({ chainId })
    const fetchIfoPublicData = async () => {
      let ifoCalls = ['viewIcoDates', 'viewCap', 'viewIcoPrices', 'wlMaxPerUser', 'viewTotalContributed'].map(
        (method) => ({
          abi: ifoV3Abi,
          address: ifoAddress,
          functionName: method,
          args: [],
        }),
      )
      // @ts-ignore
      ifoCalls = ifoCalls.concat([
        {
          abi: ifoV3Abi,
          address: ifoAddress,
          functionName: 'viewVestingProp',
          args: [false],
        },
        {
          abi: ifoV3Abi,
          address: ifoAddress,
          functionName: 'viewVestingProp',
          args: [true],
        },
      ])

      const [icoDates, icoCap, icoPrices, limitation, totalContributed, wlVestingProp, pubVestingProp] =
        // @ts-ignore
        await client.multicall({ contracts: ifoCalls, allowFailure: false })
      // @ts-ignore
      const startDateNum = parseInt(icoDates[0], 10)
      // @ts-ignore
      const pubDateNum = parseInt(icoDates[1], 10)
      // @ts-ignore
      const endDateNum = parseInt(icoDates[2], 10)
      // @ts-ignore
      const claimDateNum = parseInt(icoDates[3], 10)

      const priceData = {
        // @ts-ignore
        wlPrice: getBalanceAmount(new BigNumber(icoPrices[0].toString())),
        // @ts-ignore
        pubPrice: getBalanceAmount(new BigNumber(icoPrices[1].toString())),
      }

      setData({
        ...data,
        isLoading: false,
        // @ts-ignore
        softcap: getBalanceAmount(new BigNumber(icoCap[0].toString())),
        // @ts-ignore
        hardcap: getBalanceAmount(new BigNumber(icoCap[1].toString())),
        ...priceData,
        minPerUser: BIG_ZERO,
        // @ts-ignore
        maxPerUser: getBalanceAmount(new BigNumber(limitation.toString())),
        // @ts-ignore
        totalWlContributed: getBalanceAmount(new BigNumber(totalContributed[0].toString())),
        // @ts-ignore
        totalPubContributed: getBalanceAmount(new BigNumber(totalContributed[1].toString())),
        endDateNum,
        startDateNum,
        pubDateNum,
        claimDateNum,
        wlVestingProp: {
          // @ts-ignore
          interval: Number(wlVestingProp[0]),
          // @ts-ignore
          percent: Number(wlVestingProp[1]),
          // @ts-ignore
          beginPercent: Number(wlVestingProp[2]),
        },
        pubVestingProp: {
          // @ts-ignore
          interval: Number(pubVestingProp[0]),
          // @ts-ignore
          percent: Number(pubVestingProp[1]),
          // @ts-ignore
          beginPercent: Number(pubVestingProp[2]),
        },
      })
    }

    fetchIfoPublicData()
  }, [ifoAddress, version, account, data, chainId, dependency])

  return data
}

export default useIfoPublicDataV3
