import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        height: '100%',
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: 8 },
        background: 'linear-gradient(180deg, #ffffff, #f8fafc)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary">{description}</Typography>
    </Paper>
  );
};

const InfoShowcase = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Experience the AutoMart Difference
      </Typography>

      {/* Stats Row */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[{
          label: 'Years Serving Drivers',
          value: '10+',
        }, {
          label: 'Point Inspection',
          value: '150',
        }, {
          label: 'Customer Rating',
          value: '4.9/5',
        }].map((stat) => (
          <Grid key={stat.label} item xs={12} sm={4}>
            <Paper
              elevation={2}
              sx={{ p: 2.5, textAlign: 'center', borderRadius: 3, background: '#ffffff' }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e3a8a' }}>{stat.value}</Typography>
              <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Features */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<ElectricBoltIcon color="primary" sx={{ fontSize: 32 }} />}
            title="Electric Ready"
            description="Explore modern EVs with fast-charging support, long-range batteries, and cutting-edge tech."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<PriceCheckIcon color="primary" sx={{ fontSize: 32 }} />}
            title="Transparent Pricing"
            description="No hidden fees. Upfront, competitive pricing and flexible financing tailored to your needs."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<SupportAgentIcon color="primary" sx={{ fontSize: 32 }} />}
            title="After‑Sale Support"
            description="Dedicated experts, extended warranties, and maintenance plans for peace of mind."
          />
        </Grid>
      </Grid>

      {/* CTA Banner */}
      <Paper
        elevation={0}
        className="animated-gradient"
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          color: '#fff',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
          Ready to feel the drive?
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
          Book a test drive today and experience performance, comfort, and technology first‑hand.
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          sx={{ color: '#111827', fontWeight: 700, borderRadius: 3, px: 3 }}
          onClick={() => document.querySelector('form.crud-form')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Book Test Drive
        </Button>
      </Paper>
    </Container>
  );
};

export default InfoShowcase;


