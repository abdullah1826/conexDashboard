import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SubTeams from "./pages/SubTeams";
import Leads from "./pages/Leads";
import Analytics from "./pages/Analytics";
import EditMember from "./pages/EditMember";
import Company from "./pages/Company";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
// import { ToastContainer } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import LoginForm from "./pages/Login";
// import ChangePassword from "./pages/ChangePassword";
// import Users from "./pages/Users";

function App() {
  let theToken = localStorage.getItem("conexdash");
  const RequireAuth = ({ children }) => {
    return theToken ? children : <Navigate to="/Login" />;
  };

  const RequireAuthlogin = ({ children }) => {
    return !theToken ? children : <Navigate to="/home" />;
  };
  return (
    <>
      <div style={{ fontFamily: "Inter" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            {/* <Route
              path="/Login"
              element={
                <RequireAuthlogin>
                  <LoginForm />
                </RequireAuthlogin>
              }
            /> */}
            <Route
              path="/home"
              element={
                // <RequireAuth>
                <Home />
                // </RequireAuth>
              }
            />

            <Route
              path="/subteams"
              element={
                // <RequireAuth>
                <SubTeams />
                // </RequireAuth>
              }
            />
            <Route
              path="/leads"
              element={
                // <RequireAuth>
                <Leads />
                // </RequireAuth>
              }
            />
            <Route
              path="/analytics"
              element={
                // <RequireAuth>
                <Analytics />
                // </RequireAuth>
              }
            />

            <Route
              path="/edit/:uid"
              element={
                // <RequireAuth>
                <EditMember />
                // </RequireAuth>
              }
            />

            <Route
              path="/company"
              element={
                // <RequireAuth>
                <Company />
                // </RequireAuth>
              }
            />

            <Route
              path="/signin"
              element={
                // <RequireAuth>
                <SignIn />
                // </RequireAuth>
              }
            />
            <Route
              path="/signup"
              element={
                // <RequireAuth>
                <SignUp />
                // </RequireAuth>
              }
            />

            <Route
              path="/forgetpassword"
              element={
                // <RequireAuth>
                <ForgetPassword />
                // </RequireAuth>
              }
            />
            {/* <Route
              path="/allusers"
              element={
                <RequireAuth>
                  <Users />
                </RequireAuth>
              }
            /> */}
            {/* <Route
              path="/changepass"
              element={
                <RequireAuth>
                  <ChangePassword />
                </RequireAuth>
              }
            /> */}
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          theme="colored"
          hideProgressBar
        />
      </div>
    </>
  );
}

export default App;
