import { Button, Flex, Modal, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import { useBalance } from 'wagmi'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useIfoContract } from 'hooks/useContract'
import useNativeCurrency from 'hooks/useNativeCurrency'

import { getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import useIfoContribute from '../../hooks/useIfoContribute'

interface Props {
  ifoContract: ReturnType<typeof useIfoContract>
  contributeLimit: BigNumber
  minAmount: BigNumber
  onDismiss?: () => void
  toggleStatus: () => void
}

const ContributeModal: React.FC<Props> = ({ ifoContract, contributeLimit, minAmount, onDismiss, toggleStatus }) => {
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [isLimit, reachedLimit] = useState(false)
  const [tooSmall, setTooSmall] = useState(false)
  const { account, chainId } = useActiveWeb3React()
  const nativeCurrency = useNativeCurrency()
  const { data, isFetched } = useBalance({ address: account ?? undefined, chainId })
  const onContribute = useIfoContribute(ifoContract)

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
          setValue(isFetched ? Math.max(Number(BigNumber(data?.value?.toString() ?? '0')) - 0.01, 0).toString() : '0')
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
            try {
              setPendingTx(true)
              await onContribute(getDecimalAmount(new BigNumber(value)).toString())
            } catch (err) {
              console.error(err)
            } finally {
              toggleStatus()
              setPendingTx(false)
              if (onDismiss) {
                onDismiss()
              }
            }
          }}
        >
          Confirm
        </Button>
      </Flex>
      {/* <LinkExternal
        href="https://exchange.pancakeswap.finance/#/add/ETH/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
        style={{ margin: 'auto' }}
      >
        {`Get ${currency}`}
      </LinkExternal> */}
    </Modal>
  )
}

export default ContributeModal
