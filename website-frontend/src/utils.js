import axios from 'axios';

export async function getUserRole(){
  const res = await axios.get('http://localhost:8080/api/getUserRole/', {withCredentials: true});
  const role =  res.data.role;
  return role;
}

export async function logout(){
  const res = await axios.get('http://localhost:8080/api/logout/', {withCredentials: true});
}
