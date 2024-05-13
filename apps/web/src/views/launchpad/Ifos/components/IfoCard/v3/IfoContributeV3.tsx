import { useTranslation } from '@pancakeswap/localization'
import { Button, Flex, Text, useModal } from '@pancakeswap/uikit'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { useIfoContract } from 'hooks/useContract'
import useNativeCurrency from 'hooks/useNativeCurrency'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import useIfoClaim from '../../../hooks/useIfoClaim'
import { IfoV3Status, PublicIfoDataV3, UserIfoDataV3 } from '../../../types'
import ContributeModal from '../ContributeModal'

const Item = styled.div<{ bordered?: boolean }>`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
  padding-bottom: ${({ bordered }) => (bordered ? '4px' : '0')};
  border-bottom: ${({ bordered }) => (bordered ? '1px' : '0')} solid #f7e0e0a3;
`

const Display = styled(Text)<{ subHeader?: boolean }>`
  font-size: ${({ subHeader }) => (subHeader ? '13px' : '15px')};
  margin-left: ${({ subHeader }) => (subHeader ? '8px' : '0px')};
  flex: 1;
`

export interface Props {
  ifoPublicData: PublicIfoDataV3
  ifoUserData: UserIfoDataV3
  status: IfoV3Status | null
  toggleStatus: () => void
}

const IfoContributeV3: React.FC<Props> = ({ ifoPublicData, ifoUserData, status, toggleStatus }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const {
    address,
    minPerUser,
    maxPerUser,
    version,
    wlPrice,
    pubPrice,
    hardcap,
    totalPubContributed,
    totalWlContributed,
    icoToken,
  } = ifoPublicData
  const {
    wlContributedAmount,
    pubContributedAmount,
    wlClaimedAmount,
    pubClaimedAmount,
    wlClaimableAmount,
    pubClaimableAmount,
  } = ifoUserData
  const { t } = useTranslation()

  const nativeCurrency = useNativeCurrency()
  const ifoContract = useIfoContract(address, version)
  const onClaim = useIfoClaim(ifoContract)

  const contributeLimit = useMemo(() => {
    if (status === 'wl_sale') {
      return maxPerUser.minus(wlContributedAmount)
    }
    return hardcap.minus(totalPubContributed).minus(totalWlContributed)
  }, [hardcap, maxPerUser, totalPubContributed, totalWlContributed, wlContributedAmount, status])

  const claimableAmount = useMemo(() => {
    return wlClaimableAmount.plus(pubClaimableAmount)
  }, [wlClaimableAmount, pubClaimableAmount])

  const wlClaimedAmountString = useMemo(() => {
    const claimedAmountString = wlClaimedAmount
      .div(wlPrice)
      .toNumber()
      .toLocaleString('en-US', { maximumFractionDigits: 2 })
    let percentString = ''
    if (wlContributedAmount.isGreaterThan(BIG_ZERO))
      percentString = ` (${wlClaimedAmount
        .div(wlContributedAmount)
        .times(100)
        .toNumber()
        .toLocaleString('en-US', { maximumFractionDigits: 2 })}%)`
    return claimedAmountString + percentString
  }, [wlClaimedAmount, wlContributedAmount, wlPrice])
  const pubClaimedAmountString = useMemo(() => {
    const claimedAmountString = pubClaimedAmount
      .div(pubPrice)
      .toNumber()
      .toLocaleString('en-US', { maximumFractionDigits: 2 })
    let percentString = ''
    if (pubContributedAmount.isGreaterThan(BIG_ZERO))
      percentString = ` (${pubClaimedAmount
        .div(pubContributedAmount)
        .times(100)
        .toNumber()
        .toLocaleString('en-US', { maximumFractionDigits: 2 })}%)`
    return claimedAmountString + percentString
  }, [pubClaimedAmount, pubContributedAmount, pubPrice])

  const [onPresentContributeModal] = useModal(
    <ContributeModal
      ifoContract={ifoContract}
      contributeLimit={contributeLimit}
      minAmount={BIG_ZERO}
      toggleStatus={toggleStatus}
    />,
  )

  const claim = async () => {
    if (ifoContract) {
      try {
        setPendingTx(true)
        await onClaim()
      } catch (err) {
        console.error(err)
      } finally {
        toggleStatus()
        setPendingTx(false)
      }
    }
  }

  const buyTokenSymbol = nativeCurrency.symbol

  const isComing = status === 'coming_soon'
  const isFinished = status === 'finished'
  const isClaimable = status === 'claimable'

  return (
    <>
      <Flex justifyContent="space-between" style={{ gap: '6px' }}>
        <div style={{ flex: 1 }}>
          <Item bordered>
            <Display>{t('Your Contributed')}</Display>
            <Text>({buyTokenSymbol})</Text>
          </Item>
          <Item>
            <Display subHeader>{t('WL Sale')}</Display>
            <Text>{wlContributedAmount.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })}</Text>
          </Item>
          <Item>
            <Display subHeader>{t('Pub Sale')}</Display>
            <Text>{pubContributedAmount.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })}</Text>
          </Item>
        </div>
        <div style={{ flex: 1 }}>
          <Item bordered>
            <Display>{t('Your Claimed')}</Display>
            <Text>({icoToken.symbol})</Text>
          </Item>
          <Item>
            <Display subHeader>{t('')}</Display>
            <Text>{wlClaimedAmountString}</Text>
          </Item>
          <Item>
            <Display subHeader>{t('')}</Display>
            <Text>{pubClaimedAmountString}</Text>
          </Item>
        </div>
      </Flex>
      {isClaimable && claimableAmount.isGreaterThan(BIG_ZERO) && (
        <Flex justifyContent="center" mt="7px">
          <Text style={{ border: '1px solid #ff9090ab', padding: '4px 12px', borderRadius: '6px' }}>
            You can claim {claimableAmount.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })}{' '}
            {icoToken.symbol}!
          </Text>
        </Flex>
      )}
      <Button
        width="100%"
        mt="6px"
        disabled={pendingTx || isComing || isFinished || (isClaimable && claimableAmount.isZero())}
        onClick={isClaimable ? claim : onPresentContributeModal}
      >
        {isClaimable ? 'Claim' : 'Contribute'}
      </Button>
    </>
  )
}

export default IfoContributeV3
