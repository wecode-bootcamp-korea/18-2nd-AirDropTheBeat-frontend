import React from 'react';
import styled from 'styled-components';
import HeaderStore from '../../store/HeaderStore';

const RoomsHeader = () => {
  return (
    <Header>
      <p>
        <HeaderStore.Consumer>
          {HeaderStore =>
            `${HeaderStore.headerInfo.rooms_length}개 이상의 숙소 · ${HeaderStore.headerInfo.start_data} · 게스트 ${HeaderStore.headerInfo.guest_count} 명`
          }
        </HeaderStore.Consumer>
      </p>
      <h1>지도에서 선택한 지역의 숙소</h1>
    </Header>
  );
};

const Header = styled.div`
  width: 100%;
  p {
    padding-bottom: 10px;
    color: #4e4e4e;
    font-size: 14px;
  }
  h1 {
    color: black;
    font-size: 32px;
    font-weight: 700;
  }
`;

export default RoomsHeader;
