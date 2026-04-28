import SlfLogo from '../assets/Logos/RedLogo.png';

function FlameSociety () {
    return (
        <section className="px-6 bg-[#0c0c0f] min-h-screen text-white py-12">
            <img src={SlfLogo} alt="Solar Flare Esports Logo" className="w-16 h-16 m-4 mx-auto" />
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-[16px] font-bold mb-3">FLAME SOCIETY</h1>
                <h2 className="text-2xl font-semibold mb-4">BE PART OF THE FLAME SOCIETY</h2>
                <p className="max-w-2xl mb-4 text-center mx-auto">
                    Flame Society is the official Solar Flare community membership.
                    Supporters get exclusive content, giveaways, early merchandise drops
                    and behind the scenes access to the team.
                </p>

                <div>
                    <button className="bg-[#ff5900] text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-[#c44302] transition-colors duration-300">
                        SIGN UP NOW
                    </button>
                </div>
            </div>

        <div className='mt-15'>
        <div className="grid md:grid-cols-3 gap-8">
        <div className="border border-gray-800 p-6 rounded-xl bg-[#ff5900] hover:bg-[#c44302] cursor-pointer transition-colors duration-300">
          <h3 className="font-semibold">Exclusive Content</h3>
          <p>Behind the scenes videos and player updates.</p>
        </div>

        <div className="border border-gray-800 p-6 rounded-xl bg-[#ff5900] hover:bg-[#c44302] cursor-pointer transition-colors duration-300">
          <h3 className="font-semibold">Giveaways</h3>
          <p>Members get access to regular prizes and drops.</p>
        </div>

        <div className="border border-gray-800 p-6 rounded-xl bg-[#ff5900] hover:bg-[#c44302] cursor-pointer transition-colors duration-300">
          <h3 className="font-semibold">Event Access</h3>
          <p>Priority access to tournaments and fan events.</p>
        </div>
      </div>
            </div>
        </section>
    )
}

export default FlameSociety; 