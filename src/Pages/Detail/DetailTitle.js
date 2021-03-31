import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { IoMdMedal } from 'react-icons/io';
import { FiShare } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';

const DetailTitle = ({ saveModal, setSaveModal }) => {
  const [title, setTitle] = useState('');
  const [total_average, setTotalAverage] = useState(0);
  const [counts, setCounts] = useState(0);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address_line, setAddressLine] = useState('');

  useEffect(() => {
    // fetch(`/room/${props.match.path}`);
    fetch('./data/DetailMockData.json')
      .then(res => res.json())
      .then(res => {
        setTitle(res.title);
        setCity(res.city);
        setDistrict(res.district);
        setAddressLine(res.address_line);
      });
    // fetch(`/room/${props.match.params.id}/review`)
    fetch('./data/ReviewMockData.json')
      .then(res => res.json())
      .then(res => {
        setTotalAverage(res.total_average);
        setCounts(res.counts);
      });
  }, []);

  return (
    <Wrapper>
      <Name>{title}</Name>
      <Things>
        <div>
          <AiFillStar className="yellowIcon" />
          <Thing>{total_average}</Thing>
          <Thing>({counts})</Thing>
          <BsDot className="grayIcon" />
          <IoMdMedal className="yellowIcon" />
          <Thing>슈퍼호스트</Thing>
          <BsDot className="grayIcon" />
          <Thing className="linkIn">
            {address_line}, {district}, {city}
          </Thing>
        </div>
        <div>
          <FiShare className="grayIcon" />
          <Thing className="linkIn">공유하기</Thing>
          <AiOutlineHeart id="space" className="grayIcon" />
          <Thing className="linkIn" onClick={() => setSaveModal(!saveModal)}>
            저장
          </Thing>
        </div>
      </Things>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 30px 150px;
`;

const Name = styled.div`
  font-size: 26px;
  margin-bottom: 20px;
`;

const Things = styled.div`
  display: flex;
  justify-content: space-between;

  .yellowIcon {
    color: #fab005;
    margin-right: 3px;
  }
  .grayIcon {
    color: darkgrey;
    margin-right: 3px;
  }
  .linkIn {
    text-decoration: underline;
    cursor: pointer;
  }
  #space {
    margin-left: 15px;
  }
`;

const Thing = styled.span`
  font-size: 14px;
  vertical-align: 3px;
`;

export default DetailTitle;
