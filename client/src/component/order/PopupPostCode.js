import React from 'react';
import { Button } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';

const PopupPostCode = ({ done }) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    done(data);
  };

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '55%',
    width: '500px',
    height: '500px',
    padding: '7px',
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
    </div>
  );
};

export default PopupPostCode;
