import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/config";

import {
  FaUsers,
  FaUser,
  FaStore,
  FaBriefcase,
  FaTint,
  FaBullhorn,
  FaPrayingHands,
  FaCheckCircle,
} from "react-icons/fa";


function AdminDashboard() {

const navigate =
useNavigate();


const [counts,setCounts] =
useState({
families:0,
members:0,
businesses:0,
pendingBusinesses:0,
jobs:0,
bloodRequests:0,
pendingBlood:0,
updates:0,
deathNotes:0,
});


useEffect(()=>{

loadCounts();

},[]);



const loadCounts =
async()=>{

try{


const families =
await getDocs(
collection(db,"families")
);


const members =
await getDocs(
collection(db,"members")
);


const businesses =
await getDocs(
collection(db,"businesses")
);


const jobs =
await getDocs(
collection(db,"jobs")
);


const blood =
await getDocs(
collection(db,"bloodRequests")
);


const updates =
await getDocs(
collection(db,"updates")
);


const deathNotes =
await getDocs(
collection(db,"deathNotes")
);



const businessData =
businesses.docs.map(
(d)=>d.data()
);


const bloodData =
blood.docs.map(
(d)=>d.data()
);



setCounts({

families:
families.size,

members:
members.size,

businesses:
businesses.size,

pendingBusinesses:
businessData.filter(
(b)=>b.status==="Pending"
).length,


jobs:
jobs.size,


bloodRequests:
blood.size,


pendingBlood:
bloodData.filter(
(b)=>b.status==="Pending"
).length,


updates:
updates.size,


deathNotes:
deathNotes.size,

});


}
catch(error){

console.log(error);

}

};

return (

<div

style={{
maxWidth:"430px",
margin:"0 auto",
padding:"20px",
background:"#F8FAFC",
minHeight:"100vh",
}}

>


{/* HEADER */}


<div

style={{
background:
"linear-gradient(135deg,#2D1B7E,#5B3DF5)",
padding:"28px",
borderRadius:"28px",
color:"#fff",
marginBottom:"22px",
boxShadow:
"0 15px 35px rgba(45,27,126,.25)",
}}

>

<h1
style={{
margin:0,
fontSize:"28px",
fontWeight:"900",
}}
>

Master Dashboard

</h1>


<p
style={{
opacity:.9,
}}

>

Lohana Clic Admin Panel

</p>


</div>




{/* STATS */}


<div

style={{
display:"grid",
gridTemplateColumns:
"repeat(2,1fr)",
gap:"14px",
marginBottom:"25px",
}}

>


<Card

title="Families"

value={counts.families}

icon={<FaUsers/>}

/>


<Card

title="Members"

value={counts.members}

icon={<FaUser/>}

/>


<Card

title="Businesses"

value={counts.businesses}

icon={<FaStore/>}

/>


<Card

title="Pending Business"

value={counts.pendingBusinesses}

icon={<FaCheckCircle/>}

/>


<Card

title="Blood Requests"

value={counts.bloodRequests}

icon={<FaTint/>}

/>


<Card

title="Pending Blood"

value={counts.pendingBlood}

icon={<FaTint/>}

/>


<Card

title="Jobs"

value={counts.jobs}

icon={<FaBriefcase/>}

/>


<Card

title="Updates"

value={counts.updates}

icon={<FaBullhorn/>}

/>


<Card

title="Death Notes"

value={counts.deathNotes}

icon={<FaPrayingHands/>}

/>


</div>
{/* QUICK ACTIONS */}


<h2
style={{
marginBottom:"15px",
color:"#111827",
}}
>

Admin Actions

</h2>


<ActionButton

title="Approve Businesses"

onClick={() =>
navigate(
"/admin/business-approval"
)
}

/>


<ActionButton

title="Approve Blood Requests"

onClick={() =>
navigate(
"/admin/blood-approval"
)
}

/>

<ActionButton

title="Approve Matrimony Profiles"

onClick={() =>
navigate(
"/admin/matrimony-approval"
)
}

/>


<ActionButton

title="Manage Families"

onClick={() =>
navigate(
"/admin/families"
)
}

/>


</div>

);

}




function Card({
title,
value,
icon,
}){

return(

<div

style={{
background:"#fff",
borderRadius:"22px",
padding:"20px",
textAlign:"center",
boxShadow:
"0 10px 25px rgba(0,0,0,.08)",
}}

>

<div

style={{
fontSize:"28px",
color:"#2D1B7E",
}}

>

{icon}

</div>


<h2

style={{
margin:"10px 0 5px",
fontWeight:"900",
}}

>

{value}

</h2>


<p
style={{
margin:0,
color:"#64748B",
fontWeight:"600",
}}
>

{title}

</p>


</div>

);

}




function ActionButton({
title,
onClick,
}){

return(

<button

onClick={onClick}

style={{
width:"100%",
padding:"16px",
border:"none",
borderRadius:"18px",
background:
"linear-gradient(135deg,#FF6B00,#FF8C42)",
color:"#fff",
fontWeight:"800",
fontSize:"15px",
marginBottom:"12px",
cursor:"pointer",
boxShadow:
"0 10px 25px rgba(255,107,0,.25)",
}}

>

{title}

</button>

);

}


export default AdminDashboard;