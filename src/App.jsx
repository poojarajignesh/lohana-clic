import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import ProtectedRoute
from "./components/ProtectedRoute";


import Layout
from "./components/Layout";


// USER PAGES

import Home from "./pages/Home";
import Business from "./pages/Business";
import BusinessDetails from "./pages/BusinessDetails";

import Matrimony from "./pages/Matrimony";
import MatrimonyDetails from "./pages/MatrimonyDetails";

import Blood from "./pages/Blood";
import Families from "./pages/Families";
import Jobs from "./pages/Jobs";

import Updates from "./pages/Updates";

import Profile from "./pages/Profile";
import Search from "./pages/Search";


// LOGIN / FAMILY

import FamilyLogin
from "./pages/FamilyLogin";

import AddFamily
from "./pages/AddFamily";

import AddMember
from "./pages/AddMember";

import FamilyMembers
from "./pages/FamilyMembers";

import EditMember
from "./pages/EditMember";


// ADD PAGES

import AddBusiness
from "./pages/AddBusiness";

import EditBusiness
from "./pages/EditBusiness";

import AddBloodRequest
from "./pages/AddBloodRequest";

import AddJob
from "./pages/AddJob";

import AddUpdate
from "./pages/AddUpdate";

import AddDeathNote
from "./pages/AddDeathNote";

import Birthdays
from "./pages/Birthdays";

import DeathNotes
from "./pages/DeathNotes";

import MyBusinesses
from "./pages/MyBusinesses";

import AdminDashboard
from "./pages/AdminDashboard";

import BusinessApproval
from "./pages/admin/BusinessApproval";

import BloodApproval
from "./pages/admin/BloodApproval";

import MatrimonyApproval
from "./pages/admin/MatrimonyApproval";

import ManageFamilies
from "./pages/admin/ManageFamilies";

import AdminUpdates
from "./pages/AdminUpdates";

import AdminJobs
from "./pages/AdminJobs";

import AdminDeathNotes
from "./pages/AdminDeathNotes";

import AddAdvertisement
from "./pages/AddAdvertisement";

import AddProfessional
from "./pages/AddProfessional";

import Professionals
from "./pages/Professionals";


function App(){

return(

<BrowserRouter>


<Routes>


{/* PUBLIC ROUTES */}


<Route

path="/family-login"

element={
<FamilyLogin />
}

/>


<Route

path="/add-family"

element={
<AddFamily />
}

/>

{/* PROTECTED APP */}


<Route

path="/*"

element={

<ProtectedRoute>

<Layout>


<Routes>


<Route

path="/"

element={
<Home />
}

/>


<Route

path="/business"

element={
<Business />
}

/>


<Route

path="/business/:id"

element={
<BusinessDetails />
}

/>



<Route

path="/matrimony"

element={
<Matrimony />
}

/>



<Route

path="/matrimony/:id"

element={
<MatrimonyDetails />
}

/>



<Route

path="/blood"

element={
<Blood />
}

/>



<Route

path="/families"

element={
<Families />
}

/>



<Route

path="/jobs"

element={
<Jobs />
}

/>



<Route

path="/updates"

element={
<Updates />
}

/>



<Route

path="/profile"

element={
<Profile />
}

/>



<Route

path="/search"

element={
<Search />
}

/>




{/* FAMILY */}


<Route

path="/add-member/:familyId"

element={
<AddMember />
}

/>



<Route

path="/members/:familyId"

element={
<FamilyMembers />
}

/>



<Route

path="/edit-member/:id"

element={
<EditMember />
}

/>



<Route

path="/edit-family/:id"

element={
<AddFamily />
}

/>



{/* ADD / EDIT */}


<Route

path="/add-business"

element={
<AddBusiness />
}

/>


<Route

path="/edit-business/:id"

element={
<EditBusiness />
}

/>


<Route

path="/my-businesses"

element={
<MyBusinesses />
}

/>



<Route

path="/add-blood-request"

element={
<AddBloodRequest />
}

/>



<Route

path="/add-job"

element={
<AddJob />
}

/>



<Route

path="/add-update"

element={
<AddUpdate />
}

/>



<Route

path="/birthdays"

element={
<Birthdays />
}

/>



<Route

path="/death-notes"

element={
<DeathNotes />
}

/>
{/* ADMIN ROUTES */}


<Route

path="/admin"

element={
<AdminDashboard />
}

/>



<Route

path="/admin/business-approval"

element={
<BusinessApproval />
}

/>



<Route

path="/admin/blood-approval"

element={
<BloodApproval />
}

/>



<Route

path="/admin/matrimony-approval"

element={
<MatrimonyApproval />
}

/>



<Route

path="/admin/families"

element={
<ManageFamilies />
}

/>



<Route

path="/admin-updates"

element={
<AdminUpdates />
}

/>



<Route

path="/admin-jobs"

element={
<AdminJobs />
}

/>



<Route

path="/admin-death-notes"

element={
<AdminDeathNotes />
}

/>



<Route

path="/add-advertisement"

element={
<AddAdvertisement />
}

/>



<Route

path="/add-professional"

element={
<AddProfessional />
}

/>



<Route

path="/professionals"

element={
<Professionals />
}

/>



</Routes>


</Layout>


</ProtectedRoute>

}

/>


</Routes>


</BrowserRouter>

);

}


export default App;