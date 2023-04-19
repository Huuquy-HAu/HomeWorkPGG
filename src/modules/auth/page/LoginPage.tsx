import React, { useState } from 'react'
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import logo from '../../../logo-420-x-108.png';
import { API_PATHS } from '../../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { getErrorMessageResponse } from '../../../utils';
import LoginForm from '../component/LoginForm'
import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';


type Props = {}

const LoginPage = (props: Props) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const Nav = useNavigate()
    const { i18n } = useTranslation()
    const success = () => {
        message
            .open({
                type: 'loading',
                content: 'Đang đăng nhập . . .  .',
                duration: 2.5,
            })
            .then(() => message.success('Đăng nhập thành công ', 2.5))
        Nav(ROUTES.home)
    };

    const onLogin = async (values: ILoginParams) => {
        setErrorMessage('');
        setLoading(true);

        const res = await axios.post<Promise<AxiosResponse<any, any>>, any>(API_PATHS.signIn, { email: values.email, password: values.password }, { headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '' } })

        console.log(res);
        setLoading(false);

        if (res?.data.code === RESPONSE_STATUS_SUCCESS) {
            console.log('set token oke');
            Cookies.set(ACCESS_TOKEN_KEY, res.data.data.token, { expires: values.rememberMe ? 7 : undefined });
            success()
            Nav(ROUTES.home)
            return;
        }
        setErrorMessage(getErrorMessageResponse(res));
    }

    const changeLanguage = (e:any) => {
        i18n.changeLanguage(e.target.value)
    }
    return (
        <div
            className="container"
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <select className="form-select w-25" onChange={(e) => {changeLanguage(e)}}>
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
            </select>
            <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />
            <h1>Form Login V2</h1>
            <LoginForm onLogin={onLogin} />
            <div >
                <a href={ROUTES.signup}><button className='btn btn-light '>{t('register')}</button></a>
            </div>
        </div>
    )
}

export default LoginPage