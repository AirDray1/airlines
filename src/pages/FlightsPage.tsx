import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Alert, Pagination } from '@mui/material';
import { Flight } from '../types/flights';
import { getFlights } from '../api/flightsApi';
import { FlightCard } from '../components/FlightCard';

const FlightsPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]); // зберігаємо ID обраних рейсів
  const flightsPerPage = 12;

  useEffect(() => {
    getFlights()
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Не вдалося завантажити рейси');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteFlights');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteFlights', JSON.stringify(favorites));
  }, [favorites]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);
  const totalPages = Math.ceil(flights.length / flightsPerPage);

  return (
    <>
      <Grid container justifyContent="center" spacing={2} sx={{ p: 2 }}>
        {currentFlights.map((flight) => (
          <FlightCard 
          key={flight.id}
          flight={flight}/>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </>
  );
};

export default FlightsPage;
