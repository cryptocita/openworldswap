import { ChainId } from '@pancakeswap/chains'
import { Address, Hash } from 'viem'

const FACTORY_ADDRESS = '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865'

/**
 * To compute Pool address use DEPLOYER_ADDRESSES instead
 */
export const FACTORY_ADDRESSES = {
  [ChainId.ETHEREUM]: FACTORY_ADDRESS,
  [ChainId.GOERLI]: FACTORY_ADDRESS,
  [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BSC_TESTNET]: FACTORY_ADDRESS,
  [ChainId.ARBITRUM_ONE]: FACTORY_ADDRESS,
  [ChainId.ARBITRUM_GOERLI]: '0xBA40c83026213F9cbc79998752721a0312bdB74a',
  [ChainId.POLYGON_ZKEVM]: FACTORY_ADDRESS,
  [ChainId.POLYGON_ZKEVM_TESTNET]: '0x2430dbd123BC40f8Be6110065a448C1aA0619Cb1',
  [ChainId.ZKSYNC]: '0x1BB72E0CbbEA93c08f535fc7856E0338D7F7a8aB',
  [ChainId.ZKSYNC_TESTNET]: '0x48e6Bc3f2546E63908cd09b04E2B3f78e57B6292',
  [ChainId.LINEA]: FACTORY_ADDRESS,
  [ChainId.LINEA_TESTNET]: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
  [ChainId.OPBNB]: FACTORY_ADDRESS,
  [ChainId.OPBNB_TESTNET]: '0x0F81fD8DaC20A21029B496D8F8E08385201B8ca0',
  [ChainId.BASE]: FACTORY_ADDRESS,
  [ChainId.BASE_TESTNET]: '0x618f16159d489AA7761168F0200b7705dee9e2C0',
  [ChainId.SCROLL_SEPOLIA]: '0x5A6919Dfd2C761788608b0D1bd1239961ADCB08B',
  [ChainId.SEPOLIA]: FACTORY_ADDRESS,
  [ChainId.BASE_SEPOLIA]: FACTORY_ADDRESS,
  [ChainId.ARBITRUM_SEPOLIA]: FACTORY_ADDRESS,

  [ChainId.OEX_TESTNET]: '0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B',
  [ChainId.MATCHAIN]: '0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B',
  [ChainId.FIVEIRE]: '0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B',
} as const satisfies Record<ChainId, Address>

const DEPLOYER_ADDRESS = '0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9'

export const DEPLOYER_ADDRESSES = {
  [ChainId.ETHEREUM]: DEPLOYER_ADDRESS,
  [ChainId.GOERLI]: DEPLOYER_ADDRESS,
  [ChainId.BSC]: DEPLOYER_ADDRESS,
  [ChainId.BSC_TESTNET]: DEPLOYER_ADDRESS,
  [ChainId.ARBITRUM_ONE]: DEPLOYER_ADDRESS,
  [ChainId.ARBITRUM_GOERLI]: '0xbC465fbf687e4184103b67Ed86557A8155FA4343',
  [ChainId.POLYGON_ZKEVM]: DEPLOYER_ADDRESS,
  [ChainId.POLYGON_ZKEVM_TESTNET]: '0x86808Be3f426C9B4c8C706bCDe29dBC036A1259B',
  [ChainId.ZKSYNC]: '0x7f71382044A6a62595D5D357fE75CA8199123aD6',
  [ChainId.ZKSYNC_TESTNET]: '0xaC20647b8e9d1C4cb199104485518c136817b380',
  [ChainId.LINEA]: DEPLOYER_ADDRESS,
  [ChainId.LINEA_TESTNET]: '0xdAecee3C08e953Bd5f89A5Cc90ac560413d709E3',
  [ChainId.OPBNB]: DEPLOYER_ADDRESS,
  [ChainId.OPBNB_TESTNET]: '0xD55CAFAB2Ffa1139Be46bc5C0b8259c620050dFC',
  [ChainId.BASE]: DEPLOYER_ADDRESS,
  [ChainId.BASE_TESTNET]: '0x5A6919Dfd2C761788608b0D1bd1239961ADCB08B',
  [ChainId.SCROLL_SEPOLIA]: '0xC259d1D3476558630d83b0b60c105ae958382792',
  [ChainId.SEPOLIA]: DEPLOYER_ADDRESS,
  [ChainId.BASE_SEPOLIA]: DEPLOYER_ADDRESS,
  [ChainId.ARBITRUM_SEPOLIA]: DEPLOYER_ADDRESS,

  [ChainId.OEX_TESTNET]: '0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B',
  [ChainId.MATCHAIN]: '0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B',
  [ChainId.FIVEIRE]: '0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B',
} as const satisfies Record<ChainId, Address>

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

const POOL_INIT_CODE_HASH = '0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2'

export const POOL_INIT_CODE_HASHES = {
  [ChainId.ETHEREUM]: POOL_INIT_CODE_HASH,
  [ChainId.GOERLI]: POOL_INIT_CODE_HASH,
  [ChainId.BSC]: POOL_INIT_CODE_HASH,
  [ChainId.BSC_TESTNET]: POOL_INIT_CODE_HASH,
  [ChainId.ARBITRUM_ONE]: POOL_INIT_CODE_HASH,
  [ChainId.ARBITRUM_GOERLI]: POOL_INIT_CODE_HASH,
  [ChainId.POLYGON_ZKEVM]: POOL_INIT_CODE_HASH,
  [ChainId.POLYGON_ZKEVM_TESTNET]: POOL_INIT_CODE_HASH,
  [ChainId.ZKSYNC]: '0x01001487a7c45b21c52a0bc0558bf48d897d14792f1d0cc82733c8271d069178',
  [ChainId.ZKSYNC_TESTNET]: '0x01001487a7c45b21c52a0bc0558bf48d897d14792f1d0cc82733c8271d069178',
  [ChainId.LINEA]: POOL_INIT_CODE_HASH,
  [ChainId.LINEA_TESTNET]: POOL_INIT_CODE_HASH,
  [ChainId.OPBNB]: POOL_INIT_CODE_HASH,
  [ChainId.OPBNB_TESTNET]: POOL_INIT_CODE_HASH,
  [ChainId.BASE]: POOL_INIT_CODE_HASH,
  [ChainId.BASE_TESTNET]: POOL_INIT_CODE_HASH,
  [ChainId.SCROLL_SEPOLIA]: POOL_INIT_CODE_HASH,
  [ChainId.SEPOLIA]: POOL_INIT_CODE_HASH,
  [ChainId.ARBITRUM_SEPOLIA]: POOL_INIT_CODE_HASH,
  [ChainId.BASE_SEPOLIA]: POOL_INIT_CODE_HASH,

  [ChainId.OEX_TESTNET]: POOL_INIT_CODE_HASH,
  [ChainId.MATCHAIN]: POOL_INIT_CODE_HASH,
  [ChainId.FIVEIRE]: POOL_INIT_CODE_HASH,
} as const satisfies Record<ChainId, Hash>

const NFT_POSITION_MANAGER_ADDRESS = '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364'

export const NFT_POSITION_MANAGER_ADDRESSES = {
  [ChainId.ETHEREUM]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.GOERLI]: '0x427bF5b37357632377eCbEC9de3626C71A5396c1',
  [ChainId.BSC]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.BSC_TESTNET]: '0x427bF5b37357632377eCbEC9de3626C71A5396c1',
  [ChainId.ZKSYNC_TESTNET]: '0xF84697CfE7c88F846e4ba5dAe14A6A8f67deF5c2',
  [ChainId.ZKSYNC]: '0xa815e2eD7f7d5B0c49fda367F249232a1B9D2883',
  [ChainId.POLYGON_ZKEVM]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.POLYGON_ZKEVM_TESTNET]: '0x1f489dd5B559E976AE74303F939Cfd0aF1b62C2B',
  [ChainId.ARBITRUM_ONE]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.LINEA]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.LINEA_TESTNET]: '0xacFa791C833120c769Fd3066c940B7D30Cd8BC73',
  [ChainId.ARBITRUM_GOERLI]: '0xb10120961f7504766976A89E29802Fa00553da5b',
  [ChainId.OPBNB]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.OPBNB_TESTNET]: '0x9d4277f1D41CCB30C0e91f7d1bBA2A739E19032C',
  [ChainId.BASE]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.BASE_TESTNET]: '0x0F81fD8DaC20A21029B496D8F8E08385201B8ca0',
  [ChainId.SCROLL_SEPOLIA]: '0x0F81fD8DaC20A21029B496D8F8E08385201B8ca0',
  [ChainId.SEPOLIA]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.ARBITRUM_SEPOLIA]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.BASE_SEPOLIA]: NFT_POSITION_MANAGER_ADDRESS,

  [ChainId.OEX_TESTNET]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.MATCHAIN]: NFT_POSITION_MANAGER_ADDRESS,
  [ChainId.FIVEIRE]: NFT_POSITION_MANAGER_ADDRESS,
} as const satisfies Record<ChainId, Address>

/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export enum FeeAmount {
  LOWEST = 100,
  LOW = 500,
  MEDIUM = 2500,
  HIGH = 10000,
}

/**
 * The default factory tick spacings by fee amount.
 */
export const TICK_SPACINGS: { [amount in FeeAmount]: number } = {
  [FeeAmount.LOWEST]: 1,
  [FeeAmount.LOW]: 10,
  [FeeAmount.MEDIUM]: 50,
  [FeeAmount.HIGH]: 200,
}
