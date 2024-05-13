import { Card, CardBody } from '@pancakeswap/uikit'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IfoLandingHeader from './LandingHeader'

const StyledIfoLanding = styled(Card)`
  // background-image: url('/images/ifos/ifo-landing.png');
  background-repeat: no-repeat;
  background-size: contain;
  // padding-top: 112px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
`

const StyledNotice = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 8px;
  margin-bottom: 12px;
`

const IfoLanding: React.FC = () => {
  const [statusChanged, changeStatus] = useState(false)

  const [state, setState] = useState({ secondsUntilStart: 0 })

  const startDateNum = 1679950800

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentTime = Math.floor(Date.now() / 1000)
      setState({ secondsUntilStart: startDateNum - currentTime })
    }, 1000)
    return () => clearInterval(interval)
  }, [startDateNum])

  return (
    <StyledIfoLanding>
      <CardBody style={{ padding: 0 }}>
        <IfoLandingHeader />
        {/* <LandingTimer secondsUntilStart={state.secondsUntilStart} /> */}
        {/* <IfoCardDescription description={description} /> */}
        {/* <LandingDetails /> */}
      </CardBody>
    </StyledIfoLanding>
  )
}

export default IfoLanding
