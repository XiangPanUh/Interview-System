import axios from "axios";
import {appConstants} from "../shared/constants";

export const getPie = () => {
    const getPiePromise = axios.get('http://localhost:8080/interviews/status')
    return {
        type: appConstants.GET_PIE_CHART,
        payload: getPiePromise
    }
}
export const getBar=()=> {
    const getBarPromise = axios.get('http://localhost:8080/interviews/bar')
    return {
        type: appConstants.GET_BAR_CHART,
        payload: getBarPromise
    }
}