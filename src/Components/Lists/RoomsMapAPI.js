import React from 'react';
import dotenv from 'dotenv';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import GoogleMapReact from 'google-map-react';
import RoomListHeaderBox from './RoomListHeaderBox';
import RoomListFooterBox from './RoomListFooterBox';
import { Carousel } from 'react-responsive-carousel';

dotenv.config();

class RoomsMapApi extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      defaultLocationnn: {
        lat: 37.5642135,
        lng: 127.0016985,
      },
      clickIndex: null,
      toggleClick: false,
    };
  }

  markerClick = room => {
    this.setState({
      clickIndex: room.room_id,
      toggleClick: !this.state.toggleClick,
    });
  };

  handleClick = roomid => {
    console.log(roomid);
    this.props.history.push(`/detail/${roomid}`);
  };

  RoomMarkerComponent = ({ room }) => {
    const { clickIndex } = this.state;
    const { hoverIndex } = this.props;
    return (
      <>
        <RoomMarker
          hoverIndex={hoverIndex}
          roomIndex={room.room_id}
          onClick={e => {
            this.markerClick(room);
          }}
          clickIndex={clickIndex}
        >
          <span>₩{Number(room.price).toLocaleString(navigator.language)}</span>
        </RoomMarker>
        {room.room_id === clickIndex && (
          <MarkerModalBox>
            <MarkerImgBox>
              <Carousel showArrows={true} autoFocus={true} showThumbs={false} infiniteLoop={true} showStatus={false}>
                {room.images.map((imgUrl, index) => (
                  <div key={index} className={'roomImagesBox'}>
                    <img src={imgUrl} alt={room.title} />
                  </div>
                ))}
              </Carousel>
            </MarkerImgBox>
            <MarkerContentBox onClick={() => this.handleClick(room.room_id)}>
              <RoomListHeaderBox list={room} boxType="modal" />
              <RoomListFooterBox list={room} boxType="modal" />
            </MarkerContentBox>
          </MarkerModalBox>
        )}
      </>
    );
  };

  render() {
    const { defaultLocationnn } = this.state;
    const { lists, headerInfo, centerPosition } = this.props;
    console.log(centerPosition);
    return (
      <GoogleMapReact bootstrapURLKeys={{ key: process.env.API_KEY }} center={centerPosition} defaultZoom={12.5}>
        {lists.map((list, index) => {
          return <this.RoomMarkerComponent lat={list.latitude} lng={list.longitude} room={list} info={headerInfo} key={index} />;
        })}
      </GoogleMapReact>
    );
  }
}

const RoomMarker = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 26px;
  border: 1px solid #afafaf;
  border-radius: 15px;
  ${props =>
    props.roomIndex === props.hoverIndex || props.roomIndex === props.clickIndex
      ? css`
          background-color: black;
          transform: scale(1.12);
          z-index: 10;
        `
      : css`
          background-color: white;
          color: black;
        `};

  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    background-color: black;
    transform: scale(1.12);
    z-index: 10;
    span {
      color: white;
    }
  }
  span {
    color: ${props => (props.roomIndex === props.hoverIndex || props.roomIndex === props.clickIndex ? 'white' : 'black')};
    font-size: 13px;
    font-weight: 700;
    pointer-events: none;
  }
`;

const MarkerModalBox = styled.div`
  position: absolute;
  left: -100px;
  display: flex;
  flex-direction: column;
  width: 275px;
  height: 300px;
  margin-top: 10px;
  border-radius: 12px;
  background-color: white;
  -webkit-box-shadow: -1px 0px 24px 3px rgba(107, 107, 107, 1);
  -moz-box-shadow: -1px 0px 24px 3px rgba(107, 107, 107, 1);
  box-shadow: -1px 0px 24px 3px rgba(107, 107, 107, 1);
  cursor: pointer;
  z-index: 11;
`;

const CommonMarkerBox = styled.div`
  width: 100%;
  overflow: hidden;
`;
const MarkerImgBox = styled(CommonMarkerBox)`
  width: 275px;
  height: 180px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  .roomImagesBox {
    width: 275px;
    height: 181px;
  }
`;
const MarkerContentBox = styled(CommonMarkerBox)`
  width: 100%;
  height: 120px;
  padding: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export default withRouter(RoomsMapApi);
