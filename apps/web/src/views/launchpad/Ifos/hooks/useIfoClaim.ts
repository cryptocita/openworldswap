import { useCallback } from 'react'
// import { SendTransactionResult } from 'wagmi/actions'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useIfoContract } from 'hooks/useContract'

const useIfoClaim = (ifoContract: ReturnType<typeof useIfoContract>) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const onClaim = useCallback(async () => {
    return callWithGasPrice(ifoContract, 'claimTokens', [])
  }, [ifoContract, callWithGasPrice])

  return onClaim
}

export default useIfoClaim
