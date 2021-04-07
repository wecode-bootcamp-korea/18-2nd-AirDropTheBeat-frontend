import React from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import styled from 'styled-components';
import HeaderStore from '../../store/HeaderStore';

const RoomListFooterBox = props => {
  return (
    <ListFooterBox data-clicktype="content" onClick={props.handleClick}>
      {props.boxType !== 'modal' ? (
        <>
          <FooterSatisfaction>
            <span>
              <AiTwotoneStar />
            </span>
            <span>{props.list.avg_review}</span>
            <span>({props.list.count_review})</span>
          </FooterSatisfaction>
          <FooterPriceBox>
            <div>
              <span>₩{Number(props.list.price).toLocaleString(navigator.language)}</span>
              <span>/1박</span>
            </div>
            <div>
              <span>
                <HeaderStore.Consumer>
                  {HeaderStore => `총액 ₩${Number(props.list.price * HeaderStore.headerInfo.per_day).toLocaleString(navigator.language)}`}
                </HeaderStore.Consumer>
              </span>
            </div>
          </FooterPriceBox>
        </>
      ) : (
        <ModalFooterBox>
          <div>
            <span>₩{Number(props.list.price).toLocaleString(navigator.language)}</span>
            <span>/1박</span>
          </div>
        </ModalFooterBox>
      )}
    </ListFooterBox>
  );
};

const ListFooterBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FooterSatisfaction = styled.div`
  display: flex;
  align-items: center;
  margin-top: 90px;
  font-size: 15px;
  pointer-events: none;
  @media screen and (max-width: 750px) {
    margin-top: 10px;
  }
  span {
    &:nth-child(1n) {
      margin-right: 2px;
    }
    &:nth-child(1) {
      color: red;
    }
    &:nth-child(2) {
      color: black;
      font-weight: 700;
    }
    &:nth-child(3) {
      color: #888888;
    }
  }
`;
const FooterPriceBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 72px;
  font-size: 18px;
  pointer-events: none;
  @media screen and (max-width: 750px) {
    margin-top: 5px;
  }
  div:nth-child(1) {
    span:first-child {
      font-weight: 700;
    }
  }
  div:nth-child(2) {
    text-align: right;
    span {
      text-decoration: underline;
      color: #888888;
      font-size: 14px;
    }
  }
`;

const ModalFooterBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  font-size: 15px;
  font-weight: 700;
`;
export default RoomListFooterBox;
