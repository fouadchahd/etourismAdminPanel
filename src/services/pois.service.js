import axios from "axios";
import service_env from "./__env.service";
const API_URL = service_env.API_URL;
import Cookies from 'js-cookie';
// Add a request interceptor
axios.interceptors.request.use( config => {
    const userJWT =Cookies.getJSON('jwt_auth'); 
  
    if(userJWT && userJWT.token){
      const token = 'Bearer ' + userJWT.token;
      config.headers.Authorization =  token;
    }
    return config;
  });

export const insetPoi= async(poi)=>{
    return axios
    .post(API_URL + "pois", {poi})
    .then(()=>console.log("POI INSERTED"))
    .catch(()=>console.log("ERROR OCCUR WHILE INSERTING NEW POI ,TRY LATER!"));
}