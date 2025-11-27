import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivateDining from './pages/PrivateDining';
import Corporate from './pages/Corporate';
import About from './pages/About';
import Contact from './pages/Contact';
import ManulAI from './pages/ManulAI';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        {/* Removed pt-20 so Hero sections sit BEHIND the navbar */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privat" element={<PrivateDining />} />
            <Route path="/unternehmen" element={<Corporate />} />
            <Route path="/ueber-mich" element={<About />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/manul-ai" element={<ManulAI />} />
            {/* Placeholder for other routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;