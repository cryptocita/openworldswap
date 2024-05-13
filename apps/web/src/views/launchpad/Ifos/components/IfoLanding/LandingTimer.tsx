import { useTranslation } from '@pancakeswap/localization'
import { Heading } from '@pancakeswap/uikit'
import getTimePeriods from '@pancakeswap/utils/getTimePeriods'
import React from 'react'
import styled from 'styled-components'
// import getTimePeriods from 'utils/getTimePeriods'

interface TimerProps {
  secondsUntilStart: number
}

const Details = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 24px;
  gap: 10px;
`

const Countdown = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`

const LandingTimer: React.FC<TimerProps> = ({ secondsUntilStart }) => {
  const { t } = useTranslation()
  const timeUntil = getTimePeriods(secondsUntilStart)

  return (
    <Details>
      <Heading>STARTS IN:</Heading>
      <Countdown>{`${timeUntil.days}D - ${timeUntil.hours}H - ${timeUntil.minutes}min - ${timeUntil.seconds}sec`}</Countdown>
      {/* <Link href={`https://bscscan.com/block/countdown/${block}`} target="blank" rel="noopener noreferrer" ml="8px">
        (blocks)
      </Link> */}
    </Details>
  )
}

export default LandingTimer
