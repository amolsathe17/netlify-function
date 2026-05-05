import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const FAQ = () => {
  const [active, setActive] = useState(null);

  const faqs = [
    {
      question: "How do I book a tour package?",
      answer:
        "You can easily book a tour package through our website by selecting your destination, choosing dates, and completing the secure checkout process.",
    },
    {
      question: "Can I customize my travel itinerary?",
      answer:
        "Yes, we offer fully customizable travel packages. You can modify destinations, hotels, and activities based on your preferences.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major payment methods including credit/debit cards, UPI, net banking, and international payments.",
    },
    {
      question: "Do you provide visa assistance?",
      answer:
        "Yes, we provide visa guidance and documentation support for most international destinations.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellation policies vary by package. You can view detailed cancellation terms before booking or contact support.",
    },
    {
      question: "Is travel insurance included?",
      answer:
        "Travel insurance is optional but highly recommended. You can add it during the booking process.",
    },
  ];

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* 🌴 Maldives Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('./maldives1.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">

        {/* Heading */}
        <div className="text-center mb-6 mt-10 text-white">
          <h2 className="text-3xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-200">
            Everything you need to know about your journey
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left text-white"
              >
                <span className="font-semibold text-sm md:text-base">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: active === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-gray-200 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};