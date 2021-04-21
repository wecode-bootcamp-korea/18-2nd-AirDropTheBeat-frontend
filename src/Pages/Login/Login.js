import React from 'react';
import styled from 'styled-components';
import LoginTopNav from './LoginTopNav';
import LoginMain from './LoginMain';

function Login({ isOpen, isOpenSignUp, isClose, setLoginModal }) {
  return (
    <>
      {isOpen && (
        <Modal>
          <LoginModal>
            <LoginTopNav isOpen={isOpen} isClose={isClose} />
            <LoginMain isOpenSignUp={isOpenSignUp} setLoginModal={setLoginModal} />
          </LoginModal>
        </Modal>
      )}
    </>
  );
}

const Modal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

const LoginModal = styled.div`
  width: 600px;
  height: 650px;
  border-radius: 12px;
  background-color: white;
`;

export default Login;
