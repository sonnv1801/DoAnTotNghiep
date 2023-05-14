import Axios from "axios";

// const API =
//   "https://script.googleusercontent.com/a/macros/donga.edu.vn/echo?user_content_key=8QNh2mvVPp5-cvMJW95oNSI-FK6sMZZ3yW20QsLeSEWWobUz0dL5rnumJR2EWJyfOc8K2iZ7VegbmX42ElL-YLJR5YdO_zZfOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKArlU61qYxbb-Cw7-Azy2jl68n4RAo2RJwvyL1cwQJjGlh58drECpWlxMl8FqO9l3iJPIXNDsr6PCwDMyyIm09mt3j2fAJNxerMEG2Rcvdk7dTrxJX6Gcm7XakzF-f2ti1iMcBu2JttcX2RYAofONDg&lib=MA5iZP91Es_FgaW8G4Qj1xkK0XokoeajB";

const API = "http://localhost:8000/v1/timekp";
export class StaffService {
  getAllStaff() {
    return Axios.get(API);
  }
}
