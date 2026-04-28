import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.tsx'; 
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx'; 
import Shop from './pages/Shop.tsx';
import Teams from './pages/Teams.tsx';
import SLFZone from './pages/SlfZone.tsx';
import Partners from './pages/Partners.tsx';
import About from './pages/About.tsx';
import Media from './pages/Media.tsx';
import FlameSociety from './pages/FlameSociety.tsx';
import Chess from './pages/subpages/Chess.tsx';
import Efootball from './pages/subpages/Efootball.tsx';
import FreeFire from './pages/subpages/FreeFire.tsx';

function SolarFlareApp() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/Teams" element={<Teams />} />
      <Route path="/Teams/Chess" element={<Chess />} />
      <Route path="/Teams/Efootball" element={<Efootball />} />
      <Route path="/Teams/FreeFire" element={<FreeFire />} />
      <Route path="/SLFZone" element={<SLFZone />} />
      <Route path="/Partners" element={<Partners />} />
      <Route path="/About" element={<About />} />
      <Route path="/Media" element={<Media />} />
      <Route path="/FlameSociety" element={<FlameSociety />} />
    </Routes>
    <Footer />
    </>
  )}

export default SolarFlareApp; 
