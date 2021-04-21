import React, { useEffect } from 'react';
import styled from 'styled-components';
import RoomsHeader from '../../../Components/Lists/RoomsHeader';
import RoomOption from '../../../Components/Lists/RoomOption';
import RoomLists from '../../../Components/Lists/RoomLists';

const Rooms = props => {
  return (
    <BigContainer>
      <SmallContainer>
        <RoomsHeader />
        <RoomOption setLists={props.setLists} locationInfo={props.locationInfo} />
        <RoomLists
          setHoverIndex={props.setHoverIndex}
          lists={props.lists}
          totalList={props.totalList}
          setCurrentPage={props.setCurrentPage}
          roomsPerPage={props.roomsPerPage}
          handleArrow={props.handleArrow}
          headerInfo={props.headerInfo}
        />
      </SmallContainer>
    </BigContainer>
  );
};

const BigContainer = styled.section`
  width: 100%;
  height: 100%;
  max-width: 840px;
  padding-top: 50px;
  //border: 3px solid red;
  overflow-y: scroll;
  @media screen and (max-width: 1200px) {
    min-width: auto;
    max-width: none;
  }
`;
const SmallContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 24px;
`;

export default Rooms;
