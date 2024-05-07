import { useReadContracts } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import { lpTokenABI } from 'config/abi/lpTokenAbi'
import { v2WrapperABI } from 'config/abi/v2wrapper'
import { useActiveChainId } from 'hooks/useActiveChainId'

import { Address } from 'viem'

export function useCakeUserInfo(
  cakeWrapperAddress: Address | undefined,
  lpAddress: Address | undefined,
  userAddress: Address | undefined,
  tokenAddress: Address | undefined,
  quoteTokenAddress: Address | undefined,
) {
  const { chainId } = useActiveChainId()
  // const inputs = useMemo(() => [owner, spender] as [`0x${string}`, `0x${string}`], [owner, spender])

  // allowance: BigNumber('0'),
  // tokenBalance: BigNumber('0'),
  // stakedBalance: BigNumber('0'),
  // earnings: BigNumber('0'),
  // boosterMultiplier: 0,
  // boostedAmounts: BigNumber('0'),
  // boosterContractAddress: '',
  // rewardPerSecond: 0.00016588955026455,
  // startTimestamp: 1714154547,
  // endTimestamp: 1715364000,

  const { data: results, isLoading } = useReadContracts({
    query: {
      enabled: Boolean(cakeWrapperAddress && userAddress && lpAddress && quoteTokenAddress),
    },
    contracts: [
      {
        chainId,
        abi: lpTokenABI,
        address: lpAddress!,
        functionName: 'allowance',
        args: [userAddress as `0x${string}`, cakeWrapperAddress as `0x${string}`],
      },
      {
        chainId,
        abi: lpTokenABI,
        address: lpAddress!,
        functionName: 'balanceOf',
        args: [userAddress as `0x${string}`],
      },
      {
        chainId,
        abi: v2WrapperABI,
        address: cakeWrapperAddress!,
        functionName: 'userInfo',
        args: [userAddress as `0x${string}`],
      },
      {
        chainId,
        abi: v2WrapperABI,
        address: cakeWrapperAddress!,
        functionName: 'rewardPerSecond',
      },
      {
        chainId,
        abi: v2WrapperABI,
        address: cakeWrapperAddress!,
        functionName: 'startTimestamp',
      },
      {
        chainId,
        abi: v2WrapperABI,
        address: cakeWrapperAddress!,
        functionName: 'endTimestamp',
      },
      {
        chainId,
        abi: v2WrapperABI,
        address: cakeWrapperAddress!,
        functionName: 'boostContract',
      },
      {
        chainId,
        abi: lpTokenABI,
        address: lpAddress!,
        functionName: 'totalSupply',
      },
      {
        chainId,
        abi: v2WrapperABI,
        address: cakeWrapperAddress!,
        functionName: 'pendingReward',
        args: [userAddress as `0x${string}`],
      },
      {
        chainId,
        abi: lpTokenABI,
        address: lpAddress!,
        functionName: 'balanceOf',
        args: [cakeWrapperAddress as `0x${string}`],
      },
      {
        chainId,
        abi: lpTokenABI,
        address: quoteTokenAddress!,
        functionName: 'balanceOf',
        args: [lpAddress as `0x${string}`],
      },
      {
        chainId,
        abi: lpTokenABI,
        address: tokenAddress!,
        functionName: 'balanceOf',
        args: [lpAddress as `0x${string}`],
      },
    ],
    watch: true,
  })

  return {
    allowance: BigNumber(results?.[0].result?.toString() || ''),
    tokenBalance: BigNumber(results?.[1].result?.toString() || ''),
    stakedBalance: BigNumber(results?.[2].result?.[0]?.toString() || ''),
    boosterMultiplier: Number(results?.[2].result?.[2]),
    boostedAmounts: BigNumber(results?.[2].result?.[3]?.toString() || ''),
    earnings: BigNumber(results?.[8].result?.toString() || ''),
    rewardPerSecond: 0.2,
    startTimestamp: Number(results?.[4].result),
    endTimestamp: Number(results?.[5].result),
    boosterContractAddress: results?.[6].result,
    lpTotalSupply: BigNumber(results?.[7].result?.toString() || ''),
    stakedLpSupply: BigNumber(results?.[9].result?.toString() || ''),
    lpTotalInQuoteToken: BigNumber(results?.[10].result?.toString() || '').multipliedBy(2),
    quoteTokenAmountTotal: BigNumber(results?.[10].result?.toString() || ''),
    tokenAmountTotal: BigNumber(results?.[11].result?.toString() || ''),
    loading: isLoading,
  }

  // lpTotalSupply={lpTotalSupply ?? BIG_ZERO}
  // lpTokenPrice={lpTokenPrice ?? BIG_ZERO}
  // tokenAmountTotal={tokenAmountTotal ?? BIG_ZERO}
  // quoteTokenAmountTotal={quoteTokenAmountTotal ?? BIG_ZERO}

  // allowance: BigNumber
  // tokenBalance: BigNumber
  // stakedBalance: BigNumber
  // earnings: BigNumber
  // earningsDualTokenBalance?: BigNumber
  // boosterMultiplier?: number
  // boostedAmounts?: BigNumber
  // boosterContractAddress?: Address
  // rewardPerSecond?: number
  // startTimestamp?: number
  // endTimestamp?: number
  // isRewardInRange?: boolean
}
