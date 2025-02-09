import {
  ArrowRight,
  FileCheck,
  Upload,
  FileText,
  Files,
  Search,
  Check,
  ChevronRight,
  Database,
} from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const floatingIcons = [
    { Icon: FileCheck, size: 64, className: "top-20 left-20", delay: 0 },
    { Icon: Upload, size: 48, className: "top-40 right-40", delay: 1 },
    { Icon: FileText, size: 56, className: "bottom-42 left-1/4", delay: 0.5 },
    { Icon: Files, size: 52, className: "top-32 left-1/3", delay: 1.5 },
    { Icon: Search, size: 48, className: "bottom-60 right-1/6 ", delay: 2 },
    { Icon: Database, size: 42, className: "top-1/2 left-32", delay: 0.8 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000" />

      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Floating Icons */}
      <div className="absolute inset-0 opacity-10">
        {floatingIcons.map(({ Icon, size, className, delay }, index) => (
          <div
            key={index}
            className={`absolute ${className} animate-float`}
            style={{
              animation: `float 3s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <Icon size={size} className="text-blue-200" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto text-center z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm mb-8 animate-fade-in-up">
          <Check size={16} className="text-green-400" />
          <span className="text-sm text-gray-300">
            AI-Powered Document Processing
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-purple-400">
            Smart Document Classification
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-200 to-blue-400">
            & Data Extraction
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-200/80 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-200">
          Automate document classification and data extraction with AI. Save
          time, reduce manual effort, and process information with high
          accuracy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
          <Link to="/dashboard">
            <button className="group px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all duration-300 flex items-center gap-2">
              Get Started Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link
            to="/demo"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            Watch Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-800 animate-fade-in-up delay-400">
          {[
            { label: "Documents Processed", value: "1M+" },
            { label: "Accuracy Rate", value: "99.9%" },
            { label: "Time Saved", value: "85%" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
