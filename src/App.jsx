import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AdminAdvertisements
from "./pages/AdminAdvertisements";
import MasterData from "./pages/admin/MasterData";

import ProtectedRoute
from "./components/ProtectedRoute";

import AdminProtectedRoute
from "./components/AdminProtectedRoute";


import Layout
from "./components/Layout";


// LOGIN

import FamilyLogin
from "./pages/FamilyLogin";

import AdminLogin
from "./pages/AdminLogin";


// USER PAGES

import Home
from "./pages/Home";

import Business
from "./pages/Business";

import BusinessDetails
from "./pages/BusinessDetails";


import Matrimony
from "./pages/Matrimony";

import MatrimonyDetails
from "./pages/MatrimonyDetails";


import Blood
from "./pages/Blood";

import Families
from "./pages/Families";

import Jobs
from "./pages/Jobs";


import Updates
from "./pages/Updates";

import Profile
from "./pages/Profile";

import Search
from "./pages/Search";


// FAMILY

import AddFamily
from "./pages/AddFamily";

import AddMember
from "./pages/AddMember";

import FamilyMembers
from "./pages/FamilyMembers";

import EditMember
from "./pages/EditMember";


// BUSINESS

import AddBusiness
from "./pages/AddBusiness";

import EditBusiness
from "./pages/EditBusiness";

import MyBusinesses
from "./pages/MyBusinesses";


// ADD

import AddBloodRequest
from "./pages/AddBloodRequest";

import AddJob
from "./pages/AddJob";

import AddUpdate
from "./pages/AddUpdate";

import Birthdays
from "./pages/Birthdays";

import DeathNotes
from "./pages/DeathNotes";


// ADMIN

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


// OTHER

import AddAdvertisement
from "./pages/AddAdvertisement";

import AddProfessional
from "./pages/AddProfessional";

import Professionals
from "./pages/Professionals";

import AdminNotification
from "./pages/AdminNotification";

import Notifications
from "./pages/Notifications";


function App(){

return(

<BrowserRouter>

<Routes>


{/* PUBLIC LOGIN */}


<Route
path="/family-login"
element={<FamilyLogin />}
/>



<Route
path="/admin-login"
element={<AdminLogin />}
/>


<Route
path="/add-family"
element={<AddFamily />}
/>
{/* ADMIN ROUTES OUTSIDE USER LOGIN 🔒 */}


<Route
path="/admin/notification"
element={
<AdminProtectedRoute>
<AdminNotification />
</AdminProtectedRoute>
}
/>

<Route
  path="/admin/master-data"
  element={
    <AdminProtectedRoute>
      <MasterData />
    </AdminProtectedRoute>
  }
/>

<Route
path="/admin"
element={
<AdminProtectedRoute>
<AdminDashboard />
</AdminProtectedRoute>
}
/>

<Route
path="/admin/advertisements"
element={
<AdminProtectedRoute>
<AdminAdvertisements />
</AdminProtectedRoute>
}
/>


<Route
path="/admin/business-approval"
element={
<AdminProtectedRoute>
<BusinessApproval />
</AdminProtectedRoute>
}
/>


<Route
path="/admin/blood-approval"
element={
<AdminProtectedRoute>
<BloodApproval />
</AdminProtectedRoute>
}
/>


<Route
path="/admin/matrimony-approval"
element={
<AdminProtectedRoute>
<MatrimonyApproval />
</AdminProtectedRoute>
}
/>


<Route
path="/admin/families"
element={
<AdminProtectedRoute>
<ManageFamilies />
</AdminProtectedRoute>
}
/>


<Route
path="/admin-updates"
element={
<AdminProtectedRoute>
<AdminUpdates />
</AdminProtectedRoute>
}
/>


<Route
path="/admin-jobs"
element={
<AdminProtectedRoute>
<AdminJobs />
</AdminProtectedRoute>
}
/>


<Route
path="/admin-death-notes"
element={
<AdminProtectedRoute>
<AdminDeathNotes />
</AdminProtectedRoute>
}
/>





{/* USER APP PROTECTED */}


<Route
path="/*"
element={

<ProtectedRoute>

<Layout>

<Routes>


<Route
path="/"
element={<Home />}
/>


<Route
path="/business"
element={<Business />}
/>


<Route
path="/business/:id"
element={<BusinessDetails />}
/>


<Route
path="/matrimony"
element={<Matrimony />}
/>


<Route
path="/matrimony/:id"
element={<MatrimonyDetails />}
/>


<Route
path="/blood"
element={<Blood />}
/>


<Route
path="/families"
element={<Families />}
/>


<Route
path="/jobs"
element={<Jobs />}
/>


<Route
path="/updates"
element={<Updates />}
/>


<Route
path="/profile"
element={<Profile />}
/>


<Route
path="/search"
element={<Search />}
/>

<Route
path="/notifications"
element={<Notifications />}
/>




{/* FAMILY */}


<Route
path="/add-member/:familyId"
element={<AddMember />}
/>


<Route
path="/members/:familyId"
element={<FamilyMembers />}
/>


<Route
path="/edit-member/:id"
element={<EditMember />}
/>


<Route
path="/edit-family/:id"
element={<AddFamily />}
/>





{/* BUSINESS */}


<Route
path="/add-business"
element={<AddBusiness />}
/>


<Route
path="/edit-business/:id"
element={<EditBusiness />}
/>


<Route
path="/my-businesses"
element={<MyBusinesses />}
/>





{/* ADD */}


<Route
path="/add-blood-request"
element={<AddBloodRequest />}
/>


<Route
path="/add-job"
element={<AddJob />}
/>


<Route
path="/add-update"
element={<AddUpdate />}
/>


<Route
path="/birthdays"
element={<Birthdays />}
/>


<Route
path="/death-notes"
element={<DeathNotes />}
/>




{/* OTHER */}


<Route
path="/add-advertisement"
element={<AddAdvertisement />}
/>


<Route
path="/add-professional"
element={<AddProfessional />}
/>


<Route
path="/professionals"
element={<Professionals />}
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