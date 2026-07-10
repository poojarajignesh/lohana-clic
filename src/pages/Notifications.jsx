import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import {
  db
} from "../firebase/config";


function Notifications(){

const [notifications,setNotifications] =
useState([]);


useEffect(()=>{

loadNotifications();

},[]);



const loadNotifications =
async()=>{

try{

const q =
query(
collection(
db,
"notifications"
),
orderBy(
"createdAt",
"desc"
)
);


const snap =
await getDocs(q);


const list =
snap.docs.map(
doc=>({

id:doc.id,

...doc.data(),

})
);


setNotifications(list);


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
paddingBottom:"100px",
}}

>


<h2

style={{
color:"#2D1B7E",
marginBottom:"20px",
}}

>

🔔 Notifications

</h2>



{
notifications.length===0 &&

<p>
No Notifications
</p>

}



{

notifications.map(
(item)=>(


<div

key={item.id}

style={{

background:"#fff",

padding:"18px",

borderRadius:"20px",

marginBottom:"15px",

boxShadow:
"0 10px 25px rgba(0,0,0,.08)",

}}

>


<h3
style={{
margin:"0 0 8px",
color:"#111827",
}}
>

{item.title}

</h3>



<p

style={{
color:"#475569",
lineHeight:"1.5",
}}

>

{item.message}

</p>



<small

style={{
color:"#64748B",
fontWeight:"700",
}}

>

📍 {item.city || "All"}

</small>


</div>


)

)

}


</div>

);

}


export default Notifications;