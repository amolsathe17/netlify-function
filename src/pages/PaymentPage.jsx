import { useParams } from "react-router-dom";
import { packagesData } from "./data";

const PaymentPage = () => {
  const { id } = useParams();

  const packageData = packagesData.find(
    (pkg) => pkg.id === Number(id)
  );

  if (!packageData) {
    return <h1 className="text-center mt-20">Package not found</h1>;
  }

const handlePayment = () => {
  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded");
    return;
  }

  const options = {
    key: "rzp_test_SdhjxMbEkNA2pd", //  replace with your Key ID
    amount: packageData.price * 100, // paise
    currency: "INR",
    name: packageData.title,
    description: "Package Booking",

    handler: function (response) {
      console.log(response);
      alert("Payment Successful 🎉");
    },

    prefill: {
      name: "Test User",
      email: "test@example.com",
      contact: "9999999999",
    },

    theme: {
      color: "#2563eb", // keep your UI same
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
  return (
    <>
      {/* HERO SECTION */}
      <div className="relative h-50 md:h-60 flex items-center justify-center">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${packageData.images?.[0]})`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            {packageData.title}
          </h1>
          <p className="mt-2 text-lg">
            {packageData.days} Days • {packageData.category}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-4">

            {/* PACKAGE DETAILS */}
            <div className="text-center md:text-left bg-white p-5 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-2">
                Package Details
              </h2>

              <p className="text-gray-600 mb-4">
                {packageData.resort}
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-3 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Duration</p>
                  <p className="font-semibold">
                    {packageData.days} Days
                  </p>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Category</p>
                  <p className="font-semibold">
                    {packageData.category}
                  </p>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Price</p>
                  <p className="font-semibold text-blue-600">
                    ₹{packageData.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* TRAVEL INFO */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-3">
                Travel Information
              </h2>

              <ul className="space-y-2 text-gray-600">
                <li>✔ Free cancellation up to 7 days</li>
                <li>✔ Instant confirmation</li>
                <li>✔ Secure payment via Razorpay</li>
                <li>✔ 24/7 customer support</li>
              </ul>
            </div>

          </div>

          {/* RIGHT SIDE PAYMENT */}
          <div className="bg-white p-5 rounded-2xl shadow-lg h-fit sticky top-20">

            <h2 className="text-xl font-semibold mb-4">
              Payment Summary
            </h2>

            <div className="mb-3">
              <p className="font-medium">{packageData.title}</p>
              <p className="text-gray-500 text-sm">
                {packageData.days} Days • {packageData.category}
              </p>
            </div>

            <div className="border-t border-b py-3 my-3">
              <div className="flex justify-between text-sm mb-2">
                <span>Package Price</span>
                <span>₹{packageData.price.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span>Taxes & Fees</span>
                <span>Included</span>
              </div>
            </div>

            <div className="flex justify-between mb-4 font-semibold">
              <span>Total</span>
              <span className="text-blue-600">
                ₹{packageData.price.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Pay Now
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              100% secure payment powered by Razorpay
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default PaymentPage;