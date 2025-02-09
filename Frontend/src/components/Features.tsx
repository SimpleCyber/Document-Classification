import { Brain, Bot, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: <Bot className="w-8 h-8 text-blue-400" />,
    title: "AI-Powered Summarization",
    description: "Extract key insights instantly using advanced AI models",
  },
  {
    icon: <Brain className="w-8 h-8 text-blue-400" />,
    title: "Data Classification & Extraction",
    description: "Accurately categorize documents and extract essential details",
  },
  {
    icon: <Clock className="w-8 h-8 text-blue-400" />,
    title: "Time Savings",
    description: "Reduce manual processing time by up to 90% with automated workflows",
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-400" />,
    title: "Fast & Efficient",
    description: "Process large volumes of data in seconds with high accuracy",
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-blue-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Our Platform?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-100">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

