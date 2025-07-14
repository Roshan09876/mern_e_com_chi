import axios from "axios";

const apis = "http://localhost:4000";
const Api = axios.create({
    baseURL: apis,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

const ApiWithFormData = axios.create({
     baseURL: apis,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
})

const token = localStorage.getItem('token')



// login Admin api 
export const loginAdminApi = (data) => Api.post('/api/user/login', data);

export default Api;
