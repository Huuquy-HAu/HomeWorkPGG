import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from './configs/routes'
import LoginPage from './modules/auth/page/LoginPage'
import { HomePage } from './modules/home/HomePage'
import ProtectedRoute from './modules/common/component/ProtectedRoute'
import PrivateRoute from './modules/common/component/PrivateRoute'
import SignUpPage from './modules/auth/page/SignUpPage'

type Props = {}

export const Routess = (props: Props) => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<ProtectedRoute/>}>
              <Route path={ROUTES.home} element={<HomePage/>}/>
            </Route>

            <Route path={ROUTES.login} element={<PrivateRoute/>} >
              <Route path={ROUTES.login} element={<LoginPage/>}/>
            </Route>
            <Route path={ROUTES.signup} element={<PrivateRoute/>} >
              <Route path={ROUTES.signup} element={<SignUpPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}