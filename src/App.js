import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import MainContent from './components/MainContent';
import Collection from './components/Collection';
import Preprocessing from './components/Preprocessing';
import Analytics from './components/Analytics';
import Retrieval from './components/Retrieval';
import Visualisation from './components/Visualisation';
import Footer from './components/Footer';

export default function Blog(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Router>
        <AppAppBar />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
        >
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/preprocessing" element={<Preprocessing />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/retrieval" element={<Retrieval />} />
            <Route path="/visualisation" element={<Visualisation />} />
            <Route path="*" element={<MainContent />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </AppTheme>
  );
}
