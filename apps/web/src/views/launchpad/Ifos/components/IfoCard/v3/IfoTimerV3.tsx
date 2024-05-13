import { Text } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'
// import { IfoV3Status } from 'config/constants/types'
import { useTranslation } from '@pancakeswap/localization'
// import getTimePeriods from 'utils/getTimePeriods'
import getTimePeriods from '@pancakeswap/utils/getTimePeriods'
import { IfoV3Status } from '../../../types'

export interface IfoCardTimeProps {
  isLoading: boolean
  status: IfoV3Status | null
  secondsUntilWlStart: number
  secondsUntilPubStart: number
  secondsUntilEnd: number
  secondsUntilClaim: number
  block?: number
}

const Details = styled.div`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  margin-bottom: 24px;
`

const Countdown = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`

const IfoTimerV3: React.FC<IfoCardTimeProps> = ({
  isLoading,
  status,
  secondsUntilWlStart,
  secondsUntilPubStart,
  secondsUntilEnd,
  secondsUntilClaim,
}) => {
  const { t } = useTranslation()
  const countdownToUse =
    status === 'coming_soon'
      ? secondsUntilWlStart
      : status === 'wl_sale'
      ? secondsUntilPubStart
      : status === 'pub_sale'
      ? secondsUntilEnd
      : secondsUntilClaim
  const timeUntil = getTimePeriods(countdownToUse)
  const suffix =
    status === 'coming_soon'
      ? 'WL sale'
      : status === 'wl_sale'
      ? 'Public sale'
      : status === 'pub_sale'
      ? 'finish'
      : 'claim'

  if (isLoading) {
    return <Details>{t('Loading...')}</Details>
  }

  if (countdownToUse <= 0) {
    return (
      <Details>
        <Text bold>{t('Finished!')}</Text>
      </Details>
    )
  }

  return (
    <Details>
      <Countdown>{`${timeUntil.days}d, ${timeUntil.hours}h : ${timeUntil.minutes}m : ${timeUntil.seconds}s until ${suffix}`}</Countdown>
      {/* <Link href={`https://bscscan.com/block/countdown/${block}`} target="blank" rel="noopener noreferrer" ml="8px">
        (blocks)
      </Link> */}
    </Details>
  )
}

export default IfoTimerV3
