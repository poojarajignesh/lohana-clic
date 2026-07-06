import {
  Navigate,
} from "react-router-dom";

import {
  getFamily,
} from "../auth/Auth";


function ProtectedRoute({
children
}){


const family =
getFamily();



if(!family){

return(

<Navigate

to="/family-login"

replace

/>

);

}



return children;


}


export default ProtectedRoute;