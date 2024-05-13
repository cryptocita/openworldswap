// import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import { useTranslation } from '@pancakeswap/localization'
import { Button, Flex, Modal, Text, useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useCatchTxError from 'hooks/useCatchTxError'
import { useIfoContract } from 'hooks/useContract'
import useNativeCurrency from 'hooks/useNativeCurrency'
// import useToast from 'hooks/useToast'
import React, { useEffect, useState } from 'react'
// import { formatBigNumber, getDecimalAmount } from 'utils/formatBalance'
import { getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import { BigNumber as EthersBigNumber } from 'ethers'
import { formatBigNumber } from 'views/launchpad/Ifos/utils'
import { useBalance } from 'wagmi'
import useIfoContribute from '../../../hooks/useIfoContributeV4'

interface Props {
  icoId: string
  ifoContract: ReturnType<typeof useIfoContract>
  contributeLimit: BigNumber
  minAmount: BigNumber
  onDismiss?: () => void
  toggleStatus: () => void
}

const ContributeModal: React.FC<Props> = ({
  icoId,
  ifoContract,
  contributeLimit,
  minAmount,
  onDismiss,
  toggleStatus,
}) => {
  const [value, setValue] = useState('')
  const [isLimit, reachedLimit] = useState(false)
  const [tooSmall, setTooSmall] = useState(false)
  const { account, chainId } = useActiveWeb3React()
  const nativeCurrency = useNativeCurrency()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const { data, isFetched } = useBalance({ address: account ?? undefined, chainId })
  const { onContribute } = useIfoContribute(ifoContract)

  useEffect(() => {
    if (new BigNumber(value).isGreaterThan(contributeLimit)) {
      reachedLimit(true)
    } else {
      reachedLimit(false)
    }
    if (new BigNumber(value).isLessThan(minAmount)) {
      setTooSmall(true)
    } else {
      setTooSmall(false)
    }
  }, [value, contributeLimit, minAmount, pendingTx])

  return (
    <Modal title={`Contribute ${nativeCurrency.symbol}`} onDismiss={onDismiss}>
      <CurrencyInputPanel
        id="ifo-contribute-input"
        onUserInput={(input) => setValue(input)}
        onCurrencySelect={undefined}
        disableCurrencySelect
        showMaxButton
        onMax={() => {
          setValue(
            isFetched
              ? Math.max(
                  Number(formatBigNumber(EthersBigNumber.from(data?.value?.toString() ?? '0'))) - 0.01,
                  0,
                ).toString()
              : '0',
          )
        }}
        value={value}
        currency={nativeCurrency}
      />
      {(isLimit || tooSmall) && (
        <Text color="failure" fontSize="12px" textAlign="right">
          {isLimit
            ? `Max ${contributeLimit.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} ${
                nativeCurrency.symbol
              }`
            : tooSmall
            ? `Min ${minAmount.toNumber().toLocaleString('en-US', { maximumFractionDigits: 3 })} ${
                nativeCurrency.symbol
              }`
            : ''}
        </Text>
      )}
      <Flex justifyContent="space-between" mt="24px">
        <Button width="100%" variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          width="100%"
          disabled={pendingTx || new BigNumber(value).isNaN() || new BigNumber(value).isZero() || isLimit || tooSmall}
          onClick={async () => {
            const receipt = await fetchWithCatchTxError(() => {
              return onContribute(getDecimalAmount(new BigNumber(value)).toString(), icoId)
            })
            if (receipt?.status) {
              toggleStatus()
              toastSuccess(
                `${t('Contributed')}!`,
                <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                  {t('You can claim tokens for your contribution after the ICO finished!')}
                </ToastDescriptionWithTx>,
              )
              toggleStatus()
            }
          }}
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  )
}

export default ContributeModal
