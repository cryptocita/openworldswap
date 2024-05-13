import { useTranslation } from '@pancakeswap/localization'
import { LinkExternal, Text } from '@pancakeswap/uikit'
import useNativeCurrency from 'hooks/useNativeCurrency'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { PublicIfoDataV3 } from '../../../types'

const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid #f7e0e0a3;
`

const Display = styled(Text)<{ subHeader?: boolean }>`
  font-size: ${({ subHeader }) => (subHeader ? '13px' : '15px')};
  margin-left: ${({ subHeader }) => (subHeader ? '8px' : '0px')};
  flex: 1;
`

const IfoDetailsV3: React.FC<{ ifo: PublicIfoDataV3 }> = ({ ifo }) => {
  const { t } = useTranslation()
  const {
    startDateNum,
    pubDateNum,
    endDateNum,
    claimDateNum,
    projectSiteUrl,
    wlPrice,
    pubPrice,
    maxPerUser,
    hardcap,
    softcap,
    totalWlContributed,
    totalPubContributed,
    wlVestingProp,
    pubVestingProp,
  } = ifo

  const totalContributed = useMemo(() => {
    return totalWlContributed.plus(totalPubContributed)
  }, [totalWlContributed, totalPubContributed])
  const nativeCurrency = useNativeCurrency()
  const buyTokenSymbol = nativeCurrency.symbol

  return (
    <>
      <StyledIfoCardDetails>
        <Item>
          <Display>{t('WL Start Date')}</Display>
          <Text>
            {`${new Date(startDateNum * 1000).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC',
            })} (UTC)`}
          </Text>
        </Item>
        <Item>
          <Display>{t('Pub Start Date')}</Display>
          <Text>
            {`${new Date(pubDateNum * 1000).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC',
            })} (UTC)`}
          </Text>
        </Item>
        <Item>
          <Display>{t('End Date')}</Display>
          <Text>
            {`${new Date(endDateNum * 1000).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC',
            })} (UTC)`}
          </Text>
        </Item>
        <Item>
          <Display>{t('Claim Date')}</Display>
          <Text>
            {`${new Date(claimDateNum * 1000).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC',
            })} (UTC)`}
          </Text>
        </Item>
        <Item>
          <Display>{t('Hardcap')}</Display>
          <Text>
            {hardcap.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display>{t('Softcap')}</Display>
          <Text>
            {softcap.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} {buyTokenSymbol}
          </Text>
        </Item>

        <Item>
          <Display>{t('TokenPrice')}</Display>
        </Item>
        <Item>
          <Display subHeader>{t('Whitelisted')}</Display>
          <Text>
            {wlPrice.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display subHeader>{t('Public')}</Display>
          <Text>
            {pubPrice.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })} {buyTokenSymbol}
          </Text>
        </Item>

        <Item>
          <Display>{t('Min Buy')}</Display>
          <Text>No Min Buy</Text>
        </Item>
        <Item>
          <Display>{t('Max Buy')}</Display>
          <Text>
            {maxPerUser.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} {buyTokenSymbol} for WL sales
          </Text>
        </Item>
        <Item>
          <Display>{t('Total raised (% of Softcap)')}</Display>
          <Text>
            {`${totalContributed.toNumber().toLocaleString('en-US', { maximumFractionDigits: 1 })} ${buyTokenSymbol}`}
            {`(${totalContributed.div(softcap).times(100).toFixed(2)}%)`}
          </Text>
        </Item>
        <Item>
          <Display subHeader>{t('Whitelisted contribution')}</Display>
          <Text>
            {totalWlContributed.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display subHeader>{t('Public Contribution')}</Display>
          <Text>
            {totalPubContributed.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display>{t('Vesting')}</Display>
        </Item>
        <Item>
          {/* <Display subHeader>
            {t('Whitelisted: ')} {wlVestingProp?.beginPercent / 100}% on claiming day, and{' '}
            {wlVestingProp?.percent / 100}% in every {wlVestingProp?.interval / (3600 * 24)}days
          </Display> */}
        </Item>
        <Item>
          {/* <Display subHeader>
            {t('Public: ')} {pubVestingProp?.beginPercent / 100}% on claiming day, and {pubVestingProp?.percent / 100}%
            in every {pubVestingProp?.interval / (3600 * 24)}days
          </Display> */}
        </Item>
      </StyledIfoCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {t('View project site')}
      </LinkExternal>
    </>
  )
}

export default IfoDetailsV3
