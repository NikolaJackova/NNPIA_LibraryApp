import axios from "axios";
import authHeader from "../services/AuthHeader";

export function getReq(url){
    return axios.get(`${process.env.REACT_APP_DEVELOPMENT}`+url, {
        headers: authHeader()
    });
}

export function postReq(url, requestData){
    return axios.post(`${process.env.REACT_APP_DEVELOPMENT}`+url, requestData, {
        headers: authHeader()
    });
}

export function deleteReq(url){
    return axios.delete(`${process.env.REACT_APP_DEVELOPMENT}`+url, {
        headers: authHeader()
    });
}

export function putReq(url, requestData){
    return axios.put(`${process.env.REACT_APP_DEVELOPMENT}`+url, requestData, {
        headers: authHeader()
    });
}