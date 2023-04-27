import axios from 'axios'
import Cookies from 'js-cookie'
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants'
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserInfor, selectUserInfor, setUserInfor } from '../../auth/redux/userReducer'
import { IUser } from '../../../models/user'
import '../scss/ProfilePage.scss'
import { ROUTES } from '../../../configs/routes'
import { Button, Modal, message } from 'antd'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { generateAvatarUpload } from '../../../utils/upload'
import { useNavigate } from 'react-router-dom'

interface Props {

}


function ProfilePage(props: Props) {
  const userInforData: IUser = useSelector(selectUserInfor)
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch()
  const [image, setImage] = useState(userInforData?.avatar);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState<any>({ unit: '%', width: 30, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [count, setCount] = useState<number>(0)
  const nav = useNavigate()

  const getDataUser = async () => {
    try {
      const res = await axios.get("http://api.training.div3.pgtest.co/api/v1/user", { headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) } })
      console.log(res);
      if (res?.status === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfor(res.data.data))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handelLogout = () => {
    Cookies.remove(ACCESS_TOKEN_KEY)
    dispatch(removeUserInfor())
    nav('/login')
    message.success('Đăng xuất thành công')
  }

  useEffect(() => {
    getDataUser()
  }, [count])

  const changeAvatar = () => {
    if (avatarInputRef.current !== null) avatarInputRef.current.click();
  };

  const onChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    if (files !== null && files.length) reader.readAsDataURL(files[0]);
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const onLoad = (img: any) => {
    imgRef.current = img.target
  };



  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );
  }, [completedCrop]);


  const uploadAvatar = async () => {
    const file = await generateAvatarUpload(previewCanvasRef.current, completedCrop);
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
      };
      const json = await axios.put("http://api.training.div3.pgtest.co/api/v1/user", formData, config);
      console.log(json);
      if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
        message.success('Đổi ảnh đại diện thành công')
        setCount(count + 1)
      }
    }
  };

  return (
    <div className='ProfilePage'>
      <div className="container-header">
        <Button onClick={() => { nav('/') }}>
          Trang chủ
        </Button>
      </div>
      <div className="container">
        <div className="container-left">
          <h5>Email</h5>
          <p>{userInforData?.email}</p>
          <h5>Name</h5>
          <p>{userInforData?.name}</p>
        </div>
        <div className="container-right">
          <div className="profilepic">
            <img src={userInforData?.avatar ? `http://api.training.div3.pgtest.co/${userInforData?.avatar}` : "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"} className="profilepic__image" alt="avatar_url" />
            <div className="profilepic__content" onClick={changeAvatar}>
              <input ref={avatarInputRef} hidden type="file" onChange={onChooseAvatar} accept="image/*" />
              <span className="profilepic__text">Upload Avatar</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container-footer">
        <Button type='primary' danger onClick={handelLogout}>
          Log Out
        </Button>
      </div>


      <Modal title="Crop image and Preview Image" open={openModal} onCancel={handleCancel} footer={false}>
        <ReactCrop
          crop={crop}
          onChange={(newCrop: any) => {
            setCrop(newCrop);
          }}
          onComplete={(c) => setCompletedCrop(c)}
        >
          <img
            ref={previewCanvasRef}
            onLoad={onLoad}
            alt="Crop me"
            src={image}
            style={{ transform: `scale(${1}) rotate(${0}deg)` }}
          />

          <div>
          </div>
        </ReactCrop>
        <canvas
          ref={previewCanvasRef}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />

        <div>
          <Button
            type="primary"
            onClick={() => {
              setOpenModal(false);
              uploadAvatar();
            }}
          >
            Save Image
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ProfilePage