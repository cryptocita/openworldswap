import { useTranslation } from '@pancakeswap/localization'
import { Card, CardBody, CardRibbon } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getV3Status } from 'views/launchpad/Ifos/hooks/helpers'
import useIfoPublicDataV3 from '../../../hooks/useIfoPublicDataV3'
import useIfoUserDataV3 from '../../../hooks/useIfoUserDataV3'
import { Ifo, IfoV3Status } from '../../../types'
import IfoCardDescription from '../IfoCardDescription'
import IfoCardHeader from '../IfoCardHeader'
import IfoCardProgress from '../IfoCardProgress'
import IfoContributeV3 from './IfoContributeV3'
import IfoDetails from './IfoDetailsV3'
import IfoTimerV3 from './IfoTimerV3'

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
  height: fit-content;
`

const StyledNotice = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 8px;
  margin-bottom: 12px;
`

const getRibbonComponent = (status: IfoV3Status | null, TranslateString: (fallback: string) => any) => {
  if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString('Coming Soon')} />
  }

  if (status === 'wl_sale') {
    return <CardRibbon variantColor="primary" text={TranslateString('WL SALE!')} />
  }

  if (status === 'pub_sale') {
    return <CardRibbon variantColor="primary" text={TranslateString('PUB SALE!')} />
  }

  if (status === 'finished') {
    return <CardRibbon variantColor="primary" text={TranslateString('PLEASE WAIT!')} />
  }

  if (status === 'claimable') {
    return <CardRibbon variantColor="primary" text={TranslateString('CLAIM!')} />
  }

  return null
}

const IfoCardV3: React.FC<IfoCardProps> = ({ ifo }) => {
  const [statusChanged, changeStatus] = useState(false)

  const toggleStatus = () => {
    changeStatus(!statusChanged)
  }

  const ifoPublicData = useIfoPublicDataV3(ifo, statusChanged)
  const ifoUserData = useIfoUserDataV3(ifo, statusChanged)

  const {
    id,
    name,
    description,
    subTitle,
    softcap,
    isLoading,
    startDateNum,
    pubDateNum,
    endDateNum,
    claimDateNum,
    releaseAt,
  } = ifoPublicData

  const [state, setState] = useState({
    status: null,
    progress: 0,
    secondsUntilWlStart: 0,
    secondsUntilPubStart: 0,
    secondsUntilEnd: 0,
    secondsUntilClaim: 0,
  })

  const { account } = useWeb3React()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isLoading) {
        const currentTime = Math.floor(Date.now() / 1000)
        const status = getV3Status(currentTime, startDateNum, pubDateNum, endDateNum, claimDateNum)

        // Calculate the total progress until finished or until start
        const progress =
          currentTime > endDateNum
            ? ((currentTime - endDateNum) / (claimDateNum - endDateNum)) * 100
            : currentTime > pubDateNum
            ? ((currentTime - pubDateNum) / (endDateNum - pubDateNum)) * 100
            : currentTime > startDateNum
            ? ((currentTime - startDateNum) / (pubDateNum - startDateNum)) * 100
            : ((currentTime - releaseAt) / (startDateNum - releaseAt)) * 100

        setState({
          // @ts-ignore
          status,
          progress,
          secondsUntilWlStart: startDateNum - currentTime,
          secondsUntilPubStart: pubDateNum - currentTime,
          secondsUntilEnd: endDateNum - currentTime,
          secondsUntilClaim: claimDateNum - currentTime,
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [isLoading, startDateNum, endDateNum, claimDateNum, releaseAt])

  const { t } = useTranslation()

  const Ribbon = getRibbonComponent(state.status, t)

  const isActive = state.status === 'wl_sale' || state.status === 'pub_sale'
  const isFinished = state.status === 'finished'
  const isClaimable = state.status === 'claimable'

  return (
    <StyledIfoCard ifoId={id} ribbon={Ribbon}>
      <CardBody>
        <IfoCardHeader ifoId={id} name={name} subTitle={subTitle || ''} />
        {/* {isActive && (
          <StyledNotice>
            <Text textAlign='center'>Softcap has been reached. The sale will continue until hardcap or timer runs out.</Text>
          </StyledNotice>
          
        )} */}
        <IfoCardProgress progress={state.progress} />
        <IfoTimerV3
          isLoading={isLoading}
          status={state.status}
          secondsUntilWlStart={state.secondsUntilWlStart}
          secondsUntilPubStart={state.secondsUntilPubStart}
          secondsUntilEnd={state.secondsUntilEnd}
          secondsUntilClaim={state.secondsUntilClaim}
          // block={isActive || isFinished ? endDateNum : startDateNum}
        />
        {!account && <ConnectWalletButton width="100%" />}
        {account && (isActive || isFinished || isClaimable) && (
          <IfoContributeV3
            ifoPublicData={ifoPublicData}
            ifoUserData={ifoUserData}
            status={state.status}
            toggleStatus={toggleStatus}
          />
        )}
        <IfoCardDescription description={description || ''} />
        <IfoDetails ifo={ifoPublicData} />
      </CardBody>
    </StyledIfoCard>
  )
}

export default IfoCardV3
