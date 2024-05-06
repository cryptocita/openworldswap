import { Currency } from "@pancakeswap/sdk";
import { ArrowUpIcon, AutoColumn, Box, ColumnCenter, Text } from "@pancakeswap/uikit";
import { ReactNode } from "react";
import TokenTransferInfo from "./TokenTransferInfo";

interface SwapPendingModalContentProps {
  title: string;
  showIcon?: boolean;
  currencyA?: Currency;
  currencyB?: Currency;
  amountA: string;
  amountB: string;
  children?: ReactNode;
}

export const SwapPendingModalContentV1: React.FC<SwapPendingModalContentProps> = ({
  title,
  showIcon,
  currencyA,
  currencyB,
  amountA,
  amountB,
  children,
}) => {
  const symbolA = currencyA?.symbol;
  const symbolB = currencyB?.symbol;
  const size = 128;

  return (
    <Box width="100%">
      {showIcon ? (
        <Box margin="auto auto 36px auto" width="fit-content">
          <ArrowUpIcon color="success" width={80} height={80} />
        </Box>
      ) : (
        <Box mb="16px">
          <ColumnCenter>
            <Box width={size} height={size} position="relative">
              <img width={size} height={size} src="/logo.png" alt="openworldswap-loader" />
            </Box>
          </ColumnCenter>
        </Box>
      )}
      <AutoColumn gap="12px" justify="center">
        <Text bold textAlign="center">
          {title}
        </Text>
        <TokenTransferInfo
          symbolA={symbolA}
          symbolB={symbolB}
          amountA={amountA}
          amountB={amountB}
          currencyA={currencyA}
          currencyB={currencyB}
        />
        {children}
      </AutoColumn>
    </Box>
  );
};
