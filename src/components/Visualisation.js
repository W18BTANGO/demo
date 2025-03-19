import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import Typography from '@mui/material/Typography';

export default function Visualisation(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Typography variant="h1" gutterBottom>
          Visualisation Service
        </Typography>
      </Container>
      <Footer />
    </AppTheme>
  );
}
