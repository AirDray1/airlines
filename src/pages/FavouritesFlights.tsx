import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FlightCard } from '../components/FlightCard';

const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  if (favorites.length === 0) {
    return <Typography sx={{ p: 2 }}>Немає обраних рейсів</Typography>;
  }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {favorites.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </Grid>
  );
};

export default FavoritesPage;
