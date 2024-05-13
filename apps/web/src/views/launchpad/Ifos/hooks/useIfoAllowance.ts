// import { useWeb3React } from '@pancakeswap/wagmi'
// import BigNumber from 'bignumber.js'
// import { useEffect, useState } from 'react'
// // import { BIG_ZERO } from 'utils/bigNumber'
// import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
// import { useERC20 } from 'hooks/useContract'

// // Retrieve IFO allowance
// const useIfoAllowance = (
//   tokenContract: ReturnType<typeof useERC20>,
//   spenderAddress: string,
//   dependency?: any,
// ): BigNumber => {
//   const { account } = useWeb3React()
//   const [allowance, setAllowance] = useState(BIG_ZERO)

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await tokenContract?.read.allowance([account as `0x${string}`, spenderAddress as `0x${string}`])
//         setAllowance(new BigNumber(res.toString()))
//       } catch (e) {
//         console.error(e)
//       }
//     }

//     if (account) {
//       fetch()
//     }
//   }, [account, spenderAddress, tokenContract, dependency])

//   return allowance
// }

// export default useIfoAllowance

import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import BigNumber from 'bignumber.js'
import { useERC20, useTokenContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

// Retrieve IFO allowance
const useIfoAllowance = (
  tokenContract: ReturnType<typeof useTokenContract> | ReturnType<typeof useERC20>, // TODO: merge hooks
  spenderAddress: Address,
  dependency?: any,
): BigNumber => {
  const { address: account } = useAccount()
  const [allowance, setAllowance] = useState(BIG_ZERO)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract?.read.allowance([account!, spenderAddress])
        setAllowance(new BigNumber(res?.toString() ?? 0))
      } catch (e) {
        console.error(e)
      }
    }

    if (account) {
      fetch()
    }
  }, [account, spenderAddress, tokenContract, dependency])

  return allowance
}

export default useIfoAllowance
