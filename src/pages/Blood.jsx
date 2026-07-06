import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/config";

import BloodDonorCard from "../components/blood/BloodDonorCard";
import BloodRequestCard from "../components/blood/BloodRequestCard";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { FaTint } from "react-icons/fa";


function Blood() {

const navigate = useNavigate();

const [donors, setDonors] =
useState([]);

const [requests, setRequests] =
useState([]);

const [search, setSearch] =
useState("");

const [bloodGroup, setBloodGroup] =
useState("");


useEffect(() => {

fetchDonors();
fetchRequests();

}, []);


const fetchRequests =
async () => {

try {

const snap =
await getDocs(
collection(db,"bloodRequests")
);

const data =
snap.docs
.map((doc)=>({
id:doc.id,
...doc.data(),
}))
.filter(
(r)=>r.status==="Approved"
);

setRequests(data);

}
catch(e){

console.log(e);

}

};


const fetchDonors =
async () => {

try {

const snap =
await getDocs(
collection(db,"members")
);

const data =
snap.docs
.map((doc)=>({
id:doc.id,
...doc.data(),
}))
.filter(
(m)=>m.isBloodDonor===true
);

setDonors(data);

}
catch(e){

console.log(e);

}

};


const filteredDonors =
donors.filter(
(d)=>

(
bloodGroup==="" ||
d.bloodGroup===bloodGroup
)

&&

(
d.fullName
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

d.village
?.toLowerCase()
.includes(
search.toLowerCase()
)

)

);
return (

<div
style={{
maxWidth:"430px",
margin:"0 auto",
padding:"20px",
paddingBottom:"100px",
background:"#F8FAFC",
minHeight:"100vh",
}}
>


{/* HEADER */}


<div
style={{
background:
"linear-gradient(135deg,#DC2626,#EF4444)",
color:"#fff",
padding:"28px",
borderRadius:"28px",
marginBottom:"20px",
boxShadow:
"0 15px 35px rgba(220,38,38,.25)",
}}
>

<h1
style={{
margin:0,
display:"flex",
alignItems:"center",
gap:"12px",
fontSize:"30px",
fontWeight:"900",
}}
>

<FaTint/>

Blood Donors

</h1>


<p>
Find Blood Donors
</p>

</div>



{/* NEED BLOOD BUTTON */}


<button

onClick={() =>
navigate(
"/add-blood-request"
)
}

style={{
width:"100%",
padding:"18px",
border:"none",
borderRadius:"22px",
background:
"linear-gradient(135deg,#EF4444,#DC2626)",
color:"#fff",
fontWeight:"900",
fontSize:"17px",
cursor:"pointer",
marginBottom:"25px",
boxShadow:
"0 15px 35px rgba(220,38,38,.25)",
}}

>

🚨 Need Blood?
<br/>

Create Emergency Request

</button>




{/* SEARCH */}


<input

type="text"

placeholder=
"Search Name or Village"

value={search}

onChange={(e)=>
setSearch(
e.target.value
)
}

style={{
width:"100%",
padding:"15px",
borderRadius:"18px",
border:"1px solid #ddd",
marginBottom:"15px",
}}

/>




{/* BLOOD FILTER */}


<select

value={bloodGroup}

onChange={(e)=>
setBloodGroup(
e.target.value
)
}

style={{
width:"100%",
padding:"15px",
borderRadius:"18px",
border:"1px solid #ddd",
marginBottom:"25px",
}}

>

<option value="">
All Blood Groups
</option>

<option>A+</option>
<option>A-</option>
<option>B+</option>
<option>B-</option>
<option>AB+</option>
<option>AB-</option>
<option>O+</option>
<option>O-</option>

</select>




{/* EMERGENCY */}


{requests.length > 0 && (

<>

<h2
style={{
color:"#DC2626",
}}
>

🚨 Emergency Needs

</h2>


{requests.map(
(r)=>(

<BloodRequestCard

key={r.id}

request={r}

/>

)

)}

</>

)}




<h3>

🩸 Total Donors :
{" "}
{filteredDonors.length}

</h3>




{filteredDonors.map(
(d)=>(

<BloodDonorCard

key={d.id}

donor={d}

/>

)

)}



{filteredDonors.length===0 && (

<p
style={{
textAlign:"center",
color:"#777",
}}
>

No Donors Found

</p>

)}



</div>

);

}


export default Blood;