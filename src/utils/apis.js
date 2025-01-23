
import axios from "axios";
import { baseUrl } from "./api";

//const BASE_URL = "http://localhost:4000/api"
// const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/';
// const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://staging-api.edjobster.com/';

const apiGET = async (api) => {
    const res = await axios({
        method: 'GET',
        url: `${baseUrl}${api}`,
        // headers: {
        //     'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        // }
    })
    return await res;
}

const companyInfoGET = async (id) => {
    const res = await axios({
        method: 'GET',
        url: `${baseUrl}account/get-all-companycarrer/?id=${id}`,
        // headers: {
        //     'Authorization': `Bearer ${JSON.parse(localStorage.getItem("globalUser")).access}`
        // }
    })
    return await res;
}


export { apiGET, companyInfoGET }
