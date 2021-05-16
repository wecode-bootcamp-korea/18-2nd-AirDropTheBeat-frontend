import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import styled from 'styled-components';

const Pagination = ({ roomsPerPage, totalList, paginate, handleArrow }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalList / roomsPerPage); i++) {
    pageNumber.push(i);
  }
  const handleClick = e => {
    handleArrow(e.target.dataset.arrow);
  };

  return (
    <>
      <PaginationBox>
        <PaginationArrowBox data-arrow={'left'} onClick={handleClick}>
          <MdKeyboardArrowLeft />
        </PaginationArrowBox>
        <PaginationPageNumberBox>
          <PaginationPageNumberUl>
            {pageNumber.map((pageNum, index) => (
              <PaginationPageNumberLi key={pageNum} showIndex={index + 1} onClick={() => paginate(pageNum)}>
                <span>{pageNum}</span>
              </PaginationPageNumberLi>
            ))}
          </PaginationPageNumberUl>
        </PaginationPageNumberBox>
        <PaginationArrowBox data-arrow={'right'} onClick={handleClick}>
          <MdKeyboardArrowRight />
        </PaginationArrowBox>
      </PaginationBox>
    </>
  );
};

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
  margin: 20px 0;
`;

const PaginationArrowBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    font-size: 30px;
    color: #afafaf;
    pointer-events: none;
  }
`;

const PaginationPageNumberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PaginationPageNumberUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
`;

const PaginationPageNumberLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: #111111;
    border-radius: 50%;
    color: white;
  }
  span {
    height: 30px;
    display: table-cell;
    vertical-align: middle;
    padding-top: 25%;
  }
`;

export default Pagination;
