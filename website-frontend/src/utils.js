import axios from "axios";

export async function getUserRole() {
  const res = await axios.get("http://localhost:8080/api/getUserDetails/", {
    withCredentials: true,
  });
  const role = res.data.role;
  return role;
}
export async function getUserID() {
  const res = await axios.get("http://localhost:8080/api/getUserDetails/", {
    withCredentials: true,
  });
  const userid = res.data.userid;
  return userid;
}
export async function getAscii() {
  const res = await axios.get("http://localhost:8080/api/ascii/", {
    withCredentials: true,
  });
  const ascii = res.data.ascii;
  return ascii;
}

export async function logout() {
  await axios.get("http://localhost:8080/api/logout/", {
    withCredentials: true,
  });
}
