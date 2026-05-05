import { motion } from "framer-motion";
import { Wrench, Clock, Mail } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="relative h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/maldives.jpg" // 👉 put image in public folder
          alt="Maldives"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-xl w-full text-center text-white">

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="p-5 rounded-full bg-white/10 backdrop-blur-lg shadow-lg">
            <Wrench size={40} className="text-white" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold tracking-tight"
        >
          We’re Under Construction
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-sm md:text-lg leading-relaxed text-white/90"
        >
          Our website is currently being upgraded to give you a better
          experience. We’ll be back very soon!
        </motion.p>

        {/* Glass Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-2 gap-4 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20"
        >
          <div className="p-4 rounded-xl bg-white/10 border border-white/10">
            <Clock className="mx-auto mb-2 text-white" />
            <p className="text-sm font-medium">Work in Progress</p>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/10">
            <Mail className="mx-auto mb-2 text-white" />
            <p className="text-sm font-medium">Stay Connected</p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        {/* <motion.div
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          transition={{ delay: 1, duration: 1 }}
          className="h-2 bg-white rounded-full mt-10 mx-auto"
        /> */}

        {/* <p className="text-xs text-white/80 mt-2">Launching Soon...</p> */}

        {/* Footer */}
        {/* <div className="mt-10 text-xs text-white/70">
          © {new Date().getFullYear()} Comsoft. All rights reserved
        </div> */}
      </div>
    </div>
  );
}