import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import car1 from '../car1.avif';

// Temporary in-file data; consider centralizing to a data module later
const allCars = [
  { id: 'c1', name: '2024 Falcon GT', price: '$42,990', tag: 'New' },
  { id: 'c2', name: '2023 Aurora EV', price: '$54,500', tag: 'Electric' },
  { id: 'c3', name: '2022 Summit SUV', price: '$37,250', tag: 'Best Seller' },
  { id: 'c4', name: '2024 Velocity Coupe', price: '$61,900', tag: 'Limited' },
];

const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const car = useMemo(() => allCars.find((c) => c.id === carId), [carId]);

  if (!car) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Car not found</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Button variant="text" onClick={() => navigate(-1)} sx={{ mb: 2 }}>← Back</Button>
      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardMedia component="img" height="320" image={car1} alt={car.name} sx={{ objectFit: 'cover' }} />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>{car.name}</Typography>
            <Chip label={car.tag} color="primary" size="small" />
          </Box>
          <Typography variant="h6" sx={{ mb: 2 }}>{car.price}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Detailed specifications and features coming soon. Contact us to learn more about availability,
            financing options, and trade-in offers.
          </Typography>
          <Button variant="contained" sx={{ mr: 2, borderRadius: 2 }}>Book Test Drive</Button>
          <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={() => navigate(-1)}>Back</Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CarDetails;


