import { defineChain } from 'viem'

export const oexTestnet = defineChain({
  id: 7798,
  network: 'openex-testnet',
  name: 'OpenEX LONG Testnet',
  nativeCurrency: { name: 'USDT', symbol: 'USDT', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://long.rpc.openex.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'OpenEX Long Testnet Explorer',
      url: 'https://scan.long.openex.network',
      apiUrl: 'https://scan.long.openex.network/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xB904DBbD2B4af731c7be81665a38eA817094e926',
      blockCreated: 1098365,
    },
  },
  testnet: false,
})
