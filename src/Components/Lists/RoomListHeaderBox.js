import React from 'react';
import styled from 'styled-components';
import { BsHeart } from 'react-icons/bs';
import { AiTwotoneStar } from 'react-icons/ai';

const RoomListHeaderBox = props => {
  return (
    <ContentHeaderBox>
      <ContentHeaderText data-clicktype="content" boxType={props.boxType} onClick={props.handleClick}>
        {props.boxType !== 'modal' ? (
          <>
            <span>
              {props.list.district_name}의 {props.list.type_name[0]}
              {props.list.type_name.slice(1)}
            </span>
            <h2>{props.list.title}</h2>
          </>
        ) : (
          <>
            <ModalFlexCenter>
              <AiTwotoneStar />
              <span>{props.list.avg_review}</span>
              <span>({props.list.count_review})</span>
            </ModalFlexCenter>
            <ModalMiniTitleBox>
              {props.list.type_name[0]} {props.list.type_name.slice(1)} · {props.list.district_name}
            </ModalMiniTitleBox>
            <ModalMainTitleBox>
              <h2>{props.list.title}</h2>
            </ModalMainTitleBox>
          </>
        )}
      </ContentHeaderText>
      <ContentHeaderLike data-clicktype="like" onClick={props.handleClick}>
        <BsHeart />
      </ContentHeaderLike>
    </ContentHeaderBox>
  );
};

const ContentHeaderBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;
const ContentHeaderText = styled.div`
  display: block;
  flex-direction: column;
  width: 95%;
  height: 100%;
  span {
    color: #888888;
    font-size: 14px;
    pointer-events: none;
  }
  h2 {
    width: auto;
    height: 20px;
    margin-top: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    overflow: hidden;
    pointer-events: none;
  }
`;
const ContentHeaderLike = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
  svg {
    position: absolute;
    color: black;
    font-size: 18px;
    transition: 0.2s all;
    pointer-events: none;
  }
  &:hover {
    svg {
      color: red;
      transform: scale(1.2);
    }
  }
`;

const ModalFlexCenter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  svg {
    font-size: 14px;
    color: red;
    margin-right: 5px;
  }
`;

const ModalMiniTitleBox = styled.p`
  color: #151515;
  font-size: 14px;
  pointer-events: none;
`;

const ModalMainTitleBox = styled.div`
  h2 {
    font-size: 14px;
  }
`;
export default RoomListHeaderBox;
