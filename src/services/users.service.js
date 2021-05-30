import axios from "axios";
import service_env from "./__env.service";
const API_URL = service_env.API_URL;


export const getToken=()=>{
    return JSON.parse(localStorage.getItem("auth_jwt"));
}

export const getUsersCount=async()=>{
    return await getUsers({itemsPerPage:1,page:1}).then(({data}) => data["hydra:totalItems"]);
}
export const getTouristCount=async()=>{
    return await getTourists({itemsPerPage:1,page:1}).then(({data}) => data["hydra:totalItems"]);
}
export const getAdminCount=async()=>{
    return await getAdmins({itemsPerPage:1,page:1}).then(({data}) => data["hydra:totalItems"]);
}
export const getUsers= async({itemsPerPage,page})=>{
    return  axios.get(API_URL+`tourists?pagination=true&itemsPerPage=${itemsPerPage}&page=${page}`)
}

export const getTourists=async({itemsPerPage,page})=>{
    return axios.get(API_URL+`tourists?pagination=true&itemsPerPage=${itemsPerPage}&page=${page}&isAdmin=false`)
}


export const getAdmins=async({itemsPerPage,page})=>{
    return axios.get(API_URL+`tourists?pagination=true&itemsPerPage=${itemsPerPage}&page=${page}&isAdmin=true`)
}

export const getUsersByPseudo= async({itemsPerPage,page},pseudo)=>{
    return axios.get(API_URL+`tourists?pagination=true&itemsPerPage=${itemsPerPage}&page=${page}&pseudo=${pseudo}`);
}