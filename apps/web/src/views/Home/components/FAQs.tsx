import { FAQs, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'

const faqsList = [
  {
    question: 'What is OpenWorldSwap?',
    answer:
      "OpenWorldSwap is a new generation Automated Market Maker (AMM) designed to serve as OpenEX Network's central liquidity hub, offering a powerful incentive engine, profit-sharing modules, and a user-friendly experience.",
  },
  {
    question: 'How does OpenWorldSwap differ from centralized exchanges?',
    answer:
      'Unlike centralized exchanges like Binance, OpenWorldSwap does not hold your funds when you trade. You have 100% ownership of your tokens, and you can trade directly from your wallet.',
  },
  {
    question: 'What are the fees for token swaps on OpenWorldSwap?',
    answer:
      'Token swaps on OpenWorldSwap incur a low 0.25% trading fee, which is distributed among liquidity providers, OWS buyback and burn, and operational costs.',
  },
  {
    question: 'How can I provide liquidity on OpenWorldSwap?',
    answer:
      'You can provide liquidity by adding your tokens to liquidity pools, for which you will receive Liquidity Pool (LP) tokens representing your portion of the liquidity pool.',
  },
  {
    question: 'What are Yield Farms on OpenWorldSwap?',
    answer:
      'Yield Farms allow you to stake LP tokens to earn OWS tokens. Each farm has its own APR, depending on factors like the value of LP tokens, reward multiplier, trading volume, and the price of OWS.',
  },
  {
    question: 'How can I participate in the OpenWorldSwap Token Sale?',
    answer:
      'To participate in the token sale, you need to purchase OEX tokens and commit them to buy OWS tokens during the sale period. Whitelisted users can participate in the presale, followed by the public sale.',
  },
]

const StyledHeading = styled(Text)`
  color: ${({ theme }) => theme.colors.primary};
  padding-bottom: 4rem;
  font-size: 30px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 40px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 55px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 72px;
  }
`

const StyledContainer = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 50px 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 50px 3rem;
    font-size: 40px;
    margin-bottom: 5rem;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 50px 3rem;
    font-size: 55px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 72px;
  }
`

export const FAQsSection = () => {
  return (
    <StyledContainer>
      <StyledHeading fontWeight={600} lineHeight="110%">
        Frequently Asked Questions
      </StyledHeading>
      <FAQs faqs={faqsList} />
    </StyledContainer>
  )
}
