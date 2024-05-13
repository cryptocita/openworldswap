import BigNumber from 'bignumber.js'
import ifoV4Abi from 'config/abi/ifo_v4.json'
import { useEffect, useState } from 'react'

// import { getBalanceAmount } from 'utils/formatBalance'
// import { BIG_ZERO } from 'utils/bigNumber'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { publicClient } from 'utils/wagmi'
import { Ifo, PublicIfoDataV4 } from '../types'

// Retrieve IFO allowance
const useIfoPublicData = (ifo: Ifo, dependency?: any): PublicIfoDataV4 => {
  const [data, setData] = useState<PublicIfoDataV4>({
    ...ifo,
    isLoading: true,
    startDateNum: 0,
    endDateNum: 0,
    claimDateNum: 0,
    referralFee: 0,
    hardcap: BIG_ZERO,
    softcap: BIG_ZERO,
    icoPrice: BIG_ZERO,
    minPerUser: BIG_ZERO,
    maxPerUser: BIG_ZERO,
    totalContributed: BIG_ZERO,
  })

  const { chainId } = useActiveWeb3React()
  const { address: ifoAddress } = ifo

  useEffect(() => {
    const client = publicClient({ chainId })
    const fetchIfoPublicData = async () => {
      const ifoCalls = [
        'viewIcoDates',
        'viewCap',
        'viewIcoPrice',
        'viewLimitation',
        'viewTotalContributed',
        'viewReferralFee',
      ].map((method) => ({
        abi: ifoV4Abi,
        address: ifoAddress,
        functionName: method,
      }))
      const [icoDates, icoCap, icoPrice, limitation, totalContributed, referralFee] =
        // @ts-ignore
        await client.multicall({ contracts: ifoCalls, allowFailure: false })
      // @ts-ignore
      const startDateNum = parseInt(icoDates[0], 10)
      // @ts-ignore
      const endDateNum = parseInt(icoDates[1], 10)
      // @ts-ignore
      const claimDateNum = parseInt(icoDates[2], 10)
      // @ts-ignore
      const referralFeeNum = parseInt(referralFee.toString(), 10)

      const priceData = {
        // @ts-ignore
        icoPrice: getBalanceAmount(new BigNumber(icoPrice.toString())),
        // @ts-ignore
        level1Price: getBalanceAmount(new BigNumber(icoPrice.toString())),
        // @ts-ignore
        level2Price: getBalanceAmount(new BigNumber(icoPrice.toString())),
      }

      setData({
        ...data,
        isLoading: false,
        referralFee: referralFeeNum / 10000,
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
  }, [ifoAddress, data, chainId, dependency])

  return data
}

export default useIfoPublicData
