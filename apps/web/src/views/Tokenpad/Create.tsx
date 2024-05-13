import { useTranslation } from '@pancakeswap/localization'
import { BaseLayout, Button, Flex, Heading, Input, Text, useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useCatchTxError from 'hooks/useCatchTxError'
// import useToast from 'hooks/useToast'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
// import { isAddress } from 'utils'
import { getTokenFactoryAddress } from 'utils/addressHelpers'
// import { getBalanceNumber, getDecimalAmount } from 'utils/formatBalance'
import { getBalanceNumber, getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import { useOWS } from 'hooks/useContract'
import { isAddress } from 'viem'
import { useAccount } from 'wagmi'
import { useConfig } from './contexts/TokenpadContext'
import useDeployToken from './hooks/useDeployToken'
import useTokenFactoryApprove from './hooks/useTokenFactoryApprove'
import { MAX_HOLD_AMOUNT_MIN_LIMIT, MAX_TAX, MAX_TX_AMOUNT_MIN_LIMIT, TokenCreationProps } from './types'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const Title = styled(Heading).attrs({ size: 'lg' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 16px;
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const Caution = styled(Text).attrs({ small: true })`
  margin-top: -8px;
  margin-left: 22px;
  margin-bottom: 6px;
`

const StyledInput = styled(Input)<{ error?: boolean }>`
  border-radius: 6px;
  margin-bottom: 4px;
  color: ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.text)};
`

const TokenCreate = () => {
  const [tokenCreationProps, setTokenCreationProps] = useState<TokenCreationProps>({
    name: '',
    symbol: '',
    decimals: '',
    totalSupply: '',
    txLimit: '',
    holdLimit: '',
    buyTax: '',
    sellTax: '',
    transferTax: '',
    marketingWallet: '',
  })
  const { toastError, toastSuccess } = useToast()
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { address: account } = useAccount()

  const { launchFee } = useConfig() as any
  const { onApproveToken } = useTokenFactoryApprove()
  const onDeployToken = useDeployToken()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const handleInput = useCallback(
    (key, value) => {
      setTokenCreationProps({
        ...tokenCreationProps,
        [key]: value,
      })
    },
    [tokenCreationProps],
  )

  const validateTokenomics = () => {
    if (!tokenCreationProps.name) throw new Error('Missing token name')
    if (!tokenCreationProps.symbol) throw new Error('Missing token symbol')
    if (
      !tokenCreationProps.decimals ||
      Number(tokenCreationProps.decimals) < 0 ||
      Number(tokenCreationProps.decimals) > 256
    )
      throw new Error('Token decimal should be between 0 and 256')
    if (!tokenCreationProps.totalSupply) throw new Error('Missing total supply')
    if (!tokenCreationProps.txLimit) throw new Error('Missing transfer limit')
    if (!tokenCreationProps.holdLimit) throw new Error('Missing hold limit')
    if (
      new BigNumber(tokenCreationProps.totalSupply)
        .times(MAX_TX_AMOUNT_MIN_LIMIT)
        .div(100)
        .isGreaterThan(new BigNumber(tokenCreationProps.txLimit))
    )
      throw new Error(`Max transfer amount should be more than ${MAX_TX_AMOUNT_MIN_LIMIT}% of total supply`)
    if (
      new BigNumber(tokenCreationProps.totalSupply)
        .times(MAX_HOLD_AMOUNT_MIN_LIMIT)
        .div(100)
        .isGreaterThan(new BigNumber(tokenCreationProps.holdLimit))
    )
      throw new Error(`Max hold amount should be more than ${MAX_HOLD_AMOUNT_MIN_LIMIT}% of total supply`)

    if (Number(tokenCreationProps.buyTax) > MAX_TAX) throw new Error(`Buy tax should be less than ${MAX_TAX}%`)
    if (Number(tokenCreationProps.sellTax) > MAX_TAX) throw new Error(`Sell tax should be less than ${MAX_TAX}%`)
    if (Number(tokenCreationProps.transferTax) > MAX_TAX)
      throw new Error(`Transfer tax should be less than ${MAX_TAX}%`)
    if (!tokenCreationProps.marketingWallet) throw new Error('Missing marketing wallet')
    if (!isAddress(tokenCreationProps.marketingWallet)) throw new Error('Invalid marketing wallet')
  }

  const payTokenContract = useOWS()

  const handleDeploy = useCallback(async () => {
    try {
      validateTokenomics()
    } catch (err) {
      // @ts-ignore
      toastError(t('Error'), err.message)
      return
    }
    if (!account || !payTokenContract) {
      return
    }
    const tokenFactoryAddress = getTokenFactoryAddress(chainId)

    const allowance = await payTokenContract.read.allowance([account, tokenFactoryAddress])

    // when token needs approval
    if (new BigNumber(allowance.toString()).isLessThan(launchFee)) {
      const receipt = await fetchWithCatchTxError(() => {
        return onApproveToken()
      })
      if (receipt?.status) {
        toastSuccess(
          `${t('Approved')}!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('You can deploy token now!')}
          </ToastDescriptionWithTx>,
        )
      } else return
    }

    // deploy token now
    const props = {
      ...tokenCreationProps,
      buyTax: Math.floor(Number(tokenCreationProps.buyTax) * 100),
      sellTax: Math.floor(Number(tokenCreationProps.sellTax) * 100),
      transferTax: Math.floor(Number(tokenCreationProps.transferTax) * 100),
      totalSupply: getDecimalAmount(new BigNumber(tokenCreationProps.totalSupply), Number(tokenCreationProps.decimals)),
      txLimit: getDecimalAmount(new BigNumber(tokenCreationProps.txLimit), Number(tokenCreationProps.decimals)),
      holdLimit: getDecimalAmount(new BigNumber(tokenCreationProps.holdLimit), Number(tokenCreationProps.decimals)),
    }
    const receipt = await fetchWithCatchTxError(() => {
      return onDeployToken(props)
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Deployed')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your token has been deployed!')}
        </ToastDescriptionWithTx>,
      )
    }
  }, [account, chainId, tokenCreationProps, launchFee])

  return (
    <div>
      <LaunchIfoCallout>
        <div>
          <div>
            <Title as="h2">{t('Please configure your tokenomics')}</Title>
            <Text>Token name</Text>
            <StyledInput
              type="text"
              placeholder={t('XXX Token')}
              onChange={(e) => handleInput('name', e.target.value)}
              value={tokenCreationProps.name}
            />
            <Text>Token symbol</Text>
            <StyledInput
              type="text"
              placeholder={t('XXX')}
              onChange={(e) => handleInput('symbol', e.target.value)}
              value={tokenCreationProps.symbol}
            />
            <Text>Token decimal</Text>
            <StyledInput
              type="text"
              onChange={(e) => {
                // empty string or positive number only
                if (/^$|^([0-9]*)$/.test(e.target.value)) handleInput('decimals', Number(e.target.value))
              }}
              value={tokenCreationProps.decimals || ''}
            />
            <Text>Token total supply</Text>
            <StyledInput
              type="text"
              onChange={(e) => {
                // empty string or positive number only
                if (/^$|^([1-9][0-9]*)$/.test(e.target.value)) handleInput('totalSupply', e.target.value)
              }}
              value={tokenCreationProps.totalSupply}
            />
            <Text>Max limit (Transfer / Hold)</Text>
            <Flex alignItems="center" style={{ gap: '6px' }}>
              <StyledInput
                type="text"
                placeholder={t('')}
                onChange={(e) => {
                  // empty string or positive number only
                  if (/^$|^([1-9][0-9]*)$/.test(e.target.value)) handleInput('txLimit', e.target.value)
                }}
                value={tokenCreationProps.txLimit}
              />
              <Text>/</Text>
              <StyledInput
                type="text"
                placeholder={t('')}
                onChange={(e) => {
                  // empty string or positive number only
                  if (/^$|^([1-9][0-9]*)$/.test(e.target.value)) handleInput('holdLimit', e.target.value)
                }}
                value={tokenCreationProps.holdLimit}
              />
            </Flex>
            <Text>Tax % (Buy / Sell / Transfer)</Text>
            <Flex alignItems="center" style={{ gap: '6px' }}>
              <StyledInput
                type="text"
                onChange={(e) => {
                  // empty string or positive number only
                  if (/^$|^([0-9]*)$/.test(e.target.value)) handleInput('buyTax', e.target.value)
                }}
                value={tokenCreationProps.buyTax}
              />
              <Text>/</Text>
              <StyledInput
                type="text"
                onChange={(e) => {
                  // empty string or positive number only
                  if (/^$|^([0-9]*)$/.test(e.target.value)) handleInput('sellTax', e.target.value)
                }}
                value={tokenCreationProps.sellTax}
              />
              <Text>/</Text>
              <StyledInput
                type="text"
                onChange={(e) => {
                  // empty string or positive number only
                  if (/^$|^([0-9]*)$/.test(e.target.value)) handleInput('transferTax', e.target.value)
                }}
                value={tokenCreationProps.transferTax}
              />
            </Flex>

            <Text>Marketing wallet</Text>
            <StyledInput
              type="text"
              placeholder={t('0x123...')}
              pattern="^(0x[a-fA-F0-9]{40})$"
              onChange={(e) => handleInput('marketingWallet', e.target.value)}
              value={tokenCreationProps.marketingWallet}
            />
            <Text bold mt="8px" mb="12px">
              - Token creation fee {getBalanceNumber(launchFee)} OWS
            </Text>
            <Button disabled={!account || pendingTx} onClick={handleDeploy}>
              {t('Deploy token')}
            </Button>
          </div>
        </div>
        <div>
          {/* <Image src="/images/ifos/zombie.png" alt="ifo bunny" width={300} height={150} mt="24px" mb="24px" /> */}
          <Heading mb="16px">{t('Available tokenomics')}:</Heading>
          <List>
            <li>{t('Buy / sell / transfer tax.')}</li>
            <Caution>{t('Tax can not be more than %max_tax%%.', { max_tax: MAX_TAX })}</Caution>
            <li>{t('Max transfer amount.')}</li>
            <Caution>
              {t('It should be more than %max_tx_min_limit%% of total supply.', {
                max_tx_min_limit: MAX_TX_AMOUNT_MIN_LIMIT,
              })}
            </Caution>
            <li>{t('Max hold amount.')}</li>
            <Caution>
              {t('It should be more than %max_hold_min_limit%% of total supply.', {
                max_hold_min_limit: MAX_HOLD_AMOUNT_MIN_LIMIT,
              })}
            </Caution>
            <li>{t('Marketing wallet to receive tax.')}</li>
          </List>
        </div>
      </LaunchIfoCallout>
    </div>
  )
}

export default TokenCreate
