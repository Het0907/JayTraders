import React from 'react';
import API_ENDPOINTS from './config/api';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './login';
import Signup from './signup';
import ListProducts from './admin/ListProducts';
import AddItems from './admin/AddItems';
import Home from './IndustrialHomepage';
import Navbar from './components/Navbar';
import AboutUs from './about';
import ContactUs from './contactus';
import Cart from './cart';
import AdminDashboard from './AdminDashboard';
import EditItems from './admin/EditItems';
import RemoveItems from './admin/RemoveItems';
import { CartProvider } from './context/CartContext';
import CategoryPage from './CategoryPage';
import CategoryProducts from './CategoryProducts';
import ProductDetail from './ProductDetail';
import LandingPage from './components/LandingPage';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import Profile from './components/Profile';
import BrandVariants from './components/BrandVariants';
import { AuthProvider } from './context/AuthContext';
import Checkout from './components/Checkout';
import Terms from './pages/Terms';
import Shipping from './pages/Shipping';
import ScrollToTop from './components/ScrollToTop';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import payment from './payment';

axios.get(API_ENDPOINTS.PRODUCTS, { withCredentials: true });

// Helper to check authentication status
const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return !!user && !!token; // Returns true if both user data and token exist
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};




// Public Route component (for login/signup - redirects if already authenticated)
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function Layout({ children }) {
  const location = useLocation();
  const hideNavAndFooter = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      {!hideNavAndFooter && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
          <Layout>
            <Routes>
              {/* Redirect root based on authentication status */}
              <Route
                path="/"
                element={<Navigate to="/login" replace />}
              />

              {/* Public routes (redirect to home if already logged in) */}
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
              
              {/* Protected routes */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <AboutUs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <ProtectedRoute>
                    <ContactUs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              {/* Admin routes, also protected */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/list"
                element={
                  <AdminRoute>
                    <ListProducts />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/edit"
                element={
                  <AdminRoute>
                    <EditItems />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/add"
                element={
                  <AdminRoute>
                    <AddItems />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/remove"
                element={
                  <AdminRoute>
                    <RemoveItems />
                  </AdminRoute>
                }
              />
              <Route
                path="/category/:categorySlug"
                element={
                  <ProtectedRoute>
                    <CategoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/category/:categorySlug/:subcategorySlug"
                element={
                  <ProtectedRoute>
                    <CategoryProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/category/:categorySlug/:subcategorySlug/:brandSlug"
                element={
                  <ProtectedRoute>
                    <BrandVariants />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product/:productId"
                element={
                  <ProtectedRoute>
                    <ProductDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/terms"
                element={
                  <ProtectedRoute>
                    <Terms />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;