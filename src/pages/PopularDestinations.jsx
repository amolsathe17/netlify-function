import { motion } from "framer-motion";
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import places from "./placesData";
import collections from "./collectionsData";

export const PopularDestinations = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const scroll = useCallback((direction) => {
    const el = sliderRef.current;
    if (!el) return;

    const cardWidth = el.querySelector("div")?.offsetWidth || 260;

    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, []);

  const handleWheel = useCallback((e) => {
    const el = sliderRef.current;
    if (!el) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollBy({ left: e.deltaY });
    }
  }, []);

  return (
    <>
      {/* ================= Popular Destinations ================= */}
      <section className="relative pt-22 md:py-30 md:pt-40 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-[full] object-cover hidden md:block"
        >
          <source src="./travel.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center block md:hidden"
          style={{ backgroundImage: "url('./maldives1.jpg')" }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/50 to-black/20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-4">
          <div className="mb-10 md:-mt-10 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-gray-300 mt-3 mb-2 max-w-xl mx-auto">
              Curated travel experiences for modern explorers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {places.map((place, i) => (
              <motion.div
                key={i}
                onClick={() => navigate(place.route)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-500 cursor-pointer"
              >
                <img
                  src={place.img}
                  alt={place.name}
                  className="h-52 md:h-45 w-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute top-3 left-4 px-4 py-1 text-xs font-semibold bg-white text-black rounded-full shadow">
                  {place.tag}
                </div>

                <div className="p-5 text-white h-30">
                  <h3 className="text-xl font-semibold">{place.name}</h3>
                  <p className="text-gray-300 text-sm">{place.location}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-white">
                      4.8 ★ (120 reviews)
                    </span>
                    <button className="text-sm font-semibold group-hover:translate-x-1 transition">
                      Explore →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Collections ================= */}
      <section className="relative py-10 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('./banner.jpg')" }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/60 to-black/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-4">
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold">
              Handpicked Collections for You
            </h3>
            <p className="text-gray-300 mt-3 mb-6">
              Explore curated travel experiences
            </p>
          </div>

          <div
            ref={sliderRef}
            onWheel={handleWheel}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pt-7 px-1"
          >
            {collections.map((item, i) => (
              <motion.div
                key={i}
                onClick={() => navigate(item.route)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[80%] sm:min-w-[45%] md:min-w-64 snap-center cursor-pointer group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-500"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-40 w-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute top-3 left-4 px-3 py-1 text-xs bg-white text-black rounded-full">
                  {item.tag}
                </div>

                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-white/10 text-white"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-white/10 text-white"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};