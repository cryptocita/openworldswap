import React from "react";
import { styled } from "styled-components";
/* eslint-disable import/no-unresolved */
import { Meta } from "@storybook/react/types-6-0";
import FAQs from "./FAQs";

const Row = styled.div`
  margin-bottom: 32px;
`;

export default {
  title: "Components/FAQs",
  component: FAQs,
  argTypes: {},
} as Meta;

const faqs = [
  {
    question: "What does IGO mean?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam ex perferendis iure. Dignissimos laudantium nostrum ducimus assumenda dolorum adipisci labore?",
  },
  {
    question: "What does IGO mean?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam ex perferendis iure. Dignissimos laudantium nostrum ducimus assumenda dolorum adipisci labore?",
  },
  {
    question: "What does IGO mean?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam ex perferendis iure. Dignissimos laudantium nostrum ducimus assumenda dolorum adipisci labore?",
  },
];

export const Default: React.FC<React.PropsWithChildren> = () => {
  return (
    <div style={{ padding: "32px" }}>
      <FAQs faqs={faqs} />
    </div>
  );
};
