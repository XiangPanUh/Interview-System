import axios from "axios";
import {appConstants} from "../shared/constants";
import {Interview} from "../shared/Interview";

export const getInterviews =() => {
    const getInterviewsPromise = axios.get('http://localhost:8080/interviews')
    return {
        type: appConstants.GET_INTERVIEWS,
        payload: getInterviewsPromise
    }
}

export const addInterview = (interview: Interview) => {
    const addInterviewPromise = axios.post('http://localhost:8080/interviews', interview)
    return {
        type: appConstants.ADD_INTERVIEW,
        payload: addInterviewPromise
    }
}

export const updateInterview = (interview: Interview) => {
    const updateInterviewPromise = axios.post('http://localhost:8080/interviews/update', interview)
    return {
        type: appConstants.UPDATE_INTERVIEW,
        payload: updateInterviewPromise
    }
}