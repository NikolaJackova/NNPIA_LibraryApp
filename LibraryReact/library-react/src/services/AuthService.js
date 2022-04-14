import axios from "axios";

class AuthService {
    login(username, password){
        return axios
            .post(`${process.env.REACT_APP_DEVELOPMENT}/authenticate`, {username, password})
            .then(response =>{
                if (response.data.jwttoken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout(){
        localStorage.removeItem("user");
    }

    register(username, email, password){
        return axios
            .post(`${process.env.REACT_APP_DEVELOPMENT}/register`, {username, email, password});
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();