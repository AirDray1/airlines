import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeTicket } from '../store/cartSlice';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const CartPage = () => {
  const tickets = useSelector((state: RootState) => state.cart.tickets);
  const dispatch = useDispatch();

  const total = tickets.reduce((sum, t) => sum + t.price, 0);

  if (tickets.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5">Кошик порожній 🛒</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Ваші квитки
      </Typography>
      <Grid container spacing={2}>
        {tickets.map((ticket, idx) => (
          <Grid item xs={12} sm={6} md={4} key={`${ticket.flightId}-${ticket.seat}-${idx}`}>
            <Card>
              <CardContent>
                <Typography variant="body1">Рейс ID: {ticket.flightId}</Typography>
                <Typography variant="body1">Місце: {ticket.seat}</Typography>
                <Typography variant="body1">Ціна: ${ticket.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() =>
                    dispatch(removeTicket({ flightId: ticket.flightId, seat: ticket.seat }))
                  }
                >
                  Видалити
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Загальна вартість: ${total}</Typography>
      </Box>
    </Box>
  );
};