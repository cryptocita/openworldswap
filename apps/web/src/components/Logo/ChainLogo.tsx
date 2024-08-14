import { ChainId } from '@pancakeswap/chains'
import { HelpIcon } from '@pancakeswap/uikit'
import { ASSET_CDN } from 'config/constants/endpoints'
import Image from 'next/image'
import { memo } from 'react'
import { isChainSupported } from 'utils/wagmi'

export const ChainLogo = memo(
  ({ chainId, width = 24, height = 24 }: { chainId?: number; width?: number; height?: number }) => {
    if (chainId && isChainSupported(chainId)) {
      if (chainId === ChainId.OEX_TESTNET) {
        return (
          <Image
            alt={`chain-${chainId}`}
            style={{ maxHeight: `${height}px` }}
            src={`/images/chains/${chainId}.png`}
            width={width}
            height={height}
            unoptimized
          />
        )
      }
      if (chainId === ChainId.FIVEIRE) {
        return (
          <Image
            alt={`chain-${chainId}`}
            style={{ maxHeight: `${height}px` }}
            src="https://s3.coinmarketcap.com/static-gravity/image/fd7a43cc620c4ade96804bb1c36aac6f.png"
            width={width}
            height={height}
            unoptimized
          />
        )
      }
      if (chainId === ChainId.MATCHAIN) {
        return (
          <Image
            alt={`chain-${chainId}`}
            style={{ maxHeight: `${height}px` }}
            src="https://s3.coinmarketcap.com/static-gravity/image/97ca265b81c04affada1a309b3661bf0.png"
            width={width}
            height={height}
            unoptimized
          />
        )
      }
      return (
        <Image
          alt={`chain-${chainId}`}
          style={{ maxHeight: `${height}px` }}
          src={`${ASSET_CDN}/web/chains/${chainId}.png`}
          width={width}
          height={height}
          unoptimized
        />
      )
    }

    return <HelpIcon width={width} height={height} />
  },
)
