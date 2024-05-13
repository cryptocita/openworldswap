import BigNumber from 'bignumber.js'
import tokenFactoryAbi from 'config/abi/tokenFactory.json'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { createContext, useContext, useEffect, useState } from 'react'
import { getTokenFactoryAddress } from 'utils/addressHelpers'
import { publicClient } from 'utils/wagmi'
// import { BIG_ZERO } from 'utils/bigNumber'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'

export type ITokenpadContextState = {
  launchFee: BigNumber
  ownedTokens: Array<object>
}

export const TokenpadContext = createContext<ITokenpadContextState | null>(null)

export function useConfig() {
  return useContext(TokenpadContext)
}

export default function TokenpadProvider({ children }) {
  const [launchFee, setLaunchFee] = useState(BIG_ZERO)
  const [ownedTokens, setOwnedTokens] = useState([])
  const { account, chainId } = useActiveWeb3React()

  useEffect(() => {
    ;(async () => {
      const client = publicClient({ chainId })
      const tokenFactoryAddress = getTokenFactoryAddress(chainId)
      const launchFeeResult = await client.readContract({
        abi: tokenFactoryAbi,
        address: tokenFactoryAddress,
        functionName: 'launchFee',
        args: [],
      })
      setLaunchFee(new BigNumber(launchFeeResult?.toString() || '0'))
    })()
  }, [chainId])

  useEffect(() => {
    if (account && chainId)
      (async () => {
        const client = publicClient({ chainId })
        const tokenFactoryAddress = getTokenFactoryAddress(chainId)
        const tokenCountResult = await client.readContract({
          abi: tokenFactoryAbi,
          address: tokenFactoryAddress,
          functionName: 'ownedTokenCount',
          args: [account],
        })
        const tokenAddressesResult = await client.readContract({
          abi: tokenFactoryAbi,
          address: tokenFactoryAddress,
          functionName: 'ownedTokens',
          args: [account, 0, tokenCountResult],
        })
        // @ts-ignore
        setOwnedTokens(tokenAddressesResult)
      })()
    else setOwnedTokens([])
  }, [account, chainId])

  return <TokenpadContext.Provider value={{ launchFee, ownedTokens }}>{children}</TokenpadContext.Provider>
}
