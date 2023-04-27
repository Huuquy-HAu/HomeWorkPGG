import { ILoginParams } from '../../../models/auth';
import logo from '../../../logo-420-x-108.png';
import { API_PATHS } from '../../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import LoginForm from '../component/LoginForm'
import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux"
import { setUserInfor } from '../redux/userReducer';



type Props = {}

const LoginPage = (props: Props) => {
    const { t } = useTranslation()
    const Nav = useNavigate()
    const { i18n } = useTranslation()
    const dispatch = useDispatch()

    const success = () => {
        message
            .open({
                type: 'loading',
                content: 'Đang đăng nhập . . .  .',
                duration: 0.5,
            })
            .then(() => message.success('Đăng nhập thành công ', 2.5))
        Nav(ROUTES.home)
    };

    const onLogin = async (values: ILoginParams) => {
        try {
            const res = await axios.post<Promise<AxiosResponse<any, any>>, any>(API_PATHS.signIn, { email: values.email, password: values.password }, { headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '' } })
            console.log(res);
            if (res?.data.code === RESPONSE_STATUS_SUCCESS) {
                dispatch(setUserInfor(res.data.data))
                Cookies.set(ACCESS_TOKEN_KEY, res.data.data.token, { expires: values.rememberMe ? 7 : undefined });
                success()
                Nav(ROUTES.home)
                return;
            }
        } catch (error) {
            message.error('wrong email/password')
        }
    }

    const changeLanguage = (e: any) => {
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
            <select className="form-select w-25" onChange={(e) => { changeLanguage(e) }}>
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