import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from './configs/routes'
import LoginPage from './modules/auth/page/LoginPage'
import { HomePage } from './modules/home/page/HomePage'
import ProtectedRoute from './modules/common/component/ProtectedRoute'
import PrivateRoute from './modules/common/component/PrivateRoute'
import SignUpPage from './modules/auth/page/SignUpPage'
import ProductPage from './modules/product/page/ProductPage'
import ProfilePage from './modules/user/page/ProfilePage'

type Props = {}

export const Routess = (props: Props) => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<ProtectedRoute/>}>
              <Route path={ROUTES.home} element={<HomePage/>}/>
              <Route path={ROUTES.profile} element={<ProfilePage/>}/>
              <Route path={`${ROUTES.product}/:id`} element={<ProductPage/>}/>
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