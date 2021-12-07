import axios from "axios";
import qs from "qs";
import {appConstants} from "../shared/constants";

export const login = (user:{username: string, password: string}) => {
    const loginPromise = axios.post('http://localhost:8080/login',
        qs.stringify(user),
        {withCredentials: true}
    );
    return {
        type: appConstants.LOGIN,
        payload: loginPromise,
    }

}

export const logout =() => {
    const logoutPromise = axios.get('http://localhost:8080/logout',
        {withCredentials: true}
    )
    return {
        type: appConstants.LOGOUT,
        payload: logoutPromise
    };
};