import styled from 'styled-components'
import TokenCard from './components/TokenCard'
import { useConfig } from './contexts/TokenpadContext'

const Wrapper = styled.div<{ isSingle: boolean }>`
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  padding-bottom: 40px;
  padding-top: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: ${({ isSingle }) => `repeat(${isSingle ? 1 : 2}, 1fr)`};
  }
`

const TokenManage = () => {
  const { ownedTokens } = useConfig() as any
  return (
    <Wrapper isSingle={ownedTokens.length < 2}>
      {ownedTokens.map((tk, index) => (
        <TokenCard key={`${tk}`} tokenAddress={tk} />
      ))}
    </Wrapper>
  )
}

export default TokenManage
