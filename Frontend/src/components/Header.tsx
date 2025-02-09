import {
  FileSearch2,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export function Header({ isDarkMode, setIsDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const navItems = ["Home", "Dashboard"];

  return (
    <header className="fixed w-full top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center transform group-hover:scale-105 transition-all duration-200">
              <FileSearch2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-purple-400">
              Doc ClassiFy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item}
                to={`${item === "Home" ? "/" : `/${item.toLowerCase()}`}`}
                className="relative group py-2"
              >
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  {item}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
              aria-label="Toggle theme"
              
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 transform hover:scale-105 transition-all duration-200"
              >
                <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-800/50 shadow-lg overflow-hidden">
                  {[
                    { label: "Profile", icon: User },
                    { label: "Settings", icon: Settings },
                    { label: "Logout", icon: LogOut },
                  ].map(({ label, icon: Icon }) => (
                    <Link
                      key={label}
                      to={`/${label.toLowerCase()}`}
                      className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 group"
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {label}
                      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-gradient-to-b from-gray-900 to-gray-800 backdrop-blur-xl">
          <nav className="px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item}
                to={`${item === "Home" ? "/" : `/${item.toLowerCase()}`}`}
                className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg group"
                onClick={handleMenuClose}
              >
                {item}
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
            <hr className="border-gray-800/50 my-4" />
            <div className="space-y-1">
              {[
                { label: "Profile", icon: User },
                { label: "Settings", icon: Settings },
                { label: "Logout", icon: LogOut },
              ].map(({ label, icon: Icon }) => (
                <Link
                  key={label}
                  to={`/${label.toLowerCase()}`}
                  className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg group"
                  onClick={handleMenuClose}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}