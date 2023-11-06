import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import { Book } from '~/types';

import bookImage from '~/assets/book-placeholder.png';

type BookCardProps = {
  book: Book;
};

function BookCard({ book }: BookCardProps) {
  return (
    <Card sx={{ width: 300 }} data-testid="book-card">
      <CardActionArea sx={{ height: '100%' }} component={Link} to={`book/${book.id}`}>
        <CardMedia
          component="img"
          sx={{ height: 200, objectFit: 'contain', p: 2, backgroundColor: '#f6f6f6' }}
          image={bookImage}
          title={book.title}
        />
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {book.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export { BookCard };
