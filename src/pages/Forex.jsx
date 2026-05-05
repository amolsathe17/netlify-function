import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  CreditCard,
  ArrowLeftRight,
  TrendingUp,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Forex = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(1000);
  const [toCurrency, setToCurrency] = useState("USD");
  const [mode, setMode] = useState("buy");
  const [rates, setRates] = useState({});
  const [converted, setConverted] = useState(0);

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    AED: "د.إ",
    THB: "฿",
  };

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/INR")
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, []);

  useEffect(() => {
    if (rates[toCurrency]) {
      let rate = rates[toCurrency];
      rate = mode === "buy" ? rate * 1.02 : rate * 0.97;
      setConverted((amount * rate).toFixed(2));
    }
  }, [amount, toCurrency, rates, mode]);

  const handlePayment = () => {
    const rzp = new window.Razorpay({
      key: "rzp_test_SdhjxMbEkNA2pd",
      amount: amount * 100,
      currency: "INR",
      name: "TravelX Forex",
      description: mode === "buy" ? "Buy Forex" : "Sell Forex",
      handler: () => alert("Payment Successful ✅"),
    });
    rzp.open();
  };

  // ✅ GRID SERVICES (NO SCROLL)
  const services = [
    {
      title: "Buy Forex",
      icon: DollarSign,
      img: "./f1.jpg",
      // route: "/buy-forex",
    },
    {
      title: "Sell Forex",
      icon: DollarSign,
      img: "./f2.jpg",
      // route: "/sell-forex",
    },
    {
      title: "Forex Card",
      icon: CreditCard,
      img: "./f3.jpg",
      // route: "/forex-card",
    },
    {
      title: "Money Transfer",
      icon: TrendingUp,
      img: "./f4.jpg",
      // route: "/transfer",
    },
    {
      title: "Travel Insurance",
      icon: ShieldCheck,
      img: "./f5.jpg",
      route: "/Under-Construction",
    },
    {
      title: "Global Payments",
      icon: Globe,
      img: "./f6.jpg",
      // route: "/payments",
    },
  ];

  return (
    <section className="relative pt-24 pb-10 overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('./forex.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold">
            Forex Services
          </h2>
          <p className="text-gray-300 mt-3">
            Exchange smarter. Travel better.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-5 mb-12">
          {services.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                onClick={() => navigate(item.route)}
                whileHover={{ y: -6 }}
                className="cursor-pointer rounded-3xl overflow-hidden bg-white/10 border border-white/20"
              >
                <img
                  src={item.img}
                  className="h-32 w-full object-cover"
                />
                <div className="p-4 flex items-center gap-3">
                  <Icon />
                  <p className="font-medium">{item.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CALCULATOR */}
        <div className="max-w-3xl mx-auto bg-white/10 p-8 rounded-3xl">

          {/* Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setMode("buy")}
              className={`px-5 py-2 ${mode==="buy" && "bg-white text-black"} cursor-pointer rounded-l-full`}
            >
              Buy
            </button>
            <button
              onClick={() => setMode("sell")}
              className={`px-5 py-2 ${mode==="sell" && "bg-white text-black"} rounded-r-full`}
            >
              Sell
            </button>
          </div>

          {/* Inputs */}
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-4 bg-black/50 rounded-xl"
            />

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="p-4 bg-black/50 rounded-xl"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>AED</option>
              <option>THB</option>
            </select>

            <div className="p-4 bg-black/50 rounded-xl flex items-center justify-between">
              <span>
                {currencySymbols[toCurrency]} {converted}
              </span>
              <ArrowLeftRight />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handlePayment}
            className="cursor-pointer w-full mt-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center gap-2 hover:scale-105 transition"
          >
            <CreditCard size={18} />
            {mode === "buy" ? "Buy Forex" : "Sell Forex"}
          </button>
        </div>

      </div>
    </section>
  );
};