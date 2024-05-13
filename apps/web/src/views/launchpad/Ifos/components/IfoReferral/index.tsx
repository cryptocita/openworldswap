import { useTranslation } from '@pancakeswap/localization'
import { Card, Flex, Skeleton, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import ReferralLink from './components/ReferralLink'

const StyledBox = styled(Card)`
  max-width: 437px;
  width: 100%;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 24px 36px;
  }
`

const StatsBox = styled.div`
  flex: 1;
  border-radius: 8px;
  padding: 16px;
  box-shadow: inset 0 0 4px #cfc3c3;
`

const StatsHeader = styled.div`
  padding-top: 8px;
  margin-top: 8px;
  border-top: 1px solid #e9d9d1;
  width: 100%;
  text-align: center;
`

const Header = styled.div`
  padding-bottom: 8px;
  margin-bottom: 36px;
  border-bottom: 1px solid #e9d9d1;
  width: 100%;
  text-align: center;
`

const IfoReferral: React.FC<{
  account: string
  chainId: number
  referredCount: number
  icoPrice: BigNumber
  icoTokenSymbol: string
  referrerDistributes: BigNumber
  referredContributes: BigNumber
  referralFee: number
}> = ({
  account,
  chainId,
  icoPrice,
  icoTokenSymbol,
  referredCount,
  referredContributes,
  referrerDistributes,
  referralFee,
}) => {
  const { t } = useTranslation()

  return (
    <StyledBox>
      <>
        <Header>
          <Text bold fontSize="25px">
            Your Referral Link
          </Text>
        </Header>
        {account && chainId ? (
          <ReferralLink account={account} chainId={chainId}>
            Copy Link
          </ReferralLink>
        ) : (
          <Text fontSize="20px" bold>
            Unlock wallet to get your referral link
          </Text>
        )}

        <Text mt="20px" fontSize="16px" paddingX="15px" bold={false}>
          You will get {referralFee * 100}% of your referred users&apos; contributions in {icoTokenSymbol} token.
          Commissions will be sent to you at the time when the users claim their contributions.
        </Text>

        <Flex flexDirection="column" style={{ gap: '8px', width: '100%', maxWidth: '480px' }} mt="24px">
          <StatsBox>
            <Text fontSize="26px" textAlign="center" bold>
              {referredCount >= 0 ? referredCount : <Skeleton width={100} height={30} margin="auto" />}
            </Text>
            <StatsHeader>
              <Text fontSize="16px">Referred Users Count</Text>
            </StatsHeader>
          </StatsBox>
          <StatsBox>
            <Text fontSize="26px" textAlign="center" bold>
              {!referredContributes ? (
                <Skeleton width={100} height={30} margin="auto" />
              ) : (
                referredContributes.toNumber()
              )}
            </Text>
            <StatsHeader>
              <Text fontSize="16px">Contributed by Referred Users</Text>
            </StatsHeader>
          </StatsBox>
          <StatsBox>
            <Text fontSize="26px" textAlign="center" bold>
              {!referredContributes || !referrerDistributes ? (
                <Skeleton width={100} height={30} margin="auto" />
              ) : (
                `${referredContributes
                  .div(icoPrice)
                  .times(referralFee)
                  .toNumber()
                  .toLocaleString('en-US', { maximumFractionDigits: 2 })} / ${referrerDistributes
                  .toNumber()
                  .toLocaleString('en-US', { maximumFractionDigits: 2 })}`
              )}
            </Text>
            <StatsHeader>
              <Text fontSize="16px">Commissions Estimated / Claimed</Text>
            </StatsHeader>
          </StatsBox>
        </Flex>
      </>
    </StyledBox>
  )
}

export default IfoReferral
