function Media () {
    return (
    <section className="px-6 bg-[#0c0c0f] min-h-screen text-white py-12">
    <div className="p-12">
      <h1 className="text-4xl font-bold mb-6">Media</h1>

      <p className="max-w-xl mb-10">
        The Solar Flare Esports media hub features photos, videos, match
        highlights and behind‑the‑scenes content from our teams, tournaments
        and community events.
      </p>

      <h2 className="text-2xl font-semibold mb-6">News & Announcements</h2>

       <p className="max-w-xl mb-10">
        Stay updated with the latest announcements from Solar Flare Esports
        including roster signings, tournament results, partnerships and
        community events.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Team Announcement</h3>
          <p className="text-sm text-gray-600">
            Solar Flare Esports welcomes new players to the roster as the
            organisation expands into more competitive titles.
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Tournament Results</h3>
          <p className="text-sm text-gray-600">
            Highlights and results from recent competitions featuring Solar
            Flare teams and community players.
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Partnership News</h3>
          <p className="text-sm text-gray-600">
            Updates on new brand collaborations supporting the growth of
            Solar Flare Esports.
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Community Events</h3>
          <p className="text-sm text-gray-600">
            Announcements for upcoming tournaments and activities hosted
            inside the slf.zone ecosystem.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold my-6">Photo Gallery</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="border border-gray-800 bg-[#ff5900] rounded-xl h-40 flex items-center justify-center">
          Team Media Day
        </div>
        <div className="border border-gray-800 bg-[#ff5900] rounded-xl h-40 flex items-center justify-center">
          Tournament Highlights
        </div>
        <div className="border border-gray-800 bg-[#ff5900] rounded-xl h-40 flex items-center justify-center">
          Community Events
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Video Content</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border border-gray-800 bg-[#ff5900] p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Player Introductions</h3>
          <p className="text-sm text-white">
            Meet the Solar Flare roster through cinematic introduction videos
            and interviews.
          </p>
        </div>

        <div className="border border-gray-800 bg-[#ff5900] p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Match Highlights</h3>
          <p className="text-sm text-white">
            Watch the best plays, goals and moments from Solar Flare matches
            and tournaments.
          </p>

        </div>

        <div className="border border-gray-800 bg-[#ff5900] p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Behind The Scenes</h3>
          <p className="text-sm text-white">
            Exclusive footage from media days, bootcamps and team activities.
          </p>
        </div>

        <div className="border border-gray-800 bg-[#ff5900] p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Community Events</h3>
          <p className="text-sm text-white">
            Recaps and highlights from tournaments hosted in slf.zone.
          </p>
        </div>
      </div>
    </div>
    </section>
    )
}

export default Media; 