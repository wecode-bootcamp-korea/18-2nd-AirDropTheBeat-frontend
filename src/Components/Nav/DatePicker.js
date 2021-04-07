import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { DayPickerRangeController } from 'react-dates';
import styled from 'styled-components';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const DatePicker = ({ start, end, blockedDates, updateStartDate, updateEndDate, clearPosition, gapBetweenMonth }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState('startDate');
  const blockedDate = useState(blockedDates)[0];
  const closestNextBlockedDate = (target, blockedDates) => {
    const nextBlockedDate = blockedDates
      ?.map(date => moment(date, 'YYYY-MM-DD'))
      .sort(date => date.valueOf())
      .find(date => date.isAfter(target));
    return nextBlockedDate;
  };

  const closestPrevBlockedDate = (target, blockedDates) => {
    const prevBlockedDate = blockedDates
      ?.map(date => moment(date, 'YYYY-MM-DD'))
      .sort(date => date.valueOf())
      .reverse()
      .find(date => date.isBefore(target));
    return prevBlockedDate;
  };

  const isBlocked = day => {
    let result = false;
    const newDay = moment(day.format('YYYY-MM-DD'));

    // Case #1. 체크인 체크아웃이 둘다 선택.
    if (startDate && endDate) {
      const newStart = moment(startDate.format('YYYY-MM-DD')).subtract(1, 'days');
      const newEnd = moment(endDate.format('YYYY-MM-DD')).add(1, 'days');
      result = !newDay.isBetween(newStart, newEnd);
      return result;

      // Case #2. 체크인만 선택.
    } else if (startDate) {
      const newStart = moment(startDate.format('YYYY-MM-DD')).subtract(1, 'days');
      const nextBlockedDate = closestNextBlockedDate(newStart, blockedDate);
      if (nextBlockedDate) {
        result = !newDay.isBetween(newStart, nextBlockedDate);
      } else {
        newStart.add(1, 'days');
        result = newDay.isBefore(newStart);
      }
      return result;

      // Case #3. 체크아웃만 선택.
    } else if (endDate) {
      const newEnd = moment(endDate.format('YYYY-MM-DD')).add(1, 'days');
      const prevBlockedDate = closestPrevBlockedDate(newEnd, blockedDate);
      if (prevBlockedDate) {
        result = !newDay.isBetween(prevBlockedDate, newEnd);
      } else {
        result = !newDay.isBetween(moment(), newEnd);
      }
      return result;

      // Case #4. 둘다 선택 되지 않음.
    } else {
      result = blockedDate?.some(date => day.format('YYYY-MM-DD') === date) || day.isBefore(moment());
      return result;
    }
  };

  const clear = () => {
    setStartDate(null);
    setEndDate(null);
    setFocusedInput('startDate');
    updateStartDate('');
    updateEndDate('');
  };

  return (
    <>
      <DatePickerSection>
        <DayPickerRangeController
          startDate={startDate}
          endDate={endDate}
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
            updateStartDate(startDate?.format('YYYY-MM-DD'));
            updateEndDate(endDate?.format('YYYY-MM-DD'));
          }}
          focusedInput={focusedInput}
          onFocusChange={focusedInput => {
            setFocusedInput(focusedInput || 'startDate');
          }}
          numberOfMonths={2}
          horizontalMonthPadding={gapBetweenMonth || 30}
          isDayBlocked={isBlocked}
          monthFormat="YYYY[년 ]MMMM"
          navPrev={<PrevButton>이전</PrevButton>}
          navNext={<NextButton>이후</NextButton>}
          noBorder
        />
        <ClearButtonWrapper>
          <ClearButton clearPosition={clearPosition || '110'} onClick={clear}>
            RESET
          </ClearButton>
        </ClearButtonWrapper>
      </DatePickerSection>
    </>
  );
};

export default DatePicker;

const DatePickerSection = styled.section`
  position: relative;
  padding: 5px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 7px 21px -3px rgba(67, 67, 67, 0.45);

  .CalendarDay__default {
    border: none;
    border-radius: 50%;
    vertical-align: middle;
  }
  .CalendarDay__default:hover {
    border: none;
    color: black;
  }
  .CalendarDay__selected_span {
    background-color: orange;
    border: none;
    color: black;
  }
  //선택한 사이의 것
  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    color: black;
    background-color: gray;
  }
  //선택한 것
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: gray;
    border: none;
    color: white;
  }
  //선택되지 않은 날짜들
  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_calendar:active,
  .CalendarDay__blocked_calendar:hover {
    background: white;
    border: none;
    color: #d2d2d2;
  }
`;

const NavButtonForm = styled.div`
  position: absolute;
  top: 21px;
`;

const PrevButton = styled(NavButtonForm)`
  left: 30px;
`;

const NextButton = styled(NavButtonForm)`
  right: 30px;
`;

const ClearButtonWrapper = styled.div`
  text-align: right;
`;

const ClearButton = styled.button`
  padding: 15px;
  margin: 10px;
  border: none;
  background-color: white;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: orange;
  }
`;
