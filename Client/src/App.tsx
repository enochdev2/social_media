import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/register"
import ResetPassword from "./pages/ResetPassword";

function Layout() {
  const { user } = useSelector((state:any) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}


function App() {
  const { theme } = useSelector((state:any) => state.theme);


  return (
    <div data-theme={theme} className='w-full min-h-[100vh]'>
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:id?' element={<Profile />} />
      </Route>

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/reset-password' element={<ResetPassword />} />
    </Routes>
  </div>
  )
}

export default App
