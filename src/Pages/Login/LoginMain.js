import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import KakaoLogin from './KakaoLogin';
import { AiOutlineMail, AiFillMediumSquare } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const LoginMain = ({ isOpenSignUp, setLoginModal }) => {
  // const { Kakao } = window;
  const history = useHistory();
  const [InputEmail, setInputEmail] = useState('');
  const [InputPw, setInputPw] = useState('');

  //카카오톡 로그아웃
  // function SocialLogout() {
  //   if (!Kakao.Auth.getAccessToken()) {
  //     console.log('Not logged in.');
  //     return;
  //   }
  //   Kakao.Auth.logout(function () {
  //     console.log(Kakao.Auth.getAccessToken());
  //   });

  //   Kakao.API.request({
  //     url: '/v1/user/unlink',
  //     success: function (response) {
  //       console.log(response);
  //     },
  //     fail: function (error) {
  //       console.log(error);
  //     },
  //   });
  // }

  const sendInfo = () => {
    fetch('/user/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: InputEmail,
        password: InputPw,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        localStorage.setItem('access_token', res.token);
        if (res.message === 'SUCCESS') {
          alert('로그인 성공');
          setLoginModal(false);
          history.push('/');
        } else {
          alert('로그인 실패');
        }
      });
  };

  const handleCheckEmail = e => {
    setInputEmail(e.target.value);
  };

  const handleCheckPw = e => {
    setInputPw(e.target.value);
  };

  return (
    <Main>
      <InPutTotal>
        <Input>
          <InputId
            type="text"
            placeholder="이메일 &#10;"
            onChange={handleCheckEmail}
            CheckEmail={InputEmail}
          />
          <InputPassword type="password" placeholder="비밀번호" onChange={handleCheckPw} CheckPw={InputPw} />
        </Input>
        <MainCheck>전화나 문자로 전화번호를 확인하겠습니다. 일반 문자 메시지 요금 및 데이터 요금이 부과됩니다.</MainCheck>
        <InPutContinue onClick={sendInfo}>계속</InPutContinue>
        <DrawLine>또는</DrawLine>
        <ButtonEmail>
          <ButtonIndividual>
            <Button>
              <Buttons>
                <AiOutlineMail />
              </Buttons>
              <LoginContent onClick={isOpenSignUp}>이메일로 로그인하기</LoginContent>
            </Button>
          </ButtonIndividual>
          <ButtonIndividual>
            <KakaoLogin />
          </ButtonIndividual>
          <ButtonIndividual>
            <Button>
              <Buttons>
                <FcGoogle />
              </Buttons>
              <LoginContent>구글로 로그인하기</LoginContent>
            </Button>
          </ButtonIndividual>
          <ButtonIndividual>
            <Button>
              <Buttons>
                <AiFillMediumSquare />
              </Buttons>
              <LoginContent>네이버로 로그인하기</LoginContent>
            </Button>
          </ButtonIndividual>
        </ButtonEmail>
      </InPutTotal>
    </Main>
  );
};

const Main = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const InPutTotal = styled.div`
  margin-top: 450px;
`;

const Input = styled.div`
  width: 550px;
  height: 100px;
`;

const InputId = styled.input`
  width: 100%;
  height: 50%;
  outline: none;
  border: ${props => (props.CheckEmail.includes('@') ? '2px solid black' : '2px solid lightgray')};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const InputPassword = styled.input`
  width: 100%;
  height: 50%;
  outline: none;
  border: ${props => (props.CheckPw.length > 7 ? '2px solid black' : '1px solid lightgray')};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const MainCheck = styled.div`
  margin-top: 10px;
  color: rgb(113, 113, 113);
  font-size: 13px;
`;

const InPutContinue = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border-radius: 10px;
  border: none;
  background-color: rgb(255, 56, 92);
  color: white;
  font-size: 18px;
`;

const DrawLine = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  margin: 30px 0px;

  ::before,
  ::after {
    content: '';
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const ButtonEmail = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonIndividual = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

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

export default LoginMain;
