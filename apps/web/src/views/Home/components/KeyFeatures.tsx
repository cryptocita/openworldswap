import { Flex, Text } from '@pancakeswap/uikit'
import { styled } from 'styled-components'

const StyledText = styled(Text)`
  color: white;
  font-size: 32px;
  text-align: center;
  margin-bottom: 2rem;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 3rem;
    font-size: 40px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 4rem;
    font-size: 64px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    margin-bottom: 5rem;
    font-size: 88px;
  }
`

const StyledHeading = styled(Text)`
  color: white;
  font-size: 22px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 26px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 30px;
  }
`

const StyledDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 17px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 18px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 20px;
  }
`

const StyledGrid = styled('div')`
  display: grid;
  row-gap: 2rem;
  column-gap: 2.5rem;
  justify-items: center;
  max-width: 1100px;
  margin: auto;
  ${({ theme }) => theme.mediaQueries.md} {
    row-gap: 6rem;
    grid-template-columns: repeat(2, 1fr);
  }
`

const features = [
  {
    title: 'lorem ipsem dolor samet',
    description:
      'lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet ',
  },
  {
    title: 'lorem ipsem dolor samet',
    description:
      'lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet ',
  },
  {
    title: 'lorem ipsem dolor samet',
    description:
      'lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet ',
  },
  {
    title: 'lorem ipsem dolor samet',
    description:
      'lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet lorem ipsem dolor samet ',
  },
]

export const KeyFeatures = () => {
  return (
    <>
      <Flex justifyContent="center" flexDirection="column" px="3rem" py="50px">
        <StyledText display="inline-block" fontWeight={600} lineHeight="110%" textAlign="center">
          Key Features
        </StyledText>
        <StyledGrid>
          {features.map((f) => {
            return (
              <div>
                <StyledHeading fontWeight={600}>{f.title}</StyledHeading>
                <StyledDescription>{f.description}</StyledDescription>
              </div>
            )
          })}
        </StyledGrid>
      </Flex>
    </>
  )
}
