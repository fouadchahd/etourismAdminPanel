import axios from "axios";

const API_URL = "localhost:8000/api/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login_check", {
        username,
        password
      })
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
    return axios.post(API_URL + "tourists", {
      firstName,
      lastName,
      email,
      "roles": [
        "ROLE_ADMIN"
      ],
      password
    });
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