import { Heading } from '@pancakeswap/uikit'
import styled from 'styled-components'

const Title = styled(Heading).attrs({ size: 'lg' })`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
`

export default Title
