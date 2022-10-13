import axios from "axios";


export default axios.create({
    baseURL: import.meta.env.VITE_WEB3_BASE_API,
    headers:{
        "Content-type": "application/json",
    }
})