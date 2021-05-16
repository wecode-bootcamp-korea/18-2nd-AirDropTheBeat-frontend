import React from 'react';
import styled from 'styled-components';

const DetailSaveModal = ({ setSaveModal }) => {
  return (
    <Wrapper>
      <Modal>
        <button onClick={() => setSaveModal(false)}>X</button>
        <Title>위시리스트에 저장하기</Title>
        <BreakLine />
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(192, 192, 192, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.section`
  z-index: 1;
  width: 550px;
  height: 600px;
  /* overflow: auto; */
  border: 1px solid white;
  border-radius: 20px;
  background-color: white;
  /* display: flex;
  justify-content: center; */

  button {
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
    margin: 20px 0 0 10px;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
  margin-top: -15px;
`;

const BreakLine = styled.div`
  width: 550px;
  border-bottom: 1px solid lightgray;
`;

export default DetailSaveModal;
