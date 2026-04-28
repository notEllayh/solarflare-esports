import efootballTeamImage from '../assets/TeamImages/Efootball_Team.JPG'; 
import freefireTeamImage from '../assets/TeamImages/FF_Team.JPG'; 
import chessTeam from '../assets/TeamImages/Tennyson.JPG'; 
import { Link } from 'react-router-dom';

function Teams () {
    return (
       <section className="px-6 bg-[#0c0c0f] min-h-screen text-white py-12">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Teams</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-[#ff5900] p-6 rounded-2xl shadow">
          <div>
            <img src={efootballTeamImage} alt="eFootball Team" className="w-full h-auto rounded-lg mb-4" />
          </div>
          <h3 className="text-xl font-semibold mb-2">eFootball</h3>
          <p>
            Our competitive eFootball roster competes in online tournaments and
            regional competitions while representing Solar Flare globally.
          </p>

          <div className='mt-4'>
            <Link to ="Efootball">
            <button className='bg-[#c44302] px-4 py-2 rounded-lg cursor-pointer'>View Team</button>
            </Link>
          </div>
        </div>

        <div className="bg-[#ff5900] p-6 rounded-2xl shadow">
          <div>
            <img src={freefireTeamImage} alt="Free Fire Team" className="w-full h-auto rounded-lg mb-4" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Free Fire</h3>
          <p>
            The Free Fire squad focuses on high level competitive play and
            content creation while building a strong presence in national and regional
            events.
          </p>

          <div className='mt-4'>
            <Link to ="FreeFire">
            <button className='bg-[#c44302] px-4 py-2 rounded-lg cursor-pointer'>View Team</button>
            </Link>
          </div>
        </div>

        <div className="bg-[#ff5900] p-6 rounded-2xl shadow">
          <div>
            <img src={chessTeam} alt="Chess Team" className="w-full h-55 rounded-lg mb-4" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Chess</h3>
          <p>
            Solar Flare also supports digital chess competitions, highlighting
            strategy based esports and expanding opportunities for players.
          </p>

          <div className='mt-4'>
            <Link to ="Chess">
            <button className='bg-[#c44302] px-4 py-2 rounded-lg cursor-pointer'>View Team</button>
            </Link>
          </div>
        </div>
      </div>
       </section>
    )
}

export default Teams; 