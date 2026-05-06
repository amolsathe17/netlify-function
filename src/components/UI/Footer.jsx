import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const Footers = () => {
  const year = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ MODAL STATE (same as contact)
  const [modal, setModal] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showModal = (type, message) => {
    setModal({ show: true, type, message });

    setTimeout(() => {
      setModal({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handleSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      showModal("error", "Enter valid email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        showModal("success", data.message || "Subscribed successfully 🎉");
        setEmail("");
      } else {
        showModal("error", data.message || "Something went wrong");
      }
    } catch (err) {
      showModal("error", "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-linear-to-br from-gray-900 via-black to-gray-900 text-white pt-5 pb-5 overflow-hidden">

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {modal.show && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`w-[90%] max-w-sm p-6 rounded-2xl text-center shadow-2xl ${
                modal.type === "success"
                  ? "bg-linear-to-r from-green-400 to-emerald-500 text-white"
                  : "bg-linear-to-r from-red-400 to-pink-500 text-white"
              }`}
            >
              <h2 className="text-xl font-bold mb-2">
                {modal.type === "success" ? "Success 🎉" : "Error ⚠️"}
              </h2>

              <p className="text-sm">{modal.message}</p>

              <button
                onClick={() =>
                  setModal({ show: false, type: "", message: "" })
                }
                className="mt-4 bg-white text-black px-4 py-2 rounded-lg font-semibold"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,#22c55e,transparent_40%),radial-gradient(circle_at_80%_70%,#f97316,transparent_40%)]"></div>

      <div className="relative container mx-auto px-4">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-5">

          {/* Logo + Social */}
          <div>
            <div className="hidden md:block">
              <img
                src="/comsoft.png"
                alt="Comsoft"
                className="h-10 w-auto mb-6"
              />

              <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                Making your travel dreams come true with the best tour packages
                and hotel bookings worldwide.
              </p>
            </div>

            <div className="flex gap-4 w-full justify-center md:justify-start">
              {[faFacebook, faTwitter, faYoutube].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="group w-11 h-11 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-green-500/30"
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className="w-5 h-5 text-gray-300 group-hover:text-white transition"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links + Support */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <div className="grid grid-cols-2 gap-8">

              <div>
                <h4 className="text-lg font-semibold mb-6 tracking-wide">
                  Quick Links
                </h4>

                <ul className="space-y-4">
                  {[
                    { name: "About Us", link: "/About" },
                    { name: "Popular Destinations", link: "/popular-destinations"},
                    { name: "Login", link: "/Login"},
                    { name: "Admin", link: "/Admin"},
                  ].map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.link}
                        className="text-gray-400 hover:text-white relative inline-block transition group"
                      >
                        {item.name}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 tracking-wide">
                  Support
                </h4>

                <ul className="space-y-4">
                  {[
                    { name: "FAQ", link: "/faq" },
                    { name: "Privacy Policy", link: "/under-construction" },
                    { name: "Terms & Conditions", link: "/under-construction" },
                    { name: "Contact", link: "/contact" },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.link}
                        className="text-gray-400 hover:text-white relative inline-block transition group"
                      >
                        {item.name}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 text-center md:text-left">
            <h4 className="text-lg font-semibold mb-6 tracking-wide">
              Newsletter
            </h4>

            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Subscribe to get special offers and travel inspiration.
            </p>

            <div className="flex justify-center md:justify-start">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-lg w-full max-w-md mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent px-4 py-3 w-full outline-none text-sm text-white placeholder-gray-400"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-linear-to-r from-green-500 to-orange-500 px-5 py-3 text-sm font-medium hover:opacity-90 transition cursor-pointer"
                >
                  {loading ? "..." : "Subscribe"}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-2 text-gray-500 text-sm text-center">
          <p>© {year} Comsoft. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};