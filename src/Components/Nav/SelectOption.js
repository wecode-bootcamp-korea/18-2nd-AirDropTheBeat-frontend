import React from 'react';
import styled from 'styled-components';
import DatePicker from './DatePicker';
import { FaSearch } from 'react-icons/fa';

const GU = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];

const SelectOption = ({
  location,
  setLocation,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  adult,
  setAdult,
  child,
  setChild,
  baby,
  setBaby,
  clickSearchMenu,
  clickSearchComplete,
  isSearchMenu,
  navYellow,
}) => {
  const LOCATION_PICK = (
    <LocationContainer>
      {GU.map(el => {
        return (
          <div
            onClick={() => {
              setLocation(`${el}`);
            }}
          >
            <span>{el}</span>
          </div>
        );
      })}
    </LocationContainer>
  );
  const DATE_PICK = (
    <DatePickerWrapper>
      <DatePicker
        onBlur={() => clickSearchMenu('isCalendar')}
        start={startDate}
        end={endDate}
        updateStartDate={setStartDate}
        updateEndDate={setEndDate}
      />
    </DatePickerWrapper>
  );
  const GUEST_PICK = (
    <GuestContainer onBlur={() => clickSearchMenu('isGuest')}>
      <GuestContainerSection>
        <div>
          <span>성인</span>
          <span>만 13세 이상</span>
        </div>
        <div>
          <Minus
            className={!adult && 'noClick'}
            onClick={() => {
              if (adult) setAdult(adult - 1);
            }}
          >
            <i class="fas fa-plus "></i>
          </Minus>

          <span>{adult}</span>
          <Plus onClick={() => setAdult(adult + 1)}>
            <i class="fas fa-plus "></i>
          </Plus>
        </div>
      </GuestContainerSection>
      <GuestContainerSection>
        <div>
          <span>어린이</span>
          <span>2-12세</span>
        </div>
        <div>
          <Minus
            className={!child && 'noClick'}
            onClick={() => {
              if (child) setChild(child - 1);
            }}
          >
            <i class="fas fa-plus "></i>
          </Minus>
          <span>{child}</span>
          <Plus onClick={() => setChild(child + 1)}>
            <i class="fas fa-plus "></i>
          </Plus>
        </div>
      </GuestContainerSection>
      <GuestContainerSection>
        <div>
          <span>유아</span>
          <span>2세 미만</span>
        </div>
        <div>
          <Minus
            className={!baby && 'noClick'}
            onClick={() => {
              if (baby) setBaby(baby - 1);
            }}
          >
            <i class="fas fa-plus "></i>
          </Minus>
          <span>{baby}</span>
          <Plus onClick={() => setBaby(baby + 1)}>
            <i class="fas fa-plus "></i>
          </Plus>
        </div>
      </GuestContainerSection>
    </GuestContainer>
  );
  return (
    <SelectOptionContainer>
      <SelectField>
        <LocationSection onClick={() => clickSearchMenu('isLocation')}>
          <span>위치</span>
          {location ? <span>{location}</span> : <span>어디로 여행가세요?</span>}
        </LocationSection>
        <DateSection onClick={() => clickSearchMenu('isCalendar')}>
          <Checkin>
            <span>체크인</span>
            {startDate ? <span>{startDate}</span> : <span>날짜입력</span>}
          </Checkin>
          <Checkout>
            <span>체크아웃</span>
            {endDate ? <span>{endDate}</span> : <span>날짜입력</span>}
          </Checkout>
        </DateSection>
        <GuestSection>
          <div onClick={() => clickSearchMenu('isGuest')}>
            <span>인원</span>
            {adult + child + baby > 0 ? <span>게스트 {adult + child + baby}명</span> : <span>게스트추가</span>}
          </div>
          <RedBtn onClick={clickSearchComplete} navYellow={navYellow}>
            <FaSearch color="white" />
          </RedBtn>
        </GuestSection>
      </SelectField>

      <MenuWarpper>
        {isSearchMenu['isLocation'] && LOCATION_PICK}
        {isSearchMenu['isCalendar'] && DATE_PICK}
        {isSearchMenu['isGuest'] && GUEST_PICK}
      </MenuWarpper>
    </SelectOptionContainer>
  );
};

export default SelectOption;
const LocationContainer = styled.div`
  overflow: scroll;
  padding: 20px 0;
  height: 200px;
  background-color: white;

  div {
    width: 450px;

    padding: 15px 30px;
    cursor: pointer;
    &:hover {
      background-color: #f7f7f7;
    }
    img {
      width: 40px;
      margin-right: 10px;
      border: 1px solid #e4e4e4;
      border-radius: 10px;
    }
    span {
      color: #222222;
      font-weight: 400;
      font-size: 15px;
    }
  }
`;

const DatePickerWrapper = styled.div`
  // width: 750px;
`;

const SectionForm = styled.section`
  position: relative;
  display: flex;
  // border: 10px solid blue;
  justify-content: center;
  flex-direction: column;
  height: 65px;

  padding-left: 24px;
  border-radius: 40px;
  cursor: pointer;
  background: white;

  &:hover {
    background-color: #ebebeb;
  }

  span {
    &:nth-child(1) {
      margin-bottom: 5px;
      font-size: 12px;
      font-weight: bold;
    }
    &:nth-child(2) {
      font-size: 14px;
      color: #717171;
      &.makeBlack {
        color: black;
      }
    }
  }
`;

const LocationSection = styled(SectionForm)`
  width: 270px;
  div.clearLocation {
    position: absolute;
    right: 20px;
    cursor: pointer;
  }
`;
const DateSection = styled(SectionForm)`
  display: flex;
  flex-direction: row;
  padding: 0;

  &:hover {
    background-color: white;
  }
`;

const Checkin = styled(SectionForm)`
  width: 180px;
`;

const Checkout = styled(SectionForm)`
  width: 180px;
`;
const SelectOptionContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 120px;
`;

const SelectField = styled.section`
  display: flex;
  height: 65px;
  border-radius: 40px;
`;

const GuestSection = styled(SectionForm)`
  position: relative;
  width: 220px;
  background-color: white;
  div {
    display: flex;
    flex-direction: column;
  }
  &.makeWhite {
    background-color: white;
  }
`;

const GuestContainer = styled.div`
  border: 10px solid skyblue;
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 10px 25px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid gray;
`;

const GuestContainerSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  &:not(:last-child) {
    border-bottom: 1px solid gray;
  }
  div {
    &:nth-child(1) {
      display: flex;
      flex-direction: column;

      span {
        &:nth-child(1) {
          margin-bottom: 5px;
          font-size: 16px;
          color: #222222;
        }
        &:nth-child(2) {
          font-size: 14px;
          color: #717171;
        }
      }
    }
    &:nth-child(2) {
      display: flex;
      align-items: center;
      div {
        // font-size: 30px;
        margin: 0 10px;
      }
      span {
        color: #222222;
        font-size: 16px;
      }
    }
  }
`;

const RedBtn = styled.button(({ navYellow }) => ({
  position: 'absolute',
  right: '10px',
  width: '50px',
  height: '50px',
  background: 'orange',
  // background: !navYellow ? 'orange' : '#ff385c',
  border: 'none',
  outline: 'none',
  borderRadius: '36px',
  padding: '16px',
  fontSize: '80px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}));

const Minus = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 1px solid gray;
  background-position:center;
  background-size:40% 2px;
  background:-repeat:no-repeat;
  cursor: ponter;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  i {
    color: gray;
  }

  &.noClick{
    opacity:.15;
    border:1px solid rgba(0,0,0,.8);
    cursor:default
  }
`;
const Plus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;

  border-radius: 50%;
  border: 1px solid gray;
  cursor: pointer;

  i {
    color: gray;
  }
`;

const MenuWarpper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 80px;
  width: 850px;
  display: flex;
`;
