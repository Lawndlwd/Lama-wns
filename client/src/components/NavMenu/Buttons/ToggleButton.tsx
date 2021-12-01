import React from "react";
import styled from "styled-components";

type ToggleButtonProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TypeProps = {
  open: boolean;
};

export const ToggleButton = ({
  open,
  setOpen,
}: ToggleButtonProps): JSX.Element => {
  return (
    <ButtonWrapper onClick={() => setOpen((prevState) => !prevState)}>
      <Bar open={open} />
      <Bar open={open} />
      <Bar open={open} />
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  cursor: pointer;
  padding: 0;
  z-index: 1000000;
`;

const Bar = styled.div<TypeProps>`
  position: relative;
  width: ${({ open }) => (open ? "42px" : "34px")};
  height: 5px;
  margin-bottom: 5px;
  margin-left: ${({ open }) => (open ? "3px" : "-2px")};
  background-color: black;
  transition: 1s;
  transform-origin: 8px;
  border-radius: 30px;
  :first-of-type {
    margin-top: 3px;
    transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
  }
  :nth-of-type(2) {
    opacity: ${({ open }) => (open ? "0" : "1")};
    transform: ${({ open }) => (open ? "translateX(-50px)" : "translateX(0)")};
  }
  :nth-of-type(3) {
    transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
  }
`;
