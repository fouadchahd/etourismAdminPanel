import axios from "axios";
import Cookies from "js-cookie";
import service_env from "./__env.service";
const API_URL = service_env.API_URL;
const headers = service_env.JSON_HEADER;

export const registerAdmin = async function(firstName,lastName, email, password){
    return axios.post(API_URL + "tourists", {
      firstName,
      lastName,
      email,
      "roles": [
        "ROLE_ADMIN"
      ],
      password
    }).then(({data})=>{
      localStorage.setItem("testRegister", JSON.stringify(data));
    });
  };
export const login = async function(username, password) {
    return axios
    .post(API_URL + "login_check", {
      username,
      password
    }, headers);
      /*if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }*/
  }

export const logout = () => {
    localStorage.removeItem('user_id');
    Cookies.remove("jwt_auth", { expires: 7, path: "/" });
    localStorage.removeItem("current_user");
  }
export const updateCurrentUserInLocalStorage = (new_data)=>{
    localStorage.setItem("current_user", JSON.stringify(new_data));
}

export const getCurrentUser = async() => {
  if(localStorage.getItem('current_user')){
    return JSON.parse(localStorage.getItem('current_user'));
  }
  else{
    let user_id=localStorage.get('user_id');//this should stored in Cookies i will do it later!
    if(user_id){
       getCurrentUserFromDb(user_id)
      .then(({data})=>{
        localStorage.setItem("current_user", JSON.stringify(data));
        return JSON.parse(localStorage.getItem('current_user'));
      })
      .catch (function (error) {
        console.log("error while fetching user data from server");
        return null;
      });
    }else{
      return null;
    } 
  }
  
}
export const getCurrentUserFromDb= async function(user_id){
       return await axios
       .get(API_URL+`tourists/${user_id}`);
}