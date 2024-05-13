import { useTranslation } from '@pancakeswap/localization'
import { Button, Card, CardBody, CardHeader, Flex, Heading, Text, useModal } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import React, { useMemo } from 'react'
import styled from 'styled-components'
// import { getBalanceNumber } from 'utils/formatBalance'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import useTokenDetail from '../hooks/useTokenDetail'
import CopyToClipboard from './CopyToClipboard'
import MarketingWalletModal from './MarketingWalletModal'
import TaxModal from './TaxModal'
import TxHoldLimitModal from './TxHoldLimitModal'

const StyledCard = styled(Card)`
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
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

const TokenCard: React.FC<{
  tokenAddress: string
}> = ({ tokenAddress }) => {
  const { t } = useTranslation()
  const tokenDetail = useTokenDetail(tokenAddress)

  const totalSupply = useMemo(
    () => getBalanceNumber(new BigNumber(tokenDetail?.totalSupply || ''), Number(tokenDetail?.decimals || 18)),
    [tokenDetail],
  )
  const txLimit = useMemo(
    () => getBalanceNumber(new BigNumber(tokenDetail?.txLimit || ''), Number(tokenDetail?.decimals || 18)),
    [tokenDetail],
  )
  const holdLimit = useMemo(
    () => getBalanceNumber(new BigNumber(tokenDetail?.holdLimit || ''), Number(tokenDetail?.decimals || 18)),
    [tokenDetail],
  )

  const [onPresentTxHoldLimitModal] = useModal(
    <TxHoldLimitModal
      tokenAddress={tokenAddress}
      totalSupply={`${totalSupply}`}
      txLimit={`${txLimit}`}
      holdLimit={`${holdLimit}`}
      decimals={tokenDetail?.decimals || '18'}
    />,
  )
  const [onPresentTaxModal] = useModal(
    <TaxModal
      tokenAddress={tokenAddress}
      buyTax={`${Number(tokenDetail?.buyTax || '0') / 100}`}
      sellTax={`${Number(tokenDetail?.sellTax || '0') / 100}`}
      transferTax={`${Number(tokenDetail?.transferTax || '0') / 100}`}
    />,
  )
  const [onPresentMarketingWalletModal] = useModal(
    <MarketingWalletModal tokenAddress={tokenAddress} marketingWallet={tokenDetail?.marketingWallet as string} />,
  )

  return (
    <StyledCard>
      <CardHeader style={{ paddingBottom: '8px' }}>
        <Flex flexDirection="column" alignItems="center">
          <Heading as="h3">{tokenDetail?.name as string}</Heading>
          <Text mt="6px">{tokenDetail?.symbol as string}</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Item>
          <Display>{t('Total supply')}</Display>
          <Text>{totalSupply.toLocaleString('en-US')}</Text>
        </Item>
        <Item>
          <Display>{t('Max tx amount')}</Display>
          <Text>{txLimit.toLocaleString('en-US')}</Text>
        </Item>
        <Item>
          <Display>{t('Max hold amount')}</Display>
          <Text>{holdLimit.toLocaleString('en-US')}</Text>
        </Item>
        <Item>
          <Display>{t('Buy tax')}</Display>
          <Text>{Number(tokenDetail?.buyTax || '0') / 100}%</Text>
        </Item>
        <Item>
          <Display>{t('Sell tax')}</Display>
          <Text>{Number(tokenDetail?.sellTax || '0') / 100}%</Text>
        </Item>
        <Item>
          <Display>{t('Transfer tax')}</Display>
          <Text>{Number(tokenDetail?.transferTax || '0') / 100}%</Text>
        </Item>
        <Item>
          <Display>{t('Marketing wallet')}</Display>
          <CopyToClipboard content={tokenDetail?.marketingWallet as string} />
        </Item>
        <Button mt="16px" width="100%" variant="secondary" onClick={onPresentTxHoldLimitModal}>
          Update tx/hold limit
        </Button>
        <Button mt="8px" width="100%" variant="secondary" onClick={onPresentTaxModal}>
          Update tax
        </Button>
        <Button mt="8px" width="100%" variant="secondary" onClick={onPresentMarketingWalletModal}>
          Update marketing wallet
        </Button>
      </CardBody>
    </StyledCard>
  )
}

export default TokenCard
