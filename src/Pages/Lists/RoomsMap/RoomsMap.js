import React from 'react';
import styled from 'styled-components';
import RoomsMapAPI from '../../../Components/Lists/RoomsMapAPI';

const RoomsMap = props => {
  return (
    <MapContainer>
      <RoomsMapAPI lists={props.lists} headerInfo={props.headerInfo} hoverIndex={props.hoverIndex} centerPosition={props.centerPosition} />
    </MapContainer>
  );
};

const MapContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

export default RoomsMap;
