import styled from 'styled-components';
import contact from './contact.png';

export default function Footer() {
  return (
    <FooterContainer>
      <div>
        <div>© 2021 AirDroptheBeat, Inc. All rights reserved</div>
        <div>개인정보 처리방침 ·</div>
        <div>이용약관 ·</div>
        <div>사이트맵 ·</div>
        <div>변경된 환불 정책 ·</div>
        <div>회사 세부정보</div>
      </div>
      <div className="imgContainer">
        <img src={contact} alt="contact icon" />
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
  border-top: 1px solid #dddddd;
  padding: 24px 80px;
  font-size: 14px;
  div {
    display: flex;
    margin-right: 40px;
    div {
      margin-right: 5px;
    }
  }
  .imgContainer {
    width: 100px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
