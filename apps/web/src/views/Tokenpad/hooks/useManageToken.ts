import { useCallback } from 'react'
// import { SendTransactionResult } from 'wagmi/actions'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useERC20Template } from 'hooks/useContract'

const useManageToken = (tokenAddress: string) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const tokenContract = useERC20Template(tokenAddress as `0x${string}`)

  const onUpdateTxHoldLimit = useCallback(
    async (txLimit, holdLimit) => {
      return callWithGasPrice(tokenContract, 'setLimit', [txLimit, holdLimit])
    },
    [tokenContract, callWithGasPrice],
  )

  const onUpdateTax = useCallback(
    async (buyTax, sellTax, transferTax) => {
      return callWithGasPrice(tokenContract, 'setTax', [buyTax, sellTax, transferTax])
    },
    [tokenContract, callWithGasPrice],
  )

  const onUpdateMarketingWallet = useCallback(
    async (marketingWallet) => {
      return callWithGasPrice(tokenContract, 'setMarketingWallet', [marketingWallet])
    },
    [tokenContract, callWithGasPrice],
  )

  return { onUpdateTxHoldLimit, onUpdateTax, onUpdateMarketingWallet }
}

export default useManageToken
