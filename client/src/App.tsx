import { Header } from './components/layout/Header';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Portfolio } from './pages/Portfolio/Portfolio';
import { ParkPage } from './pages/Portfolio/ParkPage';
import { Products } from './pages/Products/Products';
import { Testimonials } from './pages/Testimonials/Testimonials';
import { ProviderPage } from './pages/Providers/ProviderPage';
import { Footer } from './components/layout/Footer';
import { Login } from './pages/Account/Login';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Admin } from './pages/Admin/Admin';
import { AddEditPark } from './pages/Admin/Portfolio/AddEditPark';
import { GlobalSmartQuotes } from './components/global/GlobalSmartQuotes';
import { AddProvider } from './pages/Admin/AddProvider';

function App() {
	return (
		<>
			<GlobalSmartQuotes />
			<div>
				<Header />
				<div className='min-h-screen'>
					<ScrollToTop />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
						<Route path='/portfolio' element={<Portfolio />} />
						<Route path='/portfolio/:park' element={<ParkPage />} />
						<Route path='/products' element={<Products />} />
						<Route path='/testimonials' element={<Testimonials />} />
						<Route path='/login' element={<Login />} />
						<Route path='/providers/:provider' element={<ProviderPage />} />
						<Route
							path='/admin'
							element={
								<ProtectedRoute>
									<Admin />
								</ProtectedRoute>
							}
						>
							<Route path='add-edit-park' element={<AddEditPark />} />
							<Route path='add-provider' element={<AddProvider />} />
						</Route>
					</Routes>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default App;
