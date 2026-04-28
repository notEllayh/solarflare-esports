import { Link } from 'react-router-dom'; 
import { useState } from "react";
import SlfLogo from '../assets/Logos/RedLogo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
    setIsOpen(!isOpen);
    };
    return (
    <header>
     <nav className="flex justify-between px-4 md:px-12 items-center bg-[#0c0c0f] text-white font-bold border-b border-gray-800 shadow-md">
        <div>
            <Link to="/Home"><img src={SlfLogo} alt="Solar Flare Esports Logo" className="w-16 h-16 m-4 cursor-pointer" /></Link>
        </div>

        <div style={{ fontFamily: "Poppins, sans-serif" }}>
            <ul className="hidden md:flex items-center gap-6 p-8">
               <li className="hover:text-[#ff6a00] transition duration-300">
                <Link to="/Shop" className=''>SHOP</Link>
               </li>
                <li className="hover:text-[#ff6a00] transition duration-300">
                <Link to="/About" className=''>ABOUT</Link>
               </li>
               <li className="hover:text-[#ff6a00] transition duration-300">
                <Link to="/Teams" className=''>TEAMS</Link>
               </li>
               <li className="hover:text-[#ff6a00] transition duration-300">
                <Link to="/SLFZone" className=''>SLF.ZONE</Link>
               </li>
               <li className="hover:text-[#ff6a00] transition duration-300">
                <Link to="/Partners" className=''>PARTNERS</Link>
               </li>
               <li className="hover:text-[#ff6a00] transition duration-300">
                <Link to="/Media" className=''>MEDIA</Link>
               </li>
               <li className="hover:text-[#ff6a00] transition duration-300">
                <Link to="/FlameSociety" className=''>FLAME SOCIETY</Link>
               </li>
            </ul>
        </div>
        
        <div className='lg:hidden' onClick={toggleMenu}>
            {!isOpen && (
                <div>
                    <i className="ri-menu-line text-[25px] text-[#ff6a00] cursor-pointer"></i>
                </div>
            )}

            {isOpen && (
                <div onClick={toggleMenu} >
                    <i className="ri-close-large-line text-[25px] text-[#ff6a00] cursor-pointer"></i>
                </div>
            )}

            {isOpen ? (
                <aside className='sidebar bg-[#ff6a00] fixed top-24 left-0 w-full shadow-2xl z-10'>
                    <div>
                        <ul className='flex flex-col gap-4 p-8 font-medium'>
                            <Link to="/Home">HOME</Link>
                            <Link to="/Partners">PARTNERS</Link>
                            <Link to="/Teams">TEAMS</Link>
                            <Link to="/Media">MEDIA</Link>
                            <Link to="/FlameSociety">FLAME SOCIETY</Link>
                            <Link to="/Shop">SHOP</Link>
                            <Link to="/About">ABOUT</Link>
                            <Link to="/SLFZone">SLF.ZONE</Link>
                            <Link to="/Championships">CHAMPIONSHIPS</Link>
                            <Link to="/Investor">INVESTOR</Link>
                            <Link to="/ManagementTeam">MANAGEMENT TEAM</Link>
                            <Link to="/Contact">CONTACT</Link>

                        </ul>
                    </div>
                </aside>
            ) : null}
        </div>
      </nav>
      </header>
    )
}

export default Navbar;