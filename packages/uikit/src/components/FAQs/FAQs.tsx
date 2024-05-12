import React from "react";
import styled from "styled-components";
import { Text } from "../Text";
import Collapse from "./Collapse";

interface faq {
  question: string;
  answer: string;
}

export interface FAQsProps {
  faqs: faq[];
}

const StyledAnswer = styled(Text)`
  font-weight: 500;
  padding-top: 15px;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 16px;
  line-height: 22px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 18px;
    line-height: 22px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 19px;
    line-height: 24px;
  }
`;

const StyledFlex = styled("div")`
  display: flex;
  max-width: 1000px;
  gap: 0.5rem;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0px 60px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0px 80px;
  }
`;

const FAQs: React.FC<React.PropsWithChildren<FAQsProps>> = ({ faqs }) => {
  return (
    <StyledFlex>
      {faqs.map((faq) => {
        return (
          <Collapse question={faq.question} key={faq.question}>
            <StyledAnswer>{faq.answer}</StyledAnswer>
          </Collapse>
        );
      })}
    </StyledFlex>
  );
};

export default FAQs;
