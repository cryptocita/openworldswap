import { defineChain } from 'viem'

export const fiveire = defineChain({
  id: 995,
  network: 'fiveire',
  name: '5ire',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.5ire.network'],
    },
  },
  blockExplorers: {
    default: {
      name: '5ire Explorer',
      url: 'https://5irescan.io',
      apiUrl: 'https://5irescan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0x3DF3C3Da3f9D34d1E19c4e15DE01cc4102f2d67e',
      blockCreated: 1098365,
    },
  },
  testnet: false,
})
