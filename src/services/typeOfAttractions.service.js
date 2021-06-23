import axios from "axios";
import service_env from "./__env.service";
const API_URL = service_env.API_URL;


export const getAllTypes = async()=>{
    return axios.get(API_URL+`type_of_attractions.json?exists[parentType]=false`).then(({data})=> data).catch(()=>{return null});
}

export const getTypesCount = async()=>{
    return  axios.get(API_URL+`type_of_attractions.jsonld?exists[parentType]=true`).then(({data}) => data["hydra:totalItems"]).catch(()=>{return 0 ;});
}