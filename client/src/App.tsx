import { Header } from './components/layout/Header';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Portfolio } from './pages/Portfolio/Portfolio';
import { PortfolioItem } from './pages/Portfolio/PortfolioItem';
import { Products } from './pages/Products';
import { Testimonials } from './pages/Testimonials';
import { Playgrounds } from './pages/Products/Playgrounds';
import { SafetySurfacing } from './pages/Products/SafetySurfacing';
import { SportsAndOutdoorFitness } from './pages/Products/SportsAndOutdoorFitness';
import { ParkAmenities } from './pages/Products/ParkAmenities';
import { ParkShelters } from './pages/Products/ParkShelters';
import { ElectronicPlay } from './pages/Products/ElectronicPlay';
import { WaterPlay } from './pages/Products/WaterPlay';
import { Playworld } from './pages/Playworld';
import { Footer } from './components/layout/Footer';
import { Login } from './pages/Login';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Admin } from './pages/Admin/Admin';
import { AddPark } from './pages/Admin/Portfolio/AddPark';

function App() {
	return (
		<div>
			<Header />
			<div className='min-h-screen'>
				<ScrollToTop />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/portfolio' element={<Portfolio />} />
					<Route path='/portfolio/:parkId' element={<PortfolioItem />} />
					<Route path='/products' element={<Products />}>
						<Route path='playgrounds' element={<Playgrounds />} />
						<Route path='safety-surfacing' element={<SafetySurfacing />} />
						<Route
							path='sports-and-outdoor-fitness'
							element={<SportsAndOutdoorFitness />}
						/>
						<Route path='park-amenities' element={<ParkAmenities />} />
						<Route path='park-shelters' element={<ParkShelters />} />
						<Route path='electronic-play' element={<ElectronicPlay />} />
						<Route path='water-play' element={<WaterPlay />} />
					</Route>
					<Route path='/testimonials' element={<Testimonials />} />
					<Route path='/playworld' element={<Playworld />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='/admin'
						element={
							<ProtectedRoute>
								<Admin />
							</ProtectedRoute>
						}
					>
						<Route path='add-park' element={<AddPark />} />
					</Route>
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
