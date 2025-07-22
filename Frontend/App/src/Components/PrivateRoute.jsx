import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const PrivateRoute =({children}) =>{
    const {token} = useAuth();

    if(!token){
        // redirect to loginPage if not LoggedIn
        return <Navigate to="/Login" replace />;
    }
    
    return children;
};

export default PrivateRoute;