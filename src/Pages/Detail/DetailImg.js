import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DetailImg = props => {
  const [images_url, setImagesUrl] = useState('');

  console.log(props);

  useEffect(() => {
    // fetch('./data/DetailMockData.json')
    fetch(`/room/${props.props.match.params.id}`)
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
    height: 450px;
    border-radius: 10px;
    object-fit: cover;
  }
  img:hover {
    filter: brightness(95%);
  }
`;

export default DetailImg;
