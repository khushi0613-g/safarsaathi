import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import PopularRoutes from './components/PopularRoutes/PopularRoutes'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Footer from './components/Footer/Footer'
import RoutesPage from './components/RoutesPage/RoutesPage'
import Contact from './components/Contact/Contact'
import Tourism from './components/Tourism/Tourism'
import LiveMap from './components/LiveMap/LiveMap'
import './App.css'
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashBoard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);
  function Layout({ darkMode, setDarkMode, children }) {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/admin-login" ||
    location.pathname === "/admin-dashboard";

  return (
    <>
      {!hideNavbar && (
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {children}
    </>
  );
}

  return (
     <BrowserRouter>
  <Toaster position="top-right" />

  <Layout
    darkMode={darkMode}
    setDarkMode={setDarkMode}
  >
       <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <PopularRoutes />
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/livemap" element={<LiveMap />} />
        <Route path="/admin-login" element={<AdminLogin />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
  </Layout>
</BrowserRouter>
  )
}

export default App