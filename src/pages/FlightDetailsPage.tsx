import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFlightById } from '../api/flightsApi';
import { Flight } from '../types/flights';
import { useDispatch } from 'react-redux';
import { addTicket } from '../store/cartSlice';
import {
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
} from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';

interface Seat {
  id: string;
  status: 'free' | 'occupied';
}

export const FlightDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    getFlightById(id)
      .then((data) => {
        setFlight(data);
        setSeats(generateSeats());
      })
      .catch(() => setError('Не вдалося завантажити дані рейсу'))
      .finally(() => setLoading(false));
  }, [id]);

  const generateSeats = (): Seat[] => {
    const seatArray: Seat[] = [];
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 6; col++) {
        seatArray.push({
          id: `${row}${String.fromCharCode(64 + col)}`, // 1A, 1B...
          status: Math.random() > 0.7 ? 'occupied' : 'free',
        });
      }
    }
    return seatArray;
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'free' && flight) {
      dispatch(
        addTicket({
          flightId: flight.id,
          seat: seat.id,
          price: flight.price,
        })
      );
      setSeats((prev) =>
        prev.map((s) =>
          s.id === seat.id ? { ...s, status: 'occupied' } : s
        )
      );
    }
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 5 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Grid>
    );
  }

  if (!flight) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {flight.airline} — {flight.from} → {flight.to}
      </Typography>
      <Typography variant="body1">
        Виліт: {new Date(flight.departureTime).toLocaleTimeString(navigator.language, {
              hour: '2-digit',
              minute: '2-digit',
            })}
            , {new Date(flight.departureTime).toLocaleDateString()};
        Прибуття: {new Date(flight.arrivalTime).toLocaleTimeString(navigator.language, {
              hour: '2-digit',
              minute: '2-digit',
            })}
            , {new Date(flight.arrivalTime).toLocaleDateString()}
      </Typography>
      <Typography variant="body1">
        Ціна квитка: ${flight.price}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Виберіть місце:
      </Typography>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        {seats.map((seat) => (
          <Grid item xs={2} key={seat.id}>
            <Button
              variant="outlined"
              color={seat.status === 'occupied' ? 'error' : 'success'}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.status === 'occupied'}
              fullWidth
              startIcon={<EventSeatIcon />}
            >
              {seat.id}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
