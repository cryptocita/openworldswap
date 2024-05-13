import { useTranslation } from '@pancakeswap/localization'
import { Button, Input, Modal, Text, useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
// import useToast from 'hooks/useToast'
import useManageToken from '../hooks/useManageToken'
import { MAX_TAX } from '../types'

const StyledInput = styled(Input)`
  border-radius: 6px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text};
`

interface Props {
  tokenAddress: string
  buyTax: string
  sellTax: string
  transferTax: string
  onDismiss?: () => void
}

const TaxModal: React.FC<React.PropsWithChildren<Props>> = ({
  tokenAddress,
  buyTax: buyTax_,
  sellTax: sellTax_,
  transferTax: transferTax_,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { toastError, toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { onUpdateTax } = useManageToken(tokenAddress)
  const [buyTax, setBuyTax] = useState('')
  const [sellTax, setSellTax] = useState('')
  const [transferTax, setTransferTax] = useState('')

  useEffect(() => {
    setBuyTax(buyTax_)
  }, [buyTax_])
  useEffect(() => {
    setSellTax(sellTax_)
  }, [sellTax_])
  useEffect(() => {
    setTransferTax(transferTax_)
  }, [transferTax_])

  const handleUpdate = async () => {
    try {
      if (Number(buyTax) > MAX_TAX) throw new Error(`Buy tax should be less than ${MAX_TAX}%`)
      if (Number(sellTax) > MAX_TAX) throw new Error(`Sell tax should be less than ${MAX_TAX}%`)
      if (Number(transferTax) > MAX_TAX) throw new Error(`Transfer tax should be less than ${MAX_TAX}%`)
    } catch (err) {
      // @ts-ignore
      toastError(t('Error'), err.message)
      return
    }

    const receipt = await fetchWithCatchTxError(() => {
      return onUpdateTax(
        Math.floor(Number(buyTax) * 100),
        Math.floor(Number(sellTax) * 100),
        Math.floor(Number(transferTax) * 100),
      )
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Success')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('Tax has been updated!')}</ToastDescriptionWithTx>,
      )
    }
  }

  return (
    <Modal minWidth="346px" title={t('Update tax')} onDismiss={onDismiss}>
      <Text>Buy tax</Text>
      <StyledInput
        type="text"
        onChange={(e) => {
          // empty string or positive number only
          if (/^$|^([0-9]*)$/.test(e.target.value)) setBuyTax(e.target.value)
        }}
        value={buyTax}
      />
      <Text>Sell tax</Text>
      <StyledInput
        type="text"
        onChange={(e) => {
          // empty string or positive number only
          if (/^$|^([0-9]*)$/.test(e.target.value)) setSellTax(e.target.value)
        }}
        value={sellTax}
      />
      <Text>Transfer tax</Text>
      <StyledInput
        type="text"
        onChange={(e) => {
          // empty string or positive number only
          if (/^$|^([0-9]*)$/.test(e.target.value)) setTransferTax(e.target.value)
        }}
        value={transferTax}
      />
      <Button disabled={pendingTx} variant="secondary" mt="8px" onClick={handleUpdate}>
        Update
      </Button>
    </Modal>
  )
}

export default TaxModal
