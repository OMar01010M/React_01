import React, { useMemo, useRef, useState } from 'react';
import CrudExample from './components/CrudExample';
import './App.css';
import NavBar from './components/NavBar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CarInventory from './components/CarInventory';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import CarDetails from './components/CarDetails';
import InfoShowcase from './components/InfoShowcase';


function App() {
  const [navValue, setNavValue] = useState('home');
  const homeRef = useRef(null);
  const infoRef = useRef(null);
  const signupRef = useRef(null);

  const sectionMap = useMemo(
    () => ({ home: homeRef, info: infoRef, signup: signupRef }),
    []
  );

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavChange = (e, value) => {
    setNavValue(value);
    // Scroll on the home page; otherwise navigate to home then scroll
    const scrollToSection = () => {
      const ref = sectionMap[value];
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      // Delay to allow route to render
      setTimeout(scrollToSection, 50);
    } else {
      scrollToSection();
    }
  };

  return (
    <div className="App">
      <NavBar value={navValue} onChange={handleNavChange} />
      {/* offset for fixed AppBar height */}
      <div style={{ paddingTop: 96 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero / Home Section */}
                <Box ref={homeRef} sx={{
                  background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
                  color: '#fff',
                  py: { xs: 8, md: 12 },
                  mb: 6,
                  textAlign: 'center'
                }}>
                  <Container maxWidth="lg">
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                      Drive Your Dream Today
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
                      Premium new and certified pre-owned cars. Transparent pricing. Exceptional service.
                    </Typography>
                    <CarInventory />
                  </Container>
                </Box>

                {/* Info Section */}
                <Box ref={infoRef} sx={{ mb: 8 }}>
                  <InfoShowcase />
                </Box>

                {/* Signup Section (uses your CRUD form as a "Reserve/Signup" form) */}
                <Container ref={signupRef} maxWidth="md" sx={{ mb: 12 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
                    Reserve Your Car / Signup
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                    Leave your details and the car you’re interested in. Our team will reach out shortly.
                  </Typography>
                  <CrudExample />
                </Container>
              </>
            }
          />
          <Route path="/cars/:carId" element={<CarDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;