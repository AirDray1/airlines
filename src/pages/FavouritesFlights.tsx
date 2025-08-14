import { useSelector } from 'react-redux';
import { RootState } from '../store';

const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  if (favorites.length === 0) {
    return <p>Немає обраних рейсів</p>;
  }

  return (
    <div>
      <h2>Обране</h2>
      
    </div>
  );
};

export default FavoritesPage;
