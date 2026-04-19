import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Letter animation for RentX
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      textShadow: "0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(59, 130, 246, 0.6)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.4) blur(2px)",
        }}
      >
        <source
          src="/video/abc.mp4" type="video/mp4"
        />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 h-screen flex flex-col justify-center items-center px-4 sm:px-8">
        <motion.div
          className="text-center max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated RentX Logo */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.div className="flex justify-center gap-2 sm:gap-4">
              {"RentX".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="text-6xl sm:text-7xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 cursor-pointer"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full"
              variants={floatingVariants}
              initial="initial"
              animate="animate"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-100 mb-8 leading-relaxed font-light"
          >
            Book your favorite cars easily, securely and instantly.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">
              Experience the future of car rental.
            </span>
          </motion.p>

          {/* Features */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-sm text-gray-200"
          >
            {[
              { icon: "⚡", text: "Lightning Fast" },
              { icon: "🔒", text: "Secure & Safe" },
              { icon: "💎", text: "Premium Fleet" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-3 hover:bg-white/20 transition"
                whileHover={{ y: -5 }}
              >
                <span className="text-2xl">{feature.icon}</span>
                <p className="mt-2">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => navigate("/login")}
              className="relative group px-8 py-3 rounded-xl font-bold text-white overflow-hidden"
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2 justify-center">
                Login
                <FaArrowRight size={16} />
              </span>
            </motion.button>

            <motion.button
              onClick={() => navigate("/register")}
              className="relative group px-8 py-3 rounded-xl font-bold text-black overflow-hidden border-2 border-yellow-400"
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2 justify-center">
                Create Account
                <FaArrowRight size={16} />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Cards (Optional Bottom Section) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent flex items-end justify-center gap-8 pb-10 px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {["Luxury", "Economy", "SUV"].map((car, i) => (
          <motion.div
            key={i}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg px-6 py-3 text-white text-sm font-semibold hover:bg-white/20 cursor-pointer"
            whileHover={{ scale: 1.1, y: -5 }}
          >
            {car} Cars
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Home;
