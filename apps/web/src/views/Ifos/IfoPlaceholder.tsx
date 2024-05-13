import { PoolIds } from '@pancakeswap/ifos'
import { useTranslation } from '@pancakeswap/localization'
import { bscTokens } from '@pancakeswap/tokens'
import {
  Box,
  Card,
  IfoGenericIfoCard,
  IfoSkeletonCardActions,
  IfoSkeletonCardDetails,
  IfoSkeletonCardTokens,
} from '@pancakeswap/uikit'
import { useMemo } from 'react'
import styled from 'styled-components'

import { useFetchIfo } from 'state/pools/hooks'

import { CardsWrapper } from './components/IfoCardStyles'
import IfoContainer from './components/IfoContainer'
import { cardConfig } from './components/IfoFoldableCard/IfoPoolCard'
import { StyledCardBody } from './components/IfoFoldableCard/index'
import IfoSteps from './components/IfoSteps'

const CurveBox = styled(Box)`
  border-bottom-left-radius: 100% 40px;
  border-bottom-right-radius: 100% 40px;
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};
`

function Placeholder() {
  const { t } = useTranslation()

  const basicConfig = useMemo(
    () =>
      cardConfig(t, PoolIds.poolBasic, {
        version: 7,
      }),
    [t],
  )

  const unlimitedConfig = useMemo(
    () =>
      cardConfig(t, PoolIds.poolUnlimited, {
        version: 7,
      }),
    [t],
  )

  const skeletons = (
    <Box width="100%">
      <IfoSkeletonCardTokens />
      <Box mt="1.5rem">
        <IfoSkeletonCardActions />
      </Box>
      <Box mt="1.5rem">
        <IfoSkeletonCardDetails />
      </Box>
    </Box>
  )

  return (
    <Card
      background="bubblegum"
      style={{
        width: '100%',
      }}
    >
      <CurveBox height={[100, 110, 160, 160]} />
      <StyledCardBody>
        <CardsWrapper>
          <IfoGenericIfoCard
            title={unlimitedConfig?.title}
            variant={unlimitedConfig?.variant}
            tooltip={unlimitedConfig?.tooltip}
            content={skeletons}
            action={null}
          />
          <IfoGenericIfoCard
            title={basicConfig?.title}
            variant={basicConfig?.variant}
            tooltip={basicConfig?.tooltip}
            content={skeletons}
            action={null}
          />
        </CardsWrapper>
      </StyledCardBody>
    </Card>
  )
}

export function IfoPlaceholder() {
  useFetchIfo()
  return (
    <IfoContainer
      ifoSection={<Placeholder />}
      ifoSteps={
        <IfoSteps isLive={false} hasClaimed={false} isCommitted={false} ifoCurrencyAddress={bscTokens.cake.address} />
      }
    />
  )
}
