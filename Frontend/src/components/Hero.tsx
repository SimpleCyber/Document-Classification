import { ArrowRight, FileCheck, Upload } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center px-4 py-20">
      <motion.div
        className="absolute inset-0 opacity-10 z-8 mt-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-20 left-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
        >
          <FileCheck size={64} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-40"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, delay: 1 }}
        >
          <Upload size={48} />
        </motion.div>
      </motion.div>
      <div className="max-w-6xl mx-auto text-center z-10 mt-15">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Smart Document Classification & Data Extraction Service
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Automate document classification and data extraction with AI. Save time, reduce manual effort, and process
          information with high accuracy.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/upload">
            <button className="z-50 px-8 py-4 cursor-pointer text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all duration-300 flex items-center gap-2 mx-auto">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

