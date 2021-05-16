import React from 'react';
import RoomList from './RoomList';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Pagination from './Pagination';

const RoomLists = props => {
  const paginate = pageNumber => props.setCurrentPage(pageNumber);
  return (
    <>
      {props.lists.map((list, index) => {
        return <RoomList list={list} key={index} setHoverIndex={props.setHoverIndex} headerInfo={props.headerInfo} />;
      })}
      <Pagination roomsPerPage={props.roomsPerPage} totalList={props.totalList} paginate={paginate} handleArrow={props.handleArrow} />
    </>
  );
};

export default RoomLists;
