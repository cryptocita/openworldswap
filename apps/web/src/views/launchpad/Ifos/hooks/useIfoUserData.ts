import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
// import { Address } from 'wagmi'
import ifoAbi from 'config/abi/ifo_v1.json'

// import { getBalanceAmount } from 'utils/formatBalance'
// import { BIG_ZERO } from 'utils/bigNumber'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { publicClient } from 'utils/wagmi'
import { Address } from 'viem'
import { Ifo, UserIfoData } from '../types'

// Retrieve IFO allowance
const useIfoUserData = (ifo: Ifo, dependency?: any): UserIfoData => {
  const { chainId, account } = useActiveWeb3React()

  const [contributedAmount, setContributedAmount] = useState<BigNumber>(BIG_ZERO)
  const [claimed, setClaimed] = useState(false)

  useEffect(() => {
    const fetchContributedAmount = async () => {
      const client = publicClient({ chainId })
      const contributeData = await client.readContract({
        abi: ifoAbi,
        address: ifo.address as Address,
        functionName: 'viewUserContributed',
        args: [account],
      })
      // @ts-ignore
      setContributedAmount(getBalanceAmount(new BigNumber(contributeData[0].toString())))
      // @ts-ignore
      setClaimed(contributeData[1])
    }

    if (account) fetchContributedAmount()
  }, [ifo.address, account, chainId, dependency])

  return { contributedAmount, claimed }
}

export default useIfoUserData
