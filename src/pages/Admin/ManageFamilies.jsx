import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../../firebase/config";

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

import {
  FaUsers,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";


function ManageFamilies() {


const navigate =
useNavigate();


const [families,setFamilies] =
useState([]);


const [search,setSearch] =
useState("");



useEffect(()=>{

loadFamilies();

},[]);




const loadFamilies =
async()=>{

try{


const snap =
await getDocs(
collection(
db,
"families"
)
);


const list =
snap.docs.map(
(d)=>({

id:d.id,

...d.data(),

})

);


setFamilies(list);


}
catch(error){

console.log(error);

}


};




const deleteFamily =
async(id)=>{


if(
!window.confirm(
"Delete this family?"
)
)

return;



await deleteDoc(

doc(
db,
"families",
id
)

);



alert(
"Family Deleted"
);


loadFamilies();


};

const filteredFamilies =
families.filter(
(f)=>

f.headName
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

f.mobile
?.includes(search)

||

f.familyId
?.toLowerCase()
.includes(
search.toLowerCase()
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
display:"flex",
alignItems:"center",
gap:"10px",
}}

>

<FaUsers/>

Manage Families

</h1>


<p>

Total Families :
{" "}
{families.length}

</p>


</div>




{/* SEARCH */}


<input

type="text"

placeholder=
"Search Family / Mobile / ID"

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
marginBottom:"20px",
}}

/>





{filteredFamilies.map(
(f)=>(

<div

key={f.id}

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
color:"#2D1B7E",
}}

>

{f.headName}

</h2>



<p>
Family ID :
{" "}
<b>
{f.familyId}
</b>
</p>



<p>

📱 {f.mobile}

</p>



<p>

📍 {f.village}

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
navigate(
`/members/${f.id}`
)
}

style={btnBlue}

>

<FaEye/>

</button>




<button

onClick={()=>
navigate(
`/edit-family/${f.id}`
)
}

style={btnGreen}

>

<FaEdit/>

</button>




<button

onClick={()=>
deleteFamily(
f.id
)
}

style={btnRed}

>

<FaTrash/>

</button>


</div>


</div>


)

)}




{filteredFamilies.length===0 && (

<p

style={{
textAlign:"center",
color:"#777",
}}

>

No Families Found

</p>

)}



</div>

);

}




const commonBtn = {

padding:"12px",

border:"none",

borderRadius:"14px",

color:"#fff",

fontWeight:"700",

cursor:"pointer",

};



const btnBlue = {

...commonBtn,

background:"#2563EB",

};



const btnGreen = {

...commonBtn,

background:"#16A34A",

};



const btnRed = {

...commonBtn,

background:"#DC2626",

};




export default ManageFamilies;