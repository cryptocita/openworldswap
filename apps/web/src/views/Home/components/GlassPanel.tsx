import { GlassPanel } from '@pancakeswap/uikit'
import styled from 'styled-components'

const StyledBox = styled('div')`
  padding: 100px 15px;
`

export const GlassPanelSection = () => {
  return (
    <StyledBox>
      <GlassPanel
        heading="lorem ipsem dolor"
        desc="lorem ipsem dolor sit amet lorem ipsem dolor sit amet lorem ipsem dolor sit amet lorem ipsem dolor sit amet lorem ipsem dolor sit amet lorem ipsem dolor sit amet lorem ipsem dolor sit amet "
        buttonText="VISIT"
      />
    </StyledBox>
  )
}
