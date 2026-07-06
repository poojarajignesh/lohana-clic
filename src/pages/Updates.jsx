import {
  useEffect,
  useState,
} from "react";

import { db } from "../firebase/config";

import {
  collection,
  getDocs,
} from "firebase/firestore";


function Updates(){


const [updates,setUpdates] =
useState([]);


const [search,setSearch] =
useState("");


const [filter,setFilter] =
useState("All");



useEffect(()=>{

fetchUpdates();

},[]);




const fetchUpdates =
async()=>{

try{


const snap =
await getDocs(
collection(
db,
"updates"
)
);



const list =
snap.docs
.map((doc)=>({

id:doc.id,

...doc.data(),

}))
.filter(
(u)=>
u.status==="Approved"
);



setUpdates(list);


}
catch(error){

console.log(error);

}

};





const filteredUpdates =
updates.filter(
(u)=>

(
filter==="All" ||
u.type===filter
)

&&

(
u.title
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

u.description
?.toLowerCase()
.includes(
search.toLowerCase()
)

)

);





const getIcon =
(type)=>{


if(type==="Business")
return "🏢";


if(type==="Matrimony")
return "💍";


if(type==="Job")
return "💼";


if(type==="Blood")
return "🩸";


return "📢";


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


{/* HEADER */}


<div

style={{
background:
"linear-gradient(135deg,#2D1B7E,#5B3DF5)",
color:"#fff",
padding:"25px",
borderRadius:"26px",
marginBottom:"20px",
boxShadow:
"0 15px 35px rgba(45,27,126,.25)",
}}

>


<h1
style={{
margin:0,
fontWeight:"900",
}}

>

📢 Community Feed

</h1>


<p>

Latest Activity & Announcements

</p>


</div>





{/* SEARCH */}


<input

type="text"

placeholder=
"Search Updates"

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
overflowX:"auto",
marginBottom:"20px",
}}

>


{[
"All",
"Business",
"Matrimony",
"Job",
"Blood"
].map(

(item)=>(

<button

key={item}

onClick={()=>
setFilter(item)
}

style={{
padding:"10px 15px",
border:"none",
borderRadius:"20px",
whiteSpace:"nowrap",
background:
filter===item
?
"#2D1B7E"
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






{/* UPDATE CARDS */}


{filteredUpdates.map(
(update)=>(

<div

key={update.id}

style={{
background:"#fff",
borderRadius:"22px",
padding:"18px",
marginBottom:"15px",
boxShadow:
"0 10px 25px rgba(0,0,0,.08)",
}}

>


<div

style={{
fontSize:"28px",
marginBottom:"10px",
}}

>

{getIcon(update.type)}

</div>



<h2

style={{
margin:"0 0 8px",
fontSize:"20px",
color:"#111827",
}}

>

{update.title}

</h2>




<p

style={{
color:"#64748B",
lineHeight:"1.6",
}}

>

{update.description}

</p>



<div

style={{
marginTop:"12px",
fontSize:"13px",
fontWeight:"700",
color:"#2D1B7E",
}}

>

{update.type || "Official"}

</div>


</div>

)

)}




{filteredUpdates.length===0 && (

<div

style={{
textAlign:"center",
marginTop:"40px",
color:"#777",
fontWeight:"600",
}}

>

No Updates Found

</div>

)}



</div>

);

}


export default Updates;