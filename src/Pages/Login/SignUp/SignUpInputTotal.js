import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const SignUpInputTotal = ({ setSignUpModal }) => {
  const [signUpInput, setSignUpInput] = useState({ lastName: '', firstName: '', date: '', email: '', pw: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setSignUpInput({ ...signUpInput, [name]: value });
  };

  const history = useHistory();

  function agreement() {
    fetch('/user/signup', {
      method: 'POST',
      body: JSON.stringify({
        last_name: signUpInput.lastName,
        first_name: signUpInput.firstName,
        date_of_birth: signUpInput.date,
        email: signUpInput.email,
        password: signUpInput.pw,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'SUCCESS') {
          alert('회원가입 성공');
          setSignUpModal(false);
          history.push('/');
        }
      });
  }
  return (
    <InPutTotal>
      <Input>
        <InputLastName type="text" placeholder="이름(예: 길동)" name="lastName" value={signUpInput.lastName} onChange={handleChange} />
        <InputFirstName type="text" placeholder="성(예: 홍)" name="firstName" value={signUpInput.firstName} onChange={handleChange} />
        <MainCheck>정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요.</MainCheck>
        <InputBirth type="date" placeholder="생년월일" name="date" value={signUpInput.date} onChange={handleChange} />
        <MainCheck>만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른 회원에게 공개되지 않습니다.</MainCheck>
        <InputBirth type="text" placeholder="이메일" name="email" value={signUpInput.email} onChange={handleChange} />
        <MainCheck>예약 확인과 영수증을 이메일로 보내드립니다</MainCheck>
        <InputBirth type="password" placeholder="비밀번호" name="pw" value={signUpInput.pw} onChange={handleChange} />
        <MainCheck>
          예아래의 동의 및 계속하기 버튼을 선택하면, 에어비앤비의 서비스 약관, 결제 서비스 약관, 개인정보 처리방침, 차별 금지 정책에 동의하는
          것입니다.
        </MainCheck>
        <InPutAgree onClick={agreement}>동의 및 계속하기</InPutAgree>
        <CheckBoxContent>
          에어비앤비 회원 전용 할인, 추천 여행 정보, 마케팅 이메일, 푸시 알림을 보내드립니다. 계정 설정 또는 마케팅 알림에서 언제든지 메시지 수신을
          거부할 수 있습니다.
        </CheckBoxContent>
      </Input>
    </InPutTotal>
  );
};

const InPutTotal = styled.div`
  height: 540px;
  margin-top: 50px;
  overflow: scroll;
`;

const Input = styled.div`
  width: 550px;
  margin: 0 15px;
`;

const InputLastName = styled.input`
  width: 100%;
  height: 55px;
  border: ${props => (props.LastName ? '2px solid black' : '1px solid lightgray')};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  transition: width 3s;
`;

const InputFirstName = styled.input`
  width: 100%;
  height: 55px;
  border: 1px solid lightgray;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const MainCheck = styled.div`
  margin-top: 10px;
  color: rgb(113, 113, 113);
  font-size: 13px;
`;

const InputBirth = styled.input`
  width: 100%;
  height: 55px;
  margin-top: 20px;
  border: 1px solid lightgray;
  border-radius: 12px;
`;

const InPutAgree = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 20px;
  border-radius: 10px;
  border: none;
  background-color: rgb(255, 56, 92);
  color: white;
  font-size: 18px;
`;

const CheckBoxContent = styled.div`
  margin-top: 40px;
  padding: 20px 0;
  border-top: 1px solid lightgray;
  color: rgb(113, 113, 113);
  font-size: 13px;
`;

export default SignUpInputTotal;
