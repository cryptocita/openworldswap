import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import ifoV3Abi from 'config/abi/ifo_v3.json'
import { useState } from 'react'
// import { Ifo } from 'config/constants/types'
import { useSlowRefreshEffect } from 'hooks/useRefreshEffect'
// import { getBalanceAmount } from 'utils/formatBalance'
// import { BIG_ZERO } from 'utils/bigNumber'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import { publicClient } from 'utils/wagmi'
import { Ifo, UserIfoDataV3 } from '../types'

const useIfoUserDataV3 = (ifo: Ifo, dependency?: any): UserIfoDataV3 => {
  const { chainId, account } = useWeb3React()

  const [userData, setUserData] = useState<UserIfoDataV3>({
    pubClaimedAmount: BIG_ZERO,
    pubContributedAmount: BIG_ZERO,
    pubClaimableAmount: BIG_ZERO,
    wlClaimableAmount: BIG_ZERO,
    wlClaimedAmount: BIG_ZERO,
    wlContributedAmount: BIG_ZERO,
  })

  useSlowRefreshEffect(() => {
    const client = publicClient({ chainId })
    const fetchUserInfo = async () => {
      const ifoCalls = [
        {
          abi: ifoV3Abi,
          address: ifo.address,
          functionName: 'viewUserInfo',
          args: [account],
        },
        {
          abi: ifoV3Abi,
          address: ifo.address,
          functionName: 'viewAvailableClaims',
          args: [account],
        },
      ]
      // @ts-ignore
      const [userInfo, availableClaims] = await client.multicall({ contracts: ifoCalls, allowFailure: false })

      setUserData({
        // @ts-ignore
        pubClaimableAmount: getBalanceAmount(new BigNumber(availableClaims[1].toString()), ifo.icoToken.decimals),
        // @ts-ignore
        wlClaimableAmount: getBalanceAmount(new BigNumber(availableClaims[1].toString()), ifo.icoToken.decimals),
        // @ts-ignore
        wlContributedAmount: getBalanceAmount(new BigNumber(userInfo[0].toString())),
        // @ts-ignore
        pubContributedAmount: getBalanceAmount(new BigNumber(userInfo[1].toString())),
        // @ts-ignore
        wlClaimedAmount: getBalanceAmount(new BigNumber(userInfo[2].toString())),
        // @ts-ignore
        pubClaimedAmount: getBalanceAmount(new BigNumber(userInfo[3].toString())),
      })
    }

    if (account) fetchUserInfo()
  }, [ifo.address, account, chainId, dependency])

  return { ...userData }
}

export default useIfoUserDataV3
