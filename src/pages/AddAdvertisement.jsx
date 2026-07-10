import {
  useState,
} from "react";

import {
  db
} from "../firebase/config";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";


function AddAdvertisement(){

const [uploading,setUploading] =
useState(false);


const [image,setImage] =
useState(null);


const [preview,setPreview] =
useState("");


const [formData,setFormData] =
useState({

title:"",

link:"",

startDate:"",

endDate:"",

status:"Active",

imageUrl:"",

});



const handleChange =
(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value,

});

};



const handleImage =
(e)=>{

const file =
e.target.files[0];


if(file){

setImage(file);

setPreview(
URL.createObjectURL(file)
);

}

};




const uploadImage =
async()=>{


if(!image)
return "";


setUploading(true);


const data =
new FormData();


data.append(
"file",
image
);


data.append(
"upload_preset",
"lohana_clic_upload"
);



const res =
await fetch(

"https://api.cloudinary.com/v1_1/dzdbtwqon/image/upload",

{

method:"POST",

body:data,

}

);



const result =
await res.json();


setUploading(false);


return result.secure_url;


};  
const handleSubmit =
async(e)=>{

e.preventDefault();


try{


const imageUrl =
await uploadImage();



await addDoc(

collection(
db,
"advertisements"
),

{

...formData,

imageUrl,

createdAt:
serverTimestamp(),

}

);



alert(
"Advertisement Added Successfully"
);



setFormData({

title:"",

link:"",

startDate:"",

endDate:"",

status:"Active",

imageUrl:"",

});


setImage(null);

setPreview("");


}

catch(error){

console.log(error);

alert(
"Something went wrong"
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
}}
>

📢 Add Advertisement

</h2>



<form
onSubmit={handleSubmit}
>


<input

type="text"

name="title"

placeholder="Advertisement Title"

value={formData.title}

onChange={handleChange}

style={inputStyle}

/>



<input

type="file"

accept="image/*"

onChange={handleImage}

style={inputStyle}

/>



{
preview &&

<img

src={preview}

alt="Preview"

style={{

width:"100%",

height:"150px",

objectFit:"cover",

borderRadius:"18px",

marginBottom:"15px",

}}

/>

}



<input

type="text"

name="link"

placeholder="Website / WhatsApp Link"

value={formData.link}

onChange={handleChange}

style={inputStyle}

/>



<label>
Start Date
</label>

<input

type="date"

name="startDate"

value={formData.startDate}

onChange={handleChange}

style={inputStyle}

/>




<label>
End Date
</label>

<input

type="date"

name="endDate"

value={formData.endDate}

onChange={handleChange}

style={inputStyle}

/>




<select

name="status"

value={formData.status}

onChange={handleChange}

style={inputStyle}

>

<option value="Active">
Active
</option>

<option value="Inactive">
Inactive
</option>

</select>





<button

type="submit"

disabled={uploading}

style={buttonStyle}

>


{
uploading
?
"Uploading..."
:
"Save Advertisement"
}


</button>


</form>


</div>

);

}




const inputStyle={

width:"100%",

padding:"14px",

marginBottom:"15px",

borderRadius:"14px",

border:"1px solid #ddd",

background:"#fff",

};



const buttonStyle={

width:"100%",

padding:"15px",

border:"none",

borderRadius:"16px",

background:
"linear-gradient(135deg,#FF6B00,#FF8C42)",

color:"#fff",

fontWeight:"800",

cursor:"pointer",

};



export default AddAdvertisement;