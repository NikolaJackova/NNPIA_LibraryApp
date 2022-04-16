import * as AxiosAdapter from "../adapters/AxiosAdapter";

class AuthService {
    login(username, password){
        return AxiosAdapter.postReq("/authenticate", {username, password})
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
        return AxiosAdapter.postReq("/register", {username, email, password});
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();