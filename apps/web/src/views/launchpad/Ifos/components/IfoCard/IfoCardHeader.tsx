import { Flex, Heading, Text } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'

interface IfoCardHeaderProps {
  ifoId: string
  name: string
  subTitle: string
  audit?: boolean
  kyc?: boolean
}

const StyledIfoCardHeader = styled(Flex)<{ noMargin: boolean }>`
  padding-top: ${({ noMargin }) => (noMargin ? '0' : '12px')};
  margin: ${({ noMargin }) => (noMargin ? '-24px -24px 24px -24px' : '0 0 24px')};
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

const Badge = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.textSubtle};
  border-radius: 4px 4px 4px 4px;
  padding-bottom: 3px;
  padding-top: 3px;
  padding-left: 6px;
  padding-right: 6px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-radius 0.15s;
`

const IfoCardHeader: React.FC<IfoCardHeaderProps> = ({ ifoId, name, subTitle, audit, kyc }) => {
  const isBluSale = ifoId === 'bluespade-public-sale'
  const isBansheesSale = ifoId === 'banshees-public-sale'

  return (
    <StyledIfoCardHeader noMargin={isBluSale} mb="24px" alignItems="center">
      {isBluSale ? (
        <>
          <img src="/images/ifos/ifo-blu-landing.png" alt="Ifo Landing" />
        </>
      ) : isBansheesSale ? (
        <>
          <img src="/images/ifos/ifo-banshees-landing.png" alt="Ifo Landing" />
        </>
      ) : (
        <Flex justifyContent="space-between" paddingRight="2rem">
          <img src={`/images/ifos/${ifoId}.png`} alt={ifoId} width="64px" height="64px" />
          <div>
            <Name>{name}</Name>
            <Description>{subTitle}</Description>
          </div>
          <div style={{ gap: '2px' }}>
            {audit && <Badge>Audit</Badge>}
            {kyc && <Badge style={{ marginTop: '5px' }}>KYC</Badge>}
          </div>
        </Flex>
      )}
    </StyledIfoCardHeader>
  )
}

export default IfoCardHeader
