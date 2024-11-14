import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, FileText, BarChart2, LineChart, Users, Menu, X, FileCheck , RouteIcon} from 'lucide-react';
import HomePage from './pages/HomePage';
import EvaluatePage from './pages/EvaluatePage';
import ModelPage from './pages/ModelPage';
import AnalysisPage from './pages/AnalysisPage';
import ContactPage from './pages/ContactPage';
import ValidationPage from './pages/Validation';
import WorkflowPage from './pages/WorkflowPage';
import { FaLeaf } from 'react-icons/fa';

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
      <div className="min-h-screen bg-white flex flex-col">
        {/* Top Navbar for both desktop and mobile */}
        <header className="bg-custom-black text-gre p-3 flex justify-between items-center">
          <h1 className="text-white text-3xl font-semibold flex items-center ml-6">
            <FaLeaf className='mr-2' /> 
            ESG
          </h1>
          <nav className="hidden md:flex space-x-4 flex-1 justify-end">
            <NavLink to="/" icon={<Home />} text="Home" />
            <NavLink to="/evaluate" icon={<FileText />} text="Evaluate" />
            <NavLink to="/model" icon={<BarChart2 />} text="Model" />
            <NavLink to="/analysis" icon={<LineChart />} text="Analysis" />
            <NavLink to="/validation" icon={<FileCheck />} text="Validation" />
            <NavLink to="/workflow" icon={<RouteIcon />} text="Workflow" />
            <NavLink to="/contact" icon={<Users />} text="Contact" />
          </nav>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </header>


        {/* Mobile Navbar */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h1 className="text-lg font-semibold">Navigattion</h1>
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
            <MobileNavLink to="/TestPage" icon={<Users />} text="TestPage" setIsMenuOpen={setIsMenuOpen} />
          </div>
        )}

        {/* Page content */}
        <main className="bg-custom-black flex-1 p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/evaluate" element={<EvaluatePage />} />
            <Route path="/model" element={<ModelPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/validation" element={<ValidationPage />} />
            <Route path="/workflow" element={<WorkflowPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center space-x-1 px-4 py-3 text-custom-gray hover:text-gre transition-colors duration-200"
  >
    {React.cloneElement(icon as React.ReactElement, { size: 32 })} 
    <span>{text}</span>
  </Link>
);

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, text, setIsMenuOpen }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:text-gre hover:bg-gray-50"
    onClick={() => setIsMenuOpen(false)}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default App;