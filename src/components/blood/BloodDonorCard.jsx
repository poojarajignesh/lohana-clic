import {
  FaTint,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";


function BloodDonorCard({
  donor,
}) {

return (

<div
style={{
background:"#fff",
borderRadius:"26px",
padding:"20px",
marginBottom:"18px",
boxShadow:
"0 15px 35px rgba(220,38,38,.10)",
border:"1px solid #FEE2E2",
}}
>


{/* Top Badge */}

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"18px",
}}
>

<div
style={{
background:
"linear-gradient(135deg,#DC2626,#EF4444)",
color:"#fff",
padding:"8px 16px",
borderRadius:"30px",
fontWeight:"800",
display:"flex",
gap:"6px",
alignItems:"center",
}}
>

<FaTint/>

{donor.bloodGroup || "-"}

</div>


<div
style={{
color:"#16A34A",
fontSize:"13px",
fontWeight:"700",
display:"flex",
gap:"5px",
alignItems:"center",
}}
>

<FaCheckCircle/>

Available

</div>

</div>


{/* Profile */}

<div
style={{
display:"flex",
gap:"15px",
alignItems:"center",
marginBottom:"18px",
}}
>


{donor.photoUrl ? (

<img
src={donor.photoUrl}
alt=""
style={{
width:"80px",
height:"80px",
borderRadius:"50%",
objectFit:"cover",
border:
"4px solid #FEE2E2",
}}
/>

):(

<div
style={{
width:"80px",
height:"80px",
borderRadius:"50%",
background:"#FEE2E2",
color:"#DC2626",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontSize:"32px",
fontWeight:"800",
}}
>

{donor.fullName?.charAt(0)}

</div>

)}


<div>

<h3
style={{
margin:"0 0 8px",
fontSize:"20px",
}}
>

{donor.fullName}

</h3>


<div
style={{
display:"flex",
gap:"6px",
alignItems:"center",
color:"#64748B",
}}
>

<FaMapMarkerAlt/>

{donor.currentPlace ||
donor.village ||
"Gujarat"}

</div>


</div>

</div>

{/* Contact Info */}

<div
style={{
background:"#FEF2F2",
borderRadius:"18px",
padding:"14px",
marginBottom:"18px",
display:"flex",
alignItems:"center",
gap:"10px",
color:"#991B1B",
fontWeight:"700",
}}
>

<FaUser/>

{donor.mobile || "-"}

</div>


{/* Buttons */}

<div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"12px",
}}
>


<a
href={`tel:${donor.mobile}`}
style={{
background:"#DC2626",
color:"#fff",
textDecoration:"none",
padding:"14px",
borderRadius:"16px",
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:"8px",
fontWeight:"700",
}}
>

<FaPhoneAlt/>

Call

</a>


<a
href={`https://wa.me/91${donor.mobile}`}
target="_blank"
rel="noreferrer"
style={{
background:"#22C55E",
color:"#fff",
textDecoration:"none",
padding:"14px",
borderRadius:"16px",
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:"8px",
fontWeight:"700",
}}
>

<FaWhatsapp/>

WhatsApp

</a>


</div>


</div>

);

}


export default BloodDonorCard;