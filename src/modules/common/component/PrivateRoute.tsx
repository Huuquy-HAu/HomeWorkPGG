import { Navigate , Outlet, Route } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';


const PrivateRoute = (Props:any) => {
  const auth =  Cookies.get(ACCESS_TOKEN_KEY);

  if(!auth){
    return <Outlet/>
  }
  return <Navigate to={ROUTES.home}/>  
};

export default PrivateRoute;
