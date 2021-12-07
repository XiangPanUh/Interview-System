import {appConstants, ReduxState} from "../shared/constants";
import {SyntheticEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {login} from "../action/authAction";
import {setLocale} from "yup";


const Login = (props: RouteComponentProps) => {
    const [user, SetUser] = useState({
        username: '',
        password: ''
    });

    const dispatch = useDispatch();
    const handlerFormControl = (event: SyntheticEvent) => {
        const inputEle = event.target as HTMLInputElement;
        const userCopy = {
            ...user,
            [inputEle.name]: inputEle.value
        }
        SetUser(userCopy);
    };

    const check = useSelector(({user}:ReduxState) => user);
    const submitHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(login(user));
        if (user.username === 'hr') {
            localStorage.setItem("hr", "true");
        } else {
            localStorage.setItem("hr", "false");
        }
    }

    useEffect(() => {
            (check !== null && check.username !== '') && props.history.push
            (appConstants.interviewRoute)},
        [check]);

    return (
        <div>
            <h3 className="text-center text-white pt-5">Login form</h3>
    <div className="container">
    <div id="login-row" className="row justify-content-center align-items-center">
    <div id="login-column" className="col-md-6">
    <div id="login-box" className="col-md-12">
    <form onSubmit={submitHandler} id="login-form" className="form" >
    <h2 className="text-center text-info">Login</h2>
        <label htmlFor="username" className="text-info"> Username: </label><input className="form-control" name="username" value={user.username}
    onChange={handlerFormControl} type="text"/>
    <label htmlFor="password" className="text-info">Password: </label><input className="form-control" name="password" value={user.password}
    onChange={handlerFormControl} type="password"/>
        <button className="btn btn-info btn-md">Login</button>
    </form>
    </div>
    </div>
    </div>
    </div>
    </div>
);
};

export default Login;