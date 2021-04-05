import React, { useState } from 'react';
import styled from 'styled-components';

const NEARIMG = [
  {
    title: '서울',
    desc: '차로 15분 거리',
    img:
      'https://images.unsplash.com/photo-1617538781355-7aacae1e2575?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80',
  },
  {
    title: '인천',
    desc: '차로 45분 거리',
    img:
      'https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    title: '의정부시',
    desc: '차로 30분 거리',
    img:
      'https://images.unsplash.com/photo-1530041539828-114de669390e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    title: '대구',
    desc: '차로 4시간 거리',
    img:
      'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
  },
  {
    title: '대전',
    desc: '차로 2시간 거리',
    img:
      'https://images.unsplash.com/photo-1503595855261-9418f48a991a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    title: '광주',
    desc: '차로 4시간 거리',
    img:
      'https://images.unsplash.com/photo-1535930749574-1399327ce78f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80',
  },
  {
    title: '수원시',
    desc: '차로 30분 거리',
    img:
      'https://images.unsplash.com/photo-1472718888560-1a1292f1cccb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    title: '울산',
    desc: '차로 4.5시간 거리',
    img:
      'https://images.unsplash.com/photo-1533514114760-4389f572ae26?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=617&q=80',
  },
];

export default function Near() {
  return (
    <NearContainer>
      <Inner>
        <Section>가까운 여행지 둘러보기</Section>

        <Desc>
          {NEARIMG.map(el => {
            return (
              <div className="pick">
                <a href="#">
                  <div className="picture">
                    <img src={el.img} />
                  </div>
                  <div className="title">
                    <div>{el.title}</div>
                    <div>{el.desc}</div>
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
const Inputt = styled.input`
  background: ${props => (props.a ? 'pink' : 'tomato')};
  // border: 2px solid pink;
  // background: pink;
  height: 30px;
  width: 100px;
`;
const Desc = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .pick {
    width: 25%;
    padding: 10px 0;
    a {
      width: 100%;
      display: flex;
      .picture {
        margin-right: 10px;
        width: 64px;
        height: 64px;
        background: skyblue;
        border-radius: 14px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #222222;
        div:first-child {
          font-weight: bold;
        }
      }
    }
  }
`;
