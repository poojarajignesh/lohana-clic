import { useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { loginFamily } from "../auth/Auth";
import logo from "../assets/logo.png"; // Place your uploaded logo here

export default function FamilyLogin(){
const [familyId,setFamilyId]=useState("");
const [mobile,setMobile]=useState("");
const [loading,setLoading]=useState(false);
const navigate=useNavigate();

const handleLogin=async()=>{
 if(!familyId||!mobile){alert("Enter Family ID & Mobile");return;}
 setLoading(true);
 try{
  const snap=await getDocs(collection(db,"families"));
  const family=snap.docs.find(d=>{
    const x=d.data();
    return x.familyId?.toUpperCase()===familyId.toUpperCase() && x.mobile1===mobile;
  });
  if(!family){alert("Invalid Family ID or Mobile Number");setLoading(false);return;}
  loginFamily({id:family.id,...family.data()});
  navigate("/");
 }catch(e){console.log(e);alert("Something went wrong");}
 setLoading(false);
};

return(
<div style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:20,
background:"linear-gradient(160deg,#2D1B7E,#4527A0,#FF6A2B)"
}}>
<div style={{
width:"100%",
maxWidth:420,
background:"#fff",
borderRadius:30,
padding:30,
boxShadow:"0 30px 80px rgba(0,0,0,.25)"
}}>
<div style={{textAlign:"center",marginBottom:25}}>
<img src={logo} alt="Lohana Clic" style={{width:220,maxWidth:"100%"}}/>
<p style={{color:"#64748B",marginTop:10}}>Welcome Back</p>
</div>

<input style={i} placeholder="Family ID" value={familyId} onChange={e=>setFamilyId(e.target.value)}/>
<input style={i} placeholder="Mobile Number" value={mobile} onChange={e=>setMobile(e.target.value)}/>

<button onClick={handleLogin} style={b}>
{loading?"Please Wait...":"Login"}
</button>

<p style={{textAlign:"center",fontSize:13,color:"#64748B",marginTop:18}}>
Don't have Family ID?
</p>

<div
onClick={()=>navigate("/add-family")}
style={{
textAlign:"center",
marginTop:8,
color:"#FF6A2B",
fontWeight:"700",
cursor:"pointer"
}}
>
Register Your Family
</div>
</div>
</div>
);
}

const i={width:"100%",padding:16,borderRadius:16,border:"1px solid #E2E8F0",marginBottom:16,boxSizing:"border-box",fontSize:15};
const b={width:"100%",padding:16,borderRadius:16,border:"none",background:"linear-gradient(135deg,#FF6A2B,#FF8A50)",color:"#fff",fontWeight:700,fontSize:16,cursor:"pointer"};
