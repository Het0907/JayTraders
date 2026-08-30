import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListProducts from './admin/ListProducts';
import AddItems from './admin/AddItems';
import Home from './IndustrialHomepage';
import Navbar from './components/Navbar';
import AboutUs from './about';
import ContactUs from './contactus';
import AdminDashboard from './AdminDashboard';
import EditItems from './admin/EditItems';
import RemoveItems from './admin/RemoveItems';
import { CartProvider } from './context/CartContext';
import CategoryPage from './CategoryPage';
import CategoryProducts from './CategoryProducts';
import ProductDetail from './ProductDetail';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import BrandVariants from './components/BrandVariants';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import API_ENDPOINTS from './config/api';





function Layout({ children }) {
  const location = useLocation();
  const hideNavAndFooter = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);

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
  React.useEffect(() => {
    const keepBackendAwake = () => {
      fetch(`${API_ENDPOINTS.BASE_URL}/api/health`)
        .catch(() => {
          // The keep-alive request is best effort and should not affect the UI.
        });
    };

    keepBackendAwake();
    const intervalId = window.setInterval(keepBackendAwake, 5 * 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
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
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/category/:categorySlug/:subcategorySlug" element={<CategoryProducts />} />
              <Route path="/category/:categorySlug/:subcategorySlug/:brandSlug" element={<BrandVariants />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;