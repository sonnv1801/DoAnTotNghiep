import Axios from "axios";
// const API = "https://maizoshop.onrender.com/v1/auth";
const API = "http://localhost:8000/v1/time";

export class TimeService {
  createTime(time) {
    return Axios.post(`${API}/time`, time);
  }
  getTime() {
    return Axios.get(`${API}/time`);
  }
  deleteTime(id) {
    return Axios.delete(`${API}/time/${id}`, );
  }
}
