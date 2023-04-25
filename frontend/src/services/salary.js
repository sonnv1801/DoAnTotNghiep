import Axios from "axios";
// const API = "https://maizoshop.onrender.com/v1/auth";
const API = "http://localhost:8000/v1/salary";

export class SalaryService {
  createSalary(salary, accessToken) {
    return Axios.post(API, salary, {
      headers: { token: `vanson ${accessToken}` },
    });
  }

  getSalary() {
    return Axios.get(API);
  }

  getIdSalary(id) {
    return Axios.get(`${API}/${id}` ,
    );
  }

  updateSalary(id, accessToken, salary) {
    return  Axios.put(`${API}/${id}`, salary, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
  deleteSalary(id, accessToken) {
    return Axios.delete(`${API}/${id}`, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
