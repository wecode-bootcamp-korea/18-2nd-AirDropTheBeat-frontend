import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { HiWifi } from 'react-icons/hi';
import { RiTempHotLine, RiDoorClosedLine } from 'react-icons/ri';
import { IoSnowSharp } from 'react-icons/io5';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { BiWind } from 'react-icons/bi';
import { IoMdMedal } from 'react-icons/io';

const DetailContents = props => {
  const [host_name, setHostName] = useState('');
  const [type, setType] = useState('');
  const [maximum_people, setMaxPeople] = useState(0);
  const [option, setOption] = useState({
    bedroom: 0,
    bathroom: 0,
    bed: 0,
  });
  const [checkIn, setCheckIn] = useState({
    checkin_type: '',
    checkin_type_description: '',
  });
  const [description, setDescription] = useState('');
  const [conveniences, setConveniences] = useState('');

  useEffect(() => {
    // fetch('./data/DetailMockData.json')
    fetch(`/room/${props.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        setHostName(res.host_name);
        setType(res.type);
        setMaxPeople(res.maximum_people);
        setOption(res);
        setCheckIn(res);
        setDescription(res.description);
        setConveniences(res.conveniences);
      });
  }, []);

  return (
    <Wrapper>
      <Title>
        {host_name}님이 호스팅하는 {type}
      </Title>
      <SubTitle>
        최대 인원 {maximum_people}명 · 침실 {option.bedroom}개 · 침대 {option.bed}개 · 공동 사용 욕실 {option.bathroom}개
      </SubTitle>
      <BreakLine />
      <Info>
        <RiDoorClosedLine className="icon" />
        <div>
          <MainInfo>{checkIn.checkin_type}</MainInfo>
          <DetailInfo>{checkIn.checkin_type_description}</DetailInfo>
        </div>
      </Info>
      <Info>
        <IoMdMedal className="icon" />
        <div>
          <MainInfo>{host_name}님은 슈퍼호스트입니다</MainInfo>
          <DetailInfo>
            슈퍼호스트는 풍부한 경험과 높은 평점을 자랑하며 게스트가 숙소에서 편안히 머무를 수 있도록 최선을 다하는 호스트입니다.
          </DetailInfo>
        </div>
      </Info>
      <BreakLine />
      <Description>{description}</Description>
      <CallHost>호스트에게 연락하기</CallHost>
      <BreakLine />
      <Title>편의시설</Title>
      <Convenience>
        {conveniences?.includes('주방') && (
          <div>
            <GiForkKnifeSpoon className="icon" />
            <span>주방</span>
          </div>
        )}
        {conveniences?.includes('무선인터넷') && (
          <div>
            <HiWifi className="icon" />
            <span>무선인터넷</span>
          </div>
        )}
        {conveniences?.includes('난방') && (
          <div>
            <RiTempHotLine className="icon" />
            <span>난방</span>
          </div>
        )}
        {conveniences?.includes('에어컨') && (
          <div>
            <IoSnowSharp className="icon" />
            <span>에어컨</span>
          </div>
        )}
        {conveniences?.includes('세탁기') && (
          <div>
            <CgSmartHomeWashMachine className="icon" />
            <span>세탁기</span>
          </div>
        )}
        {conveniences?.includes('헤어드라이어') && (
          <div>
            <BiWind className="icon" />
            <span>헤어드라이어</span>
          </div>
        )}
      </Convenience>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 650px;
`;

const Title = styled.div`
  font-size: 22px;
  margin-bottom: 25px;
`;

const SubTitle = styled.div`
  font-size: 16px;
  color: #222222;
`;

const Info = styled.span`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  .icon {
    width: 30px;
    height: 30px;
    margin-right: 30px;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;

const MainInfo = styled.span`
  font-size: 16px;
  margin-bottom: 10px;
`;

const DetailInfo = styled.span`
  font-size: 14px;
  color: darkgrey;
`;

const BreakLine = styled.div`
  border-bottom: 1px solid lightgray;
  margin: 30px 0;
`;

const Description = styled.article`
  height: 300px;
  font-size: 16px;
  line-height: 25px;
  margin-bottom: 40px;
  overflow: auto;
`;

const CallHost = styled.span`
  font-size: 16px;
  color: darkgrey;
  text-decoration: underline;
  cursor: pointer;

  :hover {
    color: black;
  }
`;

const Convenience = styled.div`
  div {
    display: inline-block;
    width: 325px;
    padding-bottom: 15px;
  }

  .icon {
    width: 25px;
    height: 25px;
    margin-right: 15px;
    color: #272722;
  }
  span {
    font-size: 16px;
    vertical-align: 5px;
    color: #222222;
  }
`;

export default DetailContents;
