import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useIfoContract } from 'hooks/useContract'
import { useCallback } from 'react'
// import { SendTransactionResult } from 'wagmi/actions'

const useIfoContribute = (ifoContract: ReturnType<typeof useIfoContract>) => {
  const { callWithGasPrice } = useCallWithGasPrice()

  const onContribute = useCallback(
    async (amount: string) => {
      return callWithGasPrice(ifoContract, 'contribute', [], {
        value: BigInt(amount),
      })
    },
    [ifoContract, callWithGasPrice],
  )

  return onContribute
}

export default useIfoContribute
