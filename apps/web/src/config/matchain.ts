import { defineChain } from 'viem'

export const matchain = defineChain({
  id: 698,
  network: 'matchain',
  name: 'Matchain',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.matchain.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Matchain Explorer',
      url: 'https://www.matchscan.io',
      apiUrl: 'https://www.matchscan.io/api',
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
