import BigNumber from 'bignumber.js'
import ifoV4Abi from 'config/abi/ifo_v4.json'
// import { Ifo } from 'config/constants/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
// import { BIG_ZERO } from 'utils/bigNumber'
// import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import { publicClient } from 'utils/wagmi'
import { Ifo, UserIfoDataV4 } from '../types'

// Retrieve IFO allowance
const useIfoUserData = (ifo: Ifo, dependency?: any): UserIfoDataV4 => {
  const { chainId, account } = useActiveWeb3React()

  const [userData, setUserData] = useState<UserIfoDataV4>({
    contributedAmount: BIG_ZERO,
    claimed: false,
    referredCount: 0,
    referredContributes: BIG_ZERO,
    referrerDistributes: BIG_ZERO,
  })

  const { address: ifoAddress, icoToken } = ifo

  useEffect(() => {
    const fetchContributedAmount = async () => {
      const client = publicClient({ chainId })

      const ifoCalls = [
        'viewUserContributed',
        'viewReferredCount',
        'viewReferredContributes',
        'viewReferrerDistributes',
      ].map((method) => ({
        abi: ifoV4Abi,
        address: ifoAddress,
        functionName: method,
        args: [account],
      }))

      const [contributeData, referredCount_, referredContributes_, referrerDistributes_] =
        // @ts-ignore
        await client.multicall({ contracts: ifoCalls, allowFailure: false })

      setUserData({
        // @ts-ignore
        contributedAmount: getBalanceAmount(new BigNumber(contributeData[0].toString())),
        // @ts-ignore
        claimed: contributeData[1],
        referredCount: Number(referredCount_),
        // @ts-ignore
        referredContributes: getBalanceAmount(new BigNumber(referredContributes_.toString())),
        // @ts-ignore
        referrerDistributes: getBalanceAmount(new BigNumber(referrerDistributes_.toString()), icoToken.decimals),
      })
    }

    if (account) fetchContributedAmount()
  }, [ifoAddress, account, chainId, dependency])

  return { ...userData }
}

export default useIfoUserData
