import { useTranslation } from "@pancakeswap/localization";
import { AutoColumn, Box, ColumnCenter, Text } from "@pancakeswap/uikit";
import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 24px 0;
`;

export function ConfirmationPendingContent({ pendingText }: { pendingText?: string }) {
  const { t } = useTranslation();
  const size = 128;
  return (
    <Wrapper>
      <ConfirmedIcon>
        <Box width={size} height={size} position="relative">
          <img width={size} height={size} src="/logo.png" alt="openworldswap-loader" />
        </Box>
      </ConfirmedIcon>
      <AutoColumn gap="12px" justify="center">
        {pendingText ? (
          <>
            <Text fontSize="20px">{t("Waiting For Confirmation")}</Text>
            <AutoColumn gap="12px" justify="center">
              <Text bold small textAlign="center">
                {pendingText}
              </Text>
            </AutoColumn>
          </>
        ) : null}
        <Text small color="textSubtle" textAlign="center">
          {t("Confirm this transaction in your wallet")}
        </Text>
      </AutoColumn>
    </Wrapper>
  );
}
