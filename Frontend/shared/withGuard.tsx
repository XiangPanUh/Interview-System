import {useSelector} from "react-redux";
import {appConstants, ReduxState} from "./constants";
import {RouteComponentProps} from "react-router-dom";
import {useEffect} from "react";


export const withGuard = (OldComponent: any) => {
    const HOCComponent = (props: RouteComponentProps) => {
        const user = useSelector(({user}:ReduxState) => user);

        // how to simulate component lifecycle hook methods
        // simulate componentDidMount
        useEffect(() => {
            // navigate to login if user doesn't exist
            !user && props.history.push(appConstants.loginRoute);
        },[]);
        return (
            user?
                <OldComponent{...props}/>:
                <h4>Navigating...</h4>
        );
    }


    return HOCComponent;
};