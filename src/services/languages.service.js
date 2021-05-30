import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const getAllLanguage= async()=>{
return axios.get(API_URL+"languages.json")
            .then(({data})=>data)
            .catch(()=> null);
}