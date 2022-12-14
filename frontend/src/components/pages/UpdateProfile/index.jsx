import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import move from '../../../common/move'
import styled from 'styled-components';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Input from '../../atoms/Input';
import PostCode from '../../molecules/PostCode';
import Select from '../../atoms/Select';
import Button from '../../atoms/Button';
import Navbar from '../../molecules/Navbar';
import { useSelector } from 'react-redux';
import userInfo from './userInfo';
import updateUserInfo from './updateUserInfo';
import uploadFile from '../../../common/uploadFile';
import Swal from "sweetalert2";
import theme from '../../../common/theme';
import Text from '../../atoms/Text';

const ImageArea = styled.div`
  width: 9rem;
  height: 9rem;
  position: relative;
  margin: 1rem 0 0 0;
  cursor: pointer;
`

const StyledImage = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({theme}) => theme.colors.gray2};
  background-image: url('${({thumbnail}) => thumbnail}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: 1px solid ${theme.colors.gray2}
`

const CameraImage = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

const CenterAlign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const LeftAlign = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Div = styled.div`
  margin-top: ${(props) => props.mt + 'rem'};
  margin-bottom: ${(props) => props.mb + 'rem'};
  margin-left: ${(props) => props.ml + 'rem'};
  margin-right: ${(props) => props.mr + 'rem'};
  padding-top: ${(props) => props.pt + 'rem'};
  padding-bottom: ${(props) => props.pb + 'rem'};
  padding-left: ${(props) => props.pl + 'rem'};
  padding-right: ${(props) => props.pr + 'rem'};
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem 0 1.5rem;
  gap: 0.5rem;
  height: 90vh;
`

const ButtonArea = styled.div`
  width: 100%;
  margin: 1rem 0 1rem;
  padding-bottom: 1.5rem;
`

const BankAccount = styled.div`
  display: flex;
  align-items: flex-end;
`

const BankDiv = styled.div`
  width: 60%;
  padding-bottom: 0.2rem;
`

const UpdateProfile = () => {

  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  const navigate = useNavigate();

  const myPhoneNum = useSelector((state) => state.token.value.phone);

  const [url, setUrl] = useState(null);
  const clickHandler = () => {
      const fileUploader = document.querySelector('#file-uploader');
      fileUploader.click();
  }
  const uploadImage = async () => {
      const fileUploader = document.querySelector('#file-uploader');
      setUrl(URL.createObjectURL(fileUploader.files[0]));

      const formData = new FormData();
      formData.append('img', fileUploader.files[0]);
      const thumbnailIdx = await uploadFile(formData);
      setInputs({...inputs, picture: thumbnailIdx});
  }

  const [inputs, setInputs] = useState({
    aboutMe: '',
    account: '',
    bank: '',
    name: '',
    newPassword: undefined,
    newPasswordAgain: undefined,
    password: '',
    picture: '',
  });
  const [originData, setOriginData] = useState({
    account: "",
    address: "",
    bank: "",
    detailAddress: "",
    name: "",
    phone: "",
    pictureIdx: "",
    picturePath: "",
    zipCode: "",
  });

  const [postCode, setPostCode] = useState({
		zonecode: '',
    address: '',
    extraAddress: '',
		fullAddress: '',
		detailAddress: '',
	});

  const getPostCode = (data) => {
    setPostCode(data)
  }

	const BANK_OPTIONS = [
		{ value: "????????????", name: "????????????" },
		{ value: "????????????", name: "????????????" },
		{ value: "????????????", name: "????????????" },
		{ value: "????????????", name: "????????????" },
		{ value: "???????????????", name: "???????????????" },
	]

  const getOriginData = async () => {
    setOriginData(await userInfo(myPhoneNum));
  }

  useEffect(() => {
    getOriginData();
  }, []);

  useEffect(() => {
    setInputs({
      ...inputs,
      account: originData.account,
      bank: originData.bank,
      name: originData.name,
      phone: originData.phone,
      picture: originData.pictureIdx,
      newPassword: originData.newPassword,
      newPasswordAgain: originData.newPasswordAgain,
    });
    setPostCode({
      zonecode: originData.zipCode,
      address: '',
      extraAddress: '',
      detailAddress: originData.detailAddress,
      fullAddress: originData.address,        
    });
    setUrl(originData.picturePath)
  }, [originData]);

  const onClickHandler = async () => {
    const payload = {
      phone: inputs.phone,
      aboutMe: inputs.aboutMe,
      account: inputs.account,
      address: postCode.fullAddress,
      bank: inputs.bank,
      detailAddress: postCode.detailAddress,
      name: inputs.name,
      newPassword: inputs.newPassword,
      newPasswordAgain: inputs.newPasswordAgain,
      password: inputs.password,
      picture: inputs.picture,
      zipCode: postCode.zonecode,
    }
    console.log(payload)
    if (payload.newPassword !== payload.newPasswordAgain) {
      // window.alert('????????? ??????????????? ???????????? ??????????????????.')
      Swal.fire({
        title: '??????!',
        text: '????????? ??????????????? ???????????? ??????????????????.',
        imageUrl: '/assets/Swal_image/????????????.png',
        imageHeight: 150,
        confirmButtonColor: theme.colors.green3, 
     })
    }
    else {
      const isSuccess = await updateUserInfo(payload);
      if (isSuccess) {
        console.log('???????????? ?????? ??????');
        move(navigate, '/mypage');
      } else {
        console.log('??????');
      }
    }
  }

  return (
    <>
      <Navbar navigate={navigate} isLogin={isLogin} setIsLogin={setIsLogin} />
      <Layout>
        <LeftAlign>
          <Button mode="graytext" onClick={() => move(navigate, -1)}>
            ?????? ??????
          </Button>
        </LeftAlign>
        <CenterAlign>
        <ImageArea  onClick={clickHandler}>
          <input type='file' hidden id='file-uploader' onChange={uploadImage} />
          <StyledImage thumbnail={url}/>
          <CameraImage>
            <PhotoCameraIcon fontSize="large"/>
          </CameraImage>
        </ImageArea>
        <Text color="gray2">1MB ????????? ????????? ???????????????</Text>
        </CenterAlign>
        <Input label="?????????" status="readOnly" value={originData.phone}/>
        <Input label="??????" status="readOnly" value={originData.name}/>
        <Input 
          label="????????????" 
          placeholder="??????????????? ??????????????????" 
          type="password"
          name="password"
          setValue={setInputs}
        />
        <Input 
          label="?????? ????????????"
          placeholder="????????? ??????????????? ??????????????????" 
          type="password"
          name="newPassword"
          setValue={setInputs}
        />
        <Input 
          label="?????? ???????????? ??????"
          placeholder="????????? ??????????????? ?????? ??????????????????" 
          type="password"
          name="newPasswordAgain"
          setValue={setInputs}
        />
        <BankAccount>
          <Input 
            label="????????????"  
            value={inputs.account}
            placeholder="??????????????? ??????????????????" 
            name="account" 
            setValue={setInputs}/>
          <BankDiv>
            <Select options={BANK_OPTIONS} name="bank" setValue={setInputs} selectedvalue={inputs.bank} defaultValue="?????? ??????"/>
          </BankDiv>
        </BankAccount>
        <PostCode setPostCode={getPostCode} defaultValue={postCode}/>
        <ButtonArea>
          <Button width="100%" onClick={onClickHandler}>????????????</Button>
        </ButtonArea>
      </Layout>
    </>
  );
}

export default UpdateProfile;