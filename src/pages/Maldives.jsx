import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { packagesData } from "./data";

const Maldives = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();

  const categories = ["All", "Honeymoon", "Luxury", "Budget"];

  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    infants: 0,
  });

  const totalGuests = guests.adults + guests.infants;

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

  // ✅ NEW: auto update To Date when From Date changes
  const handleFromDateChange = (e) => {
    const selectedFrom = e.target.value;
    setFromDate(selectedFrom);

    const newDate = new Date(selectedFrom);
    newDate.setDate(newDate.getDate() + 4);

    const formatted = newDate.toISOString().split("T")[0];
    setToDate(formatted);
  };

  const filteredPackages = packagesData.filter((pkg) => {
    const categoryMatch =
      selectedCategory === "All" || pkg.category === selectedCategory;
    return categoryMatch;
  });

  const handlePackageClick = (pkg) => {
    navigate(`/package/${pkg.id}`);
  };

  return (
    <>
      {/* HERO */}
      <div className="relative h-[80vh] lg:h-[48vh] md:h-[50vh] sm:h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('./maldives.jpg')" }}
        ></div>

        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/40 to-black/20"></div>

        <div className="relative z-10 flex flex-col items-center justify-center ">
          <h2 className="text-2xl md:text-4xl text-white font-bold text-center mt-16 md:mt-3">
            Explore Maldives
          </h2>

          <div className="md:w-230 bg-black/20 backdrop-blur-lg shadow-lg rounded-lg p-3 grid grid-cols-1 md:grid-cols-4 gap-3 mt-5 md:mt-3">
            <div>
              <label className="text-lg text-white">From Date</label>
              <input
                type="date"
                className="bg-white text-black w-full mt-1 rounded-lg p-2"
                value={fromDate}
                onChange={handleFromDateChange}
              />
            </div>

            <div>
              <label className="text-lg text-white">To Date</label>
              <input
                type="date"
                className="bg-white text-black w-full mt-1 rounded-lg p-2"
                value={toDate}
                min={fromDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            {/* GUESTS  */}
            <div className="relative z-50 mt-1">
              <label className="text-lg text-white">Traveler(s)</label>
              <div
                onClick={() => setShowGuests(!showGuests)}
                className=" bg-white text-black w-full border rounded-lg  py-2 p-2 cursor-pointer flex justify-between items-center"
              >
                <span className="text-black text-sm">
                  {totalGuests} Guests ({guests.adults} Adults, {guests.infants} Infants)
                </span>
                <span>▾</span>
              </div>

              {showGuests && (
                <div className="absolute z-50 w-full bg-white border rounded-lg shadow mt-1 p-1 space-y-1  ">

                  <div className="flex justify-between items-center">
                    <span>Adults</span>
                    <div className="flex gap-2">
                      <button onClick={() => setGuests(p => ({...p, adults: Math.max(1, p.adults - 1)}))} className="px-2 border rounded cursor-pointer">-</button>
                      <span>{guests.adults}</span>
                      <button onClick={() => setGuests(p => ({...p, adults: p.adults + 1}))} className="px-2 border rounded cursor-pointer">+</button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Infants</span>
                    <div className="flex gap-2">
                      <button onClick={() => setGuests(p => ({...p, infants: Math.max(0, p.infants - 1)}))} className="px-2  border rounded cursor-pointer">-</button>
                      <span>{guests.infants}</span>
                      <button onClick={() => setGuests(p => ({...p, infants: p.infants + 1}))} className="px-2 border rounded cursor-pointer">+</button>
                    </div>
                  </div>

                  <button onClick={() => setShowGuests(false)} className="w-full bg-blue-600 text-white py-1 rounded cursor-pointer">
                    Done
                  </button>

                </div>
              )}
            </div>

            <div>
              <label className="text-lg text-white">Category</label>
              <select
                className="bg-white w-full mt-1 border-none rounded-lg p-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat, i) => (
                  <option key={i}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* PACKAGES GRID */}
      <div className="relative  z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('./maldives1.jpg')" }}
        ></div>

        <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/60 to-black/20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-normal pb-3 pt-3 text-white text-center">
            Available Packages ({filteredPackages.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={pkg.images?.[pkg.id % pkg.images.length]}
                  alt={pkg.title}
                  className="h-30 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{pkg.title}</h3>
                  <p className="text-sm text-gray-500">Resort: {pkg.resort}</p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-blue-600 font-bold">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                      {pkg.category}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePackageClick(pkg)}
                    className="btn btn-secondary"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No packages found for selected filters.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Maldives;