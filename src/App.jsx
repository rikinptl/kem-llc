import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Solutions from './pages/Solutions'
import InfrastructurePage from './pages/Infrastructure'
import CaseStudies from './pages/CaseStudies'
import CaseStudyDetail from './pages/CaseStudyDetail'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Portal from './pages/Portal'
import OwnerDashboardRoute from './pages/OwnerDashboardRoute'
import SalesDashboardRoute from './pages/SalesDashboardRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/portal/sales" element={<SalesDashboardRoute />} />
      <Route path="/portal/owner" element={<OwnerDashboardRoute />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="infrastructure" element={<InfrastructurePage />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="portal"
          element={
            <ProtectedRoute>
              <Portal />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
