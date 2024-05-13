import { useTranslation } from '@pancakeswap/localization'
import { Button, Input, Modal, Text, useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
// import useToast from 'hooks/useToast'
// import { getDecimalAmount } from 'utils/formatBalance'
import { getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import useManageToken from '../hooks/useManageToken'
import { MAX_HOLD_AMOUNT_MIN_LIMIT, MAX_TX_AMOUNT_MIN_LIMIT } from '../types'

const StyledInput = styled(Input)`
  border-radius: 6px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text};
`

interface Props {
  tokenAddress: string
  totalSupply: string
  txLimit: string
  holdLimit: string
  decimals: string
  onDismiss?: () => void
}

const TxHoldLimitModal: React.FC<React.PropsWithChildren<Props>> = ({
  tokenAddress,
  totalSupply,
  txLimit: txLimit_,
  holdLimit: holdLimit_,
  decimals,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { toastError, toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { onUpdateTxHoldLimit } = useManageToken(tokenAddress)
  const [txLimit, setTxLimit] = useState('')
  const [holdLimit, setHoldLimit] = useState('')

  useEffect(() => {
    setTxLimit(txLimit_)
  }, [txLimit_])
  useEffect(() => {
    setHoldLimit(holdLimit_)
  }, [holdLimit_])

  const handleUpdate = async () => {
    try {
      if (!txLimit) throw new Error('Missing transfer limit')
      if (!holdLimit) throw new Error('Missing hold limit')
      if (new BigNumber(totalSupply).times(MAX_TX_AMOUNT_MIN_LIMIT).div(100).isGreaterThan(new BigNumber(txLimit)))
        throw new Error(`Max transfer amount should be more than ${MAX_TX_AMOUNT_MIN_LIMIT}% of total supply`)
      if (new BigNumber(totalSupply).times(MAX_HOLD_AMOUNT_MIN_LIMIT).div(100).isGreaterThan(new BigNumber(holdLimit)))
        throw new Error(`Max hold amount should be more than ${MAX_HOLD_AMOUNT_MIN_LIMIT}% of total supply`)
    } catch (err) {
      // @ts-ignore
      toastError(t('Error'), err.message)
      return
    }

    const receipt = await fetchWithCatchTxError(() => {
      return onUpdateTxHoldLimit(
        getDecimalAmount(new BigNumber(txLimit), Number(decimals)),
        getDecimalAmount(new BigNumber(holdLimit), Number(decimals)),
      )
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Success')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Tx/hold limit has been updated!')}
        </ToastDescriptionWithTx>,
      )
    }
  }

  return (
    <Modal minWidth="346px" title={t('Update tx/hold limit')} onDismiss={onDismiss}>
      <Text>Tx limit</Text>
      <StyledInput
        type="text"
        placeholder={t('')}
        onChange={(e) => {
          // empty string or positive number only
          if (/^$|^([1-9][0-9]*)$/.test(e.target.value)) setTxLimit(e.target.value)
        }}
        value={txLimit}
      />
      <Text>Hold limit</Text>
      <StyledInput
        type="text"
        placeholder={t('')}
        onChange={(e) => {
          // empty string or positive number only
          if (/^$|^([1-9][0-9]*)$/.test(e.target.value)) setHoldLimit(e.target.value)
        }}
        value={holdLimit}
      />
      <Button disabled={pendingTx} variant="secondary" mt="8px" onClick={handleUpdate}>
        Update
      </Button>
    </Modal>
  )
}

export default TxHoldLimitModal
