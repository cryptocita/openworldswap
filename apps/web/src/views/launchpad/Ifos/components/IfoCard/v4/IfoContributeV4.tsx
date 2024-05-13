import { useTranslation } from '@pancakeswap/localization'
import { Button, Flex, Text, useModal, useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'

import useCatchTxError from 'hooks/useCatchTxError'
import { useIfoContract } from 'hooks/useContract'
import useNativeCurrency from 'hooks/useNativeCurrency'
// import useToast from 'hooks/useToast'
import React from 'react'

import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import useIfoClaim from '../../../hooks/useIfoClaim'
import useIfoContribute from '../../../hooks/useIfoContributeV4'
import { IfoStatus, PublicIfoDataV4, UserIfoDataV4 } from '../../../types'
import LabelButton from '../LabelButton'
import ContributeModal from './ContributeModalV4'

export interface Props {
  ifoPublicData: PublicIfoDataV4
  ifoUserData: UserIfoDataV4
  status: IfoStatus
  raisingAmount: BigNumber
  toggleStatus: () => void
}

const IfoCardContribute: React.FC<Props> = ({ ifoPublicData, ifoUserData, status, raisingAmount, toggleStatus }) => {
  const { id, address, minPerUser, maxPerUser, version, icoToken } = ifoPublicData
  const { contributedAmount, claimed } = ifoUserData
  const nativeCurrency = useNativeCurrency()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const ifoContract = useIfoContract(address, version)
  const { onRefund } = useIfoContribute(ifoContract)
  const onClaim = useIfoClaim(ifoContract)

  const [onPresentContributeModal] = useModal(
    <ContributeModal
      icoId={id}
      ifoContract={ifoContract}
      contributeLimit={maxPerUser.minus(contributedAmount)}
      minAmount={minPerUser.isGreaterThan(contributedAmount) ? minPerUser.minus(contributedAmount) : BIG_ZERO}
      toggleStatus={toggleStatus}
    />,
  )

  const claim = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onClaim()
    })
    if (receipt?.status) {
      toggleStatus()
      toastSuccess(
        `${t('Claimed')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('%token% token has been sent to your wallet!', { token: icoToken.symbol })}
        </ToastDescriptionWithTx>,
      )
      toggleStatus()
    }
  }

  const handleRefund = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onRefund()
    })
    if (receipt?.status) {
      toggleStatus()
      toastSuccess(
        `${t('Refunded')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your contributed funds have been sent back to your wallet. You can contribute again at any time!')}
        </ToastDescriptionWithTx>,
      )
      toggleStatus()
    }
  }

  const isLive = status === 'live'
  const isFinished = status === 'finished'
  const isClaimable = status === 'claimable'
  const percentOfUserContribution = contributedAmount.div(raisingAmount).times(100)

  return (
    <>
      <LabelButton
        disabled={pendingTx || isFinished || (isClaimable && claimed)}
        buttonLabel={isFinished || isClaimable ? (claimed ? 'Claimed' : 'Claim') : 'Contribute'}
        label={`Your contribution (${nativeCurrency.symbol})`}
        value={
          // eslint-disable-next-line no-nested-ternary
          contributedAmount.toNumber().toLocaleString('en-US', { maximumFractionDigits: 5 })
        }
        onClick={isClaimable ? claim : onPresentContributeModal}
      />
      <Flex justifyContent="space-between">
        <Text fontSize="14px" color="textSubtle">
          {isFinished ? `You'll get tokens when you claim` : `${percentOfUserContribution.toFixed(5)}% of total`}
        </Text>
        <Button
          mt="4px"
          variant="secondary"
          scale="sm"
          disabled={pendingTx || !isLive || contributedAmount.isEqualTo(BIG_ZERO)}
          onClick={handleRefund}
        >
          Refund
        </Button>
      </Flex>
    </>
  )
}

export default IfoCardContribute
