import {
  useEffect,
  useState,
} from "react";

import {
  db
} from "../firebase/config";

import {
  collection,
  getDocs,
} from "firebase/firestore";


function AdvertisementSlider(){

const [ads,setAds] =
useState([]);

const [current,setCurrent] =
useState(0);



useEffect(()=>{

loadAds();

},[]);



useEffect(()=>{

if(ads.length===0)
return;


const timer =
setInterval(()=>{

setCurrent(
prev =>
(prev+1)%ads.length
);

},3000);


return()=>clearInterval(timer);

},[ads]);




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


const today =
new Date()
.toISOString()
.split("T")[0];


const list =
snap.docs

.map(doc=>({

id:doc.id,

...doc.data(),

}))

.filter(ad=>{

return (

ad.status==="Active"

&&

(!ad.startDate ||
ad.startDate <= today)

&&

(!ad.endDate ||
ad.endDate >= today)

);

});


setAds(list);


}

catch(error){

console.log(error);

}

};




if(ads.length===0)
return null;


const ad =
ads[current];



const openAd =
()=>{

if(ad.link){

window.open(
ad.link,
"_blank"
);

}

};



return(

<div
onClick={openAd}
style={{
marginBottom:"20px",
position:"relative",
cursor:"pointer",
}}
>


<img

src={ad.imageUrl}

alt={ad.title}

style={{

width:"100%",

height:"160px",

objectFit:"cover",

borderRadius:"22px",

boxShadow:
"0 10px 30px rgba(0,0,0,.15)",

}}

/>


<div

style={{

position:"absolute",

bottom:"0",

left:"0",

right:"0",

padding:"12px",

borderRadius:
"0 0 22px 22px",

background:
"linear-gradient(transparent,rgba(0,0,0,.65))",

color:"#fff",

fontWeight:"800",

}}

>

{ad.title}

</div>



<div

style={{

textAlign:"center",

marginTop:"8px",

}}

>

{

ads.map((_,i)=>(

<span

key={i}

style={{

fontSize:"18px",

margin:"3px",

}}

>

{i===current?"●":"○"}

</span>

))

}

</div>


</div>

);

}


export default AdvertisementSlider;