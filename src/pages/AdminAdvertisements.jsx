import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  db
} from "../firebase/config";



function AdminAdvertisements(){

const [ads,setAds] =
useState([]);



useEffect(()=>{

loadAds();

},[]);




const loadAds =
async()=>{

try{


const snap =
await getDocs(
collection(
db,
"advertisements"
)
);


const list =
snap.docs.map(
doc=>({

id:doc.id,

...doc.data(),

})
);


setAds(list);


}

catch(error){

console.log(error);

}

};




const changeStatus =
async(id,status)=>{

await updateDoc(

doc(
db,
"advertisements",
id
),

{

status:
status==="Active"
?
"Inactive"
:
"Active"

}

);


loadAds();

};




const removeAd =
async(id)=>{


if(
!window.confirm(
"Delete Advertisement?"
)
)
return;


await deleteDoc(

doc(
db,
"advertisements",
id
)

);


loadAds();


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

<h2
style={{
color:"#2D1B7E",
}}
>
📢 Manage Advertisements
</h2>


{
ads.length===0 &&

<p>
No Advertisements Found
</p>

}


{
ads.map((ad)=>(

<div

key={ad.id}

style={{

background:"#fff",

borderRadius:"22px",

padding:"15px",

marginBottom:"15px",

boxShadow:
"0 10px 25px rgba(0,0,0,.08)",

}}

>


<img

src={ad.imageUrl}

alt={ad.title}

style={{

width:"100%",

height:"150px",

objectFit:"cover",

borderRadius:"18px",

}}

/>


<h3>

{ad.title}

</h3>


<p>

Status :

<b
style={{
marginLeft:"5px",
}}
>

{
ad.status
}

</b>

</p>



<button

onClick={()=>
changeStatus(
ad.id,
ad.status
)
}

style={{
...btn,
background:
ad.status==="Active"
?
"#16A34A"
:
"#64748B",
}}

>

{
ad.status==="Active"
?
"Deactivate"
:
"Activate"
}

</button>




<button

onClick={()=>
removeAd(
ad.id
)
}

style={{
...btn,
background:"#DC2626",
}}

>

Delete

</button>


</div>

))

}


</div>

);

}




const btn={

width:"100%",

padding:"12px",

border:"none",

borderRadius:"14px",

color:"#fff",

fontWeight:"800",

marginTop:"10px",

cursor:"pointer",

};



export default AdminAdvertisements;