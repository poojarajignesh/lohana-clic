import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminBloodRequests from "./pages/AdminBloodRequests";
import FamilyDetails from "./pages/FamilyDetails";
import Home from "./pages/Home";
import Business from "./pages/Business";
import Matrimony from "./pages/Matrimony";
import Blood from "./pages/Blood";
import Families from "./pages/Families";
import Jobs from "./pages/Jobs";
import AddBusiness from "./pages/AddBusiness";
import BusinessDetails from "./pages/BusinessDetails";
import Admin from "./pages/Admin";
import AddFamily from "./pages/AddFamily";
import FamilyLogin from "./pages/FamilyLogin";
import AddMember from "./pages/AddMember";
import FamilyMembers from "./pages/FamilyMembers";
import EditMember from "./pages/EditMember";
import MatrimonyDetails from "./pages/MatrimonyDetails";
import AddBloodRequest from "./pages/AddBloodRequest";
import AddJob from "./pages/AddJob";
import AdminJobs from "./pages/AdminJobs";
import AddUpdate from "./pages/AddUpdate";  
import Updates from "./pages/Updates";
import AdminUpdates from "./pages/AdminUpdates";
import Birthdays from "./pages/Birthdays";
import AddDeathNote from "./pages/AddDeathNote";
import DeathNotes from "./pages/DeathNotes";
import AdminDeathNotes from "./pages/AdminDeathNotes";
import AdminDashboard from "./pages/AdminDashboard";
import AddAdvertisement from "./pages/AddAdvertisement";
import AddProfessional from "./pages/AddProfessional";
import Professionals from "./pages/Professionals";
import EditBusiness from "./pages/EditBusiness";
import Search from "./pages/Search";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import MyBusinesses from "./pages/MyBusinesses";





function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
  path="/search"
  element={<Search />}
/>

<Route
  path="/edit-family/:id"
  element={<AddFamily />}
/>

<Route
  path="/my-businesses"
  element={<MyBusinesses />}
/>

<Route
  path="/profile"
  element={<Profile />}
/>


        <Route
  path="/edit-business/:id"
  element={<EditBusiness />}
/>

        <Route
  path="/professionals"
  element={<Professionals />}
/>

        <Route
  path="/add-professional"
  element={
    <AddProfessional />
  }
/>

        <Route
  path="/add-advertisement"
  element={
    <AddAdvertisement />
  }
/>

        <Route
  path="/master-admin"
  element={
    <AdminDashboard />
  }
/>

        <Route
  path="/death-notes"
  element={<DeathNotes />}
/>

<Route
  path="/admin-death-notes"
  element={<AdminDeathNotes />}
/>

        <Route
  path="/add-death-note"
  element={<AddDeathNote />}
/>

        <Route
  path="/birthdays"
  element={<Birthdays />}
/>

        <Route
  path="/admin-updates"
  element={<AdminUpdates />}
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
          path="/add-business"
          element={<AddBusiness />}
        />

        <Route
          path="/families"
          element={<Families />}
        />

        <Route
          path="/add-family"
          element={<AddFamily />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/matrimony"
          element={<Matrimony />}
        />

        <Route
          path="/blood"
          element={<Blood />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />
        <Route
  path="/add-member/:familyId"
  element={<AddMember />}
/>


<Route
  path="/family-login"
  element={<FamilyLogin />}
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
  path="/matrimony/:id"
  element={<MatrimonyDetails />}
/>

<Route
  path="/add-blood-request"
  element={<AddBloodRequest />}
/>
<Route
  path="/add-job"
  element={<AddJob />}
/>
  
  <Route
  path="/admin-blood"
  element={<AdminBloodRequests />}
/>

<Route
  path="/admin-jobs"
  element={<AdminJobs />}
/>

<Route
  path="/add-update"
  element={<AddUpdate />}
/>

<Route
  path="/updates"
  element={<Updates />}
/>

      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;