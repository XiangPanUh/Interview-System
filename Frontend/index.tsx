import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import reduxPromise from 'redux-promise';
import {rootReducer} from "./reducer/rootReducer";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {appConstants} from "./shared/constants";
import Interviews from "./component/Interviews";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddInterview from "./component/AddInterview";
import Login from "./component/Login";
import Logout from "./component/Logout";
import 'antd/dist/antd.css';
import Chart from "./component/Chart";
import Chart1 from "./component/Chart1";
import {withGuard} from "./shared/withGuard";
import Uploaded from "./component/Uploaded";

const createMiddleware = applyMiddleware(reduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createMiddleware(rootReducer)}>
        <BrowserRouter>
            <App/>
            <Switch>
                <Route exact path={appConstants.home} component={Login}/>
                <Route path={appConstants.addInterviewRoute} component={withGuard(AddInterview)}/>
                <Route path={appConstants.interviewRoute} component={withGuard(Interviews)}/>
                <Route path={appConstants.loginRoute} component={Login}/>
                <Route path={appConstants.logoutRoute} component={Logout}/>
                <Route path={appConstants.chartRoute} component={withGuard(Chart)}/>
                <Route path={appConstants.barRoute} component={withGuard(Chart1)}/>
                <Route path={appConstants.uploadedRoute} component={Uploaded}/>
            </Switch>
        </BrowserRouter>
    </Provider>
  ,document.getElementById('root')
);

reportWebVitals();
