import { Header } from './components/layout/Header';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/pages/Home/Home';
import { About } from './components/pages/About';
import { Portfolio } from './components/pages/Portfolio';
import { Products } from './components/pages/Products';
import { Testimonials } from './components/pages/Testimonials';
import { Playgrounds } from './components/pages/products/Playgrounds';
import { SafetySurfacing } from './components/pages/products/SafetySurfacing';
import { SportsAndOutdoorFitness } from './components/pages/products/SportsAndOutdoorFitness';
import { ParkAmenities } from './components/pages/products/ParkAmenities';
import { ParkShelters } from './components/pages/products/ParkShelters';
import { ElectronicPlay } from './components/pages/products/ElectronicPlay';
import { WaterPlay } from './components/pages/products/WaterPlay';
import { Playworld } from './components/pages/Playworld';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/portfolio' element={<Portfolio />} />
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
			</Routes>
		</>
	);
}

export default App;
