import { ethers } from 'ethers'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useIfoContract } from 'hooks/useContract'
import { useCallback } from 'react'

const useIfoApprove = (tokenContract: ReturnType<typeof useIfoContract>, spenderAddress: string) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const onApprove = useCallback(async () => {
    return callWithGasPrice(tokenContract, 'approve', [spenderAddress, ethers.constants.MaxUint256])
  }, [spenderAddress, tokenContract, callWithGasPrice])

  return onApprove
}

export default useIfoApprove
