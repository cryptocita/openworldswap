import { ChainId } from "@pancakeswap/chains";
import { useHttpLocations } from "@pancakeswap/hooks";
import { Currency } from "@pancakeswap/sdk";
import { BinanceIcon, TokenLogo } from "@pancakeswap/uikit";
import { useMemo } from "react";
import { styled } from "styled-components";
import { SpaceProps, space } from "styled-system";

const StyledLogo = styled(TokenLogo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;

  ${space}
`;

export function CurrencyLogo({
  currency,
  size = "24px",
  style,
  useTrustWalletUrl,
  ...props
}: {
  currency?: Currency & {
    logoURI?: string | undefined;
  };
  size?: string;
  style?: React.CSSProperties;
  useTrustWalletUrl?: boolean;
} & SpaceProps) {
  const uriLocations = useHttpLocations(currency?.logoURI);

  const srcs: string[] = useMemo(() => {
    // if (currency?.isNative) return [];

    // if (currency?.isToken) {
    //   const logoUrls = getCurrencyLogoUrls(currency, { useTrustWallet: useTrustWalletUrl });
    //   if (currency?.logoURI) {
    //     return [...uriLocations, ...logoUrls];
    //   }
    //   return [...logoUrls];
    // }
    return [`https://app.openworldswap.finance/images/tokens/${currency?.symbol}.png`];
  }, [currency, uriLocations, useTrustWalletUrl]);

  if (currency?.isNative) {
    if (currency.chainId === ChainId.BSC) {
      return <BinanceIcon width={size} style={style} {...props} />;
    }
    // return (
    //   <StyledLogo
    //     size={size}
    //     srcs={[`https://assets.pancakeswap.finance/web/native/${currency.chainId}.png`]}
    //     width={size}
    //     style={style}
    //     {...props}
    //   />
    // );
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? "token"} logo`} style={style} {...props} />;
}
