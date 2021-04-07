import React from 'react';
import styled from 'styled-components';

const RoomListContentBox = props => {
  return (
    <>
      <ListContent data-clicktype="content" onClick={props.handleClick}>
        <span>{props.list.room_info}</span>
      </ListContent>
      <ListContent data-clicktype="content" onClick={props.handleClick}>
        <span>{props.list.room_conveniences}</span>
      </ListContent>
    </>
  );
};

const ListContent = styled.div`
  width: 100%;
  span {
    color: #888888;
    font-size: 14px;
    pointer-events: none;
  }
`;

export default RoomListContentBox;
