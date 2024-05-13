// import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

// import { useCallback } from 'react'

// export type MasterChefContractType = ReturnType<typeof getMasterChefContract>

// export const stakeFarm = async (
//   masterChefContract: MasterChefContractType,
//   pid,
//   amount,
//   gasPrice,
//   gasLimit?: bigint,
// ) => {
//   const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
//   logGTMClickStakeFarmEvent()

//   if (!masterChefContract.account) return undefined

//   return masterChefContract.write.deposit([pid, BigInt(value)], {
//     gas: gasLimit || DEFAULT_GAS_LIMIT,
//     gasPrice,
//     account: masterChefContract.account ?? '0x',
//     chain: masterChefContract.chain,
//   })
// }

// const useDeployToken = () => {
//   const { callWithGasPrice } = useCallWithGasPrice()
//   const tokenFactoryContract = useTokenFactoryContract()
//   const onDeploy = useCallback(
//     async (props) => {
//       return callWithGasPrice(tokenFactoryContract, 'createToken', [props])
//     },
//     [tokenFactoryContract, callWithGasPrice],
//   )
//   // const handleStake = useCallback(
//   //   async (amount: string) => {
//   //     return stakeFarm(masterChefContract, pid, amount, gasPrice)
//   //   },
//   //   [masterChefContract, pid, gasPrice],
//   // )

//   return onDeploy
// }

import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useTokenFactoryContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useFeeDataWithGasPrice } from 'state/user/hooks'

const useDeployToken = () => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()
  const tokenFactoryContract = useTokenFactoryContract()
  const { gasPrice } = useFeeDataWithGasPrice()

  const onDeploy = useCallback(
    async (props) => {
      return callWithGasPrice(tokenFactoryContract, 'createToken', [props])
    },
    [tokenFactoryContract, callWithGasPrice],
  )

  // const onDeploy = async (props) => {
  //   console.log('sdfsdf ', props, tokenFactoryContract)

  //   if (!tokenFactoryContract.account) return undefined

  //   // return tokenFactoryContract.write.createToken([props], {
  //   //   gas: DEFAULT_GAS_LIMIT,
  //   //   gasPrice,
  //   //   account: tokenFactoryContract.account ?? '0x',
  //   //   chain: tokenFactoryContract.chain,
  //   // })

  //   const receipt = await fetchWithCatchTxError(() => {
  //     return callWithGasPrice(tokenFactoryContract, 'createToken', [props])
  //   })
  //   if (receipt?.status) {
  //     toastSuccess(t('Create New Token!'))
  //   }
  // }

  return onDeploy
}

export default useDeployToken
