import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Rooms from './Rooms/Rooms';
import RoomsMap from './RoomsMap/RoomsMap';
import HeaderStore from '../../store/HeaderStore';
import ListStore from '../../store/ListStore';
import LocationInfoData from './LocationInfoData';

const Lists = () => {
  const [headerInfo, setHeaderInfo] = useState('아무것도 입력되지 않았습니다.');
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
  console.log(getHeaderInfo);
  const defaultQuery = `${getHeaderInfo[0]}&${getHeaderInfo[1]}&${getHeaderInfo[2]}&${getHeaderInfo[3]}&${getHeaderInfo[4]}&${getHeaderInfo[5]}&${getHeaderInfo[6]}&${getHeaderInfo[7]}`;
  console.log(defaultQuery);
  useEffect(() => {
    fetch('data/listsHeader.json')
      .then(res => res.json())
      .then(res => {
        setHeaderInfo(res);
      });
    // fetch('data/listsRoom.json')
    //   .then(res => res.json())
    //   .then(res => {
    //     setLists(res);
    //   });
    console.log(defaultQuery);
    fetch(`room/list?${defaultQuery}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setLists(res.room_list);
      });
  }, []);

  // 메인에서 지역이름 넘어올 때 요청할 부분 임시 작성 start ---------------------------------
  useEffect(() => {
    const location = LocationInfoData();
    const getLocationInfo = element => {
      if (element.name === getHeaderInfo[1].split('=')[1]) {
        setCenterPosition({
          lat: Number(element.lat),
          lng: Number(element.lng),
        });
        setLocationInfo(getHeaderInfo);
        // setLocationName(getHeaderInfo[1].split('=')[1]);
        return element.id;
      }
    };
    const getLocationId = location.find(getLocationInfo);
    console.log(getLocationId);
  }, [roomLocation]);

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
`;

export default React.memo(Lists);
