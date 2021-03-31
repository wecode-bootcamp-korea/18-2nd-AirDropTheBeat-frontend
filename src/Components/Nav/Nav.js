import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import SelectOption from './SelectOption';
import logo from './logo.png';
import logoY from './logoY.png';
import Login from '../../Pages/Login/Login';
import SignUp from '../../Pages/Login/SignUp/SignUp';
import { ImEarth } from 'react-icons/im';
import { GiHamburgerMenu, GiPianoKeys } from 'react-icons/gi';
import { ImAngry } from 'react-icons/im';
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
  const [navYellow, setNavYellow] = useState(false);
  const [navSearch, setNavSearch] = useState(false);

  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  //useHistory()
  const history = useHistory();
  // NAV : 스크롤에 따라 다르게 나타내기
  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', handleScrollY);
  }, []);

  const _location = useLocation();
  useEffect(() => {
    if (_location.pathname !== '/') {
      setNavYellow(true);
    }
  }, [_location]);

  const handleScrollY = () => {
    if (_location.pathname === '/' && window.scrollY < 100) {
      setNavYellow(false);
      setNavSearch(false);
      return;
    }
    if (_location.pathname === '/' && window.scrollY >= 100) {
      setNavYellow(true);
      return;
    }
  };

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
    const query = `?city_id=1&district=${location}&checkin=${startDate}&checkout=${endDate}&adult=${adult}&child=${child}&baby=${baby}`;
    history.push(`/room/list${query}`);
  };
  // 로그인 로그아웃
  // const handleLogin = () => {
  //   localStorage.setItem('token', 'mimilover');
  // };

  const handleLogout = () => {
    alert('로그아웃 성공!');
    localStorage.removeItem('token');
  };
  //

  return (
    <>
      {navYellow || (
        <Corona>
          <span>에어비앤비의 코로나19 대응 방안에 대한 최신 정보를 확인하세요.</span>
        </Corona>
      )}
      <NavWrapper navYellow={navYellow}>
        <Menu>
          <div>
            <img src={navYellow ? logoY : logo} alt="Logo" width="218px" />
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
              <div>호스트 되기</div>
              <div>
                <ImEarth color={navYellow ? 'black' : 'white'} size="16px" />
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
                    <div onClick={() => setLoginModal(true)}>로그인</div>
                    <div
                      onClick={() => {
                        setSignUpModal(true);
                      }}
                    >
                      회원가입
                    </div>
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
              clickSearchMenu={clickSearchMenu}
              navYellow={navYellow}
            />
          </Search>
        )}
      </NavWrapper>
      {/* <NavPadding navYellow={navYellow}></NavPadding> */}
      <Login isOpen={loginModal} isOpenSignUp={setSignUpModal} isClose={setLoginModal} />
      <SignUp isOpen={signUpModal} isClose={setSignUpModal} />
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
  position: navYellow ? 'fixed' : 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  // height: '90px',
  backgroundColor: navYellow ? 'white' : 'black',
  color: navYellow ? 'black' : 'white',
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
      border: 2px solid black;
      border-radius: 25px;
      div {
        padding: 7px 2px;
      }
      div.popup {
        z-index: 999;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 75px;
        right: 30px;
        width: 150px;
        padding: 10px 0;
        background-color: white;
        border: 1px solid gray;
        border-radius: 20px;
        box-shadow: 0px 0px 10px -1px fergba(50, 50, 50, 0.31);
        color: #222222;
        overflow: hidden;

        div {
          width: 100%;
          display: flex;
          justify-content: center;
          &:hover {
            background: orange;
          }
        }
        &.hide {
          display: none;
        }
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
  if (navYellow) {
    return {
      position: 'static',
      display: 'flex',
      justifyContent: 'center',
      padding: '1em 0',
      backgroundColor: 'white',
      // boxShadow: '0px 10px 10px 1px rgba(67,67,67,0.45)',
    };
  }
  return {
    boxShadow: '2px 7px 21px -3px rgba(67,67,67,0.45)',
    // border: '1px solid pink',
    borderRadius: '30px',
    position: 'absolute',
    top: '70px',
    left: 'calc(50% - 450px)',
    color: 'black',
  };
});
