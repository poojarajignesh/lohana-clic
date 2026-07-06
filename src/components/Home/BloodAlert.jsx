import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import {
  FaTint,
  FaHospital,
  FaPhoneAlt,
} from "react-icons/fa";


function BloodAlert() {

const [request,setRequest] =
useState(null);


useEffect(()=>{

fetchRequest();

},[]);



const fetchRequest =
async()=>{

try{

const snap =
await getDocs(
collection(
db,
"bloodRequests"
)
);


const list =
snap.docs
.map((doc)=>({

id:doc.id,

...doc.data(),

}))
.filter(
(r)=>
r.status==="Approved"
);


if(list.length>0){

setRequest(
list[0]
);

}


}
catch(error){

console.log(error);

}

};



if(!request){

return null;

}



return(

<div

style={{
background:
"linear-gradient(135deg,#DC2626,#EF4444)",
color:"#fff",
borderRadius:"24px",
padding:"20px",
marginBottom:"18px",
boxShadow:
"0 15px 35px rgba(220,38,38,.25)",
}}

>


<div

style={{
fontWeight:"900",
fontSize:"18px",
marginBottom:"12px",
}}

>

🚨 Emergency Blood Needed

</div>



<h2

style={{
margin:"0 0 10px",
display:"flex",
alignItems:"center",
gap:"8px",
}}

>

<FaTint/>

{request.bloodGroup}

</h2>



<p>

{request.patientName}

</p>



<p>

<FaHospital/>

{" "}

{request.hospital}

</p>



<a

href={`tel:${request.mobile}`}

style={{
display:"flex",
alignItems:"center",
justifyContent:"center",
gap:"8px",
background:"#fff",
color:"#DC2626",
padding:"12px",
borderRadius:"16px",
fontWeight:"800",
textDecoration:"none",
marginTop:"15px",
}}

>

<FaPhoneAlt/>

Help Now

</a>


</div>

);

}


export default BloodAlert;