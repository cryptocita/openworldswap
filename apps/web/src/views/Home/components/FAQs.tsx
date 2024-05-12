import { FAQs, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'

const faqsList = [
  {
    question: 'What does IGO mean?',
    answer:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam ex perferendis iure. Dignissimos laudantium nostrum ducimus assumenda dolorum adipisci labore?',
  },
  {
    question: 'What does IGO mean?',
    answer:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam ex perferendis iure. Dignissimos laudantium nostrum ducimus assumenda dolorum adipisci labore?',
  },
  {
    question: 'What does IGO mean?',
    answer:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam ex perferendis iure. Dignissimos laudantium nostrum ducimus assumenda dolorum adipisci labore?',
  },
  {
    question: 'What does IGO mean?',
    answer:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam ex perferendis iure. Dignissimos laudantium nostrum ducimus assumenda dolorum adipisci labore?',
  },
]

const StyledHeading = styled(Text)`
  margin-bottom: 4rem;
  color: white;
  font-size: 30px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 40px;
    margin-bottom: 5rem;
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
