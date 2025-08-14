import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { FlightDetailsPage } from './pages/FlightDetailsPage';
import { CartPage } from './pages/CartPage';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import FlightsPage from './pages/FlightsPage';
import FavoritesPage from './pages/FavouritesFlights';

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flight Booking
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Рейси
          </Button>
          <Button color="inherit" component={Link} to="/favorites">
            Обране
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Кошик
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<FlightsPage />} />
        <Route path="/flights/:id" element={<FlightDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
