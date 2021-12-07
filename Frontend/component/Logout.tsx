import {useDispatch} from "react-redux";
import {logout} from "../action/authAction";
import {SyntheticEvent} from "react";
import {Link, NavLink, RouteComponentProps} from "react-router-dom";
import {appConstants} from "../shared/constants";

const Logout =(props: LoginProps) => {
    const dispatch = useDispatch();
    dispatch(logout());

    const submitHandler=(event:SyntheticEvent)=>{
        event.preventDefault();
        props.history.push(appConstants.loginRoute);
    }
    return (
        <form onSubmit={submitHandler}>
            <button type="submit" className="btn btn-dark">
                <Link to={appConstants.loginRoute}>Logout Successfully
                </Link></button>
        </form>
    )
}
export default Logout;
interface LoginProps extends RouteComponentProps {

}