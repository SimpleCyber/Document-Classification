import { CheckCircle, FileCheck, Upload } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: <Upload className="w-8 h-8 text-blue-400" />,
    title: "Upload Documents",
    description: "Submit invoices, emails, advertisements, or other documents",
  },
  {
    icon: <FileCheck className="w-8 h-8 text-blue-400" />,
    title: "AI-Powered Processing",
    description: "The system automatically classifies documents and extracts key details",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-400" />,
    title: "Get Results Instantly",
    description: "Receive a structured output with extracted data and a concise summary",
  },
]

export default function Process() {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-blue-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          How our platform works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="p-6 rounded-xl bg-gray-800 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-100">{step.title}</h3>
                <p className="text-blue-200">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-blue-500/20 transform translate-x-1/2"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                >
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

