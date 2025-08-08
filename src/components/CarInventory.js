import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import car1 from '../car1.avif';

// Local image bundled with the app
const SINGLE_IMAGE_URL = car1;
const FALLBACK_IMAGE_URL = SINGLE_IMAGE_URL;

const cars = [
  {
    id: 'c1',
    name: '2024 Falcon GT',
    price: '$42,990',
    image: SINGLE_IMAGE_URL,
    description: 'Sporty performance with premium comfort and advanced safety.',
    tag: 'New',
  },
  {
    id: 'c2',
    name: '2023 Aurora EV',
    price: '$54,500',
    image: SINGLE_IMAGE_URL,
    description: 'All-electric range with fast charging and a quiet ride.',
    tag: 'Electric',
  },
  {
    id: 'c3',
    name: '2022 Summit SUV',
    price: '$37,250',
    image: SINGLE_IMAGE_URL,
    description: 'Family-sized SUV with intelligent AWD and spacious interior.',
    tag: 'Best Seller',
  },
  {
    id: 'c4',
    name: '2024 Velocity Coupe',
    price: '$61,900',
    image: SINGLE_IMAGE_URL,
    description: 'A head-turning coupe with turbocharged power and style.',
    tag: 'Limited',
  },
];

const CarInventory = () => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={3} justifyContent="center" alignItems="stretch">
      {cars.map((car) => (
        <Grid item xs={12} sm={6} md={3} key={car.id} sx={{ display: 'flex' }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'transform 220ms ease, box-shadow 220ms ease',
              '&:hover': { transform: 'translateY(-6px)', boxShadow: 8 },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="200"
                image={car.image}
                alt={car.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                sx={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE_URL;
                }}
              />
              <Chip
                label={car.tag}
                size="small"
                color="primary"
                sx={{ position: 'absolute', top: 12, left: 12, bgcolor: 'rgba(37,99,235,0.95)' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  p: 1.5,
                  color: '#fff',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1 }}>
                  {car.name}
                </Typography>
                <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                  {car.price}
                </Typography>
              </Box>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {car.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ borderRadius: 2, fontWeight: 600 }}
                onClick={() => navigate(`/cars/${encodeURIComponent(car.id)}`)}
              >
                View Details
              </Button>
              <Button fullWidth variant="outlined" sx={{ borderRadius: 2 }}>Test Drive</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CarInventory;


