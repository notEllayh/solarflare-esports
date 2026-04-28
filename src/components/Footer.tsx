import { Link } from 'react-router-dom';
import SlfLogo from '../assets/Logos/RedLogo.png';

function Footer () {
    return (
    <footer className="bg-[#0c0c0f] text-gray-300 border-t border-gray-800 px-10 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10">
        <div>
        <img src={SlfLogo} alt="Solar Flare Esports Logo" className='w-32' />
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-3">ABOUT</h3>
            <ul className="space-y-2 text-sm">
            <li><Link to="/About">Who we are</Link></li>
            <li><Link to="/Championships">Championships</Link></li>
            <li><Link to="/Partners">Partners</Link></li>
            <li><Link to="/ManagementTeam">Management Team</Link></li>
            <li><Link to="/BrandToolkit">Brand Toolkit</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/Teams">Teams</Link></li>
            <li><Link to="/Creators">Creators</Link></li>
            <li><Link to="/SlfFanClub">Flame Society</Link></li>
            <li><Link to="/Media">Media</Link></li>
            <li><Link to="/SLFZone">Zone</Link></li>
          </ul>
        </div>

        <div>
            <h3 className="text-white font-semibold mb-3">TERMS & POLICIES</h3>
            <ul className="space-y-2 text-sm">
            <li><Link to="/zone">Privacy</Link></li>
            <li><Link to="/shop">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">PARTNERS</h3>
          <p className="text-sm mb-4">
            Interested in partnering with Solar Flare Esports?
          </p>
          <Link
            to="/Partners"
            className="border border-gray-800 bg-[#ff5900] px-4 py-2 rounded-lg text-sm animate-pulse hover:bg-[#c44302] transition-colors duration-300"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;   