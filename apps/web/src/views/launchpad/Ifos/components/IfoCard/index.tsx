import { useTranslation } from '@pancakeswap/localization'
import { Card, CardBody, CardRibbon } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStatus } from 'views/launchpad/Ifos/hooks/helpers'
import useIfoPublicData from '../../hooks/useIfoPublicData'
import useIfoUserData from '../../hooks/useIfoUserData'
import { Ifo, IfoStatus } from '../../types'
import IfoCardContribute from './IfoCardContribute'
import IfoCardDescription from './IfoCardDescription'
import IfoCardDetails from './IfoCardDetails'
import IfoCardHeader from './IfoCardHeader'
import IfoCardProgress from './IfoCardProgress'
import IfoCardTime from './IfoCardTime'

export interface IfoCardProps {
  ifo: Ifo
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  // background-image: ${({ ifoId }) => `url('/images/ifos/${ifoId}-bg.png')`};
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

const getRibbonComponent = (status: IfoStatus, TranslateString: (fallback: string) => any) => {
  if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString('Coming Soon')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString('LIVE NOW!')} />
  }

  return null
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const [statusChanged, changeStatus] = useState(false)

  const toggleStatus = () => {
    changeStatus(!statusChanged)
  }

  const ifoPublicData = useIfoPublicData(ifo, statusChanged)
  const ifoUserData = useIfoUserData(ifo, statusChanged)
  // console.log('SDfsdf', ifoUserData, ifo)

  const { id, name, description, subTitle, softcap, isLoading, startDateNum, endDateNum, claimDateNum, releaseAt } =
    ifoPublicData

  const [state, setState] = useState({
    status: 'idle' as IfoStatus,
    progress: 0,
    secondsUntilStart: 0,
    secondsUntilEnd: 0,
    secondsUntilClaim: 0,
  })

  const { account } = useWeb3React()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isLoading) {
        const currentTime = Math.floor(Date.now() / 1000)
        const status = getStatus(currentTime, startDateNum, endDateNum, claimDateNum)
        const secondsRemaining = endDateNum - currentTime

        // Calculate the total progress until finished or until start
        const progress =
          currentTime > endDateNum
            ? ((currentTime - endDateNum) / (claimDateNum - endDateNum)) * 100
            : currentTime > startDateNum
            ? ((currentTime - startDateNum) / (endDateNum - startDateNum)) * 100
            : ((currentTime - releaseAt) / (startDateNum - releaseAt)) * 100

        setState({
          status,
          progress,
          secondsUntilStart: startDateNum - currentTime,
          secondsUntilEnd: secondsRemaining,
          secondsUntilClaim: claimDateNum - currentTime,
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [isLoading, startDateNum, endDateNum, claimDateNum, releaseAt])

  const { t } = useTranslation()

  const Ribbon = getRibbonComponent(state.status, t)

  const isActive = state.status === 'live'
  const isFinished = state.status === 'finished'
  const isClaimable = state.status === 'claimable'

  return (
    <StyledIfoCard ifoId={id} ribbon={Ribbon}>
      <CardBody>
        <IfoCardHeader
          ifoId={id}
          name={name}
          subTitle={subTitle || ''}
          kyc={ifo.kyc ?? false}
          audit={ifo.audit ?? false}
        />
        {/* {isActive && (
          <StyledNotice>
            <Text textAlign='center'>Softcap has been reached. The sale will continue until hardcap or timer runs out.</Text>
          </StyledNotice>
          
        )} */}
        <IfoCardProgress progress={state.progress} />
        <IfoCardTime
          isLoading={isLoading}
          status={state.status}
          secondsUntilStart={state.secondsUntilStart}
          secondsUntilEnd={state.secondsUntilEnd}
          secondsUntilClaim={state.secondsUntilClaim}
          // block={isActive || isFinished ? endDateNum : startDateNum}
        />
        {!account && <ConnectWalletButton width="100%" />}
        {account && (isActive || isFinished || isClaimable) && (
          <IfoCardContribute
            ifoPublicData={ifoPublicData}
            ifoUserData={ifoUserData}
            status={state.status}
            raisingAmount={softcap}
            toggleStatus={toggleStatus}
          />
        )}
        <IfoCardDescription description={description || ''} />
        <IfoCardDetails ifo={ifoPublicData} />
      </CardBody>
    </StyledIfoCard>
  )
}

export default IfoCard
