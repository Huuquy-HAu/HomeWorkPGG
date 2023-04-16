import { redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';

interface Props{}

const ProtectedRoute = (props: Props) => {
  const { ...rest } = props;
  const auth = Cookies.get(ACCESS_TOKEN_KEY);

  if (auth) {
    return <Route {...rest} />;
  }

  return redirect(ROUTES.login);
};

export default ProtectedRoute;
