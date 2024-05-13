import { Text, useModal } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useIfoContract } from 'hooks/useContract'
import useNativeCurrency from 'hooks/useNativeCurrency'
import React, { useState } from 'react'
// import { IfoStatus } from '../../types'
// import { BIG_ZERO } from 'utils/bigNumber'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import useIfoClaim from '../../hooks/useIfoClaim'
import { IfoStatus, PublicIfoData, UserIfoData } from '../../types'
import ContributeModal from './ContributeModal'
import LabelButton from './LabelButton'

export interface Props {
  ifoPublicData: PublicIfoData
  ifoUserData: UserIfoData
  status: IfoStatus
  raisingAmount: BigNumber
  toggleStatus: () => void
}

const IfoCardContribute: React.FC<Props> = ({ ifoPublicData, ifoUserData, status, raisingAmount, toggleStatus }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { address, minPerUser, maxPerUser, version } = ifoPublicData
  const { contributedAmount, claimed } = ifoUserData
  const { chainId } = useActiveWeb3React()
  const nativeCurrency = useNativeCurrency()
  const ifoContract = useIfoContract(address, version)
  const onClaim = useIfoClaim(ifoContract)

  const [onPresentContributeModal] = useModal(
    <ContributeModal
      ifoContract={ifoContract}
      contributeLimit={maxPerUser.minus(contributedAmount)}
      minAmount={minPerUser.isGreaterThan(contributedAmount) ? minPerUser.minus(contributedAmount) : BIG_ZERO}
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

  const isFinished = status === 'finished'
  const isClaimable = status === 'claimable'
  const percentOfUserContribution = contributedAmount.div(raisingAmount).times(100)

  // if (allowance.isZero()) {
  //   return (
  //     <Button
  //       width='100%'
  //       disabled={pendingTx || isFinished}
  //       onClick={async () => {
  //         try {
  //           setPendingTx(true)
  //           await onApprove()
  //           toggleStatus()
  //         } catch (e) {
  //           console.error(e)
  //         } finally {
  //           toggleStatus()
  //           setPendingTx(false)
  //         }
  //       }}
  //     >
  //       Approve
  //     </Button>
  //   )
  // }

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
      <Text fontSize="14px" color="textSubtle">
        {isFinished ? `You'll get tokens when you claim` : `${percentOfUserContribution.toFixed(5)}% of total`}
      </Text>
    </>
  )
}

export default IfoCardContribute
