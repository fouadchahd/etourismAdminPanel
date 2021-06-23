import axios from "axios";
import service_env from "./__env.service";
import Cookies from 'js-cookie';

const API_URL = service_env.API_URL;
// Add a request interceptor
axios.interceptors.request.use( config => {
    const userJWT =Cookies.getJSON('jwt_auth'); 
    if(userJWT && userJWT.token){
      const token = 'Bearer ' + userJWT.token;
      config.headers.Authorization =  token;
    }
    return config;
  });

export const insertPoi= async(poi)=>{
    return axios
    .post(API_URL + "pois", {...poi})
};
export const getPoiCount = async()=>{
  return  axios.get(API_URL+`pois.jsonld`).then(({data}) => data["hydra:totalItems"]).catch(()=>{return -1 ;});
}

export const getPoisByName= async(name,count)=>{
  return axios.get(API_URL+`pois.json?pagination=true&itemsPerPage=${count}&exist[parent]=false&name=${name}`);
}
