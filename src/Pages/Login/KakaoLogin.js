import React from 'react';
import { config } from '../../config';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';

const KakaoLogin = () => {
  const history = useHistory();
  const { Kakao } = window;

  function SocialLogin() {
    Kakao.init(config.KAKAO_URL);
    console.log(Kakao.isInitialized());
    Kakao.Auth.login({
      success: function (authObj) {
        console.log(authObj);
        fetch('http://10.58.7.202:8000/user/signin-kakao', {
          method: 'GET',
          headers: {
            Authorization: authObj.access_token,
          },
        })
          .then(res => res.json())
          .then(res => {
            localStorage.setItem('access_token', res.access_token);
            if (res.access_token) {
              alert('로그인 성공!');
              history.push('/');
            } else {
              alert('다시 확인해주세요');
            }
          });

        Kakao.API.request({
          url: '/v2/user/me',
          success: res => {
            const kakao_account = res.kakao_account;
            console.log(kakao_account);
          },
        });
      },
      fail: function (err) {
        console.log('에러', err);
        alert('로그인실패!');
      },
    });
  }
  return (
    <Button onClick={SocialLogin}>
      <Buttons>
        <RiKakaoTalkFill />
      </Buttons>
      <LoginContent>카카오로 로그인하기</LoginContent>
    </Button>
  );
};

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  border-radius: 12px;
  border: 1px solid gray;
  font-size: 15px;
`;

const LoginContent = styled.div``;

const Buttons = styled.div`
  position: absolute;
  left: 0;
  margin-left: 10px;
`;

export default KakaoLogin;
