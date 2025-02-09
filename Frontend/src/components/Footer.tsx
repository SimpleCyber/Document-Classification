import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-4 border-t border-blue-500/10 bg-gradient-to-b from-[#192551] to-[#05080f]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-100">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://satyam-yadav.vercel.app"
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100 transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="mailto:satyamok03@gmail.com"
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-100">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100 transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100 transition-colors duration-200">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100 transition-colors duration-200">
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-100">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-200 hover:text-blue-100 transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://bloggersatyam.onrender.com"
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="mailto:satyamok03@gmail.com"
                  className="text-blue-200 hover:text-blue-100 transition-colors duration-200"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-100">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/SimpleCyber"
                className="text-blue-200 hover:text-blue-100 transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/Satyam_yadav_04"
                className="text-blue-200 hover:text-blue-100 transition-colors duration-200"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/dearcoder-satyam/"
                className="text-blue-200 hover:text-blue-100 transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-blue-200">
          <p>&copy; {currentYear} Doc ClassiFy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

