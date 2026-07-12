import { useEffect, useState } from "react";

import { db } from "../../firebase/config";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


function BloodApproval() {


const [requests,setRequests] =
useState([]);


const [filter,setFilter] =
useState("All");


const [search,setSearch] =
useState("");



useEffect(()=>{

loadRequests();

},[]);




const loadRequests =
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
snap.docs.map(
(d)=>({

id:d.id,

...d.data(),

})

);


setRequests(list);


}
catch(error){

console.log(error);

}


};





const approveRequest =
async(id)=>{


await updateDoc(

doc(
db,
"bloodRequests",
id
),

{

status:"Approved"

}

);


loadRequests();


};





const rejectRequest =
async(id)=>{


await updateDoc(

doc(
db,
"bloodRequests",
id
),

{

status:"Rejected"

}

);


loadRequests();


};





const deleteRequest =
async(id)=>{


if(
!window.confirm(
"Delete Request?"
)
)

return;



await deleteDoc(

doc(
db,
"bloodRequests",
id
)

);


loadRequests();


};

const filteredRequests =
requests.filter(
(r)=>

(
filter === "All" ||
r.status === filter
)

&&

(
r.patientName
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

r.city
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


<h1

style={{
color:"#DC2626",
fontWeight:"900",
}}

>

🩸 Blood Approval

</h1>




{/* COUNTS */}


<div

style={{
display:"grid",
gridTemplateColumns:
"repeat(2,1fr)",
gap:"12px",
marginBottom:"20px",
}}

>


<CountCard

title="Total"

value={
requests.length
}

/>


<CountCard

title="Approved"

value={
requests.filter(
(r)=>r.status==="Approved"
).length
}

/>


<CountCard

title="Pending"

value={
requests.filter(
(r)=>r.status==="Pending"
).length
}

/>


<CountCard

title="Rejected"

value={
requests.filter(
(r)=>r.status==="Rejected"
).length
}

/>


</div>




{/* SEARCH */}


<input

type="text"

placeholder=
"Search Patient / City"

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
gap:"10px",
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

padding:
"12px 18px",

border:"none",

borderRadius:"15px",

background:
filter===item
?
"#DC2626"
:
"#eee",

color:
filter===item
?
"#fff"
:
"#000",

fontWeight:"700",

}}

>

{item}

</button>

)

)}


</div>

{/* REQUEST CARDS */}


{filteredRequests.map(
(r)=>(

<div

key={r.id}

style={{
background:"#fff",
borderRadius:"22px",
padding:"20px",
marginBottom:"15px",
boxShadow:
"0 10px 25px rgba(0,0,0,.08)",
}}

>


<h2
style={{
marginTop:0,
color:"#DC2626",
}}
>

{r.patientName}

</h2>



<p>
🩸 Blood :
{" "}
<b>
{r.bloodGroup}
</b>
</p>



<p>
🏥 Hospital :
{" "}
{r.hospital}
</p>



<p>
📍 City :
{" "}
{r.city}
</p>



<p>
📞 Mobile :
{" "}
{r.mobile}
</p>



<p>
Status :
{" "}
<b
style={{
color:
r.status==="Approved"
?"green"
:r.status==="Rejected"
?"red"
:"#F59E0B",
}}
>
{r.status}
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
approveRequest(
r.id
)
}

style={{
padding:"12px",
border:"none",
borderRadius:"14px",
background:"#16A34A",
color:"#fff",
fontWeight:"700",
}}

>

Approve

</button>





<button

onClick={()=>
rejectRequest(
r.id
)
}

style={{
padding:"12px",
border:"none",
borderRadius:"14px",
background:"#F59E0B",
color:"#fff",
fontWeight:"700",
}}

>

Reject

</button>





<button

onClick={()=>
deleteRequest(
r.id
)
}

style={{
padding:"12px",
border:"none",
borderRadius:"14px",
background:"#DC2626",
color:"#fff",
fontWeight:"700",
}}

>

Delete

</button>


</div>


</div>

)

)}




{filteredRequests.length===0 && (

<p
style={{
textAlign:"center",
color:"#777",
}}

>

No Requests Found

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
padding:"20px",
borderRadius:"20px",
textAlign:"center",
boxShadow:
"0 8px 20px rgba(0,0,0,.08)",
}}

>

<h2

style={{
margin:0,
color:"#DC2626",
fontWeight:"900",
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



export default BloodApproval;