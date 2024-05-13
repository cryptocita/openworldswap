import { ChainId, ERC20Token, Token } from '@pancakeswap/sdk'

export interface Ifo {
  id: string
  chainId: ChainId
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  projectSiteUrl: string
  releaseAt: number
  icoToken: Token
  version: number
  audit?: boolean
  kyc?: boolean
}

const dfgToken = new ERC20Token(ChainId.OEX_TESTNET, '0x19E6FF42F72B05f5dBc7C8d2546B1D93697Ac0f0', 18, 'dfg', 'dfg', '')
const ifos: Ifo[] = [
  {
    id: 'ows-private-sale',
    address: '0xC7BFa0033257A51DefED996Ef576c62505E725bA',
    chainId: ChainId.OEX_TESTNET,
    isActive: true,
    name: 'OWS Token Sale Test ',
    subTitle: 'Test of launchpad',
    description: ' This is purpose of the launchpad test',
    projectSiteUrl: '',
    releaseAt: 1715566265,
    icoToken: dfgToken,
    version: 1,
    audit: false,
    kyc: false,
  },
  {
    id: 'ows-private-sale',
    address: '0x5D4AA2b51cD5E97af72a0b92Aa9DFf5655D82624',
    chainId: ChainId.OEX_TESTNET,
    isActive: false,
    name: 'OWS ',
    subTitle: 'First Come First Served',
    description: ' dfg test sale',
    projectSiteUrl: '',
    releaseAt: 1715480600,
    icoToken: dfgToken,
    version: 1,
  },
]

export default ifos
