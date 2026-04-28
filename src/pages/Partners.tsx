import SlfLogo from '../assets/Logos/RedLogo.png';

function Partners () {
    return (
        <section className="px-6 bg-[#0c0c0f] min-h-screen text-white py-12">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-6">
                        <span className="text-[#ff6a00]">YOUR</span> HOME.
                    </h1>

                    <p className="max-w-xl mb-10">
                        Victory is a team effort. We are proud to partner with global leaders 
                        who share our ambition and drive for excellence. Discover the brands supporting Team Solar Flare on the world stage.
                    </p>
                </div>

                <div className=''>
                    <img src={SlfLogo} alt="Solar Flare Logo" className="w-70 h-70" />
                </div>
            </div>
        </section>
    )
}

export default Partners; 