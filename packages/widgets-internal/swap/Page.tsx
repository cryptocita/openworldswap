import { AtomBox, AtomBoxProps, SwapCSS } from "@pancakeswap/uikit";
import { ReactNode } from "react";

type SwapPageProps = AtomBoxProps & {
  removePadding?: boolean;
  hideFooterOnDesktop?: boolean;
  noMinHeight?: boolean;
  helpUrl?: string;
  helpImage?: ReactNode;
  externalText?: string;
  externalLinkUrl?: string;
};

export const SwapPage = ({
  removePadding,
  noMinHeight,
  children,
  hideFooterOnDesktop,
  helpUrl,
  helpImage,
  externalText,
  externalLinkUrl,
  ...props
}: SwapPageProps) => (
  <AtomBox
    className={SwapCSS.pageVariants({ removePadding, noMinHeight })}
    {...props}
    style={{ background: "transparent" }}
  >
    {children}
    <AtomBox display="flex" flexGrow={1} />
    <AtomBox display={["block", null, null, hideFooterOnDesktop ? "none" : "block"]} width="100%" paddingY="1rem">
      {/* <SwapFooter
        externalText={externalText}
        externalLinkUrl={externalLinkUrl}
        helpUrl={helpUrl}
        helpImage={helpImage}
      /> */}
    </AtomBox>
  </AtomBox>
);
