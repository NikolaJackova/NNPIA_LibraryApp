import * as AxiosAdapter from "../adapters/AxiosAdapter";

class UserService{
    getUserByUsername(username){
        return AxiosAdapter.getReq(`/users/${username}`);
    }

    updateUserByUsername(username, userDto){
        return AxiosAdapter.putReq(`/users/${username}`, userDto);
    }
}