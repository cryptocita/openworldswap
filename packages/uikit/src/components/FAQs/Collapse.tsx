import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Flex } from "../Box";
import { Text } from "../Text";

const StyledQuestion = styled(Text)`
  font-weight: 600;
  font-size: 22px;
  line-height: 22px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 26px;
    line-height: 28px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 29px;
    line-height: 32px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 32px;
    line-height: 35px;
  }
`;

const StyledCollpase = styled("div")`
  overflow: hidden;
  transition-property: height;
  transition-duration: 400ms;
`;

const StyledButton = styled("button")`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  border: none;
  font-size: 25px;
  padding-right: 16px;
  margin-top: -4px;
  width: 36px;
`;

const Collapse: React.FC<PropsWithChildren<{ question: string }>> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => setIsOpen(!isOpen);
  return (
    <Flex paddingY="0.75rem" style={{ cursor: "pointer" }} onClick={handleClick}>
      <Flex alignItems="start">
        <StyledButton>{isOpen ? "-" : "+"}</StyledButton>
      </Flex>
      <Flex flexDirection="column" justifyContent="center">
        <StyledQuestion>{question}</StyledQuestion>
        <CollapseItem isExpanded={isOpen}>{children}</CollapseItem>
      </Flex>
    </Flex>
  );
};

const CollapseItem: React.FC<PropsWithChildren<{ isExpanded: boolean }>> = ({ isExpanded, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setContentHeight(ref.current.clientHeight);
    }
  }, [children]);

  return (
    <StyledCollpase
      style={{
        height: isExpanded ? contentHeight : 0,
      }}
    >
      <div ref={ref}>{children}</div>
    </StyledCollpase>
  );
};

export default Collapse;
