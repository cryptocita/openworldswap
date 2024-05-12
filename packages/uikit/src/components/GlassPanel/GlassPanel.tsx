import React, { PropsWithChildren } from "react";
import { styled } from "styled-components";
import { Flex } from "../Box";
import { Button } from "../Button";
import { Text } from "../Text";

const StyledBox = styled(Flex)`
  border-right: none;
  border-radius: 20px 0px 0px 20px;
  padding: 30px 0px;
  padding-left: 40px;
  background: linear-gradient(93deg, rgb(29 53 43) -42.6%, rgb(0 0 0) 127.2%);
  max-width: 1400px;
  margin-left: auto;
`;

const StyledHeading = styled(Text)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 30px;
  line-height: 38px;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 36px;
    line-height: 42px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 40px;
    line-height: 47px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 46px;
    line-height: 53px;
  }
`;

const StyledDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 16px;
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background-color: transparent;
  font-size: 16px;
  max-width: max-content;
  font-weight: 600;
  padding: 0px 35px;
`;

const GlassPanel: React.FC<PropsWithChildren<{ heading: string; desc: string; buttonText: string; link: string }>> = ({
  heading,
  desc,
  buttonText,
  link,
}) => {
  return (
    <>
      <StyledBox>
        <Flex flexDirection="column">
          <StyledHeading>{heading}</StyledHeading>
          <StyledDescription>{desc}</StyledDescription>
          <a href={link} target="_blank" style={{ maxWidth: "max-content" }}>
            <StyledButton marginTop="1.8rem">{buttonText}</StyledButton>
          </a>
        </Flex>
      </StyledBox>
    </>
  );
};

export default GlassPanel;
