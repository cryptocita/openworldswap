import BigNumber from 'bignumber.js'
import ifoV1Abi from 'config/abi/ifo_v1.json'
import ifoV2Abi from 'config/abi/ifo_v2.json'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'

// import { BIG_ZERO } from 'utils/bigNumber'
// import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import { publicClient } from 'utils/wagmi'
import { Ifo, PublicIfoData } from '../types'

// Retrieve IFO allowance
const useIfoPublicData = (ifo: Ifo, dependency?: any): PublicIfoData => {
  const [data, setData] = useState<PublicIfoData>({
    ...ifo,
    isLoading: true,
    startDateNum: 0,
    endDateNum: 0,
    claimDateNum: 0,
    hardcap: BIG_ZERO,
    softcap: BIG_ZERO,
    icoPrice: BIG_ZERO,
    level1Price: BIG_ZERO,
    level2Price: BIG_ZERO,
    minPerUser: BIG_ZERO,
    maxPerUser: BIG_ZERO,
    totalContributed: BIG_ZERO,
  })

  const { chainId } = useActiveWeb3React()
  const { version, address: ifoAddress } = ifo

  useEffect(() => {
    const client = publicClient({ chainId })
    const fetchIfoPublicData = async () => {
      const abi = version === 1 ? ifoV1Abi : ifoV2Abi
      const ifoCalls = (
        version === 1
          ? ['viewIcoDates', 'viewCap', 'viewIcoPrice', 'viewLimitation', 'viewTotalContributed']
          : ['viewIcoDates', 'viewCap', 'viewIcoPrices', 'viewLimitation', 'viewTotalContributed']
      ).map((method) => ({
        abi,
        address: ifoAddress,
        functionName: method,
      }))
      const [icoDates, icoCap, icoPrice, limitation, totalContributed] =
        // @ts-ignore
        await client.multicall({ contracts: ifoCalls, allowFailure: false })
      // @ts-ignore
      const startDateNum = parseInt(icoDates[0], 10)
      // @ts-ignore
      const endDateNum = parseInt(icoDates[1], 10)
      // @ts-ignore
      const claimDateNum = parseInt(icoDates[2], 10)

      const priceData =
        version === 1
          ? {
              // @ts-ignore
              icoPrice: getBalanceAmount(new BigNumber(icoPrice?.toString())),
              // @ts-ignore
              level1Price: getBalanceAmount(new BigNumber(icoPrice?.toString())),
              // @ts-ignore
              level2Price: getBalanceAmount(new BigNumber(icoPrice?.toString())),
            }
          : {
              // @ts-ignore
              icoPrice: getBalanceAmount(new BigNumber(icoPrice[2].toString())),
              // @ts-ignore
              level1Price: getBalanceAmount(new BigNumber(icoPrice[0].toString())),
              // @ts-ignore
              level2Price: getBalanceAmount(new BigNumber(icoPrice[1].toString())),
            }

      setData({
        ...data,
        isLoading: false,
        // @ts-ignore
        softcap: getBalanceAmount(new BigNumber(icoCap[0].toString())),
        // @ts-ignore
        hardcap: getBalanceAmount(new BigNumber(icoCap[1].toString())),
        ...priceData,
        // @ts-ignore
        minPerUser: getBalanceAmount(new BigNumber(limitation[0].toString())),
        // @ts-ignore
        maxPerUser: getBalanceAmount(new BigNumber(limitation[1].toString())),
        // @ts-ignore
        totalContributed: getBalanceAmount(new BigNumber(totalContributed.toString())),
        endDateNum,
        startDateNum,
        claimDateNum,
      })
    }

    fetchIfoPublicData()
  }, [ifoAddress, version, data, chainId, dependency])

  return data
}

export default useIfoPublicData
