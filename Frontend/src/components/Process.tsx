import {
  CheckCircle,
  FileCheck,
  Upload,
} from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Documents",
      description: "Submit invoices, emails, advertisements, or other documents",
    },
    {
      icon: FileCheck,
      title: "AI-Powered Processing",
      description: "The system automatically classifies documents and extracts key details",
    },
    {
      icon: CheckCircle,
      title: "Get Results Instantly",
      description: "Receive a structured output with extracted data and a concise summary",
    },
  ];

  return (
    <section className="relative py-13 px-4 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000" />

      {/* Animated Background Grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            How our platform works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-5 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
                  <div className="mb-6 p-4 rounded-lg bg-blue-500/10 w-fit group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="w-8 h-8 text-blue-400" />
                    
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-blue-200/80">
                    {step.description}
                  </p>
                  {/* Gradient hover effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Connecting lines between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform translate-x-1/2">
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;