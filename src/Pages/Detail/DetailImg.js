import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DetailImg = props => {
  const [images_url, setImagesUrl] = useState('');

  useEffect(() => {
    // fetch(`/room/${props.match.params.id}`);
    fetch('./data/DetailMockData.json')
      .then(res => res.json())
      .then(res => {
        setImagesUrl(res.images_url);
      });
  }, []);

  return (
    <Wrapper>
      <img alt="house" src={images_url[0]} />
      <img alt="house" src={images_url[1]} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 25px 150px 50px 150px;
  display: flex;
  justify-content: space-between;

  img {
    width: 550px;
    border-radius: 10px;
  }
  img:hover {
    filter: brightness(95%);
  }
`;

export default DetailImg;
