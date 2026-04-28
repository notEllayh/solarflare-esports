import MainJerseyBlack from '../assets/Jerseys/SlfMainJersey.png';


function Shop () {
    return (
    <section className="px-6 bg-[#0c0c0f] min-h-screen text-white py-12">
            <div className="p-12">
      <h1 className="text-4xl font-bold mb-6">Solar Flare Shop</h1>

      <p className="mb-10 max-w-xl text-[#ff5900]">
        Official Solar Flare Esports merchandise including team jerseys,
        hoodies and exclusive fan collectibles.
      </p>

      <div className="grid md:grid-cols-3 gap-8 border border-gray-700 p-8 rounded-sm"> 
        <div className="border border-gray-800 hover:border-[#ff5900] p-6 rounded-xl cursor-pointer transition-colors duration-300">
          <img src={MainJerseyBlack} alt="SLF Official Team Jersey" className="mb-4 w-45 mx-auto" />
          <p className="text-sm text-gray-600 font-medium">JERSEYS</p>
          <h3 className="font-semibold">SLF OFFICIAL TEAM JERSEY</h3>
          <p className="text-sm text-[#ff5900]">₦36,000</p>
          <p className="text-sm text-green-600">Available</p>
        </div>

        <div className="border border-gray-800 hover:border-[#ff5900] p-6 rounded-xl cursor-pointer transition-colors duration-300">
          <img src={MainJerseyBlack} alt="SLF Official Team Jersey" className="mb-4 w-45 mx-auto" />
          <p className="text-sm text-gray-600 font-medium">HOODIES</p>
          <h3 className="font-semibold">SLF FLAME HOODIE</h3>
          <p className="text-sm text-[#ff5900]">₦40,000</p>
          <p className="text-sm text-red-600">Not Available</p>
        </div>

        <div className="border border-gray-800 hover:border-[#ff5900] p-6 rounded-xl cursor-pointer transition-colors duration-300">
          <img src={MainJerseyBlack} alt="SLF Official Team Jersey" className="mb-4 w-45 mx-auto" />
          <p className="text-sm text-gray-600 font-medium">CAPS</p>
          <h3 className="font-semibold">SLF PRO CAP</h3>
          <p className="text-sm text-[#ff5900]">₦7,000</p>
          <p className="text-sm text-green-600">Available</p>
        </div>
      </div>
    </div>
        </section>
    )
}

export default Shop; 