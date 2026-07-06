import {
  FaTint,
  FaHospital,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";


function BloodRequestCard({
  request,
}) {

return (

<div
style={{
background:"#fff",
borderRadius:"26px",
padding:"20px",
marginBottom:"18px",
border:"1px solid #FECACA",
boxShadow:
"0 15px 35px rgba(220,38,38,.12)",
}}
>


{/* Emergency Badge */}

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
}}
>

🚨 URGENT

</div>


<div
style={{
fontSize:"24px",
fontWeight:"900",
color:"#DC2626",
display:"flex",
alignItems:"center",
gap:"6px",
}}
>

<FaTint/>

{request.bloodGroup}

</div>

</div>


<h2
style={{
margin:"0 0 15px",
color:"#111827",
}}
>

{request.patientName}

</h2>


<Info
icon={<FaHospital/>}
label="Hospital"
value={request.hospital}
/>


<Info
icon={<FaMapMarkerAlt/>}
label="City"
value={request.city}
/>


<Info
icon={<FaUser/>}
label="Contact"
value={request.contactPerson}
/>


<Info
icon={<FaCalendarAlt/>}
label="Required Date"
value={request.requirementDate}
/>


<div
style={{
background:"#FEF2F2",
padding:"12px",
borderRadius:"16px",
margin:"15px 0",
color:"#991B1B",
fontWeight:"600",
}}
>

Need {request.units} Unit Blood

</div>


<a
href={`tel:${request.mobile}`}
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

Help Now

</a>


</div>

);

}


function Info({
icon,
label,
value,
}){

return(

<div
style={{
display:"flex",
gap:"10px",
marginBottom:"12px",
alignItems:"center",
}}
>

<div
style={{
color:"#DC2626",
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
}}
>

{value || "-"}

</div>

</div>


</div>

);

}


export default BloodRequestCard;