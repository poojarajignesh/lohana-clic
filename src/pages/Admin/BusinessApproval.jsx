import { useEffect, useState } from "react";

import { db } from "../../firebase/config";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


function BusinessApproval() {

const [businesses,setBusinesses] =
useState([]);


useEffect(()=>{

loadBusinesses();

},[]);



const loadBusinesses =
async()=>{

try{

const snap =
await getDocs(
collection(
db,
"businesses"
)
);


const list =
snap.docs
.map((doc)=>({
id:doc.id,
...doc.data(),
}))
.filter(
(b)=>
b.status==="Pending"
);


setBusinesses(list);


}
catch(error){

console.log(error);

}

};



// APPROVE


const approveBusiness =
async(id)=>{

try{

await updateDoc(
doc(
db,
"businesses",
id
),
{
status:"Approved"
}
);


alert(
"Business Approved"
);


loadBusinesses();


}
catch(error){

console.log(error);

}

};



// REJECT


const rejectBusiness =
async(id)=>{

if(
!window.confirm(
"Reject this business?"
)
)
return;


try{

await deleteDoc(
doc(
db,
"businesses",
id
)
);


alert(
"Business Rejected"
);


loadBusinesses();


}
catch(error){

console.log(error);

}

};




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


<h1

style={{
color:"#2D1B7E",
}}

>

Business Approval

</h1>



<p>

Pending :
{" "}
{businesses.length}

</p>



{businesses.map(
(b)=>(

<div

key={b.id}

style={{
background:"#fff",
borderRadius:"22px",
padding:"18px",
marginBottom:"15px",
boxShadow:
"0 8px 20px rgba(0,0,0,.08)",
}}

>


<h2>

{b.businessName}

</h2>


<p>
Owner :
{" "}
{b.ownerName ||
b.ownerHeadName}
</p>


<p>

Category :
{" "}
{b.category}

</p>



<div

style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"10px",
}}

>


<button

onClick={()=>
approveBusiness(
b.id
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
rejectBusiness(
b.id
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

Reject

</button>


</div>


</div>


)

)}



{businesses.length===0 &&

<p>

No Pending Businesses

</p>

}


</div>

);

}


export default BusinessApproval;