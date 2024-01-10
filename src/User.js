import React, {useContext} from "react";
import { Appcontext } from "./App";

function User(){
    const {setUserName} = useContext(Appcontext);
    return(
        <div>
            <input onChange={(event)=>{
                setUserName(event.target.value);
            }}/>
        </div>
    )
}

export default User;