import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import testimonials from "./testimonialsData";

export const Home = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Destination");

  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    infants: 0,
  });

  const totalGuests = guests.adults + guests.infants;

  // ✅ NEW: date states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const navigate = useNavigate();

  const ref = useRef(null);
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const yContent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityContent = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.7, 0]
  );

  const destinations = useMemo(
    () => ["Maldives", "Dubai", "Switzerland"],
    []
  );

  
  const data = useMemo(() => [...testimonials, ...testimonials], [testimonials]);

  const scroll = useCallback((dir) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  }, []);

  const handleSearch = useCallback(() => {
    if (selected === "Maldives") {
      navigate("/maldives");
    } else {
      alert("Please select Destination to continue");
    }
  }, [selected, navigate]);

  const toggleDropdown = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const selectDestination = useCallback((place) => {
    setSelected(place);
    setOpen(false);
  }, []);

  // ✅ NEW: default dates (today + 4 days)
  useEffect(() => {
    const today = new Date();

    const format = (d) => d.toISOString().split("T")[0];

    const from = format(today);

    const future = new Date();
    future.setDate(today.getDate() + 4);

    const to = format(future);

    setFromDate(from);
    setToDate(to);
  }, []);

  // ✅ NEW: handle from date change (+4 days auto)
  const handleFromDateChange = (e) => {
    const selectedFrom = e.target.value;
    setFromDate(selectedFrom);

    const newDate = new Date(selectedFrom);
    newDate.setDate(newDate.getDate() + 4);

    const formatted = newDate.toISOString().split("T")[0];
    setToDate(formatted);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let intervalId;

    const startScroll = () => {
      intervalId = setInterval(() => {
        if (!el) return;

        el.scrollBy({ left: 350, behavior: "smooth" });

        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
          setTimeout(() => {
            el.scrollTo({ left: 0, behavior: "auto" });
          }, 400);
        }
      }, 3000);
    };

    const stopScroll = () => {
      if (intervalId) clearInterval(intervalId);
    };

    startScroll();

    const handleVisibility = () => {
      if (document.hidden) stopScroll();
      else startScroll();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopScroll();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden inset-0 bg-black/40">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="./maldives.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 bg-black/50">
          <h1 className="text-white text-[40px] md:text-[80px] sm:text-[40px] font-bold leading-tight">
            Discover the World's <br /> Hidden Wonders
          </h1>

          <p className="text-white text-lg md:text-xl mt-2 max-w-5xl">
            Explore breathtaking destinations and create unforgettable memories
            with our expertly crafted travel experiences.
          </p>

          <button className="mt-18 bg-white text-black px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition animate-bounce cursor-pointer">
            Download Brochure
          </button>

<div className=" bg-white/20 backdrop-blur-sm rounded-2xl p-3 md:p-6 shadow-xl flex flex-col gap-3 text-black mt-0 max-w-5xl md:max-w-5xl z-50">

  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">

    {/* DESTINATION */}
    <div className="relative h-11">
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-between bg-white text-black rounded-lg px-2 h-11 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <MapPin className="text-black" />
          <span className="text-sm">{selected}</span>
        </div>
        <ChevronDown size={16} />
      </div>

      {open && (
        <div className="absolute top-full left-0 w-full bg-white text-black rounded-lg shadow-lg overflow-y-auto z-50">
          {destinations.map((place) => (
            <div
              key={place}
              onClick={() => selectDestination(place)}
              className="px-1 py-1 hover:bg-blue-300 hover:text-white cursor-pointer text-md"
            >
              {place}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* FROM DATE */}
    <div className="flex items-center bg-white text-black rounded-lg h-11 px-2 gap-2">
      <Calendar className="text-black " size={18} />
      <input
        type="date"
        value={fromDate}
        onChange={handleFromDateChange}
        className="outline-none w-full text-black text-md bg-transparent  "
      />
    </div>

    {/* TO DATE */}
    <div className="flex items-center bg-white text-black rounded-lg h-11 px-2 gap-2">
      <Calendar className="text-black" size={18} />
      <input
        type="date"
        value={toDate}
        min={fromDate}
        onChange={(e) => setToDate(e.target.value)}
        className="outline-none w-full text-black text-md bg-transparent"
      />
    </div>

    {/* GUESTS */}
    <div className="relative h-11">
      <div
        onClick={() => setShowGuests(!showGuests)}
        className="bg-white text-black w-full h-11 border rounded-lg px-2 flex justify-between items-center cursor-pointer"
      >
        <span className="text-black text-sm">
          {totalGuests} Guests ({guests.adults} Adults, {guests.infants} Infants)
        </span>
        <span>▾</span>
      </div>

      {showGuests && (
        <div className="absolute z-20 w-full bg-white border rounded-lg shadow mt-1 p-2 space-y-2">
          <div className="flex justify-between items-center">
            <span>Adults</span>
            <div className="flex gap-2 items-center">
              <button onClick={() => setGuests(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))} className="px-2 border rounded cursor-pointer">-</button>
              <span>{guests.adults}</span>
              <button onClick={() => setGuests(p => ({ ...p, adults: p.adults + 1 }))} className="px-2 border rounded cursor-pointer">+</button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span>Infants</span>
            <div className="flex gap-2 items-center">
              <button onClick={() => setGuests(p => ({ ...p, infants: Math.max(0, p.infants - 1) }))} className="px-2 border rounded cursor-pointer">-</button>
              <span>{guests.infants}</span>
              <button onClick={() => setGuests(p => ({ ...p, infants: p.infants + 1 }))} className="px-2 border rounded cursor-pointer">+</button>
            </div>
          </div>

          <button
            onClick={() => setShowGuests(false)}
            className="w-full bg-blue-600 text-white rounded py-1 cursor-pointer"
          >
            Done
          </button>
        </div>
      )}
    </div>

    {/* SEARCH BUTTON */}
    <button
      onClick={handleSearch}
      className="h-11 btn btn-primary flex items-center justify-center gap-1 border-none cursor-pointer"
    >
      <Search size={15} />
      Search
    </button>

  </div>
</div>
        </div>
      </section>

      {/* PARALLAX SECTION */}
      <section
        ref={ref}
        className="relative min-h-[40vh] sm:min-h-[50vh] md:h-[45vh] overflow-hidden"
      >
        <motion.div
          style={{ y: yBg, scale: scaleBg }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <img
            src="./beach.jpg"
            alt="beach"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 z-10 bg-linear-to-b from-black/80 via-black/60 to-black/90" />

        <motion.div
          style={{ y: yContent, opacity: opacityContent }}
          className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4 text-white"
        >
          <h1 className="text-2xl sm:text-3xl pt-15 md:text-5xl lg:text-5xl lg:pt-0 md:pt-50 font-extrabold leading-tight tracking-tight">
            Discover Your Next Journey
          </h1>

          <p className="mt-3 md:mt-4 text-white text-sm md:text-lg max-w-3xl leading-relaxed">
            Explore curated destinations, seamless bookings, and unforgettable
            travel experiences across the globe.
          </p>

          <div className="mt-6 md:mt-8 grid grid-cols-3 gap-2 md:gap-6 w-full max-w-xl">
            {[
              { value: "10K+", label: "Happy Travelers" },
              { value: "500+", label: "Destinations" },
              { value: "4.8⭐", label: "User Rating" },
            ].map((item) => (
              <div
                key={item.label}
                className="backdrop-blur-md bg-white/5 rounded-xl md:rounded-2xl py-3 md:py-4 px-2"
              >
                <h2 className="text-lg md:text-2xl font-bold text-white">
                  {item.value}
                </h2>
                <p className="text-white/90 text-[10px] md:text-sm mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <div className="container mx-auto py-10 px-4 relative">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
            What Our Travelers Say
          </h2>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-6 snap-x snap-mandatory px-1"
        >
{data.map((item, index) => (
  <div key={`${item.name}-${index}`}
              className="group min-w-[85%] sm:min-w-[70%] md:min-w-85 mx-auto snap-center md:snap-start bg-gray-800/5 backdrop-blur-xl p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-md"
            >
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-600 text-sm mb-5 leading-relaxed line-clamp-5">
                "{item.review}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-500"
                />

                <div>
                  <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
              </div>

              <div className="mt-4 h-1 w-10 md:w-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-center gap-3 mt-4">
          <button onClick={() => scroll("left")} className="btn-secondary p-3 rounded-full cursor-pointer">
            <ChevronLeft />
          </button>

          <button onClick={() => scroll("right")} className="btn-secondary p-3 rounded-full cursor-pointer">
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};