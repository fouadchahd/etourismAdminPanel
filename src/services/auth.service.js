import axios from "axios";

const API_URL = "http://localhost:8000/api/";
const  headers= {
    'Content-Type': 'application/ld+json',
    'Accept': 'application/ld+json'
  };
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login_check", {
        username,
        password
      },headers)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

   registerAdmin(firstName,lastName, email, password) {
    const res = axios.post(API_URL + "tourists", {
      firstName,
      lastName,
      email,
      "roles": [
        "ROLE_ADMIN"
      ],
      password
    });
    console.log(res.gender);
    return res.data;
  }
  registerUser(firstName,lastName, email, password) {
    return axios.post(API_URL + "tourists", {
      firstName,
      lastName,
      email,
      "roles": [
        "ROLE_USER"
      ],
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();