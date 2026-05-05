import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { packagesData } from "./data";

const PackageDetails = () => {
  const { id } = useParams();
  const packageData = packagesData.find((pkg) => pkg.id === Number(id));

  const [activeTab, setActiveTab] = useState("itinerary");
  const [openDay, setOpenDay] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [fade, setFade] = useState(true);

  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    infants: 0,
  });

  const totalGuests = guests.adults + guests.infants;

  const navigate = useNavigate();

  if (!packageData) {
    return <h1 className="text-center mt-20">Package not found</h1>;
  }

  const galleryImages = packageData.images;

  const changeImage = (index) => {
    setFade(false);
    setTimeout(() => {
      setSelectedImage(index);
      setFade(true);
    }, 200);
  };

  //  mobile arrows
  const nextImage = () => {
    const next = (selectedImage + 1) % galleryImages.length;
    changeImage(next);
  };

  const prevImage = () => {
    const prev =
      (selectedImage - 1 + galleryImages.length) % galleryImages.length;
    changeImage(prev);
  };

  //  auto slide (mobile only)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      setSelectedImage((prev) =>
        (prev + 1) % galleryImages.length
      );
    }, 3000); // 3 sec

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const dayPlan = [
    { day: 1, title: "Arrival & Welcome", desc: "Airport pickup, resort check-in, welcome drink & relaxation." },
    { day: 2, title: "Beach Relaxation", desc: "Enjoy beach activities and sunset dinner." },
    { day: 3, title: "Water Sports", desc: "Snorkeling, scuba diving & water villa experience." },
    { day: 4, title: "Island Tour", desc: "Guided island exploration & local culture visit." },
    { day: 5, title: "Spa & Wellness", desc: "Couple spa session and yoga." },
    { day: 6, title: "Private Dinner", desc: "Romantic candlelight dinner by the beach." },
    { day: 7, title: "Departure", desc: "Checkout and airport drop." },
  ];

  return (
    <div className="relative bg-gray-200 min-h-screen">

      {/* ===== GALLERY ===== */}
      <div className="w-full px-0">
        <div className="space-y-4">
          <div className="relative w-full">

            <img
              src={galleryImages[selectedImage]}
              className={`w-full h-105 object-cover transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
              alt="main"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h2 className="text-2xl md:text-4xl font-bold">
                {packageData.title}
              </h2>
              <p className="text-lg ">{packageData.resort}</p>
            </div>

            <div className="absolute top-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {selectedImage + 1} / {galleryImages.length}
            </div>

            {/* mobile arrows */}
            <div className="md:hidden">
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full backdrop-blur cursor-pointer"
              >
                ‹
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full backdrop-blur cursor-pointer"
              >
                ›
              </button>
            </div>

            {/*  hidden on mobile, unchanged for desktop */}
            <div className="hidden md:block absolute bottom-3 left-1/2 -translate-x-1/2 w-auto px-2">
              <div className="flex gap-2 overflow-x-auto no-scrollbar bg-black/40 px-3 py-2 rounded-lg backdrop-blur whitespace-nowrap">
                {galleryImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => changeImage(index)}
                    className={`h-11 w-16 md:h-12 md:w-16 object-cover rounded cursor-pointer border shrink-0 ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    alt="thumb"
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== MAIN ===== */}

      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${packageData.images?.[""] || "/maldives1.jpg"})`,
          }}
        ></div>

        <div className="absolute inset-0 backdrop-blur-xs bg-black/80"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2">

            {/* ✅ your original tabs + accordion untouched */}
            <div className="flex gap-2 md:gap-3 mb-6 flex-wrap">
              {["itinerary", "policies", "amenities", "summary"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize btn btn-lightblue cursor-pointer transition-all duration-200 
                  px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "itinerary" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Day-wise Plan</h2>

                {dayPlan.map((day) => (
                  <div key={day.day} className="mb-3 border rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        setOpenDay(openDay === day.day ? null : day.day)
                      }
                      className="w-full px-4 py-3 bg-gray-200 flex justify-between items-center cursor-pointer"
                    >
                      <span className="font-medium">
                        Day {day.day}: {day.title}
                      </span>
                      <span className={`text-lg transition-transform duration-300 ${openDay === day.day ? "rotate-180" : ""}`}>
                        +
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openDay === day.day ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-4 py-3 bg-white text-gray-600">
                        {day.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "policies" && (
              <div className="bg-white p-4 rounded-lg shadow">
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Free cancellation up to 7 days before travel.</li>
                  <li>Passport required.</li>
                  <li>No refund on last-minute cancellation.</li>
                  <li>Travel insurance recommended.</li>
                </ul>
              </div>
            )}

            {activeTab === "amenities" && (
              <div className="bg-white p-4 rounded-lg shadow">
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Free Wi-Fi available across the property.</li>
                  <li>Airport pickup & drop included.</li>
                  <li>Complimentary breakfast & dinner.</li>
                  <li>Private beach access for guests.</li>
                  <li>Spa, wellness & relaxation services.</li>
                  <li>Guided tours & local experiences.</li>
                </ul>
              </div>
            )}

            {activeTab === "summary" && (
              <div className="bg-white p-4 rounded-lg shadow space-y-3">
                <p><strong>Duration:</strong> {packageData.days} Days</p>
                <p><strong>Resort:</strong> {packageData.resort}</p>
                <p><strong>Price:</strong> ₹{packageData.price.toLocaleString()}</p>
              </div>
            )}

          </div>

          {/* RIGHT SIDE — unchanged */}
          <div className="bg-white p-5 rounded-2xl shadow-lg h-fit sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Book Now</h2>

            <input type="text" className="w-full border p-2 rounded mb-3" placeholder="Full Name" />
            <input type="email" className="w-full border p-2 rounded mb-3" placeholder="Email" />

            <div className="relative mb-3">
              <div
                onClick={() => setShowGuests(!showGuests)}
                className="w-full border p-2 rounded cursor-pointer flex justify-between items-center"
              >
                <span className="text-gray-600 text-sm">
                  {totalGuests} Guests ({guests.adults} Adults, {guests.infants} Infants)
                </span>
                <span>▾</span>
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-bold text-blue-600">
                ₹{packageData.price.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => navigate(`/payment/${packageData.id}`)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Proceed to Payment
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PackageDetails;