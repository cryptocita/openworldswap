import { Heading } from '@pancakeswap/uikit'
import styled from 'styled-components'

const Title = styled(Heading).attrs({ size: 'lg' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 16px;
`

export default Title
