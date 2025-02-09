import {
  FileCheck,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  X,
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

  return (
    <header className="fixed w-full top-0 z-50 backdrop-blur-lg bg-blue-950/80 border-b border-blue-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-300">
              Doc ClassiFy
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "Dashboard", "Upload", "History"].map((item) => (
              <Link
                key={item}
                to={`${item === "Home" ? "/" : `/${item.toLowerCase()}`}`}
                className="text-blue-100 hover:text-white transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(true)}
              className="p-2 rounded-lg hover:bg-blue-800/50 transition-colors duration-200"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-blue-100" />
              ) : (
                <Moon className="w-5 h-5 text-blue-100" />
              )}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center"
              >
                <User className="w-5 h-5 text-white" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-blue-900 border border-blue-800/50 shadow-lg py-1">
                  {[
                    { label: "Profile", icon: User },
                    { label: "Settings", icon: Settings },
                    { label: "Logout", icon: LogOut },
                  ].map(({ label, icon: Icon }) => (
                    <Link
                      key={label}
                      to={`/${label.toLowerCase()}`}
                      className="flex items-center px-4 py-2 text-sm text-blue-100 hover:bg-blue-800/50"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-800/50 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-blue-100" />
            ) : (
              <Menu className="w-6 h-6 text-blue-100" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="z-50 md:hidden fixed inset-0 top-16 bg-blue-950 backdrop-blur-lg">
          <nav className="px-4 py-6 space-y-6 bg-blue-950 min-h-screen">
            {["Home", "Dashboard", "Upload", "History"].map((item) => (
              <Link
                key={item}
                to={`${item === "Home" ? "/" : `/${item.toLowerCase()}`}`}
                className="block text-lg text-blue-100 hover:text-white transition-colors duration-200"
                onClick={handleMenuClose}
              >
                {item}
              </Link>
            ))}
            <hr className="border-blue-800/50" />
            <div className="space-y-6">
              {[
                { label: "Profile", icon: User },
                { label: "Settings", icon: Settings },
                { label: "Logout", icon: LogOut },
              ].map(({ label, icon: Icon }) => (
                <Link
                  key={label}
                  to={`/${label.toLowerCase()}`}
                  className="flex items-center text-blue-100 hover:text-white"
                  onClick={handleMenuClose}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
