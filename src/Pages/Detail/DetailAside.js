import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import { VscTag } from 'react-icons/vsc';

const DetailAside = props => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // 버튼 그라데이션 기능 구현
  // const handleMouseMove = e => {
  //   setMousePosition({ x: e.clientX, y: e.clientY });
  // };

  const [priceInfo, setPriceInfo] = useState({
    price: 0,
    discount_rate: 0,
  });
  const [total_average, setTotalAverage] = useState(0);
  const [counts, setCounts] = useState(0);
  const [checkinout, setCheckinout] = useState({
    checkin_date: '',
    checkout_date: '',
  });
  const [number_of_guests, setNumberOfGuests] = useState(0);

  useEffect(() => {
    // fetch(`/room/${props.match.params.id}`);
    fetch('./data/DetailMockData.json')
      .then(res => res.json())
      .then(res => {
        setPriceInfo(res);
        setCheckinout(res);
        setNumberOfGuests(res.number_of_guests);
      });
    // fetch(`/room/${props.match.params.id}/review`)
    fetch('./data/ReviewMockData.json')
      .then(res => res.json())
      .then(res => {
        setTotalAverage(res.total_average);
        setCounts(res.counts);
      });
  }, []);

  // // url 에서 parameter 추출
  // function getParam(sname) {
  //   let params = location.search.substr(location.search.indexOf('?') + 1);
  //   let sval = '';
  //   params = params.split('&');
  //   for (let i = 0; i < params.length; i++) {
  //     let temp = params[i].split('=');
  //     if ([temp[0]] == sname) {
  //       sval = temp[1];
  //     }
  //   }
  //   return sval;
  // }

  return (
    <Wrapper>
      <Floating>
        <CheckBox>
          <Overall>
            <Price>
              <Original>₩{Math.floor(priceInfo.price).toLocaleString()}</Original>
              <span>₩{Math.floor(priceInfo.price * (1 - priceInfo.discount_rate)).toLocaleString()}</span>
              <Oneday>/박</Oneday>
            </Price>
            <Review>
              <AiFillStar className="yellowIcon" />
              <Thing>{total_average}</Thing>
              <Thing>({counts})</Thing>
            </Review>
          </Overall>
          <SmallBox>
            <InnerBox topLeft>
              <span>체크인</span>
              <div>{checkinout.checkin_date}</div>
              {/* <div>{getParam('check_in')}</div> */}
            </InnerBox>
            <InnerBox topRight>
              <span>체크아웃</span>
              <div>{checkinout.checkout_date}</div>
              {/* <div>{getParam("check_out")}</div> */}
            </InnerBox>
          </SmallBox>
          <InnerBox bottom modifier="bigSize">
            <span>인원</span>
            <div>게스트 {number_of_guests}명</div>
            {/* <div>게스트 {getParam("guests")}명</div> */}
          </InnerBox>
          {/* <ReservButton onMouseMove={e => handleMouseMove(e)} style={{ x: mousePosition.x, y: mousePosition.y }}> */}
          <ReservButton>예약하기</ReservButton>
          <NoticeFirst>예약 확정 전에는 요금이 청구되지 않습니다.</NoticeFirst>
          <PriceDetail>
            <div>
              <PriceDesc>₩{Math.floor(priceInfo.price * (1 - priceInfo.discount_rate)).toLocaleString()} x 2박</PriceDesc>
              <span>₩{Math.floor(priceInfo.price * (1 - priceInfo.discount_rate) * 2).toLocaleString()}</span>
            </div>
            <div>
              {/* 청소비 = price * 0.2 */}
              <PriceDesc>청소비</PriceDesc>
              <span>₩{Math.floor(priceInfo.price * 0.2).toLocaleString()}</span>
            </div>
            <div>
              {/* 서비스 수수료 = price * 0.1 */}
              <PriceDesc>서비스 수수료</PriceDesc>
              <span>₩{Math.floor(priceInfo.price * 0.1).toLocaleString()}</span>
            </div>
            <div>
              {/* 숙박세와 수수료 = price * 0.02 */}
              <PriceDesc>숙박세와 수수료</PriceDesc>
              <span>₩{Math.floor(priceInfo.price * 0.02).toLocaleString()}</span>
            </div>
            <BreakLine />
            <Total>
              <span>총 합계</span>
              <span>₩{Math.floor(2.32 * priceInfo.price - 2 * priceInfo.price * priceInfo.discount_rate).toLocaleString()}</span>
            </Total>
          </PriceDetail>
        </CheckBox>
        <NoticeBox>
          <NoticeSecond>
            <span>요금 인하</span> 검색하시는 날짜는 지난 60일간 평균 1박 요금보다 ₩15946 저렴합니다.
          </NoticeSecond>
          <VscTag className="tagIcon" />
        </NoticeBox>
      </Floating>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  width: 375px;
`;

const Floating = styled.section`
  position: sticky;
  top: 90px;
`;

const CheckBox = styled.section`
  width: 370px;
  height: 510px;
  padding: 25px;
  border: 1px solid lightgray;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
`;

const Overall = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.span`
  font-size: 22px;
  font-weight: 500;
`;

const Original = styled.span`
  text-decoration: line-through;
  color: darkgrey;
  margin-right: 5px;
`;

const Oneday = styled.span`
  font-size: 16px;
  margin-left: 5px;
`;

const Review = styled.span`
  .yellowIcon {
    color: #fab005;
    margin-right: 3px;
    vertical-align: -3px;
  }
`;

const InnerBox = styled.section`
  width: ${props => (props.modifier === 'bigSize' ? 318 : 160)}px;
  height: 55px;
  border: 1px solid lightgray;
  border-radius: ${props => {
    if (props.topLeft) {
      return '10px 0 0 0';
    } else if (props.topRight) {
      return '0 10px 0 0';
    } else if (props.bottom) {
      return '0 0 10px 10px';
    }
  }};
  margin-bottom: ${props => props.modifier === 'bigSize' && 20}px;
  padding: 10px;

  span {
    font-size: 11px;
    font-weight: 600;
  }

  div {
    font-size: 14px;
    text-align: left;
    margin-top: 5px;
  }
`;

const SmallBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const NoticeBox = styled.section`
  display: flex;
  justify-content: space-between;
  width: 370px;
  height: 90px;
  padding: 28px 24px 24px 24px;
  margin: 20px 0 10px 0;
  border: 1px solid lightgray;
  border-radius: 10px;
  .tagIcon {
    width: 30px;
    height: 30px;
    color: #fab005;
  }
`;

const ReservButton = styled.button`
  width: 320px;
  height: 48px;
  border: 1px solid #fab005;
  border-radius: 10px;
  background: #fab005;
  color: white;
  font-size: 16px;
`;

const Thing = styled.span`
  font-size: 14px;
`;

const NoticeFirst = styled.div`
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
`;

const PriceDetail = styled.div`
  margin-top: 30px;
  font-size: 16px;
  div {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
`;

const PriceDesc = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const Total = styled.div`
  font-weight: 700;
`;

const BreakLine = styled.div`
  border-bottom: 1px solid lightgray;
  margin-top: 20px;
  margin-bottom: 30px !important ;
`;

const NoticeSecond = styled.div`
  width: 270px;
  font-size: 16px;

  span {
    font-weight: 700;
  }
`;

export default DetailAside;
