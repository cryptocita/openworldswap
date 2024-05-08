import { ChainId } from '@pancakeswap/chains'
import { chainlinkOracleCAKE } from '@pancakeswap/prediction'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getFullDecimalMultiplier } from '@pancakeswap/utils/getFullDecimalMultiplier'
import BigNumber from 'bignumber.js'
import { chainlinkOracleABI } from 'config/abi/chainlinkOracle'
import { useMemo } from 'react'
import { publicClient } from 'utils/wagmi'
import { erc20Abi, formatUnits } from 'viem'
import { useReadContracts } from 'wagmi'
import { useActiveChainId } from './useActiveChainId'

// for migration to bignumber.js to avoid breaking changes
export const useCakePrice = ({ enabled = true } = {}) => {
  // lpAddress: '0x4D4320acA6ecE298e126e0cc01dB01CA68b42DdD',
  // lpSymbol: 'OWS-USDT LP',
  // pid: 0,
  // multiplier: '0X',
  // isCommunity: false,
  // quoteTokenPriceBusd: '1.000243551548465797',
  // tokenPriceBusd:
  //   '2.6931961394376254912914347373227305207346795510799707130645714314620434546433308251075600093679887',

  // token: new Token(7798, '0x4De88a40bd5334aeCF573022a13C7C32E8086792', 18, 'OWS', 'OpenWorldSwap Token', ''),
  // quoteToken: new Token(7798, '0x8Ce4B67b08c147572c463c894Ff5b540FB58C42a', 18, 'WUSDT', 'Wrapped USDT', ''),

  const lpAddress = '0x4D4320acA6ecE298e126e0cc01dB01CA68b42DdD'
  const quoteTokenAddress = '0x8Ce4B67b08c147572c463c894Ff5b540FB58C42a'
  const tokenAddress = '0x4De88a40bd5334aeCF573022a13C7C32E8086792'
  const { chainId } = useActiveChainId()

  const { data: results, isLoading } = useReadContracts({
    query: {
      enabled: Boolean(lpAddress && quoteTokenAddress),
    },
    contracts: [
      {
        chainId,
        abi: erc20Abi,
        address: tokenAddress!,
        functionName: 'balanceOf',
        args: [lpAddress as `0x${string}`],
      },
      {
        chainId,
        abi: erc20Abi,
        address: quoteTokenAddress!,
        functionName: 'balanceOf',
        args: [lpAddress as `0x${string}`],
      },
      {
        chainId,
        abi: erc20Abi,
        address: tokenAddress!,
        functionName: 'decimals',
      },
      {
        chainId,
        abi: erc20Abi,
        address: quoteTokenAddress!,
        functionName: 'decimals',
      },
    ],
  })

  const price = useMemo(() => {
    if (!isLoading && results) {
      const tokenBalanceLP = BigNumber(results?.[0].result?.toString() || '')
      const quoteTokenBalanceLP = BigNumber(results?.[1].result?.toString() || '')

      const tokenDecimals = results?.[2].result || 18
      const quoteTokenDecimals = results?.[3].result || 18

      const tokenAmountTotal = tokenBalanceLP.div(getFullDecimalMultiplier(tokenDecimals))
      const quoteTokenAmountTotal = quoteTokenBalanceLP.div(getFullDecimalMultiplier(quoteTokenDecimals))

      return quoteTokenAmountTotal.div(tokenAmountTotal)
    }
    return BIG_ZERO
  }, [isLoading, results])

  return price

  // return {
  //   tokenAmountTotal: tokenAmountTotal.toJSON(),
  //   quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
  //   lpTotalSupply: lpTotalSupplyBN.toJSON(),
  //   lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
  //   tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
  // }

  // const { data } = useQuery<BigNumber, Error>({
  //   queryKey: ['cakePrice'],
  //   queryFn: async () => new BigNumber(await getCakePriceFromOracle()),
  //   staleTime: FAST_INTERVAL,
  //   refetchInterval: FAST_INTERVAL,
  //   enabled,
  // })
  // return data ?? BIG_ZERO
}

export const getCakePriceFromOracle = async () => {
  const data = await publicClient({ chainId: ChainId.BSC }).readContract({
    abi: chainlinkOracleABI,
    address: chainlinkOracleCAKE[ChainId.BSC],
    functionName: 'latestAnswer',
  })

  return formatUnits(data, 8)
}
