import { GlassPanel } from '@pancakeswap/uikit'
import styled from 'styled-components'

const StyledBox = styled('div')`
  padding: 100px 15px;
  background-color: ${({ theme }) => theme.colors.background};
`

export const GlassPanelSection = () => {
  return (
    <StyledBox>
      <GlassPanel
        heading="About OpenWorldSwap"
        desc="OpenWorldSwap is inspired by SandBox Technology and Project Zomboid game. OpenWorldSwap new generation of AMM designed to serve as OpenEX Network's central liquidity hub, combining a powerful incentive engine, profit sharing modules, and friendly user experience. To learn more about OpenWorldSwap, view our whitepaper."
        buttonText="VIEW WHITEPAPER"
        link="https://openworldswap.gitbook.io/openworldswap"
      />
    </StyledBox>
  )
}
