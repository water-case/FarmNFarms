import React from 'react';
import Swal from "sweetalert2";
import theme from '../../../../common/theme';

const Cancel = () => {
  Swal.fire({
    text: '결제에 실패하였습니다. 홈으로 이동합니다.',
    confirmButtonColor: theme.colors.green3, 
  })
  // window.alert('결제를 취소하였습니다. 홈으로 이동합니다.')
  window.location.href = '/';
  return (
    <>
    </>
  );
};

export default Cancel;
