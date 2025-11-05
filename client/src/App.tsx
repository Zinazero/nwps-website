import { Route, Routes } from 'react-router-dom';
import { GlobalSmartQuotes } from './components/global/GlobalSmartQuotes';
import { Footer } from './components/layout/Footer/Footer';
import { Header } from './components/layout/Header';
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
import { Store } from './pages/Store/Store';
import { Testimonials } from './pages/Testimonials/Testimonials';
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
  return (
    <div className="h-screen overflow-auto">
      <GlobalSmartQuotes />
      <Header />
      <main className="mt-24">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:park" element={<ParkPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/providers/:provider" element={<ProviderPage />} />
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
