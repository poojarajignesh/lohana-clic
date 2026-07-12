import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "../firebase/config";

import {
  FaUsers,
  FaUser,
  FaStore,
  FaBriefcase,
  FaTint,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";


function AdminDashboard(){

const navigate = useNavigate();


const [counts,setCounts] =
useState({

families:0,
members:0,

businesses:0,
pendingBusinesses:0,

matrimony:0,
pendingMatrimony:0,

jobs:0,

bloodRequests:0,
pendingBlood:0,

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


const memberData =
members.docs.map(
d=>d.data()
);


const businessData =
businesses.docs.map(
d=>d.data()
);


const bloodData =
blood.docs.map(
d=>d.data()
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
x=>x.status==="Pending"
).length,


matrimony:
memberData.filter(
x=>x.isMatrimony===true
).length,


pendingMatrimony:
memberData.filter(
x=>
x.isMatrimony===true &&
x.matrimonyStatus==="Pending"
).length,


jobs:
jobs.size,


bloodRequests:
blood.size,


pendingBlood:
bloodData.filter(
x=>x.status==="Pending"
).length,

});


}
catch(e){

console.log(e);

}

};
const logout = () => {

localStorage.removeItem(
"isAdmin"
);

navigate(
"/admin-login"
);

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
"linear-gradient(135deg,#111827,#2D1B7E,#5B3DF5)",
padding:"25px",
borderRadius:"28px",
color:"#fff",
marginBottom:"20px",
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
}}
>


<div>

<div>
👑 Administrator
</div>

<h1>
Lohana Clic
</h1>

<p>
Master Dashboard
</p>

</div>


<button

onClick={logout}

style={{
border:"none",
padding:"12px",
borderRadius:"15px",
}}

>

<FaSignOutAlt/>

</button>


</div>

</div>



{/* STATS */}


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(2,1fr)",
gap:"15px",
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
title="Matrimony"
value={counts.matrimony}
icon={<FaHeart/>}
/>


<Card
title="Jobs"
value={counts.jobs}
icon={<FaBriefcase/>}
/>


<Card
title="Blood"
value={counts.bloodRequests}
icon={<FaTint/>}
/>


</div>



<h3>
<ActionButton

title="📢 Manage Advertisements"

onClick={()=>
navigate(
"/admin/advertisements"
)
}

/>
</h3>



<ActionButton

title={
`Business Approval (${counts.pendingBusinesses})`
}

onClick={()=>
navigate(
"/admin/business-approval"
)
}

/>



<ActionButton

title={
`Matrimony Approval (${counts.pendingMatrimony})`
}

onClick={()=>
navigate(
"/admin/matrimony-approval"
)
}

/>



<ActionButton

title={
`Blood Approval (${counts.pendingBlood})`
}

onClick={()=>
navigate(
"/admin/blood-approval"
)
}

/>

<ActionButton

title="🔔 Send Notification"

onClick={()=>
navigate(
"/admin/notification"
)
}

/>
<ActionButton
  title="🗂 Master Data"
  onClick={() =>
    navigate("/admin/master-data")
  }
/>


</div>

);

}




function Card({
title,
value,
icon
}){

return(

<div
style={{
background:"#fff",
padding:"18px",
borderRadius:"22px",
textAlign:"center",
boxShadow:
"0 10px 25px rgba(0,0,0,.08)",
}}
>

<div
style={{
fontSize:"25px",
color:"#2D1B7E",
}}
>

{icon}

</div>

<h2>
{value}
</h2>

<p>
{title}
</p>

</div>

);

}




function ActionButton({
title,
onClick
}){

return(

<button

onClick={onClick}

style={{
width:"100%",
padding:"15px",
border:"none",
borderRadius:"18px",
background:
"linear-gradient(135deg,#FF6B00,#FF8C42)",
color:"#fff",
fontWeight:"800",
marginTop:"12px",
}}

>

{title}

</button>

);

}



export default AdminDashboard;