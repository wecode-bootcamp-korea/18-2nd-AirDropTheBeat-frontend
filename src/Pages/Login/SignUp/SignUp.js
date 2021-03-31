import React from 'react';
import styled from 'styled-components';
import SignUpInputTotal from './SignUpInputTotal';
import SignUpTopNav from './SignUpTopNav';

function SignUp(props) {
  const { isOpen, isClose } = props;

  return (
    <>
      {isOpen && (
        <Modal>
          <LoginModal>
            <SignUpTopNav isOpen={isOpen} isClose={isClose} />
            <Main>
              <SignUpInputTotal />
            </Main>
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

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export default SignUp;
