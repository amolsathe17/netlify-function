import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Parallax = () => {
  const ref = useRef(null);

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  return (
    <section ref={ref} className="relative h-[120vh] overflow-hidden">

      {/* 🌄 Background Image */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          alt="travel"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80"></div>

      {/* ✨ Glow Effect */}
      <div className="absolute top-1/2 left-1/2 w-125 h-125 bg-purple-500/20 blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>

      {/* 🧠 Content */}
      <motion.div
        style={{ y: yText }}
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 text-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Explore the World 🌍
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-300 max-w-xl"
        >
          Discover breathtaking destinations, curated experiences, and unforgettable journeys.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 rounded-full font-semibold shadow-xl"
        >
          Start Exploring →
        </motion.button>
      </motion.div>
    </section>
  );
};