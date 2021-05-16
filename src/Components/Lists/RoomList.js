import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import RoomListHeaderBox from './RoomListHeaderBox';
import RoomListContentBox from './RoomListContentBox';
import RoomListFooterBox from './RoomListFooterBox';
import { useHistory } from 'react-router-dom';

const RoomList = props => {
  const history = useHistory();
  const handleClick = (e, roomid) => {
    switch (e.target.dataset.clicktype) {
      case 'content':
        history.push({
          pathname: `/detail/${roomid}`,
          state: props.headerInfo,
        });
        break;
      case 'like':
        // 숙소 like 눌렀을 때 찜목록으로 가도록, 미구현
        break;
      default:
        break;
    }
  };

  return (
    <ListMainContainer>
      <ListContainer
        onMouseEnter={() => {
          props.setHoverIndex(props.list.room_id);
        }}
        onMouseLeave={() => {
          props.setHoverIndex(null);
        }}
      >
        <ListImgContainer>
          <Carousel showArrows={true} autoFocus={true} showThumbs={false} infiniteLoop={true} showStatus={false}>
            {props.list?.images.map((imgUrl, index) => (
              <div key={index} className={'roomImagesBox'}>
                <img src={imgUrl} alt={props.list.title} />
              </div>
            ))}
          </Carousel>
        </ListImgContainer>
        <ListContentContainer>
          <RoomListHeaderBox list={props.list} handleClick={e => handleClick(e, props.list.room_id)} />
          <ContentHr />
          <RoomListContentBox list={props.list} handleClick={e => handleClick(e, props.list.room_id)} />
          <RoomListFooterBox list={props.list} handleClick={e => handleClick(e, props.list.room_id)} />
        </ListContentContainer>
      </ListContainer>
    </ListMainContainer>
  );
};

const ListMainContainer = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #ebebeb;
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ListImgContainer = styled.section`
  width: 300px;
  min-width: 300px;
  overflow: hidden;
  border-radius: 12px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    .roomImagesBox {
      max-height: 400px;
    }
  }
  @media screen and (min-width: 768px) {
    .roomImagesBox {
      max-height: 200px;
    }
  }
  .roomImagesBox {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const ListContentContainer = styled.section`
  width: 100%;
  height: 100%;
  margin-left: 10px;
  overflow: hidden;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin-top: 15px;
    margin-left: 0;
  }
`;

const ContentHr = styled.div`
  width: 32px;
  margin-top: 3px;
  border-top: 1px solid #dddddd !important;
  margin-bottom: 8px;
`;

export default React.memo(RoomList);
