import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, FileText, BarChart2, LineChart, Users, Menu, X } from 'lucide-react';
import HomePage from './pages/HomePage';
import EvaluatePage from './pages/EvaluatePage';
import ModelPage from './pages/ModelPage';
import AnalysisPage from './pages/AnalysisPage';
import ContactPage from './pages/ContactPage';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

interface MobileNavLinkProps extends NavLinkProps {
  setIsMenuOpen: (isOpen: boolean) => void;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col md:flex-row">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex flex-col p-4 bg-gray-100 w-64">
          <NavLink to="/" icon={<Home />} text="Home" />
          <NavLink to="/evaluate" icon={<FileText />} text="Evaluate" />
          <NavLink to="/model" icon={<BarChart2 />} text="Model" />
          <NavLink to="/analysis" icon={<LineChart />} text="Analysis" />
          <NavLink to="/contact" icon={<Users />} text="Contact" />
        </aside>

        {/* Mobile Navbar */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h1 className="text-lg font-semibold">My App</h1>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="flex flex-col space-y-2 p-4 md:hidden bg-gray-100">
            <MobileNavLink to="/" icon={<Home />} text="Home" setIsMenuOpen={setIsMenuOpen} />
            <MobileNavLink to="/evaluate" icon={<FileText />} text="Evaluate" setIsMenuOpen={setIsMenuOpen} />
            <MobileNavLink to="/model" icon={<BarChart2 />} text="Model" setIsMenuOpen={setIsMenuOpen} />
            <MobileNavLink to="/analysis" icon={<LineChart />} text="Analysis" setIsMenuOpen={setIsMenuOpen} />
            <MobileNavLink to="/contact" icon={<Users />} text="Contact" setIsMenuOpen={setIsMenuOpen} />
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/evaluate" element={<EvaluatePage />} />
            <Route path="/model" element={<ModelPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors duration-200"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, text, setIsMenuOpen }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50"
    onClick={() => setIsMenuOpen(false)}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default App;
