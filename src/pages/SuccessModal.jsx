import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const SuccessModal = ({ isOpen, onClose, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-999 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-2xl"
          >
            <CheckCircle className="text-green-500 mx-auto mb-3" size={50} />

            <h2 className="text-xl font-bold mb-2">{title}</h2>

            <p className="text-gray-600 mb-5">{message}</p>

            <button
              onClick={onClose}
              className="bg-linear-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;