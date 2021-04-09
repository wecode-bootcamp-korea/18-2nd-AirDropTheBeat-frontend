import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';

const DetailReview = props => {
  const [total_average, setTotalAverage] = useState(0);
  const [counts, setCounts] = useState(0);
  const [subEvaluations, setSubEvaluations] = useState({
    cleanliness: 0,
    accuracy: 0,
    communication: 0,
    location: 0,
    checkin: 0,
    satisfaction: 0,
  });
  const [detail_reviews, setDetailReviews] = useState([]);

  useEffect(() => {
    // fetch('/data/ReviewMockData.json')
    fetch(`/room/${props.props.match.params.id}/review`)
      .then(res => res.json())
      .then(res => {
        setTotalAverage(res.total_average);
        setCounts(res.counts);
        setSubEvaluations(res);
        setDetailReviews(res.detail_reviews);
      });
  }, []);

  const UserReviewLists = detail_reviews?.map((UserReviewList, index) => (
    <UserReview key={index}>
      <Profile>
        {detail_reviews[index]?.user_image.length <= 0 ? (
          <img alt="noprofile" src="/images/defaultprofile.png" />
        ) : (
          <img alt="profile" src={detail_reviews[index]?.user_image} />
        )}
        <SubProfile>
          <Username>{detail_reviews[index]?.user_name}</Username>
          <Date>
            {detail_reviews[index]?.created_at.split('-')[0]}년 {detail_reviews[index]?.created_at.split('-')[1]}월
          </Date>
        </SubProfile>
      </Profile>
      <Comment>{detail_reviews[index]?.content}</Comment>
    </UserReview>
  ));

  return (
    <Wrapper>
      <Overall id="rev">
        <AiFillStar className="yellowIcon" />
        <Thing>{total_average}점</Thing>
        <Thing>(후기 {counts}개)</Thing>
      </Overall>
      <EvaluationItems>
        <Total>
          <span>청결도</span>
          <div>
            <BaseLine>
              <CalcLine subEvaluations={subEvaluations.cleanliness} />
            </BaseLine>
            <Score>{subEvaluations.cleanliness?.toFixed(1)}</Score>
          </div>
        </Total>
        <Total>
          <span>정확성</span>
          <div>
            <BaseLine>
              <CalcLine subEvaluations={subEvaluations.accuracy} />
            </BaseLine>
            <Score>{subEvaluations.accuracy?.toFixed(1)}</Score>
          </div>
        </Total>
        <Total>
          <span>의사소통</span>
          <div>
            <BaseLine>
              <CalcLine subEvaluations={subEvaluations.communication} />
            </BaseLine>
            <Score>{subEvaluations.communication?.toFixed(1)}</Score>
          </div>
        </Total>
        <Total>
          <span>위치</span>
          <div>
            <BaseLine>
              <CalcLine subEvaluations={subEvaluations.location} />
            </BaseLine>
            <Score>{subEvaluations.location?.toFixed(1)}</Score>
          </div>
        </Total>
        <Total>
          <span>체크인</span>
          <div>
            <BaseLine>
              <CalcLine subEvaluations={subEvaluations.checkin} />
            </BaseLine>
            <Score>{subEvaluations.checkin?.toFixed(1)}</Score>
          </div>
        </Total>
        <Total>
          <span>가격 대비 만족도</span>
          <div>
            <BaseLine>
              <CalcLine subEvaluations={subEvaluations.satisfaction} />
            </BaseLine>
            <Score>{subEvaluations.satisfaction?.toFixed(1)}</Score>
          </div>
        </Total>
      </EvaluationItems>
      {UserReviewLists}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 30px 150px;
`;

const Overall = styled.div`
  font-size: 22px;
  margin-bottom: 30px;
  .yellowIcon {
    color: #fab005;
  }
`;

const Thing = styled.span`
  font-weight: 600;
  margin: 0 3px;
  vertical-align: 3px;
`;

const EvaluationItems = styled.section`
  margin-bottom: 60px;
  font-size: 16px;
  div {
    display: flex;
    justify-content: left;
  }
`;

const Total = styled.span`
  display: flex;
  justify-content: space-between;
  width: 450px;
  margin-bottom: 15px;
`;

const Score = styled.span`
  font-size: 12px;
  margin-left: 10px;
`;

const BaseLine = styled.div`
  position: relative;
  width: 120px;
  height: 5px;
  margin-top: 2px;
  background-color: lightgray;
  border-radius: 5px;
`;

const CalcLine = styled(BaseLine)`
  position: absolute;
  bottom: 0.15px;
  z-index: 1;
  background-color: dimgray;
  width: ${props => props.subEvaluations * 20}%;
`;

const UserReview = styled.section`
  display: inline-block;
  margin-right: 100px;
  margin-bottom: 30px;
  text-align: start;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

const Profile = styled.span`
  display: flex;
  justify-content: left;
`;

const SubProfile = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  margin-top: 15px;
`;

const Username = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const Date = styled.span`
  font-size: 14px;
  color: darkgray;
  margin-top: 7px;
`;

const Comment = styled.div`
  width: 455px;
  height: 130px;
  line-height: 25px;
  margin-top: 20px;
  overflow: auto;
`;

export default DetailReview;
