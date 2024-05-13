import { useTranslation } from '@pancakeswap/localization'
import { Button, Input, Modal, Text, useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
// import useToast from 'hooks/useToast'
// import { isAddress } from 'utils'
import { isAddress } from 'viem'
import useManageToken from '../hooks/useManageToken'

const StyledInput = styled(Input)`
  border-radius: 6px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text};
`

interface Props {
  tokenAddress: string
  marketingWallet: string
  onDismiss?: () => void
}

const MarketingWalletModal: React.FC<React.PropsWithChildren<Props>> = ({
  tokenAddress,
  marketingWallet: marketingWallet_,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { toastError, toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { onUpdateMarketingWallet } = useManageToken(tokenAddress)
  const [marketingWallet, setMarketingWallet] = useState('')

  useEffect(() => {
    setMarketingWallet(marketingWallet_)
  }, [marketingWallet_])

  const handleUpdate = async () => {
    try {
      if (!marketingWallet) throw new Error('Missing marketing wallet')
      if (!isAddress(marketingWallet)) throw new Error('Invalid marketing wallet')
    } catch (err) {
      // @ts-ignore
      toastError(t('Error'), err.message)
      return
    }

    const receipt = await fetchWithCatchTxError(() => {
      return onUpdateMarketingWallet(marketingWallet)
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Success')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Marketing wallet has been updated!')}
        </ToastDescriptionWithTx>,
      )
    }
  }

  return (
    <Modal minWidth="346px" title={t('Update marketing wallet')} onDismiss={onDismiss}>
      <Text>Marketing wallet</Text>
      <StyledInput
        type="text"
        placeholder={t('0x123...')}
        pattern="^(0x[a-fA-F0-9]{40})$"
        onChange={(e) => setMarketingWallet(e.target.value)}
        value={marketingWallet}
      />
      <Button disabled={pendingTx} variant="secondary" mt="8px" onClick={handleUpdate}>
        Update
      </Button>
    </Modal>
  )
}

export default MarketingWalletModal
