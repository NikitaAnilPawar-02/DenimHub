import "./styles/theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import Billing from "./pages/Billing";
import Customers from "./pages/Customers";
import CustomerView from "./pages/CustomerView";
import Inventory from "./pages/Inventory";
import SalesReport from "./pages/SalesReport";
import BillsReport from "./pages/BillsReport";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import Coupons from "./pages/Coupons";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - No Login Required */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        
        {/* Protected Routes - Login Required */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />
        
        <Route path="/products/add" element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        } />
        
        <Route path="/products/view/:id" element={
          <ProtectedRoute>
            <ViewProduct />
          </ProtectedRoute>
        } />
        
        <Route path="/billing" element={
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        } />
        
        <Route path="/customers" element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        } />
        
        <Route path="/customers/view/:id" element={
          <ProtectedRoute>
            <CustomerView />
          </ProtectedRoute>
        } />
        
        <Route path="/inventory" element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        } />
        
        <Route path="/salesReport" element={
          <ProtectedRoute>
            <SalesReport />
          </ProtectedRoute>
        } />
        
        <Route path="/billsReport" element={
          <ProtectedRoute>
            <BillsReport />
          </ProtectedRoute>
        } />
        
        <Route path="/reportsAnalytics" element={
          <ProtectedRoute>
            <ReportsAnalytics />
          </ProtectedRoute>
        } />
        
        <Route path="/coupons" element={
          <ProtectedRoute>
            <Coupons />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;