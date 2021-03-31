import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

const LoginTopNav = props => {
  const { isOpen, isClose } = props;
  return (
    <Nav>
      <Close onClick={() => isClose(!isOpen)}>
        <AiOutlineClose size="15" />
      </Close>
      <LoginId>로그인</LoginId>
    </Nav>
  );
};

const Nav = styled.header`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid lightgray;
`;

const Close = styled.button`
  position: absolute;
  left: 0;
  padding-left: 25px;
  border: none;
  border-radius: 12px;
  background-color: white;

  :hover {
    cursor: pointer;
  }
`;

const LoginId = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export default LoginTopNav;
