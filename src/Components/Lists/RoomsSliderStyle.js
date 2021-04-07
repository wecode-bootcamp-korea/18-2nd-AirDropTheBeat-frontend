import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    width: 160 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};
const AirbnbSlider = withStyles({
  root: {
    color: '#fab005',
    height: 3,
    padding: '13px 0',
    marginTop: '40px',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid gray',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0 2px 2px',
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'gray',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

export default function CustomizedSlider(props) {
  const classes = useStyles();
  const handleChangeValue = (e, value) => {
    props.setRoomPrice({
      min: value[0],
      max: value[1],
    });
  };

  return (
    <div className={classes.root}>
      <AirbnbSlider
        onChange={handleChangeValue}
        ThumbComponent={AirbnbThumbComponent}
        getAriaLabel={index => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[props.minPrice, props.maxPrice]}
        min={0}
        max={1000000}
        step={10}
      />
      <PriceBox>
        <PriceCommonBox>
          <span>최저 요금</span>
          <span>₩ {props.minPrice}</span>
        </PriceCommonBox>
        <span className={'PriceBoxHyphen'}>-</span>
        <PriceCommonBox>
          <span>최고 요금</span>
          <span>₩ {props.maxPrice}</span>
        </PriceCommonBox>
      </PriceBox>
    </div>
  );
}

const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 25px;

  .PriceBoxHyphen {
    color: #bcbbbb;
    margin: 0 10px;
  }
`;

const PriceCommonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 160px;
  height: 57px;
  padding: 10px;
  border: 1px solid #dedede;
  border-radius: 15px;

  span {
    &:first-child {
      padding-bottom: 7px;
      font-size: 11px;
      color: #5f5f5f;
    }
    &:last-child {
      font-size: 13px;
    }
  }
`;
