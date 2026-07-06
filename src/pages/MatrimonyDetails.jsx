import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { db } from "../firebase/config";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaGraduationCap,
  FaBriefcase,
  FaPhoneAlt,
  FaWhatsapp,
  FaShareAlt,
  FaUser,
  FaTint,
  FaBirthdayCake,
} from "react-icons/fa";


function MatrimonyDetails() {

const { id } = useParams();

const navigate =
  useNavigate();

const [profile, setProfile] =
  useState(null);


useEffect(() => {
  loadProfile();
}, []);


const loadProfile =
async () => {

try {

const docRef = doc(
  db,
  "members",
  id
);

const snap =
  await getDoc(docRef);

if (snap.exists()) {

setProfile({
  id: snap.id,
  ...snap.data(),
});

}

} catch(error) {

console.log(error);

}

};


const calculateAge =
(dob) => {

if (!dob) return "-";

try {

const p =
dob.split("/");

const birth =
new Date(
  p[2],
  p[1]-1,
  p[0]
);

const today =
new Date();

let age =
today.getFullYear()
-
birth.getFullYear();

return age;

} catch {

return "-";

}

};


const shareProfile =
async () => {

const text =
`
${profile.fullName}

Education:
${profile.education}

Occupation:
${profile.occupation}

Shared via Lohana Clic
`;

if(navigator.share){

await navigator.share({
text,
});

}else{

navigator.clipboard.writeText(
text
);

alert(
"Biodata copied"
);

}

};


if(!profile){

return (
<div
style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontWeight:"700",
}}
>
Loading...
</div>
);

}


return (

<div
style={{
maxWidth:"430px",
margin:"0 auto",
padding:"20px",
background:"#F8FAFC",
minHeight:"100vh",
paddingBottom:"40px",
}}
>


{/* HEADER */}

<div
style={{
background:
"linear-gradient(135deg,#2563EB,#60A5FA)",
borderRadius:"30px",
padding:"25px",
color:"#fff",
textAlign:"center",
position:"relative",
marginBottom:"20px",
}}
>

<button
onClick={() =>
navigate(-1)
}
style={{
position:"absolute",
left:"15px",
top:"15px",
border:"none",
width:"40px",
height:"40px",
borderRadius:"50%",
background:
"rgba(255,255,255,.2)",
color:"#fff",
}}
>

<FaArrowLeft/>

</button>


{profile.photoUrl ? (

<img
src={profile.photoUrl}
alt=""
style={{
width:"110px",
height:"110px",
borderRadius:"50%",
objectFit:"cover",
border:"5px solid white",
}}
/>

):(

<div
style={{
width:"110px",
height:"110px",
borderRadius:"50%",
background:"#fff",
color:"#2563EB",
margin:"0 auto",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontSize:"40px",
fontWeight:"800",
}}
>

{profile.fullName?.charAt(0)}

</div>

)}


<h2>
{profile.fullName}
</h2>


<p>
{calculateAge(profile.dob)}
 Years • 
 {profile.gender}
</p>


<div
style={{
display:"inline-flex",
gap:"8px",
alignItems:"center",
background:
"rgba(255,255,255,.2)",
padding:"8px 15px",
borderRadius:"30px",
fontWeight:"700",
}}
>

<FaCheckCircle/>

Verified Biodata

</div>

</div>
{/* PERSONAL DETAILS */}

<Section title="Personal Details">

<Info
 icon={<FaBirthdayCake/>}
 label="Date Of Birth"
 value={profile.dob}
/>

<Info
 icon={<FaUser/>}
 label="Height"
 value={profile.height}
/>

<Info
 icon={<FaUser/>}
 label="Marital Status"
 value={
  profile.maritalStatus ||
  "-"
 }
/>

<Info
 icon={<FaTint/>}
 label="Blood Group"
 value={
  profile.bloodGroup ||
  "-"
 }
/>

</Section>



{/* EDUCATION */}

<Section title="Education & Career">

<Info
 icon={<FaGraduationCap/>}
 label="Education"
 value={
 profile.education ||
 "-"
 }
/>

<Info
 icon={<FaBriefcase/>}
 label="Occupation"
 value={
 profile.occupation ||
 "-"
 }
/>

</Section>



{/* FAMILY */}

<Section title="Family Information">

<Info
 icon={<FaUser/>}
 label="Relation"
 value={
 profile.relation ||
 "-"
 }
/>

<Info
 icon={<FaUser/>}
 label="Family ID"
 value={
 profile.familyId ||
 "-"
 }
/>

</Section>



{/* CONTACT BUTTONS */}

<div
style={{
display:"grid",
gridTemplateColumns:
"1fr 1fr",
gap:"12px",
marginBottom:"15px",
}}
>

<a
href={`tel:${profile.mobile}`}
style={btnBlue}
>
<FaPhoneAlt/>
Call
</a>


<a
href={`https://wa.me/91${profile.mobile}`}
target="_blank"
rel="noreferrer"
style={btnGreen}
>
<FaWhatsapp/>
WhatsApp
</a>

</div>


<button
onClick={shareProfile}
style={{
width:"100%",
padding:"15px",
border:"none",
borderRadius:"18px",
background:
"linear-gradient(135deg,#FF6B00,#FF8C42)",
color:"#fff",
fontWeight:"700",
fontSize:"16px",
cursor:"pointer",
}}
>

<FaShareAlt/>
{" "}
Share Biodata

</button>


</div>

);

}



/* COMPONENTS */

function Section({
title,
children
}){

return (

<div
style={{
background:"#fff",
borderRadius:"24px",
padding:"20px",
marginBottom:"18px",
boxShadow:
"0 10px 25px rgba(0,0,0,.08)",
}}
>

<h3
style={{
marginTop:0,
color:"#2563EB",
}}
>
{title}
</h3>

{children}

</div>

);

}


function Info({
icon,
label,
value
}){

return (

<div
style={{
display:"flex",
gap:"12px",
marginBottom:"14px",
alignItems:"center",
}}
>

<div
style={{
color:"#2563EB",
fontSize:"20px",
}}
>
{icon}
</div>


<div>

<div
style={{
fontSize:"12px",
color:"#64748B",
}}
>
{label}
</div>


<div
style={{
fontWeight:"700",
color:"#1E293B",
}}
>
{value || "-"}
</div>

</div>

</div>

);

}


const btnBlue = {
background:"#2563EB",
color:"#fff",
textDecoration:"none",
padding:"14px",
borderRadius:"16px",
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:"8px",
fontWeight:"700",
};


const btnGreen = {
background:"#25D366",
color:"#fff",
textDecoration:"none",
padding:"14px",
borderRadius:"16px",
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:"8px",
fontWeight:"700",
};


export default MatrimonyDetails;