import { Brain, Bot, Clock, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Summarization",
    description: "Extract key insights instantly using advanced AI models",    
  },
  {
    icon: Brain,
    title: "Data Classification & Extraction",
    description: "Accurately categorize documents and extract essential details",
  },
  {
    icon: Clock,
    title: "Time Savings",
    description: "Reduce manual processing time by up to 90% with automated workflows",
  },
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "Process large volumes of data in seconds with high accuracy",
  },
];

export default function Features() {
  return (
    <section className="py-10 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-1000" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
        
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-purple-400">
            Why Choose Our Platform?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-xl backdrop-blur-lg bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="mb-4 relative">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 transform group-hover:scale-105 transition-all duration-200">
                    <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>


                {/* Hover Gradient Border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              )})}

        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 group"
          >
            Try it for free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}