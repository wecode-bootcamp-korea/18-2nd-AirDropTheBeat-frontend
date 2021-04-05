import React, { useEffect, useImperativeHandle, useState } from 'react';
import SelectOption from './SelectOption';
import logo from './logo.png';
import logoY from './logoY.png';
import styled from 'styled-components';
import { ImEarth } from 'react-icons/im';
import { GiHamburgerMenu, GiPianoKeys } from 'react-icons/gi';
import { ImAngry } from 'react-icons/im';
import { useHistory } from 'react-router';
import { FaSearch } from 'react-icons/fa';

export default function Nav() {
  const [location, setLocation] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [baby, setBaby] = useState(0);
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const [isSearchMenu, setIsSearchMenu] = useState({
    isGuest: false,
    isCalendar: false,
    isLocation: false,
  });
  const [navYellow, setNavYellow] = useState(true);
  const [navSearch, setNavSearch] = useState(false);
  //마우스 이벤트
  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', handleScrollY);
  }, []);

  const handleScrollY = () => {
    if (window.scrollY < 100) {
      // setNavYellow(false);
      // setNavSearch(false);
      setNavYellow(true);
      setNavSearch(false);
      return;
    }
    if (window.scrollY >= 100) {
      setNavYellow(true);
      return;
    }
  };

  const history = useHistory();

  //Search 메뉴 : 나타내기(클릭시, 해당 서치섹션 나타내기)
  const clickSearchMenu = menu => {
    setIsSearchMenu({
      ...isSearchMenu,
      isGuest: false,
      isCalendar: false,
      isLocation: false,
      [menu]: !isSearchMenu[menu],
    });
  };
  // Search 메뉴 : 페치보내기 (해당 정보 fetch 보내기)
  const clickSearchComplete = () => {
    if (!location) {
      clickSearchMenu('isLocation');
    } else if (!startDate || !endDate) {
      clickSearchMenu('isCalendar');
    } else if (adult + child + baby === 0) {
      clickSearchMenu('isGuest');
    } else {
      clickSearchMenu();
      fetchData();
    }
  };

  const fetchData = () => {
    const query = `?location=${location}&chekin=${startDate}&checkout=${endDate}&adults=${adult}&child=${child}&baby=${baby}`;
    console.log(query);
    // fetch('http://10.58.4.42/room/list', {
    //   method: 'GET',
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     const check = Object.values(res).filter(i => i.userId === this.state.userId);
    //     if (check.length) {
    //       alert('이미 사용중입니다 ☢');
    //       return;
    //     }
    //     alert('사용가능한 아이디입니다');
    //   });
    history.push(`/room/list${query}`);
  };
  // 로그인 로그아웃
  const handleLogin = () => {
    localStorage.setItem('token', 'mimilover');
  };
  const handleLogout = () => {
    alert('로그아웃 성공!');
    localStorage.removeItem('token');
  };
  //

  return (
    <>
      <NavWrapper navYellow={navYellow}>
        <Menu>
          <div>
            <img src={logoY} alt="Logo" width="218px" />
          </div>
          {navYellow && !navSearch ? (
            <SimpleSearch onClick={() => setNavSearch(!navSearch)}>
              <div>검색하기</div>
              <RedBtn>
                <FaSearch color="white" />
              </RedBtn>
            </SimpleSearch>
          ) : (
            <div className="menuMiddle">
              <span>숙소</span>
              <span>체험</span>
              <span>온라인 체험</span>
            </div>
          )}
          <div className="menuRight">
            <div>
              <div>호스트될래</div>
              <div>
                <ImEarth color="black" size="16px" />
              </div>
            </div>
            <div className="toggle" onClick={() => setIsToggleMenu(!isToggleMenu)}>
              <div>
                <GiHamburgerMenu size="16px" />
                <ImAngry size="25px" />
              </div>
              <div className={`popup ${isToggleMenu || 'hide'}`}>
                {localStorage.getItem('token') ? (
                  <>
                    <div>여행</div>
                    <div>저장목록</div>
                    <div>도움말</div>
                    <div onClick={handleLogout}>로그아웃</div>
                  </>
                ) : (
                  <>
                    <div onClick={handleLogin}>로그인</div>
                    <div>회원가입</div>
                    <div>도움말</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Menu>
        {navYellow && !navSearch ? null : (
          <Search navYellow={navYellow}>
            <SelectOption
              location={location}
              setLocation={setLocation}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              adult={adult}
              setAdult={setAdult}
              child={child}
              setChild={setChild}
              baby={baby}
              setBaby={setBaby}
              setIsSearchMenu={setIsSearchMenu}
              isSearchMenu={isSearchMenu}
              clickSearchComplete={clickSearchComplete}
              isSearchMenu={isSearchMenu}
              clickSearchMenu={clickSearchMenu}
              navYellow={navYellow}
            />
          </Search>
        )}
      </NavWrapper>
      {/* <NavPadding navYellow={navYellow}></NavPadding> */}
    </>
  );
}

const Corona = styled.aside({
  padding: '20px 80px',
  background: '#222222',
  textAlign: 'center',
  textDecoration: 'underline',
  fontWeight: 'bold',
  fontSize: '14px',
  color: '#a3a3a3',
});

// const NavPadding = styled.div(({ navYellow }) => ({
//   padding: navYellow ? '65px 0' : '',
// }));
const NavWrapper = styled.div(({ navYellow }) => ({
  zIndex: '7',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  // height: '90px',
  backgroundColor: 'white',
  color: 'black',
  paddingBottom: '10px',
  boxShadow: '2px 7px 21px -3px rgba(67,67,67,0.45)',
  // border: '3px solid pink',
}));

const Menu = styled.section`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  .logo {
  }
  .menuMiddle {
    font-size: 16px;
    span {
      display: inline-block;
      padding: 30px 20px;
    }
  }
  .menuRight {
    font-size: 14px;
    font-weight: bold;
    
      display: flex;
      align-items: center;
      div {
        display: flex;
        padding: 0 10px;
        align-items: center;
      }
      .toggle {
        background: white;
        color: black;
        border:2px solid black;
        border-radius: 25px;
        div {
          padding: 7px 2px;
          
        }
        div.popup {
          z-index:9999;
          display:flex;
          flex-direction: column;
          position: absolute;
          top: 75px;
          right: 30px;
          width: 150px;
          padding: 10px 0;
          background-color: white;
          border:1px solid gray;
          border-radius: 20px;
          box-shadow: 0px 0px 10px -1px fergba(50, 50, 50, 0.31);
          color: #222222;
          overflow: hidden;
          &.hide {
            display: none;
          }
      }
    
  }
`;

const SimpleSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dddddd;
  border-radius: 30px;
  padding: 5px 15px;
  font-size: 14px;
  color: #222222;
  &:hover {
    box-shadow: 9px 10px 30px -8px rgba(0, 0, 0, 0.75);
  }
`;
const RedBtn = styled.div`
  // position: absolute;
  // right: 10px;
  margin-left: 130px;
  width: 32px;
  height: 32px;
  background: orange;
  border: none;
  outline: none;
  border-radius: 36px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Search = styled.div(({ navYellow }) => {
  if (1) {
    return {
      position: 'static',
      display: 'flex',
      justifyContent: 'center',
      padding: '1em 0',
      backgroundColor: 'white',
      // boxShadow: '0px 10px 10px 1px rgba(67,67,67,0.45)',
    };
  }
});
