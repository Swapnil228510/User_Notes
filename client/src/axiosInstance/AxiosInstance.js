import axios from "axios";
import { constants } from "../utils/constant";
export const AxiosCall =axios.create({
    baseURL : constants.serverUrl ,
    headers :{
        'Content-Type': 'application/json',
    'Authorization': sessionStorage['token'] ?  sessionStorage['token'] : "",
    },
})

