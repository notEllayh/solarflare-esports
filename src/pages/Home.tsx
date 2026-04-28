import { Link } from 'react-router-dom';
import freefireTeamImage from '../assets/TeamImages/FF_Team.JPG';

function Home () {
    return (
      <section className="px-6 bg-[#0c0c0f] min-h-screen text-white py-12">
      <h1 className="text-5xl font-bold mb-6 text-center">Solar Flare Esports</h1>
      <p className="max-w-2xl mx-auto text-lg text-gray-300 text-center">
        Building one of the fastest growing esports organisations in Africa.
        Solar Flare Esports develops elite players, hosts competitive
        tournaments and connects brands to the next generation of gamers.
      </p>

      <div className="mt-10 flex justify-center gap-6">
        <Link
          to="/SLFZone"
          className="bg-orange-500 px-6 py-3 rounded-xl font-semibold"
        >
            EXPLORE SLF.ZONE
        </Link>

        <Link
          to="/SLFFanClub"
          className="border border-white px-6 py-3 rounded-xl"
        >
          JOIN THE FLAME SOCIETY
        </Link>
      </div>
    </section>
    )
}

export default Home; 