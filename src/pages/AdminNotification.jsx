import {
  useState,
} from "react";


import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";


import {
  db
} from "../firebase/config";



function AdminNotification(){


const [formData,setFormData] =
useState({

title:"",

message:"",

city:"All",

});



const handleChange =
(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value,

});

};




const sendNotification =
async(e)=>{

e.preventDefault();


try{


await addDoc(

collection(
db,
"notifications"
),

{

...formData,

type:"admin",

read:false,

createdAt:
serverTimestamp(),

}

);



alert(
"Notification Sent Successfully"
);



setFormData({

title:"",

message:"",

city:"All",

});


}

catch(error){

console.log(error);

alert(
"Error Sending Notification"
);

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


<h2
style={{
color:"#2D1B7E",
marginBottom:"20px",
}}
>

🔔 Send Notification

</h2>



<form
onSubmit={sendNotification}
>


<input

type="text"

name="title"

placeholder="Notification Title"

value={formData.title}

onChange={handleChange}

style={inputStyle}

/>



<textarea

name="message"

placeholder="Write Message"

value={formData.message}

onChange={handleChange}

rows="5"

style={{
...inputStyle,
resize:"none",
}}

/>



<input

type="text"

name="city"

placeholder="City (All / Ahmedabad)"

value={formData.city}

onChange={handleChange}

style={inputStyle}

/>



<button

type="submit"

style={buttonStyle}

>

Send Notification 🚀

</button>


</form>


</div>

);

}




const inputStyle={

width:"100%",

padding:"14px",

border:"1px solid #ddd",

borderRadius:"15px",

marginBottom:"15px",

background:"#fff",

fontSize:"15px",

};




const buttonStyle={

width:"100%",

padding:"15px",

border:"none",

borderRadius:"18px",

background:
"linear-gradient(135deg,#2D1B7E,#5B3DF5)",

color:"#fff",

fontWeight:"800",

cursor:"pointer",

};




export default AdminNotification;