import { useWeb3React } from '@pancakeswap/wagmi'
import erc20TemplateAbi from 'config/abi/erc20Template.json'
import { useMemo, useState } from 'react'
import { useReadContracts } from 'wagmi'
import { TokenCreationProps } from '../types'

const useTokenDetail = (tokenAddress) => {
  const { chainId } = useWeb3React()
  const [tokenDetail, setTokenDetail] = useState<TokenCreationProps>()

  const { data: results, isLoading } = useReadContracts({
    query: {
      enabled: Boolean(tokenAddress),
    },
    contracts: [
      {
        // @ts-ignore
        abi: erc20TemplateAbi,
        address: tokenAddress as `0x${string}`,
        functionName: 'name',
      },
      {
        // @ts-ignore
        abi: erc20TemplateAbi,
        address: tokenAddress as `0x${string}`,
        functionName: 'symbol',
      },
      {
        // @ts-ignore
        abi: erc20TemplateAbi,
        address: tokenAddress as `0x${string}`,
        functionName: 'decimals',
      },
      {
        // @ts-ignore
        abi: erc20TemplateAbi,
        address: tokenAddress as `0x${string}`,
        functionName: 'totalSupply',
      },
      {
        // @ts-ignore
        abi: erc20TemplateAbi,
        address: tokenAddress as `0x${string}`,
        functionName: 'limit',
      },
      {
        // @ts-ignore
        abi: erc20TemplateAbi,
        address: tokenAddress as `0x${string}`,
        functionName: 'tax',
      },
      {
        // @ts-ignore
        abi: erc20TemplateAbi,
        address: tokenAddress as `0x${string}`,
        functionName: 'marketingWallet',
      },
    ],
  })

  return useMemo(() => {
    if (!isLoading && results) {
      return {
        name: results?.[0].result,
        symbol: results?.[1].result,
        decimals: results?.[2].result?.toString(),
        totalSupply: results?.[3].result?.toString(),
        // @ts-ignore
        txLimit: results?.[4].result[0],
        // @ts-ignore
        holdLimit: results?.[4].result[1],
        // @ts-ignore
        buyTax: results?.[5].result[0],
        // @ts-ignore
        sellTax: results?.[5].result[1],
        // @ts-ignore
        transferTax: results?.[5].result[2],
        // txLimit: '0',
        // holdLimit: '0',
        // buyTax: '0',
        // sellTax: '0',
        // transferTax: '0',
        marketingWallet: results?.[6].result,
      }
    }
    return {
      name: '',
      symbol: '',
      decimals: '',
      totalSupply: '',
      txLimit: '',
      holdLimit: '',
      buyTax: '',
      sellTax: '',
      transferTax: '',
      marketingWallet: '',
    }
  }, [isLoading, results])
}

export default useTokenDetail
