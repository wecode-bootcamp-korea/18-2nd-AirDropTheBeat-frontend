import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Rooms from './Rooms/Rooms';
import RoomsMap from './RoomsMap/RoomsMap';
import HeaderStore from '../../store/HeaderStore';
import ListStore from '../../store/ListStore';
import LocationInfoData from './LocationInfoData';

const Lists = () => {
  const [headerInfo, setHeaderInfo] = useState({
    rooms_length: 0,
    checkin: '',
    checkout: '',
    adult: 0,
    child: 0,
    baby: 0,
    per_day: 0,
  });
  const [lists, setLists] = useState([]);
  const [centerPosition, setCenterPosition] = useState({ lat: 37.5642135, lng: 127.0016985 });
  const [hoverIndex, setHoverIndex] = useState(null);
  const [locationInfo, setLocationInfo] = useState('');

  const hoverRoom = useCallback(id => {
    setHoverIndex(id);
  }, []);

  // main에서 넘어온 지역, 예약날짜, 게스트 정보
  const roomLocation = useLocation();
  const getHeaderInfo = roomLocation.search.substr(roomLocation.search.indexOf('?') + 1).split('&');
  const defaultQuery = `${getHeaderInfo[0]}&${getHeaderInfo[1]}&${getHeaderInfo[2]}&${getHeaderInfo[3]}&${getHeaderInfo[4]}&${getHeaderInfo[5]}&${getHeaderInfo[6]}&${getHeaderInfo[7]}`;

  useEffect(() => {
    fetch(`room/list?${defaultQuery}`)
      .then(res => res.json())
      .then(res => {
        setLists(res.room_list);
      });

    const location = LocationInfoData();
    const getLocationInfo = element => {
      if (element.name === getHeaderInfo[1].split('=')[1]) {
        setCenterPosition({
          lat: Number(element.lat),
          lng: Number(element.lng),
        });
        setLocationInfo(getHeaderInfo);
        return element.id;
      }
    };
    location.find(getLocationInfo);

    const perday = getPerDay(getHeaderInfo);

    setHeaderInfo({
      checkin: getHeaderInfo[2].split('=')[1].replaceAll('-', '~'),
      checkout: getHeaderInfo[3].split('=')[1].replaceAll('-', '~'),
      adult: getHeaderInfo[4].split('=')[1],
      child: getHeaderInfo[5].split('=')[1],
      baby: getHeaderInfo[6].split('=')[1],
      per_day: perday,
    });
  }, [roomLocation]);

  // 날짜 차이 구하기
  function getPerDay(getHeaderInfo) {
    const startDay = getHeaderInfo[2].split('=')[1].split('-');
    const endDay = getHeaderInfo[3].split('=')[1].split('-');
    const startData = new Date(startDay[0], startDay[1], startDay[2]);
    const endData = new Date(endDay[0], endDay[1], endDay[2]);
    const getSecond = endData.getTime() - startData.getTime();
    return getSecond / 1000 / 60 / 60 / 24;
  }

  // 메인에서 지역이름 넘어올 때 요청할 부분 임시 작성 start ---------------------------------
  useEffect(() => {}, [roomLocation]);

  // 메인에서 지역이름 넘어올 때 요청할 부분 임시 작성 end --------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentLists = lists?.slice(indexOfFirstRoom, indexOfLastRoom);

  const handleArrow = arrowType => {
    switch (arrowType) {
      case 'left':
        if (currentPage === 1) {
          return;
        } else {
          setCurrentPage(currentPage - 1);
          return;
        }
      case 'right':
        if (currentPage > lists.length / roomsPerPage) {
          return;
        } else {
          setCurrentPage(currentPage + 1);
          return;
        }
      default:
        break;
    }
  };
  return (
    <Wrapper>
      <HeaderStore.Provider value={{ headerInfo }}>
        <ListStore.Provider value={{ lists }}>
          <Rooms
            hoverIndex={hoverIndex}
            setHoverIndex={hoverRoom}
            lists={currentLists}
            totalList={lists?.length}
            setCurrentPage={setCurrentPage}
            roomsPerPage={roomsPerPage}
            handleArrow={handleArrow}
            setLists={setLists}
            locationInfo={locationInfo}
            headerInfo={headerInfo}
          />
          <RoomsMap lists={currentLists} headerInfo={headerInfo} hoverIndex={hoverIndex} centerPosition={centerPosition} />
        </ListStore.Provider>
      </HeaderStore.Provider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  margin-top: 40px;
`;

export default React.memo(Lists);
