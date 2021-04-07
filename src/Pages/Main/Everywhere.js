import React from 'react';
import styled from 'styled-components';

const EVERYIMG = [
  {
    title: '집 전체',
    img:
      'https://images.unsplash.com/photo-1617504694052-164a87aa8f2b?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: '독특한 공간',
    img:
      'https://images.unsplash.com/photo-1546026490-f611a6cfde5e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
  },
  {
    title: '농장 및 자연',
    img:
      'https://images.unsplash.com/photo-1530524634850-6e595be77365?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    title: '반려동물 동반 가능',
    img:
      'https://images.unsplash.com/photo-1559732851-f11f968b43f2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
];
export default function Everywhere() {
  return (
    <NearContainer>
      <Inner>
        <Section>어디에서나, 여행은 살아보는 거야!</Section>

        <Desc>
          {EVERYIMG.map(el => {
            return (
              <div className="pick">
                <a href="#">
                  <div className="picture">
                    <img src={el.img} />
                  </div>
                  <div className="title">
                    <div>{el.title}</div>
                  </div>
                </a>
              </div>
            );
          })}
        </Desc>
      </Inner>
    </NearContainer>
  );
}

const NearContainer = styled.div`
  width: 100%;
  padding: 40px 0;
`;
const Inner = styled.div`
  max-width: 1760px;
  padding: 0 80px;
`;
const Section = styled.section`
  font-size: 32px;
  font-weight: bold;
  color: #222222;
  padding: 20px 0;
`;
const Desc = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .pick {
    width: 20%;
    margin: 10px 20px;
    a {
      width: 100%;

      .picture {
        margin-bottom: 10px;
        width: 270px;
        height: 270px;
        background: orange;
        border-radius: 14px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        color: #222222;
        font-size: 18px;
        font-weight: bold;
        div {
        }
      }
    }
  }
`;
