import React,{useContext} from "react";
import { Appcontext } from "./App";
function Login({}){
    const {userName} = useContext(Appcontext);
    return (
        <div>
            user : {userName}
        </div>
    )
}
export default Login;