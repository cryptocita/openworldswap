import { ChainId } from '@pancakeswap/chains'
import { ERC20Token, WETH9 } from '@pancakeswap/sdk'

export const matchainTokens = {
  weth: WETH9[ChainId.MATCHAIN],
  mocka: new ERC20Token(ChainId.MATCHAIN, '0x9CbEEf1Aee7CeaEE0aBEe214EE5C08331043a976', 18, 'MOCK', 'MOCK TOKEN', ''),
}
