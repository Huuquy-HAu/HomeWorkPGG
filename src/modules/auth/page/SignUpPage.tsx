import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { API_PATHS } from '../../../configs/api'
import SignUpForm from '../component/SignUpForm'
import { error } from 'console'
import {  ISignUpParams } from '../../../models/auth'
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants'
import Cookies from 'js-cookie'
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setUserInfor } from '../redux/userReducer'





const SignUpPage = () => {
    const [location, setLocation] = useState<any>([])
    const nav = useNavigate()
    const dispatch = useDispatch()

    const getLocation = async () => {
        const res = await axios.get(API_PATHS.getLocation)
        setLocation([...res?.data.data])

    }

    
    const errorToastAntd = (message:string) => {
        notification.error({
            message:"Error",
            description:message
        })
    }

    
    const successToastAntd = (message:string) => {
        notification.success({
            message:"Success",
            description:message
        })
    }


    const onSignUp = async (values: ISignUpParams) => {
        const res = await axios.post(API_PATHS.signUp,{ email: values.email, password: values.password , repeatPassword:values.repeatPassword , name: values.name , gender: values.gender , region:values.region, state: values.state})
        if (res?.data.code === RESPONSE_STATUS_SUCCESS) {
            dispatch(setUserInfor(res.data.data))
            Cookies.set(ACCESS_TOKEN_KEY, res.data.data.token, { expires: 7}); 
            successToastAntd("Successful account registration, you will be redirected to the homepage")
            nav('/')
            return;
        }
    }

    useEffect(() => {
        getLocation()
    }, [])


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
            <SignUpForm location={location}  onSignUp= {onSignUp} />
        </div>
    )
}

export default SignUpPage