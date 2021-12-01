import React from "react";
import styled from "styled-components";

type TitleProps = {
  text: string;
};

export const Title = ({ text }: TitleProps): JSX.Element => (
  <TitleContent>
    <span>{text}</span>
    <Underline />
  </TitleContent>
);

const TitleContent = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 80px;
`;

const Underline = styled.div`
  width: 80px;
  height: 3px;
  background-color: rgba(109, 40, 217) !important;
  border-radius: 30px;
  margin-top: 5px;
`;
