import chessTeam from '../../assets/TeamImages/Tennyson.JPG';

function Chess () {
    return (
        <section className="px-6 bg-[#0c0c0f] min-h-screen text-white py-12">
            <div className="max-w-7xl mx-auto">
            <div className='mb-10 '>
                <h1 className="text-4xl font-bold mb-4">CHESS</h1>
                <p className="mb-4 text-[18px]">Welcome to the Chess Team page. Here you can find information about our chess players, upcoming tournaments, and team achievements.
                    Solar Flare Esports is proud to have a dedicated chess team that competes at the highest level. Our players are passionate about the game and are constantly striving to improve their skills and represent our organization with pride.
                </p>
            </div>

            <div>
                <h2 className="text-3xl font-semibold mb-4">TEAMMATES</h2>
                <div>
                    <h2 className="text-2xl font-semibold mt-6 mb-4">PLAYERS</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="border border-gray-800 w-95 p-6 rounded-[10px] bg-[#ff6a00] cursor-pointer transition-colors duration-300">
                            <img src={chessTeam} alt="Tennyson Olisa" className="w-70 h-70 mx-auto rounded-[10px] mb-4" />
                            <h3 className="text-lg font-semibold">Tennyson Olisa</h3>
                            <p className="mt-2">
                                Tennyson Olisa is a highly skilled chess player known for his strategic thinking and tactical prowess. With years of experience in competitive chess, Tennyson has consistently performed at a high level, earning recognition in various tournaments. His dedication to the game and his ability to analyze complex positions make him a valuable asset to the Solar Flare Esports Chess Team.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default Chess;