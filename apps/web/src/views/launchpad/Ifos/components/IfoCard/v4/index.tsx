import { ChainId } from '@pancakeswap/chains'
import { useTranslation } from '@pancakeswap/localization'
import { Card, CardBody, CardRibbon, Flex } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStatus } from 'views/launchpad/Ifos/hooks/helpers'
import useIfoPublicData from '../../../hooks/useIfoPublicDataV4'
import useIfoUserData from '../../../hooks/useIfoUserDataV4'
import { Ifo, IfoStatus } from '../../../types'
import IfoReferral from '../../IfoReferral'
import BansheesIfoDescription from '../BansheesIfoDescription'
import IfoCardDescription from '../IfoCardDescription'
import IfoCardHeader from '../IfoCardHeader'
import IfoCardProgress from '../IfoCardProgress'
import IfoCardContribute from './IfoContributeV4'
import IfoCardDetails from './IfoDetailsV4'

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

const ProgressDetails = styled.div`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  margin-bottom: 24px;
`

const ProgressNote = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`

const getRibbonComponent = (status: IfoStatus, TranslateString: (fallback: string) => any) => {
  if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString('Coming Soon')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString('LIVE NOW!')} />
  }

  if (status === 'finished') {
    return <CardRibbon variantColor="secondary" text={TranslateString('WAIT A MINUTE!')} />
  }

  return <CardRibbon variantColor="secondary" text={TranslateString('CLAIM NOW!')} />
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const [statusChanged, changeStatus] = useState(false)

  const toggleStatus = () => {
    changeStatus(!statusChanged)
  }

  const ifoPublicData = useIfoPublicData(ifo, statusChanged)
  const ifoUserData = useIfoUserData(ifo, statusChanged)

  const {
    id,
    name,
    description,
    subTitle,
    softcap,
    icoPrice,
    icoToken,
    isLoading,
    startDateNum,
    endDateNum,
    claimDateNum,
    releaseAt,
    totalContributed,
    referralFee,
  } = ifoPublicData

  const { referredCount, referredContributes, referrerDistributes } = ifoUserData

  const [state, setState] = useState({
    status: 'idle' as IfoStatus,
    progress: 0,
    secondsUntilStart: 0,
    secondsUntilEnd: 0,
    secondsUntilClaim: 0,
  })

  const { account, chainId } = useWeb3React()

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
    <Flex
      flexDirection={['column', 'column', null, 'row']}
      alignItems={['center', null, null, 'flex-start']}
      style={{ gap: '8px' }}
    >
      <StyledIfoCard ifoId={id} ribbon={Ribbon}>
        <CardBody>
          <IfoCardHeader ifoId={id} name={name} subTitle={subTitle || ''} />
          {/* {isActive && (
          <StyledNotice>
            <Text textAlign='center'>Softcap has been reached. The sale will continue until hardcap or timer runs out.</Text>
          </StyledNotice>
          
        )} */}
          <IfoCardProgress progress={totalContributed.div(softcap).times(100).toNumber()} />

          <ProgressDetails>
            <ProgressNote>
              {totalContributed
                .div(softcap)
                .times(100)
                .toNumber()
                .toLocaleString('en-US', { maximumFractionDigits: 2 })}
              % Raised
            </ProgressNote>
          </ProgressDetails>
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
          {id === 'banshees-public-sale' ? (
            <BansheesIfoDescription description={description || ''} />
          ) : (
            <IfoCardDescription description={description || ''} />
          )}
          <IfoCardDetails ifo={ifoPublicData} />
        </CardBody>
      </StyledIfoCard>
      <IfoReferral
        account={account ?? ''}
        chainId={chainId ?? ChainId.OEX_TESTNET}
        referralFee={referralFee}
        icoPrice={icoPrice}
        icoTokenSymbol={icoToken.symbol}
        referredCount={referredCount}
        referredContributes={referredContributes}
        referrerDistributes={referrerDistributes}
      />
    </Flex>
  )
}

export default IfoCard
