import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        let flag = 0;

        const token = Cookies.get('token');
        if (token) {
          const roleValue = jwt_decode(token).role;
          if(roleValue===role){
              flag = 1;
              return <Component {...rest} {...props}/>;
          }
        }

      if(flag === 0) {

          return <Redirect to={
            {
              pathname: '/unauthorized',
              state: {
                from: props.location
              }
            }
          } />
        }
    }
  } />
  )
}

export default ProtectedRoute;
