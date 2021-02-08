import React, {useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getUserRole, logout} from '../utils.js';

const ProtectedRoute =   ({ component: Component, role, ...rest })  =>  {
  const [roleValue, setRoleValue] = useState("");
  const [tempRole, setTempRole] = useState("");
  async function fetchData(){
    let tokenRole;
    console.log("fetch");
    tokenRole = await getUserRole();
    setTempRole(tokenRole);
  }
  useEffect(()=>{
    fetchData();
    setRoleValue(tempRole);
    return () => {
      setRoleValue("")// This worked for me
    };
  }, [tempRole]);
  return (
     <Route {...rest} render= {
       (props)  =>  {
        let flag = 0;

        console.log(roleValue);
        if (roleValue) {
          if(roleValue===role){
              // flag = 1;
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
