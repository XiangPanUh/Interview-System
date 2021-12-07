import { NavLink } from "react-router-dom"
import {appConstants, ReduxState} from "../shared/constants";
import {useSelector} from "react-redux";

const Header =()=> {
    const check = useSelector(({user}:ReduxState) => user);


    if (localStorage.getItem("flag") === "false") {
        return (
            <header>
                <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                    <span className="navbar-brand">Interview</span>
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={appConstants.interviewRoute}>Home Page</NavLink>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav" style={{marginLeft: 'auto'}}>
                        <NavLink to={appConstants.loginRoute} className="nav-link">Login</NavLink>
                    </ul>
                </nav>
            </header>
        )
    } else {
        return (
            <header>
                <nav className="navbar navbar-dark bg-black navbar-expand-sm">
                    <span className="navbar-brand">Mystery Shop</span>
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={appConstants.interviewRoute}>Home Page</NavLink>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav" style={{marginLeft: 'auto'}}>
                        <NavLink to={appConstants.logoutRoute} className="nav-link">Logout</NavLink>
                    </ul>
                </nav>
            </header>
        )
    }
}
export default Header;