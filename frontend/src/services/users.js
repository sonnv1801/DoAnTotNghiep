import Axios from "axios";
// const API = "https://maizoshop.onrender.com/v1/auth";
const API = "http://localhost:8000/v1/auth";
const APIUser = "http://localhost:8000/v1/user";

export class UserService {
  Login(user) {
    return Axios.post(`${API}/login`, user);
  }
  Register(user) {
    return Axios.post(`${API}/register`, user);
  }
  getAllUser(accessToken) {
    return Axios.get(APIUser, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
  deleteUser(id, accessToken) {
    return Axios.delete(`${APIUser}/${id}`, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
