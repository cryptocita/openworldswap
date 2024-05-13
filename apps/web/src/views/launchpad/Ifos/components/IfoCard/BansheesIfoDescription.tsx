import { useTranslation } from '@pancakeswap/localization'
import { Text } from '@pancakeswap/uikit'
import React, { useState } from 'react'
import styled from 'styled-components'

export interface IfoCardDescriptionProps {
  defaultIsOpen?: boolean
  description: string
}

const StyledIfoCardDescription = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
`

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: block;
  font-weight: 600;
  outline: 0;
  padding: 24px 16px;
  width: 100%;
`

const Description = styled(Text)<{ isOpen: boolean }>`
  color: ${({ theme }) => theme.colors.textSubtle};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  font-size: 15px;
  line-height: 19px;
  margin-bottom: 5px;
`

const BansheesIfoDescription: React.FC<IfoCardDescriptionProps> = ({ defaultIsOpen = true, description }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const { t } = useTranslation()

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <StyledIfoCardDescription>
      <Divider />
      <ToggleButton onClick={handleClick}>{isOpen ? t('Hide') : t('Show')}</ToggleButton>
      <Description isOpen={isOpen}>
        &#x2022; Contribute 100 MATIC worth of HITCOIN and receive a free PaperhandZ Mint.
      </Description>
      <Description isOpen={isOpen}>
        &#x2022; Contribute &gt;500 MATIC worth and receive 25% extra HITCOIN vested for 6 months.
      </Description>
      <Description isOpen={isOpen}>
        &#x2022; Contribute &gt;1000 MATIC worth and receive 50% extra HITCOIN vested for 6 months.
      </Description>
    </StyledIfoCardDescription>
  )
}

export default BansheesIfoDescription
