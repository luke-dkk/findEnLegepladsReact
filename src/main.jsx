  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import { BrowserRouter, Route, Routes } from 'react-router'
  import './index.css'
  import App from './App.jsx'
  import  Login from './components/login/Login'
  import  Register from './components/register/Register.jsx'
  import Playground from './components/playground/Playground.jsx'
  import AuthLayout from './components/auth/AuthLayout.jsx'
  import ProfilePage from './components/profile/ProfilePage.jsx'
  import  {NotFound} from './components/utils/utils.jsx'
  import 'leaflet/dist/leaflet.css';
  import { MainLayout } from './components/mainLayout/MainLayout.jsx'
  import ProtectedRoute from './components/utils/ProtectedRoute.jsx';


  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
    <Routes>

      {/* Public routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/playground/:id" element={<Playground />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
 
    </StrictMode>,
  )
