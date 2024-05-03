import { ChainId } from '@pancakeswap/chains'
import { Token } from '@pancakeswap/sdk'
import { oexTestnetTokens } from '@pancakeswap/tokens'
import {
  ImageProps,
  TokenImage as UIKitTokenImage,
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
} from '@pancakeswap/uikit'
import { ASSET_CDN } from 'config/constants/endpoints'

interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: Token
  secondaryToken: Token
}

export const tokenImageChainNameMapping = {
  [ChainId.BSC]: '',
  [ChainId.ETHEREUM]: 'eth/',
  [ChainId.POLYGON_ZKEVM]: 'polygon-zkevm/',
  [ChainId.ZKSYNC]: 'zksync/',
  [ChainId.ARBITRUM_ONE]: 'arbitrum/',
  [ChainId.LINEA]: 'linea/',
  [ChainId.BASE]: 'base/',
  [ChainId.OPBNB]: 'opbnb/',
}

export const getImageUrlFromToken = (token: Token) => {
  const address = token?.isNative ? token.wrapped.address : token.address

  if (token.chainId === ChainId.OEX_TESTNET) {
    if (address === oexTestnetTokens.ows.address) {
      return '/logo.png'
    }
    if (address === oexTestnetTokens.wusdt.address) {
      return 'https://tokens.pancakeswap.finance/images/symbol/usdt.png'
    }
    if (address === oexTestnetTokens.oex.address) {
      return 'https://swap.openex.network/images/7798/tokens/0x6cBFE2BBFcbf90e7b2D0223541c122A13cBAb6a1.png'
    }
  }
  if (token?.isNative && token.chainId === ChainId.OEX_TESTNET) {
    if (address === oexTestnetTokens.ows.address) {
      return '/images/chains/7798.png'
    }
  }

  return token?.isNative && token.chainId !== ChainId.BSC
    ? `${ASSET_CDN}/web/native/${token.chainId}.png`
    : `https://tokens.pancakeswap.finance/images/${tokenImageChainNameMapping[token.chainId]}${address}.png`
}

export const TokenPairImage: React.FC<React.PropsWithChildren<TokenPairImageProps>> = ({
  primaryToken,
  secondaryToken,
  ...props
}) => {
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  )
}

interface TokenImageProps extends ImageProps {
  token: Token
}

export const TokenImage: React.FC<React.PropsWithChildren<TokenImageProps>> = ({ token, ...props }) => {
  return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />
}
