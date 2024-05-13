import { Flex, Heading, Text } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'

interface IfoCardHeaderProps {
  ifoId: string
  name: string
  subTitle: string
}

const StyledIfoCardHeader = styled(Flex)`
  & > div {
    flex: 1;
  }
`

const Name = styled(Heading).attrs({ as: 'h3', size: 'lg' })`
  margin-bottom: 8px;
  text-align: center;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: center;
`

const LandingHeader: React.FC = () => {
  return (
    <StyledIfoCardHeader mb="24px" alignItems="center">
      <img src="/images/ifos/ifo-blu-landing.png" alt="Ifo Landing" />
      <div>
        <Name>{}</Name>
        <Description>{}</Description>
      </div>
    </StyledIfoCardHeader>
  )
}

export default LandingHeader
