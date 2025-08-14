import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Flight } from '../types/flights';
import { useNavigate } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleFavorite } from '../store/favouritesSlice';

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Отримуємо обрані рейси з Redux
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((f) => f.id === flight.id);

  return (
    <Grid item xs={12} sm={6} md={4} key={flight.id}>
      <Card>
        <CardContent>
          <Typography variant="h6">{flight.airline}</Typography>
          <Typography variant="body2">
            {flight.from} → {flight.to}
          </Typography>
          <Typography variant="body2">
            Виліт:{' '}
            {new Date(flight.departureTime).toLocaleTimeString(navigator.language, {
              hour: '2-digit',
              minute: '2-digit',
            })}
            , {new Date(flight.departureTime).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Прибуття:{' '}
            {new Date(flight.arrivalTime).toLocaleTimeString(navigator.language, {
              hour: '2-digit',
              minute: '2-digit',
            })}
            , {new Date(flight.arrivalTime).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">Ціна: ${flight.price}</Typography>
          <Typography variant="body2">
            Термінал: {flight.terminal}, Ворота: {flight.gate}
          </Typography>
          <Typography variant="body2">
            Наявних місць: {flight.tickets.total - flight.tickets.remaining}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`/flights/${flight.id}`)}
          >
            Деталі
          </Button>
          <Button
            size="small"
            color={isFavorite ? 'secondary' : 'primary'}
            startIcon={isFavorite ? <StarIcon /> : <StarBorderIcon />}
            onClick={() => dispatch(toggleFavorite(flight))}
          >
            {isFavorite ? 'В обраному' : 'В обране'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
