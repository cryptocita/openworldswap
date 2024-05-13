import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useIfoContract } from 'hooks/useContract'
import { useCallback } from 'react'
// import { isAddress } from 'utils'
// import { SendTransactionResult } from 'wagmi/actions'
// import { isAddress } from 'viem'
import { isAddress } from 'ethers/lib/utils'
import { BANSHEES_REFER_KEY, ICO_REFER_KEY } from '../types'

const useIfoContribute = (ifoContract: ReturnType<typeof useIfoContract>) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const { account, chainId } = useActiveWeb3React()

  // referral key is different for each ico so we check it here

  let referrer = localStorage.getItem(ICO_REFER_KEY)
  let bansheesReferrer = localStorage.getItem(BANSHEES_REFER_KEY)
  //  @ts-ignore
  if (!isAddress(referrer ?? '')) referrer = account ?? undefined
  //  @ts-ignore
  if (!isAddress(bansheesReferrer ?? '')) bansheesReferrer = account ?? undefined

  const onContribute = useCallback(
    async (amount: string, icoId: string) => {
      return callWithGasPrice(
        ifoContract,
        'contribute',
        [icoId === 'banshees-public-sale' ? bansheesReferrer : referrer],
        {
          value: BigInt(amount),
        },
      )
    },
    [ifoContract, callWithGasPrice],
  )

  const onRefund = useCallback(async () => {
    return callWithGasPrice(ifoContract, 'refundContribution', [])
  }, [ifoContract, callWithGasPrice])

  return { onContribute, onRefund }
}

export default useIfoContribute
