import { useTranslation } from '@pancakeswap/localization'
import { LinkExternal, Text } from '@pancakeswap/uikit'
import useNativeCurrency from 'hooks/useNativeCurrency'
import React from 'react'
import styled from 'styled-components'

const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
`

const Display = styled(Text)<{ subHeader?: boolean }>`
  font-size: ${({ subHeader }) => (subHeader ? '15px' : '18px')};
  margin-left: ${({ subHeader }) => (subHeader ? '8px' : '0px')};
  flex: 1;
  font-weight: 700;
`

const LandingDetails: React.FC = () => {
  const { t } = useTranslation()

  const nativeCurrency = useNativeCurrency()
  const buyTokenSymbol = nativeCurrency.symbol
  const hardcap = 5000000
  const softcap = 1000000
  const wlPrice = 0.6
  const pubPrice = 0.75

  return (
    <>
      <StyledIfoCardDetails>
        <Item>
          <Display>{t('Hardcap')}</Display>
          <Text style={{ fontSize: '20px' }} color="secondary">
            {hardcap.toLocaleString('en-US', { maximumFractionDigits: 3 })} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display>{t('Softcap')}</Display>
          <Text style={{ fontSize: '20px' }} color="secondary">
            {softcap.toLocaleString('en-US', { maximumFractionDigits: 3 })} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display>{t('TokenPrice')}</Display>
        </Item>
        <Item>
          <Display subHeader>{t('Whitelisted')}</Display>
          <Text style={{ fontSize: '20px' }} color="secondary">
            {wlPrice.toLocaleString('en-US', { maximumFractionDigits: 9 })} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display subHeader>{t('Public')}</Display>
          <Text style={{ fontSize: '20px' }} color="secondary">
            {pubPrice.toLocaleString('en-US', { maximumFractionDigits: 9 })} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display>{t('Min Buy')}</Display>
          <Text style={{ fontSize: '20px' }} color="secondary">
            NO MIN BUY
          </Text>
        </Item>
        <Item>
          <Display>{t('Max Buy')}</Display>
          <Text style={{ fontSize: '20px' }} color="secondary">
            1M $IMP only for WL sales
          </Text>
        </Item>
      </StyledIfoCardDetails>
      <LinkExternal href="https://imperivm.io/" style={{ margin: 'auto', paddingBottom: '24px' }}>
        {t('View project site')}
      </LinkExternal>
    </>
  )
}

export default LandingDetails
