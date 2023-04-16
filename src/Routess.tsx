import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from './configs/routes'
import LoginPage from './modules/auth/page/LoginPage'
import { HomePage } from './modules/home/HomePage'
import ProtectedRoute from './modules/common/component/ProtectedRoute'

type Props = {}

export const Routess = (props: Props) => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={ROUTES.login} Component={LoginPage}/>
            <Route path={ROUTES.home} Component={HomePage}/>
        </Routes>
    </BrowserRouter>
  )
}