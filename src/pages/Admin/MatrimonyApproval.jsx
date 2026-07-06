import { useEffect, useState } from "react";

import { db } from "../../firebase/config";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


function MatrimonyApproval() {


const [profiles,setProfiles] =
useState([]);


const [filter,setFilter] =
useState("All");


const [search,setSearch] =
useState("");



useEffect(()=>{

loadProfiles();

},[]);




const loadProfiles =
async()=>{

try{


const snap =
await getDocs(
collection(
db,
"members"
)
);



const list =
snap.docs
.map((d)=>({

id:d.id,

...d.data(),

}))
.filter(
(m)=>
m.isMatrimony===true
);



setProfiles(list);



}
catch(error){

console.log(error);

}


};





const approveProfile =
async(id)=>{


await updateDoc(

doc(
db,
"members",
id
),

{

status:"Approved"

}

);


loadProfiles();


};






const rejectProfile =
async(id)=>{


await updateDoc(

doc(
db,
"members",
id
),

{

status:"Rejected"

}

);


loadProfiles();


};






const deleteProfile =
async(id)=>{


if(
!window.confirm(
"Delete Profile?"
)
)

return;



await deleteDoc(

doc(
db,
"members",
id
)

);


loadProfiles();


};

const filteredProfiles =
profiles.filter(
(p)=>

(
filter==="All" ||
p.status===filter
)

&&

(
p.fullName
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

p.education
?.toLowerCase()
.includes(
search.toLowerCase()
)

)

);



return(

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
"linear-gradient(135deg,#DB2777,#EC4899)",
color:"#fff",
padding:"25px",
borderRadius:"26px",
marginBottom:"20px",
boxShadow:
"0 15px 35px rgba(219,39,119,.25)",
}}

>


<h1
style={{
margin:0,
fontWeight:"900",
}}
>

💍 Matrimony Approval

</h1>


<p>

Total Profiles :
{" "}
{profiles.length}

</p>


</div>





{/* COUNT CARDS */}


<div

style={{
display:"grid",
gridTemplateColumns:
"repeat(3,1fr)",
gap:"10px",
marginBottom:"20px",
}}

>


<CountCard

title="Pending"

value={
profiles.filter(
(p)=>p.status==="Pending"
).length
}

/>


<CountCard

title="Approved"

value={
profiles.filter(
(p)=>p.status==="Approved"
).length
}

/>


<CountCard

title="Rejected"

value={
profiles.filter(
(p)=>p.status==="Rejected"
).length
}

/>


</div>





{/* SEARCH */}


<input

type="text"

placeholder=
"Search Name / Education"

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





{/* FILTER */}


<div

style={{
display:"flex",
gap:"8px",
marginBottom:"20px",
}}

>


{[
"All",
"Pending",
"Approved",
"Rejected"
].map(

(item)=>(

<button

key={item}

onClick={()=>
setFilter(item)
}

style={{

padding:"10px",

border:"none",

borderRadius:"14px",

background:
filter===item
?
"#DB2777"
:
"#E5E7EB",

color:
filter===item
?
"#fff"
:
"#111",

fontWeight:"700",

}}

>

{item}

</button>

)

)}

</div>

{/* PROFILE CARDS */}


{filteredProfiles.map(
(p)=>(

<div

key={p.id}

style={{
background:"#fff",
borderRadius:"24px",
padding:"20px",
marginBottom:"15px",
boxShadow:
"0 10px 25px rgba(0,0,0,.08)",
}}

>


<div

style={{
display:"flex",
gap:"15px",
alignItems:"center",
}}

>


{p.photoUrl ? (

<img

src={p.photoUrl}

alt=""

style={{
width:"70px",
height:"70px",
borderRadius:"50%",
objectFit:"cover",
}}

/>

)

:

(

<div

style={{
width:"70px",
height:"70px",
borderRadius:"50%",
background:"#FCE7F3",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontSize:"26px",
fontWeight:"900",
color:"#DB2777",
}}

>

{p.fullName?.charAt(0)}

</div>

)

}




<div>

<h2
style={{
margin:0,
color:"#DB2777",
}}

>

{p.fullName}

</h2>


<p>

{p.gender}
{" • "}
{p.maritalStatus}

</p>

</div>


</div>





<p>
🎓 Education :
{" "}
{p.education}
</p>


<p>
💼 Occupation :
{" "}
{p.occupation}
</p>


<p>

Status :
{" "}

<b>
{p.status || "Pending"}
</b>

</p>





<div

style={{
display:"grid",
gridTemplateColumns:
"1fr 1fr 1fr",
gap:"8px",
marginTop:"15px",
}}

>



<button

onClick={()=>
approveProfile(
p.id
)
}

style={btnGreen}

>

Approve

</button>





<button

onClick={()=>
rejectProfile(
p.id
)
}

style={btnOrange}

>

Reject

</button>





<button

onClick={()=>
deleteProfile(
p.id
)
}

style={btnRed}

>

Delete

</button>


</div>


</div>

)

)}




{filteredProfiles.length===0 && (

<p

style={{
textAlign:"center",
color:"#777",
}}

>

No Profiles Found

</p>

)}



</div>

);

}





function CountCard({
title,
value,
}){

return(

<div

style={{
background:"#fff",
borderRadius:"18px",
padding:"15px",
textAlign:"center",
boxShadow:
"0 8px 20px rgba(0,0,0,.08)",
}}

>


<h2

style={{
margin:0,
color:"#DB2777",
}}

>

{value}

</h2>


<p>

{title}

</p>


</div>

);

}





const btnGreen = {
padding:"12px",
border:"none",
borderRadius:"14px",
background:"#16A34A",
color:"#fff",
fontWeight:"700",
cursor:"pointer",
};



const btnOrange = {
padding:"12px",
border:"none",
borderRadius:"14px",
background:"#F59E0B",
color:"#fff",
fontWeight:"700",
cursor:"pointer",
};



const btnRed = {
padding:"12px",
border:"none",
borderRadius:"14px",
background:"#DC2626",
color:"#fff",
fontWeight:"700",
cursor:"pointer",
};




export default MatrimonyApproval;