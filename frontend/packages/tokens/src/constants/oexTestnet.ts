import { ChainId } from '@pancakeswap/chains'
import { ERC20Token, WETH9 } from '@pancakeswap/sdk'

export const oexTestnetTokens = {
  weth: WETH9[ChainId.OEX_TESTNET],
  wusdt: WETH9[ChainId.OEX_TESTNET],
  oex: new ERC20Token(ChainId.OEX_TESTNET, '0x6cBFE2BBFcbf90e7b2D0223541c122A13cBAb6a1', 18, 'OEX', 'OpenEX Token', ''),
  ows: new ERC20Token(
    ChainId.OEX_TESTNET,
    '0x4De88a40bd5334aeCF573022a13C7C32E8086792',
    18,
    'OWS',
    'OpenWorldSwap Token',
    '',
  ),
}
