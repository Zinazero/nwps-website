import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { GlobalSmartQuotes } from './components/global/GlobalSmartQuotes';
import { Footer } from './components/layout/Footer/Footer';
import { Header } from './components/layout/Header';
import { PageTransition } from './components/ui/PageTransition';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { About } from './pages/About/About';
import { Login } from './pages/Account/Login';
import { Admin } from './pages/Admin/Admin';
import { AddEditPark } from './pages/Admin/Portfolio/AddEditPark';
import { AddEditProducts } from './pages/Admin/Products/AddEditProducts';
import { AddProvider } from './pages/Admin/Providers/AddProvider';
import { Contact } from './pages/Contact/Contact';
import { Home } from './pages/Home/Home';
import { ParkPage } from './pages/Portfolio/Parks/ParkPage';
import { Portfolio } from './pages/Portfolio/Portfolio';
import { ProductsPage } from './pages/Products/Categories/ProductsPage';
import { Products } from './pages/Products/Products';
import { ProviderPage } from './pages/Providers/ProviderPage';
import { Order } from './pages/Store/Order';
import { Store } from './pages/Store/Store';
import { Testimonials } from './pages/Testimonials/Testimonials';
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
  const location = useLocation();

  return (
    <div className="h-screen">
      <GlobalSmartQuotes />
      <Header />
      <main className="mt-24">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/portfolio"
              element={
                <PageTransition>
                  <Portfolio />
                </PageTransition>
              }
            />
            <Route
              path="/portfolio/:park"
              element={
                <PageTransition>
                  <ParkPage />
                </PageTransition>
              }
            />
            <Route
              path="/products"
              element={
                <PageTransition>
                  <Products />
                </PageTransition>
              }
            />
            <Route
              path="/products/:category"
              element={
                <PageTransition>
                  <ProductsPage />
                </PageTransition>
              }
            />
            <Route
              path="/testimonials"
              element={
                <PageTransition>
                  <Testimonials />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/store"
              element={
                <PageTransition>
                  <Store />
                </PageTransition>
              }
            />
            <Route
              path="/store/checkout"
              element={
                <PageTransition>
                  <Order />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />
            <Route
              path="/providers/:provider"
              element={
                <PageTransition>
                  <ProviderPage />
                </PageTransition>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            >
              <Route path="add-edit-park" element={<AddEditPark />} />
              <Route path="add-provider" element={<AddProvider />} />
              <Route path="add-edit-products" element={<AddEditProducts />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
