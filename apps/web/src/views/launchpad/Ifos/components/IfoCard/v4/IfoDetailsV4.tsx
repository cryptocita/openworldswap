import { useTranslation } from '@pancakeswap/localization'
import { LinkExternal, Text } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'

import useNativeCurrency from 'hooks/useNativeCurrency'
import { PublicIfoDataV4 } from '../../../types'

export interface IfoCardDetailsProps {
  ifo: PublicIfoDataV4
}

const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
`

const Display = styled(Text)<{ subHeader?: boolean }>`
  font-size: ${({ subHeader }) => (subHeader ? '13px' : '15px')};
  margin-left: ${({ subHeader }) => (subHeader ? '8px' : '0px')};
  flex: 1;
`

const IfoDetailsV4: React.FC<IfoCardDetailsProps> = ({ ifo }) => {
  const { t } = useTranslation()
  const {
    id,
    startDateNum,
    endDateNum,
    claimDateNum,
    projectSiteUrl,
    icoPrice,
    minPerUser: minPerTx,
    maxPerUser,
    hardcap,
    softcap,
    totalContributed,
    version,
  } = ifo

  const nativeCurrency = useNativeCurrency()
  const buyTokenSymbol = nativeCurrency.symbol

  return (
    <>
      <StyledIfoCardDetails>
        <Item>
          <Display>{t('Start Date')}</Display>
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
          <Text>
            {icoPrice.toNumber().toLocaleString('en-US', { maximumFractionDigits: 9 })} {buyTokenSymbol}
          </Text>
        </Item>

        <Item>
          <Display>{t('Min Buy')}</Display>
          <Text>
            {minPerTx.toNumber() === 0
              ? 'No Limit'
              : `${minPerTx.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} ${buyTokenSymbol}`}
          </Text>
        </Item>
        <Item>
          <Display>{t('Max Buy')}</Display>
          <Text>
            {maxPerUser.toNumber() === hardcap.toNumber()
              ? 'No Limit'
              : `${maxPerUser.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} ${buyTokenSymbol}`}
          </Text>
        </Item>
        <Item>
          <Display>{t('Total raised (% of Hardcap)')}</Display>
          <Text>
            {`${totalContributed.toNumber().toLocaleString('en-US', { maximumFractionDigits: 1 })} ${buyTokenSymbol}`}
            {`(${totalContributed.div(softcap).times(100).toFixed(2)}%)`}
          </Text>
        </Item>
      </StyledIfoCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {t('View project site')}
      </LinkExternal>
    </>
  )
}

export default IfoDetailsV4
