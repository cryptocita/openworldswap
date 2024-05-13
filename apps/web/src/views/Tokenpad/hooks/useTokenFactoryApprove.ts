import { useCallback } from 'react'
// import { MaxUint256 } from '@ethersproject/constants'
import { useWeb3React } from '@pancakeswap/wagmi'
// import { SendTransactionResult } from 'wagmi/actions'
import { ChainId } from '@pancakeswap/chains'
import { MaxUint256 } from '@pancakeswap/swap-sdk-core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useOWS } from 'hooks/useContract'
import { getTokenFactoryAddress } from 'utils/addressHelpers'

const useTokenFactoryApprove = () => {
  const { chainId } = useWeb3React()
  const tokenContract = useOWS()
  const tokenFactoryAddress = getTokenFactoryAddress(chainId || ChainId.OEX_TESTNET)
  const { callWithGasPrice } = useCallWithGasPrice()

  const onApproveToken = useCallback(async () => {
    return callWithGasPrice(tokenContract, 'approve', [tokenFactoryAddress, MaxUint256])
  }, [tokenFactoryAddress, tokenContract, callWithGasPrice])

  return { onApproveToken }
}

export default useTokenFactoryApprove
