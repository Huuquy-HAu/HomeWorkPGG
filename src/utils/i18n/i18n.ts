import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "welcome": "Welcome",
            "email": "Email",
            "userName": "User Name",
            "password": "Password",
            "repeatPassword": "Repeat Password",
            "rememberMe": "Remember Me",
            "emailRequire": "Email Require",
            "emailInvalid": "Email Invalid",
            "passwordRequire": "Password Require",
            "minPasswordInvalid": "Password minimum 4 characters",
            "register": "Register",
            "login":"Login",
            "signUpForm":"Sign Up Form",
            "fullName":"Full Name",
            "gender":"Gender",
            "male":"Male",
            "female":"Female",
            "region":"Region",
            "state":"State"
        }
    },
    vi: {
        translation: {
            "welcome": "Xin Chào",
            "email": "Địa chỉ Email",
            "userName": "Tên tài khoản",
            "password": "Mật khẩu",
            "repeatPassword": "Nhập lại mật khẩu",
            "rememberMe": "Lưu thông tin đăng nhập",
            "emailRequire": "Vui lòng nhập địa chỉ email",
            "emailInvalid": "Địa chỉ email không hợp lệ",
            "passwordRequire": "Vui lòng nhập mật khẩu",
            "minPasswordInvalid": "Mật khẩu tối thiểu 4 ký tự",
            "register": "Đăng Ký",
            "login":"Đăng nhập",
            "signUpForm":"Trang đăng ký",
            "fullName":"Họ và tên",
            "gender":"Giới tính",
            "male":"Nam",
            "female":"Nữ",
            "region":"Quốc gia",
            "state":"Tiểu bang"
        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: "vi",
    fallbackLng: "vi",
    interpolation: {
        escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      }
})

export default i18n