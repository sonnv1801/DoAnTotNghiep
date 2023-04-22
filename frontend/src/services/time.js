import Axios from "axios";
// const API = "https://maizoshop.onrender.com/v1/auth";
const API = "http://localhost:8000/v1/time";

export class TimeService {
  createTime(time, accessToken) {
    return Axios.post(API, time, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
  getTime() {
    return Axios.get(API);
  }
  deleteTime(id, accessToken) {
    return Axios.delete(`${API}/${id}`, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
