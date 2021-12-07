import { Interview } from "./Interview";
import {User} from "./User";
import {PieChart} from "./PieChart";
import {BarChart} from "./BarChart";

export const appConstants={
    home:'/',
    interviewRoute: '/interviews',
    addInterviewRoute: '/addInterview',
    loginRoute:'/login',
    logoutRoute:'/logout',
    chartRoute:'/chart',
    barRoute: '/bar',
    uploadedRoute: '/uploaded',

    GET_INTERVIEWS: '/GET_INTERVIEWS',
    GET_FILE: '/GET_FILE',
    GET_PIE_CHART: '/GET_PIE_CHART',
    GET_BAR_CHART: '/GET_BAR_CHART',
    ADD_INTERVIEW: '/ADD_INTERVIEW',
    UPLOAD_FILE: '/UPLOAD_FILE',
    UPLOAD_EXCEL: '/UPLOAD_EXCEL',
    UPDATE_INTERVIEW: '/UPDATE_INTERVIEW',
    LOGIN: '/LOGIN',
    LOGOUT: '/LOGOUT',


    // FIELD
    INTERVIEW_FIELD :[
        {
            name: 'id',
            label: 'Interview ID',
            type: 'number'
        },
        {
            name: 'candidate',
            label: 'Candidate',
            type: 'text'
        },
        {
            name: 'scheduler',
            label: 'Scheduler',
            type: 'text'
        },
        {
            name: 'phone',
            label: 'Phone',
            type: 'text'
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text'
        },
        {
            name: 'comments',
            label: 'Comments',
            type: 'text'
        },
        {
            name: 'time',
            label: 'Time',
            type: 'text'
        },
    ],
}

export interface ReduxState {
    interviews: Interview[],
    interview: Interview,
    user: User,
    pie: PieChart,
    bar: BarChart,
}