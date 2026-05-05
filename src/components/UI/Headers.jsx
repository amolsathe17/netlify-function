import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Plane,
  MapPin,
  Mountain,
  Heart,
  Users,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [travelOpen, setTravelOpen] = useState(false);
  const [packageOpen, setPackageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const travelRef = useRef(null);
  const packageRef = useRef(null);
  const profileRef = useRef(null);

  const location = useLocation();

  /* ✅ FIX: prevent double scrollbar */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (travelRef.current && !travelRef.current.contains(event.target)) setTravelOpen(false);
      if (packageRef.current && !packageRef.current.contains(event.target)) setPackageOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const menuItemClass = (path) =>
    `relative transition ${
      location.pathname === path
        ? "text-primary font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary"
        : "text-white hover:text-primary"
    }`;

  const submenuItemClass =
    "flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all " +
    "hover:bg-gradient-to-r hover:from-green-400 hover:to-orange-400 hover:text-white " +
    "hover:shadow-lg hover:shadow-green-400/50 hover:-translate-y-1 hover:scale-105";

  return (
    <div>
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/10">
        <div className="relative container mx-auto py-4 px-4 flex justify-between items-center">

          <a href="/">
            <img src="./comsoft.png" alt="logo" className="h-8 md:h-10" />
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 font-medium">
            <li className={menuItemClass("/")}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className={menuItemClass("/About")}>
              <NavLink to="/About">About</NavLink>
            </li>

            {/* Travel */}
            <li ref={travelRef} onMouseEnter={()=>setTravelOpen(true)} onMouseLeave={()=>setTravelOpen(false)}>
              <div className={`flex items-center gap-1 cursor-pointer ${
                travelOpen ? "text-primary font-semibold" : "text-white hover:text-primary"
              }`}>
                Travel <ChevronDown size={16}/>
              </div>

              <AnimatePresence>
                {travelOpen && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit"
                    className="absolute top-full mt-3 w-64 bg-white/90 backdrop-blur-md text-black rounded-xl shadow-2xl p-4">
                    <ul className="space-y-2">
                      <li className={submenuItemClass}><MapPin size={16}/> India Tours</li>
                      <li className={submenuItemClass}><Plane size={16}/> International Tours</li>
                      <li className={submenuItemClass}><Mountain size={16}/> Adventure Trips</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Packages */}
            <li ref={packageRef} onMouseEnter={()=>setPackageOpen(true)} onMouseLeave={()=>setPackageOpen(false)}>
              <div className={`flex items-center gap-1 cursor-pointer ${
                packageOpen ? "text-primary font-semibold" : "text-white hover:text-primary"
              }`}>
                Packages <ChevronDown size={16}/>
              </div>

              <AnimatePresence>
                {packageOpen && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit"
                    className="absolute top-full mt-3 w-64 bg-white/90 backdrop-blur-md text-black rounded-xl shadow-2xl p-4">
                    <ul className="space-y-2">
                      <li className={submenuItemClass}><Heart size={16}/> Honeymoon Packages</li>
                      <li className={submenuItemClass}><Mountain size={16}/> Adventure Packages</li>
                      <li className={submenuItemClass}><Users size={16}/> Family Tours</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li className={menuItemClass("/Popular-Destinations")}>
              <NavLink to="/Popular-Destinations">Popular Destinations</NavLink>
            </li>
            <li className={menuItemClass("/Forex")}>
              <NavLink to="/Forex">Forex</NavLink>
            </li>
            <li className={menuItemClass("/Contact")}>
              <NavLink to="/Contact">Contact</NavLink>
            </li>
          </ul>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">
            <div onClick={()=>setLoginOpen(true)} className="text-white cursor-pointer hover:text-primary">
              <User size={22}/>
            </div>

            <button onClick={()=>setSignupOpen(true)}
              className="bg-linear-to-r from-green-400 to-orange-400 px-4 py-2 rounded-xl text-white cursor-pointer">
              Sign Up
            </button>

            <div ref={profileRef} onClick={()=>setProfileOpen(!profileOpen)} className="relative cursor-pointer">
              <img src="./amol.jpg" className="w-9 h-9 rounded-full border-2 border-primary"/>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit"
                    className="absolute right-0 mt-3 w-52 bg-white text-black rounded-xl shadow-xl p-3">
                    <ul className="space-y-2 text-sm">
                      <li className={submenuItemClass}><User size={16}/><NavLink to="/Profile"> My Profile</NavLink></li>
                      <li className={submenuItemClass}><Settings size={16}/><NavLink to="/Settings"> Settings</NavLink></li>
                      <li className={submenuItemClass}><LogOut size={16}/> <NavLink to="/"> Logout</NavLink></li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden text-white cursor-pointer  overflow-y-auto no-scrollbar">
            {isOpen ? <X size={28} onClick={()=>setIsOpen(false)}/> : <Menu size={28} onClick={()=>setIsOpen(true)}/>}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-999 p-6 text-white"
            onClick={()=>setIsOpen(false)}
          >
            <div onClick={(e)=>e.stopPropagation()} className="flex flex-col h-full overflow-y-auto">

              <div className="flex justify-end mb-6">
                <X size={30} onClick={()=>setIsOpen(false)}/>
              </div>

              {/* PROFILE */}
              <div className="mb-6 border-b border-white/20 pb-4">
                <div
                  onClick={()=>setMobileProfileOpen(!mobileProfileOpen)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <img src="./amol.jpg" className="w-10 h-10 rounded-full border-2 border-primary"/>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-400">Tap to open</p>
                  </div>
                </div>

                <AnimatePresence>
                  {mobileProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3 overflow-hidden"
                    >
                      <button className="flex items-center gap-2"><User size={16}/><NavLink to="/Profile" onClick={()=>setIsOpen(false)}> My Profile</NavLink></button>
                      <button className="flex items-center gap-2"><Settings size={16}/><NavLink to="/Settings" onClick={()=>setIsOpen(false)}> Settings</NavLink></button>
                      <button className="flex items-center gap-2"><LogOut size={16}/> <NavLink to="/" onClick={()=>setIsOpen(false)}> Logout</NavLink></button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* LINKS */}
              <div className="flex flex-col gap-6 text-lg">
                <NavLink to="/" onClick={()=>setIsOpen(false)}>Home</NavLink>
                <NavLink to="/About" onClick={()=>setIsOpen(false)}>About</NavLink>

                <details>
                  <summary>Travel</summary>
                  <div className="pl-4 mt-2 space-y-2 text-sm">
                    <p>India Tours</p>
                    <p>International Tours</p>
                    <p>Adventure Trips</p>
                  </div>
                </details>

                <details>
                  <summary>Packages</summary>
                  <div className="pl-4 mt-2 space-y-2 text-sm">
                    <p>Honeymoon</p>
                    <p>Adventure</p>
                    <p>Family</p>
                  </div>
                </details>

                <NavLink to="/Popular-Destinations" onClick={()=>setIsOpen(false)}>Popular Destination</NavLink>
                <NavLink to="/Forex" onClick={()=>setIsOpen(false)}>Forex</NavLink>
                <NavLink to="/Contact" onClick={()=>setIsOpen(false)}>Contact</NavLink>

                {/* AUTH */}
                <div className="mt-6 flex flex-col gap-4 relative z-50">
                  <button onClick={()=>{setLoginOpen(true); setIsOpen(false);}}
                    className="bg-white text-black py-2 rounded-lg cursor-pointer">
                    Login
                  </button>

                  <button onClick={()=>{setSignupOpen(true); setIsOpen(false);}}
                    className="bg-linear-to-r from-green-400 to-orange-400 py-2 rounded-lg cursor-pointer">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {loginOpen && (
          <motion.div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-80 relative">
              <X className="absolute right-3 top-3 cursor-pointer" onClick={()=>setLoginOpen(false)}/>
              <h2 className="text-xl font-semibold mb-4">Login</h2>
              <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded"/>
              <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded"/>
              <button className="w-full bg-primary text-white py-2 rounded mb-3 cursor-pointer">Login</button>
              <button className="w-full border py-2 rounded flex items-center justify-center gap-2 cursor-pointer">
                <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" className="w-5"/>
                Continue with Google
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIGNUP MODAL */}
      <AnimatePresence>
        {signupOpen && (
          <motion.div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-80 relative">
              <X className="absolute right-3 top-3 cursor-pointer" onClick={()=>setSignupOpen(false)}/>
              <h2 className="text-xl font-semibold mb-4">Create Account</h2>
              <input type="text" placeholder="Full Name" className="w-full mb-3 p-2 border rounded"/>
              <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded"/>
              <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded"/>
              <button className="w-full bg-primary text-white py-2 rounded cursor-pointer">Sign Up</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};