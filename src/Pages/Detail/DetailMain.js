import React, { useEffect, useState } from 'react';
import DetailTitle from './DetailTitle';
import DetailImg from './DetailImg';
import DetailContents from './DetailContents';
import DetailAside from './DetailAside';
import DetailReview from './DetailReview';
import DetailMap from './DetailMap';
import styled from 'styled-components';
import DetailSaveModal from './DetailSaveModal';

const DetailMain = props => {
  //scroll 이벤트
  let preScrollTop = window.pageYOffset;
  const [handleNav, setHandleNav] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    preScrollTop = window.pageYOffset;
    if (preScrollTop > 450) {
      setHandleNav(true);
    } else if (preScrollTop <= 450) {
      setHandleNav(false);
    }
  };

  const scrollPic = () => {
    window.scrollTo(0, 0);
  };

  const scrollConv = () => {
    window.scrollTo(0, 1170);
  };

  const scrollRev = () => {
    // // 1번 시도
    // let location = document.getElementById('rev');
    // location.scrollIntoView();
    // // 2번 시도
    let location = document.getElementById('rev').offsetTop;
    window.scrollTo({ top: location - 100 });
  };

  const scrollLoc = () => {
    let location = document.getElementById('map').offsetTop;
    window.scrollTo({ top: location - 100 });
  };

  // modal
  const [saveModal, setSaveModal] = useState(false);

  return (
    <>
      {saveModal === true && <DetailSaveModal saveModal={saveModal} setSaveModal={setSaveModal} />}
      <DetailTitle props={props} saveModal={saveModal} setSaveModal={setSaveModal} />
      <DetailImg props={props} />
      {handleNav && (
        <DetailNav>
          <span onClick={scrollPic}>사진</span>
          <span onClick={scrollConv}>편의시설</span>
          <span onClick={scrollRev}>후기</span>
          <span onClick={scrollLoc}>위치</span>
        </DetailNav>
      )}
      <Wrapper>
        <DetailContents props={props} />
        <DetailAside props={props} />
      </Wrapper>
      <BreakLine />
      <DetailReview props={props} />
      <BreakLine />
      <DetailMap props={props} />
    </>
  );
};

const Wrapper = styled.div`
  margin: 40px 150px 40px 150px;
  display: flex;
  justify-content: space-between;
`;

const BreakLine = styled.div`
  border-bottom: 1px solid lightgray;
  margin: 30px 150px;
`;

const DetailNav = styled.div`
  z-index: 100;
  width: 100%;
  height: 80px;
  padding: 30px 150px;
  border: 1px solid lightgray;
  position: fixed;
  top: 0;
  background-color: white;

  span {
    font-size: 14px;
    font-weight: 500;
    margin-right: 25px;
    cursor: pointer;
  }
`;

export default DetailMain;
