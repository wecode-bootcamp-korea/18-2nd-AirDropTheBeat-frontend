import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Nav from '../../Components/Nav/Nav';
import home from './home.JPG';
import { useHistory } from 'react-router';
import Near from './Near';
import Everywhere from './Everywhere';
import Footer from '../../Components/Footer/Footer';

const homeImg = [
  'https://images.unsplash.com/photo-1545622783-b3e021430fee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1048&q=80',
];
export default function Main() {
  //useState() 총10개

  return (
    <>
      <Img>
        <img src={homeImg[0]} alt="home" />
      </Img>
      <MainContainer>
        <HostThanks>호스트 분들이 있기에 가능합니다</HostThanks>
        <Near />
        <Everywhere />
      </MainContainer>
    </>
  );
}

const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  background: black;

  img {
    width: 95%;
    height: 100%;
    object-fit: cover;
  }
`;
const MainContainer = styled.main``;

const HostThanks = styled.div`
  padding: 40px 0;

  background: black;
  color: white;
  font-size: 30px;
  text-align: center;
`;
const Nav2 = styled.div`
  height: 100px;
  background: pink;
  width: 1500px;
  color: pink;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
