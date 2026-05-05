import { useState } from "react";
import { Users, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Headphones, Wallet } from "lucide-react";

import team from "./teamData";
import partners from "./partnersData";

export const About = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const features = [
    {
      icon: <ShieldCheck size={28} />,
      title: "Trusted & Secure",
      desc: "Your bookings are protected with industry-level security and trusted partners worldwide.",
    },
    {
      icon: <Wallet size={28} />,
      title: "Best Price Guarantee",
      desc: "We offer the most competitive prices with no hidden charges.",
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 Support",
      desc: "Our travel experts are available anytime to assist you before, during, and after your trip.",
    },
    {
      icon: <Globe size={28} />,
      title: "Worldwide Destinations",
      desc: "Explore hundreds of destinations across the globe with curated experiences.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative h-110 w-full overflow-hidden">
        <video
          className="absolute w-full h-full object-cover"
          src="./beach_walk.mp4"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            Explore the World With Us
          </h1>
          <p className="text-xl text-white max-w-2xl">
            We craft unforgettable journeys for every traveler with passion and
            care.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <div className="container py-4 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient bg-linear-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text hidden md:block">
            Our Story
          </h2>

          <h2 className="text-4xl font-bold mb-4 text-gradient bg-linear-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text block  md:hidden text-center">
            Our Story
          </h2>

          <p className="text-center md:text-left lg:text-left text-lg mb-4">
            Since 2010, we’ve connected millions of travelers with dream
            destinations. We believe travel should be joyful, safe, and
            meaningful.
          </p>

          <p className="text-center md:text-left lg:text-left text-lg">
            From solo journeys to adventure tours, from family vacations to
            romantic escapes — we tailor every experience with care.
          </p>

          {/* <motion.button
      whileHover={{ scale: 1.05 }}
      className="mt-6 bg-linear-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl"
    >
      Learn More
    </motion.button> */}
        </motion.div>

        {/* RIGHT STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 text-center">
          <Stat
            title="Tours Completed"
            value="500+"
            icon={<Globe size={32} />}
          />
          <Stat
            title="Happy Travelers"
            value="10K+"
            icon={<Users size={32} />}
          />
          {/* <Stat title="Destinations" value="80+" icon={<Plane size={32} />} /> */}
        </div>
      </div>

      <div className="relative bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')] bg-cover bg-center text-white">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-6 text-center">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Why Choose Us
          </h2>

          <p className="max-w-2xl mx-auto mb-10 text-sm sm:text-base">
            We provide the best travel experiences with trusted services,
            curated packages, and unbeatable prices. Your journey starts with
            us.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 ">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 group bg-linear-to-l from-teal-400 to-green-50 border-solid border-white border"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-3 mx-auto group-hover:bg-blue-600 group-hover:text-white transition">
                  {item.icon}
                </div>

                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-4 mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-teal-500 to-purple-600">
          Meet Our Experts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              onClick={() => setSelectedTeam(member)}
              whileHover={{ y: -10 }}
              className="cursor-pointer bg-white rounded-2xl p-6 text-center shadow-lg"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
              />

              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-teal-600">{member.role}</p>
              <p className="text-sm text-gray-600">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🆕 PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 py-4 mb-1">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-teal-500 to-purple-600">
          Our Trusted Travel Partners
        </h2>

        <div className="flex gap-10 overflow-x-auto no-scrollbar scroll-smooth px-2  text-center">
          {partners.map((p, i) => (
            <div
              key={i}
              className=" w-55 rounded-2xl p-1 flex items-center text-center transition-all duration-300"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="h-35 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* TEAM MODAL */}
      <AnimatePresence>
        {selectedTeam && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setSelectedTeam(null)}
            />

            <motion.div className="relative bg-white p-8 rounded-2xl w-full max-w-md text-center">
              {/* FIXED IMAGE */}
              <img
                src={selectedTeam.img}
                alt={selectedTeam.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />

              <h3 className="text-xl font-bold">{selectedTeam.name}</h3>
              <p className="text-teal-600">{selectedTeam.role}</p>
              <p className="mt-4">{selectedTeam.detail}</p>

              <button
                onClick={() => setSelectedTeam(null)}
                className="mt-6 bg-black text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* STAT COMPONENT */
function Stat({ title, value, icon }) {
  return (
    <div className="bg-teal-100 p-6 rounded-xl text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <h2 className="text-3xl font-bold">{value}</h2>
      <p>{title}</p>
    </div>
  );
}
