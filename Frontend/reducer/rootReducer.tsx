import {combineReducers} from "redux";
import {interviewsReducer} from "./interviewsReducer";
import {authReducer} from "./authReducer";
import {interviewReducer} from "./interviewReducer";
import {uploadReducer} from "./uploadReducer";
import {chartReducer} from "./chartReducer";
import {barChartReducer} from "./barChartReducer";

export const rootReducer = combineReducers( {
    interviews: interviewsReducer,
    user: authReducer,
    interview: interviewReducer,
    uploadFile: uploadReducer,
    pie: chartReducer,
    bar: barChartReducer
});
