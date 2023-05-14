import Axios from "axios";

const API = "http://localhost:8000/v1/timekp";

export class TimeKP {
  gettimeKP(accessToken) {
    return Axios.get(API, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
