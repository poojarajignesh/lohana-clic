import { useState } from "react";

import { db } from "../firebase/config";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";


function AddUpdate(){


const [formData,setFormData] =
useState({

type:"Official",

title:"",

description:"",

});




const handleChange =
(e)=>{


setFormData({

...formData,

[e.target.name]:
e.target.value,

});


};





const handleSubmit =
async(e)=>{


e.preventDefault();


try{


await addDoc(

collection(
db,
"updates"
),

{

...formData,

status:"Pending",

createdAt:
serverTimestamp(),

}

);



alert(
"Update Added Successfully"
);



setFormData({

type:"Official",

title:"",

description:"",

});



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



<div

style={{
background:
"linear-gradient(135deg,#2D1B7E,#5B3DF5)",
color:"#fff",
padding:"25px",
borderRadius:"26px",
marginBottom:"25px",
}}

>


<h1
style={{
margin:0,
}}

>

📢 Add Update

</h1>


<p>

Community Feed Manager

</p>


</div>





<form

onSubmit={
handleSubmit
}

>



{/* TYPE */}


<label>

Update Type

</label>



<select

name="type"

value={
formData.type
}

onChange={
handleChange
}

style={inputStyle}

>


<option value="Official">

📢 Official

</option>


<option value="Business">

🏢 Business

</option>


<option value="Matrimony">

💍 Matrimony

</option>


<option value="Job">

💼 Job

</option>


<option value="Blood">

🩸 Blood

</option>


</select>





<label>

Title

</label>


<input

type="text"

name="title"

value={
formData.title
}

onChange={
handleChange
}

style={inputStyle}

/>





<label>

Description

</label>



<textarea

name="description"

value={
formData.description
}

onChange={
handleChange
}

rows="6"

style={inputStyle}

/>





<button

type="submit"

style={{
width:"100%",
padding:"15px",
border:"none",
borderRadius:"18px",
background:
"linear-gradient(135deg,#FF6B00,#FF8C42)",
color:"#fff",
fontWeight:"800",
fontSize:"16px",
cursor:"pointer",
}}

>

Save Update

</button>


</form>



</div>

);

}




const inputStyle={

width:"100%",

padding:"14px",

borderRadius:"16px",

border:"1px solid #ddd",

marginBottom:"18px",

marginTop:"6px",

fontSize:"15px",

};




export default AddUpdate;