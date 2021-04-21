import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Toggle from 'react-toggle';
import AirbnbSlider from './RoomsSliderStyle.js';
import 'react-toggle/style.css';

const MIN_PRICE = 0;
const MAX_PRICE = 700000;

function RoomOption(props) {
  const [toggleOption, setToggleOption] = useState({
    refundClick: false,
    roomTypeClick: false,
    priceClick: false,
  });

  const [toggleRefund, setToggleRefund] = useState(false);

  const [toggleRoomOption, setToggleRoomOption] = useState({
    all: false,
    individual: false,
    hotel: false,
    shareRoom: false,
  });

  const [roomPrice, setRoomPrice] = useState({
    min: MIN_PRICE,
    max: MAX_PRICE,
  });

  const handleOptionClick = e => {
    switch (e.target.dataset.menuname) {
      case 'refund':
        setToggleOption({
          refundClick: !toggleOption.refundClick,
          roomTypeClick: false,
          priceClick: false,
        });
        break;
      case 'roomtype':
        setToggleOption({
          refundClick: false,
          roomTypeClick: !toggleOption.roomTypeClick,
          priceClick: false,
        });
        break;
      case 'price':
        setToggleOption({
          refundClick: false,
          roomTypeClick: false,
          priceClick: !toggleOption.priceClick,
        });
        break;
      case 'resetRefund':
        setToggleRefund(false);
        break;
      case 'resetRoomType':
        setToggleRoomOption({
          all: false,
          individual: false,
          hotel: false,
          shareRoom: false,
        });
        break;
      default:
        break;
    }
  };

  const handleSubOptionClick = e => {
    switch (e.target.dataset.subname) {
      case 'refund':
        setToggleRefund(!toggleRefund);
        console.log(toggleRefund);
        if (!toggleRefund === true) {
          console.log('여기서 디비 요청');
          //  여기서 DB요청
        }
        break;
      case 'roomAll':
        setToggleRoomOption({
          ...toggleRoomOption,
          all: !toggleRoomOption.all,
        });
        break;
      case 'roomIndividual':
        setToggleRoomOption({
          ...toggleRoomOption,
          individual: !toggleRoomOption.individual,
        });
        break;
      case 'roomHotel':
        setToggleRoomOption({
          ...toggleRoomOption,
          hotel: !toggleRoomOption.hotel,
        });
        break;
      case 'roomShare':
        setToggleRoomOption({
          ...toggleRoomOption,
          shareRoom: !toggleRoomOption.shareRoom,
        });
        break;
      default:
        break;
    }
  };

  const handleSaveClick = () => {
    let arr = [];
    let queryString = '';

    props.locationInfo?.map((e, idx) => {
      if (idx === 0) queryString += `?${e}`;
      else queryString += `&${e}`;
    });

    if (toggleRoomOption.all === true) arr.push(1);
    if (toggleRoomOption.individual === true) arr.push(2);
    if (toggleRoomOption.hotel === true) arr.push(3);
    if (toggleRoomOption.shareRoom === true) arr.push(4);

    arr.map(e => {
      queryString += `&typelist=${e}`;
    });
    queryString += `&min=${roomPrice.min}&max=${roomPrice.max}`;

    fetch(`room/list${queryString}`)
      .then(res => res.json())
      .then(res => {
        props.setLists(res.room_list);
      });
  };
  return (
    <OptionBox>
      <DivBox>
        <RefundButton
          optionMenu
          data-menuname="refund"
          toggleRefundClick={toggleOption.refundClick}
          toggleRoomOption={toggleRoomOption}
          toggleRefund={toggleRefund}
          onClick={handleOptionClick}
        >
          유연한 환불 정책
        </RefundButton>
        {toggleOption.refundClick && (
          <OptionModal>
            <CommonBigBox>
              <div className="commonBox">
                <span className="commonBoxHeaderText">유연한 환불 정책을 제공하는 숙소만 검색 결과에 표시</span>
                <Toggle
                  defaultChecked={false}
                  checked={toggleRefund}
                  data-subname="refund"
                  icons={false}
                  className="custom-classname"
                  onChange={handleSubOptionClick}
                />
              </div>
              <ResetSaveRefundBox toggleRefund={toggleRefund}>
                <button data-menuname="resetRefund" onClick={handleOptionClick}>
                  지우기
                </button>
                <button data-menuname="refundSave" onClick={handleSaveClick}>
                  저장
                </button>
              </ResetSaveRefundBox>
            </CommonBigBox>
          </OptionModal>
        )}
      </DivBox>
      <DivBox>
        <RoomsTypeButton
          optionMenu
          data-menuname="roomtype"
          toggleRoomTypeClick={toggleOption.roomTypeClick}
          toggleRoomOption={toggleRoomOption}
          onClick={handleOptionClick}
        >
          숙소 유형
        </RoomsTypeButton>
        {toggleOption.roomTypeClick && (
          <OptionModal>
            <CommonBigBox>
              <div className="commonBox">
                <Toggle
                  defaultChecked={toggleRoomOption.all}
                  checked={toggleRoomOption.all}
                  icons={false}
                  data-subname="roomAll"
                  className="custom-classname"
                  onChange={handleSubOptionClick}
                />
                <RoomTypeTextBox>
                  <h3>집 전체</h3>
                  <p>집 전체를 단독으로 사용합니다.</p>
                </RoomTypeTextBox>
              </div>
              <div className="commonBox">
                <Toggle
                  defaultChecked={toggleRoomOption.individual}
                  checked={toggleRoomOption.individual}
                  icons={false}
                  data-subname="roomIndividual"
                  className="custom-classname"
                  onChange={handleSubOptionClick}
                />
                <RoomTypeTextBox>
                  <h3>개인실</h3>
                  <p>침실은 단독으로 쓰고, 이외의 공간은 호스트나 다른 게스트와 함께 이용할 수도 있습니다.</p>
                </RoomTypeTextBox>
              </div>
              <div className="commonBox">
                <Toggle
                  defaultChecked={toggleRoomOption.hotel}
                  checked={toggleRoomOption.hotel}
                  icons={false}
                  data-subname="roomHotel"
                  className="custom-classname"
                  onChange={handleSubOptionClick}
                />
                <RoomTypeTextBox>
                  <h3>호텔 객실</h3>
                  <p>부티크 호텔, 호스텔 등의 개인실이나 다인실을 이용합니다.</p>
                </RoomTypeTextBox>
              </div>
              <div className="commonBox">
                <Toggle
                  defaultChecked={toggleRoomOption.shareRoom}
                  checked={toggleRoomOption.shareRoom}
                  icons={false}
                  data-subname="roomShare"
                  className="custom-classname"
                  onChange={handleSubOptionClick}
                />
                <RoomTypeTextBox>
                  <h3>다인실</h3>
                  <p>사적 공간 없이, 침실이나 욕실 등을 호스트나 다른 게스트와 함께 이용합니다.</p>
                </RoomTypeTextBox>
              </div>
              <ResetSaveRoomBox
                toggleRoomAll={toggleRoomOption.all}
                toggleRoomIndividual={toggleRoomOption.individual}
                toggleRoomHotel={toggleRoomOption.hotel}
                toggleRoomShare={toggleRoomOption.shareRoom}
              >
                <button data-menuname="resetRoomType" onClick={handleOptionClick}>
                  지우기
                </button>
                <button data-menuname="roomTypeSave" onClick={handleSaveClick}>
                  저장
                </button>
              </ResetSaveRoomBox>
            </CommonBigBox>
          </OptionModal>
        )}
      </DivBox>
      <DivBox>
        <PriceButton
          optionMenu
          data-menuname="price"
          togglePriceClick={toggleOption.priceClick}
          toggleRoomOption={toggleRoomOption}
          roomPrice={roomPrice}
          onClick={handleOptionClick}
        >
          요금
        </PriceButton>
        {toggleOption.priceClick && (
          <OptionModal>
            <CommonBigBox>
              <div className="commonBox priceBox">
                <span className="commonBoxHeaderText">요금 범위 슬라이더</span>
                <AirbnbSlider minPrice={roomPrice.min} maxPrice={roomPrice.max} setRoomPrice={setRoomPrice} />
              </div>
              <ResetSaveRefundBox>
                <button></button>
                <button data-menuname="priceSave" onClick={handleSaveClick}>
                  저장
                </button>
              </ResetSaveRefundBox>
            </CommonBigBox>
          </OptionModal>
        )}
      </DivBox>
    </OptionBox>
  );
}

const OptionBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #ebebeb;
`;

const DivBox = styled.div`
  position: relative;
  margin-right: 10px;
`;

const OptionModalBox = styled.div`
  position: absolute;
  top: 50px;
  width: 360px;
  border: 1px solid #dedede;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 15%) 0px 10px 37px !important;
  background-color: white;
  z-index: 900;
`;

const CommonBigBox = styled.div`
  display: flex;
  flex-direction: column;
  .commonBox {
    display: flex;
    align-items: center;
    padding: 20px;
    .commonBoxHeaderText {
      font-size: 14px;
      color: #4e4e4e;
      margin: 0 10px;
    }
    .react-toggle-track {
      background-color: #b5b5b5;
    }
    .custom-classname.react-toggle--checked .react-toggle-track {
      background-color: #000000;
      box-shadow: none;
    }
    .react-toggle-thumb {
      border: none;
    }
    .react-toggle--checked .react-toggle-thumb,
    .react-toggle--focus .react-toggle-thumb {
      border: none;
      box-shadow: none;
    }
  }
  .commonBox.priceBox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const OptionModal = ({ children, ...rest }) => {
  return <OptionModalBox {...rest}>{children}</OptionModalBox>;
};

const RoomTypeTextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  h3 {
    font-size: 17px;
    padding-bottom: 5px;
  }
  p {
    font-size: 13px;
  }
`;

const MenuCommonButtonStyle = styled.div`
  padding: 8px 16px;
  text-align: center;
  border: 1px solid #bdb4ba;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    border: 1px solid black;
    background-color: #ececec;
  }
`;
const RefundButton = styled(MenuCommonButtonStyle)`
  border: ${props => (props.toggleRefundClick || props.toggleRefund ? '1px solid black' : '1px solid #bdb4ba')};
  background-color: ${props => (props.toggleRefundClick || props.toggleRefund ? '#ececec' : 'rgba(0,0,0,0)')};
`;
const RoomsTypeButton = styled(MenuCommonButtonStyle)`
  border: ${props =>
    props.toggleRoomTypeClick ||
    props.toggleRoomOption.all ||
    props.toggleRoomOption.individual ||
    props.toggleRoomOption.hotel ||
    props.toggleRoomOption.shareRoom
      ? '1px solid black'
      : '1px solid #bdb4ba'};
  background-color: ${props =>
    props.toggleRoomTypeClick ||
    props.toggleRoomOption.all ||
    props.toggleRoomOption.individual ||
    props.toggleRoomOption.hotel ||
    props.toggleRoomOption.shareRoom
      ? '#ececec'
      : 'rgba(0,0,0,0)'};
`;
const PriceButton = styled(MenuCommonButtonStyle)`
  border: ${props =>
    props.togglePriceClick || props.roomPrice.min !== 0 || props.roomPrice.max !== 700000 ? '1px solid black' : '1px solid #bdb4ba'};
  background-color: ${props => (props.togglePriceClick || props.roomPrice.min !== 0 || props.roomPrice.max !== 700000 ? '#ececec' : 'rgba(0,0,0,0)')};
`;

const CommonResetSaveBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 360px;
  height: 65px;
  padding: 12px;
  border-top: 1px solid #e9e9e9;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  button {
    font-size: 13px;
    &:first-child {
      font-size: 14px;
      border: none;
      text-decoration: underline;
    }
    &:last-child {
      padding: 8px 16px;
      border: none;
      border-radius: 9px;
      background-color: #5b5b5b;
      color: white;
      &:hover {
        background-color: #161616;
      }
    }
  }
`;

const ResetSaveRefundBox = styled(CommonResetSaveBoxStyle)`
  button {
    &:first-child {
      color: ${props => (props.toggleRefund ? '#161616' : '#cbcbcb')};
    }
  }
`;
const ResetSaveRoomBox = styled(CommonResetSaveBoxStyle)`
  button {
    &:first-child {
      color: ${props =>
        props.toggleRoomAll || props.toggleRoomIndividual || props.toggleRoomHotel || props.toggleRoomShare ? '#161616' : '#cbcbcb'};
    }
  }
`;
export default RoomOption;
