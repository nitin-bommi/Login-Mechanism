import React from 'react';
import {getUserRole} from '../utils.js';

class ProtectedRoute extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isAuthenticated: false
    };
  }
  async componentDidMount(){
    const role = this.props.role;
    const tokenRole =  await getUserRole();
    const isAuthenticated = (role===tokenRole);
    if(!isAuthenticated){
      window.location.replace('/unauthorized');
    }else{
      console.log(role);
      console.log(tokenRole);
      this.setState({
        isAuthenticated
      })
    }

  }
     render() {
        const Component = this.props.component;


         return this.state.isAuthenticated ? (
               <Component />
          ) : (
            // <h1>he.lllo</h1>

            null
            // <Unauthorized />
                // <Redirect to={{ pathname: '/unauthorized' }} />

          );
    }
}

export default ProtectedRoute;
// const ProtectedRoute =   ({ component: Component, role, roleValue, ...rest })  =>  {
//
//   return (
//      <Route {...rest} render= {
//        (props)  =>  {
//         let flag = 0;
//
//         console.log(roleValue);
//         console.log(role);
//         if (roleValue) {
//           if(roleValue===role){
//               // flag = 1;
//               return <Component {...rest} {...props}/>;
//           }
//         }
//
//       if(flag === 0) {
//
//           return <Redirect to={
//             {
//               pathname: '/unauthorized',
//               state: {
//                 from: props.location
//               }
//             }
//           } />
//         }
//     }
//   } />
//   )
// }
